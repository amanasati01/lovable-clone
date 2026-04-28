import OpenAI from "openai";

export default async function Home() {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: "give me react boiler plate code" }],
  });

  console.log(response.choices[0].message.content);
  return (
    <>
      <div>Helllo</div>
    </>
  );
}
