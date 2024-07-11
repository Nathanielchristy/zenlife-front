import type { LiveProvider, LiveEvent } from "@refinedev/core";
import Ably from "ably/promises";
import type { Types } from "ably";

interface MessageType extends Types.Message {
  data: LiveEvent;
}

const notificationSound = new Audio("alertsound.mp3");
const editSound = new Audio("alertsound.mp3");

const liveProvider = (client: Ably.Realtime): LiveProvider => {
  return {
    subscribe: ({ channel, types, params, callback }) => {
      const channelInstance = client.channels.get(channel);

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
              playSound(message.data.type); // Play sound based on event type
            }
          } else {
            callback(message.data);
            playSound(message.data.type); // Play sound based on event type
          }
        }
      };
      channelInstance.subscribe(listener);

      return { channelInstance, listener };
    },

    unsubscribe: (payload: {
      channelInstance: Types.RealtimeChannelPromise;
      listener: () => void;
    }) => {
      const { channelInstance, listener } = payload;
      channelInstance.unsubscribe(listener);
    },

    publish: (event: LiveEvent) => {
      const channelInstance = client.channels.get(event.channel);
      console.log(event);
      channelInstance.publish(event.type, event);
    },
  };
};

const playSound = (eventType: string) => {
  if (eventType === "created") {
    notificationSound.play();
  }
  // else if (eventType === "updated") {
  //   editSound.play();
  // }
};

export { liveProvider, Ably };
