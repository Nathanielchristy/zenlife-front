// liveProvider.ts
import type { LiveProvider, LiveEvent } from "@refinedev/core";
import { io, Socket } from "socket.io-client";

interface MessageType {
  data: LiveEvent;
}

const liveProvider = (client: Socket): LiveProvider => {
  return {
    subscribe: ({ channel, types, params, callback }) => {
      const listener = (message: MessageType) => {
        if (types.includes("*") || types.includes(message.data.type)) {
          if (
            message.data.type !== "created" &&
            params?.ids !== undefined &&
            message.data?.payload?.ids !== undefined
          ) {
            if (
              params.ids
                .map(String)
                .filter((value) =>
                  message.data.payload.ids?.map(String).includes(value)
                ).length > 0
            ) {
              callback(message.data as LiveEvent);
            }
          } else {
            callback(message.data);
          }
        }
      };

      client.on(channel, listener);

      return { channel, listener };
    },

    unsubscribe: (payload: { channel: string; listener: () => void }) => {
      const { channel, listener } = payload;
      client.off(channel, listener);
    },

    publish: (event: LiveEvent) => {
      client.emit(event.channel, event);
    },
  };
};

// Initialize Socket.IO client
const socketClient = io("http://localhost:5000");

export { liveProvider, socketClient };
