import { inngest } from "./client";
export const helloWorld = inngest.createFunction(
  { id: "hello-world2" }, // 1. options
  { event: "test/hello.world" }, // 2. trigger
  async ({ event, step }) => { // 3. handler
    await step.sleep("wait-a-moment", "10s");
    return { message: `Hello ${event.data.email}!` };
  }
);