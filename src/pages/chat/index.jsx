import React, { useState } from "react";
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

const Chat = () => {
  const [messages, setMessages] = useState([]);
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
      let messages = [userMessage];
      setMessages((prev) => {
        const newMsgs = [...prev, userMessage];
        messages = newMsgs;
        return newMsgs;
      });
      setInputMessage("");

      // Here you can add your API call
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: inputMessage }),
      // });
      // const data = await response.json();

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
            model: "mistralai/mistral-7b-instruct", // You can also try "meta-llama/llama-3-8b-instruct"
            messages: messages.map((m) => ({
              content: m.content,
              role: m.role,
            })),
            // [
            //   { role: "system", content: "You are a helpful assistant." },
            //   { role: "user", content: "Write a short poem about the ocean." },
            // ],
          }),
        }
      );

      const data = await response.json();
      console.log("Response:", data.choices[0].message.content);

      // Simulate API response for now
      const assistMessage = {
        content: data.choices[0].message.content,
        // role: "bot",
        // timestamp: new Date().toISOString(),
        role: "assistant",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistMessage]);
    } catch (error) {
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
          {messages.map((message, index) => (
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
