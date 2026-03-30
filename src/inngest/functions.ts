import { createAgent, openai } from '@inngest/agent-kit';
import { inngest } from "./client";
import{ Sandbox} from '@e2b/code-interpreter'
import { ArrowDownAZ } from 'lucide-react';
import { getSandbox } from './util';
export const helloWorld = inngest.createFunction(
  { id: "hello-world2" }, // 1. options
  { event: "test/hello.world" }, // 2. trigger
  async ({ event, step }) => { // 3. handler
    const sandboxId = await step.run("get-sandbox-id",async ()=>{
      const sandbox = await Sandbox.create("asatiaman38/lovable-clone-nextjs-test-2")
      return sandbox.sandboxId;
    })
    await step.sleep("wait-a-moment", "2s");
    // const summarizer = createAgent({
    //   name: 'Summarizer',
    //   system:
    //   'You are an expert summarizer.summarizer anythink which is given to you in two words',
    //    model: openai({model :"gpt-4o"}),
    // });
    // const { output } =await summarizer.run(
    //   `Summarize the following task ${event.data.value}`,
    // );
    const sandboxUrl = await step.run("get-sendbox-url",async()=>{
      const sandbox = getSandbox(sandboxId);
      const host = (await sandbox).getHost(3000);
      return `https://${host}`
    })
    // console.log(output);
    return { sandboxUrl};
  }
  
);