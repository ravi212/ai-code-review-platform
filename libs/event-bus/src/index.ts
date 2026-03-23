import Redis from "ioredis";

const pub = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

const sub = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

// ---- Connection Logging ----
pub.on("connect", () => console.log("Redis Publisher Connected"));
sub.on("connect", () => console.log("Redis Subscriber Connected"));

pub.on("error", (err) => console.error("Publisher Error:", err.message));
sub.on("error", (err) => console.error("Subscriber Error:", err.message));

// ---- Internal Handler Map (IMPORTANT) ----
const handlers: Record<string, ((data: any) => void)[]> = {};

// ---- Publish ----
export const publish = async (event: string, data: any) => {
  try {
    await pub.publish(event, JSON.stringify(data));
    console.log(`Event Published → ${event}`);
  } catch (err) {
    console.error(`Failed to publish event ${event}:`, err);
  }
};

// ---- Subscribe ----
export const subscribe = (event: string, callback: (data: any) => void) => {
  // Register handler
  if (!handlers[event]) {
    handlers[event] = [];

    // Subscribe only once per event
    sub.subscribe(event, (err) => {
      if (err) {
        console.error(`Failed to subscribe to ${event}:`, err);
      } else {
        console.log(`Subscribed to ${event}`);
      }
    });
  }

  handlers[event].push(callback);
};

// ---- Global Message Listener ----
sub.on("message", (channel, message) => {
  const eventHandlers = handlers[channel];

  if (!eventHandlers || eventHandlers.length === 0) return;

  try {
    const data = JSON.parse(message);

    eventHandlers.forEach((handler) => handler(data));
  } catch (err) {
    console.error(`Failed to process message for ${channel}:`, err);
  }
});