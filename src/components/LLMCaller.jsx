import React from "react";
import { Button } from "@chakra-ui/react";

const LLMCaller = () => {
  // fetch("https://openrouter.ai/api/v1/chat/completions", {
  //   method: "POST",
  //   headers: {
  //     Authorization:
  //       "Bearer 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",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     model: "mistralai/mistral-7b-instruct",
  //     messages: [
  //       {
  //         role: "user",
  //         content: "What is the meaning of life?",
  //       },
  //     ],
  //   }),
  // })
  //   .then((o) => (obj = o.json()))
  //   .catch((e) => console.error(e));

  // Example: Node.js or modern browser with fetch

  async function callLLM() {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_OPEN_ROUTER_LLM}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct", // You can also try "meta-llama/llama-3-8b-instruct"
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Write a short poem about the ocean." },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Response:", data.choices[0].message.content);
  }

  return (
    <>
      <div>TT</div>
      <Button onClick={() => callLLM().catch(console.error)}>Call LLM</Button>
    </>
  );
};

export default LLMCaller;
