import React, { useRef, useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  Container,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { TOOLS, TOOLS_EXECUTOR } from "./tools";

const CALL_LLM = async (messages) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free", // You can also try "meta-llama/llama-3-8b-instruct"
        messages: messages.map((m) => ({
          content: m.content,
          role: m.role,
        })),
        tools: TOOLS,
        tool_choice: "auto",
        // [
        //   { role: "system", content: "You are a helpful assistant." },
        //   { role: "user", content: "Write a short poem about the ocean." },
        // ],
      }),
    }
  );

  const data = await response.json();

  return data;
};

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        'When you need to use a tool, reply ONLY with (SHOULD NOT HAVE ANY PREFIX SUFFIX TEXT AROUND THIS):\n"[TOOL_CALL]" {"function": "<name>", "arguments": {...}}',
    },
    {
      role: "system",
      content:
        "You are a helpful assistant. To help user to call the tools and give them the result of those in appropriate format so they can understand it easily. ONLY CALL AVAILABLE TOOL CALLs.",
    },
  ]);

  const msgRef = useRef(messages);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      setIsLoading(true);
      // Add user message
      const userMessage = {
        content: inputMessage,
        role: "user",
        timestamp: new Date().toISOString(),
      };
      msgRef.current = [...msgRef.current, userMessage];
      let messages = msgRef.current;
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage("");

      // Here you can add your API call
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: inputMessage }),
      // });
      // const data = await response.json();
      console.log("messages", { messages });
      // const response = await fetch(
      //   "https://openrouter.ai/api/v1/chat/completions",
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization:
      //         "Bearer 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",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       model: "mistralai/mistral-7b-instruct", // You can also try "meta-llama/llama-3-8b-instruct"
      //       messages: messages.map((m) => ({
      //         content: m.content,
      //         role: m.role,
      //       })),
      //       tools: TOOLS,
      //       tool_choice: "auto",
      //       // [
      //       //   { role: "system", content: "You are a helpful assistant." },
      //       //   { role: "user", content: "Write a short poem about the ocean." },
      //       // ],
      //     }),
      //   }
      // );

      let data = await CALL_LLM(messages); // await response.json();
      console.log("Response:", data.choices[0].message.content);

      const message = data.choices[0].message;
      console.log("message : ", message);
      let funName, funArgs;
      if (message.content.trim().includes("[TOOL_CALL]")) {
        const msgRes = message.content.replace(
          /.*(\[TOOL_CALL\]\s*\{.*\}).*/s,
          "$1"
        );
        const jsonPart = msgRes.replace("[TOOL_CALL]", "").trim();
        const toolCall = JSON.parse(jsonPart);
        // console.log("Tool requested:", toolCall.function);
        // console.log("Arguments:", toolCall.arguments);
        funName = toolCall.function;
        funArgs =
          typeof toolCall.arguments === "object"
            ? toolCall.arguments
            : JSON.parse(toolCall.arguments || "{}");
      }
      if (message.tool_calls) {
        for (const toolCall of message.tool_calls) {
          // console.log(`Tool Call Requested: ${toolCall.function.name}`);
          // console.log("Arguments:", toolCall.function.arguments);
          // console.log("Tool Name", TOOLS_EXECUTOR[toolCall.function.name]);
          // console.log(
          //   "Tool Args",
          //   JSON.parse(toolCall.function.arguments || "{}")
          // );
          funName = toolCall.function.name;
          funArgs = JSON.parse(toolCall.function.arguments || {});
          // const result = await getWeather(JSON.parse(toolCall.function.arguments).city);
        }
      }
      if (funName) {
        const result = await TOOLS_EXECUTOR[funName](funArgs);
        console.log("Result", { result });

        const toolResult = {
          content: `Result of tool call ${funName} with argument ${JSON.stringify(
            funArgs || {}
          )} is : ${JSON.stringify(result.data)}`,
          role: "user",
          timestamp: new Date().toISOString(),
        };
        msgRef.current = [...msgRef.current, toolResult];
        messages = msgRef.current;
        setMessages((prev) => {
          const newMsgs = [...prev, toolResult];
          messages = newMsgs;
          return newMsgs;
        });

        data = await CALL_LLM(messages);
        // TOOLS_EXECUTOR[toolCall.function.name];
        // tools;
        // TODO: last code here we are asking chatgpt to give some code where we have 3 4 tool function to call
        // Here you would call your actual function in code:
      }

      // Simulate API response for now
      const assistMessage = {
        content: data.choices[0].message.content,
        // role: "bot",
        // timestamp: new Date().toISOString(),
        role: "assistant",
        timestamp: new Date().toISOString(),
      };

      msgRef.current = [...msgRef.current, assistMessage];
      setMessages((prev) => [...prev, assistMessage]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send message",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxW="container.md" h="90vh">
      <VStack h="full" spacing={4}>
        <Box
          flex={1}
          w="full"
          overflowY="auto"
          bg="gray.50"
          p={4}
          borderRadius="md"
        >
          {messages
            .filter((m) => m.role !== "system")
            .map((message, index) => (
              <Flex
                key={index}
                justify={message.role === "user" ? "flex-end" : "flex-start"}
                mb={4}
              >
                <Box
                  bg={message.role === "user" ? "blue.500" : "gray.200"}
                  color={message.role === "user" ? "white" : "black"}
                  px={4}
                  py={2}
                  borderRadius="lg"
                  maxW="70%"
                >
                  <Text>{message.content}</Text>
                  <Text fontSize="xs" opacity={0.8}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </Text>
                </Box>
              </Flex>
            ))}
        </Box>

        <Flex w="full" gap={2}>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            size="lg"
          />
          <Button
            colorScheme="blue"
            onClick={handleSendMessage}
            isLoading={isLoading}
            size="lg"
          >
            Send
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Chat;
