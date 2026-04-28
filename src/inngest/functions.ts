import { createAgent, createNetwork, openai } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world2" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const input = event?.data?.value ?? "";

    const codeWriterAgent = createAgent({
      name: "Code writer",
      system:
        "You are an expert TypeScript programmer. Given a set of asks, you think step-by-step to plan clean, " +
        "idiomatic TypeScript code, with comments and tests as necessary." +
        "Do not respond with anything else other than the following XML tags:" +
        "- If you would like to write code, add all code within the following tags:" +
        "  <file name='$filename.ts'>$contents</file>",
      model: openai({ model: "gpt-4o-mini" }),
    });

    // const network = createNetwork({
    //   name: "code-writer-network",
    //   agents: [codeWriterAgent],
    //   defaultModel: openai({ model: "gpt-4o-mini" }),
    // });

    const result = await network.run(input);

    const text = result.output
      .map((m) =>
        typeof m.content === "string" ? m.content : JSON.stringify(m.content),
      )
      .join("\n");

    return { message: `Hello: ${input}`, output: text };
  },
);
