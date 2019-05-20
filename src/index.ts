import { AgileClient } from 'agile-client/dist';
import { PromiseExecutor } from 'agile-client/dist/types/promise-executor';
import { ClientConfig } from './types/client-config';

/**
 * WebSocket client that communicates in a Request-Response manner with the server
 */
export class WebsocketAgileClient {
  private clientConfig: ClientConfig;
  // WebSocket client
  private ws: WebSocket;
  // Agile Client
  private ac: AgileClient<WebSocket>;

  constructor(config: ClientConfig) {
    this.clientConfig = config;
  }

  /**
   * Connect to the WebSocket server
   */
  connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // connect to the WebSocket server
      this.ws = new WebSocket(this.clientConfig.serverUrl);

      this.ws.onopen = () => {
        // connection established
        // create the AC instance
        this.ac = new AgileClient<WebSocket>(this.clientConfig.requestTimeout);

        // overwrite the default message handler of the AC
        this.ac.handleMessage = (...args) => {
          return this.handleMessage(...args);
        };

        // the client is now connected to the WebSocket server
        resolve();
      };

      this.ws.onerror = (err) => {
        // connection failed
        reject(err);
      };

      // wait for messages from the WebSocket server
      this.ws.onmessage = (event: MessageEvent) => {
        // configure the AC to handle the messages received over the WebSocket connection
        this.ac.receiveMessage(this.ws, event.data);
      };
    });
  }

  /**
   * TO BE OVERWRITTEN
   * Handle a received message. By default, always respond with an ACK
   */
  public handleMessage(message: string, executor: PromiseExecutor<string>) {
    executor.resolve('OK');
  }

  /**
   * Send a message to the WebSocket server
   */
  public sendMessage(message: string): Promise<string> {
    // send messages through the AC
    return this.ac.sendMessage(this.ws, message);
  }
}
