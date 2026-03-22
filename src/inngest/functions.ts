import { createAgent, openai } from '@inngest/agent-kit';
import { inngest } from "./client";
export const helloWorld = inngest.createFunction(
  { id: "hello-world2" }, // 1. options
  { event: "test/hello.world" }, // 2. trigger
  async ({ event, step }) => { // 3. handler
    await step.sleep("wait-a-moment", "2s");
    const summarizer = createAgent({
      name: 'Summarizer',
      system:
      'You are an expert summarizer.summarizer anythink which is given to you in two words',
       model: openai({model :"gpt-4o"}),
    });
    const { output } =await summarizer.run(
      `Summarize the following task ${event.data.value}`,
    );
    console.log(output);
    return { "Success": 'ok' };
  }
);