# WebSocket Agile Client (WAC)

> WebSocket client that communicates with the server in a Request-Response manner


## Installation

```sh
npm install git+https://github.com/maic333/websocket-agile-client.git --save
```

## Dependencies

> Uses the [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to create the WebSocket client

> Uses [Agile Client](https://github.com/maic333/agile-client) as a wrapper for the WebSocket client, to add support for Request-Response communication with the server.

## Usage

> **Step 1**: Create the WAC client

```typescript
import { WebsocketAgileClient } from 'websocket-agile-client/dist';
...

const wac = new WebsocketAgileClient({
  // set your WebSocket server URL here
  serverUrl: 'ws://your-websocket-server:port'
});
```

> **Step 2**: Handle messages received from server

```typescript
import { PromiseExecutor } from 'agile-client/dist/types/promise-executor';
...

wac.handleMessage = (message: string, executor: PromiseExecutor<string>) => {
  // say you are using JSON encoded objects for client-server communication
  try {
    const messageObj = JSON.parse(message);
    
    if (messageObj.data) {
      // send a response to the server
      executor.resolve('Received the data');
    } else {
      // send an error to the server
      executor.reject('There is no data');
    }
  } catch (e) {
    // send an error to the server
    executor.reject('Wrong message format');
  }
};
```

> **Step 3**: Send a message to the server

```typescript
wac.sendMessage(message)
  .then((result) => {
    // got a response
    console.log(result);
  })
  .catch((error) => {
    // something went wrong
    console.log(error);
  })
```

## License

ISC
