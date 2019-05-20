import { PromiseExecutor } from 'agile-client/dist/types/promise-executor';
import { ClientConfig } from './types/client-config';
/**
 * WebSocket client that communicates in a Request-Response manner with the server
 */
export declare class WebsocketAgileClient {
    private clientConfig;
    private ws;
    private ac;
    constructor(config: ClientConfig);
    /**
     * Connect to the WebSocket server
     */
    connect(): Promise<void>;
    /**
     * TO BE OVERWRITTEN
     * Handle a received message. By default, always respond with an ACK
     */
    handleMessage(message: string, executor: PromiseExecutor<string>): void;
    /**
     * Send a message to the WebSocket server
     */
    sendMessage(message: string): Promise<string>;
}
