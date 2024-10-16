import WebSocket from "ws";
import { inMemoryOrderBooks } from "../utils/global";

let clients: { ws: WebSocket; eventId: string }[] = [];

export const setupWebSocket = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on("connection", (ws: WebSocket) => {
    ws.on("message", async (message: string) => {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage && parsedMessage.eventId) {
        const existingClient = clients.find(
          (client) =>
            client.ws === ws && client.eventId === parsedMessage.eventId
        );
        if (!existingClient) {
          clients.push({ ws, eventId: parsedMessage.eventId });
        }
        const orderBook = inMemoryOrderBooks[parsedMessage.eventId];
        if (!orderBook) {
          ws.send("null");
        }
        const broadcastData = {
          orderbook: {
            yes: orderBook.YES,
            no: orderBook.NO,
          },
        };
        ws.send(JSON.stringify(broadcastData));
      }
    });

    ws.on("close", () => {
      clients = clients.filter((client) => client.ws !== ws);
      console.log("Client disconnected.");
    });
  });

  return wss;
};

export const WebsocketServer = {
  broadcast: (eventId: string, data: any) => {
    clients.forEach((client) => {
      if (
        client.eventId === eventId &&
        client.ws.readyState === WebSocket.OPEN
      ) {
        client.ws.send(JSON.stringify(data));
      }
    });
  },
};
