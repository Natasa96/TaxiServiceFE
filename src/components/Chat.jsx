import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import {
  Box,
  Button,
  Circle,
  Flex,
  Input,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import useAuthStore from "../store/auth";

const Chat = ({ userId }) => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_CHAT_URL)
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      const test = async () => {
        connection.on("ReceiveMessage", (username, message) => {
          setMessages((messages) => [...messages, { username, message }]);
        });
        connection.on("JoinChat", (username, message) => {
          setMessages((messages) => [...messages, { username, message }]);
        });
        await connection.start();
        await connection.invoke("JoinChat", user.name, "taxi");
      };
      test();
    }
  }, [connection]);

  const handleSendMessage = async () => {
    await connection.invoke("SendMessage", messageInput);
  };
  const handleToggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <Flex
      position="fixed"
      bottom="40px"
      right="40px"
      flexDirection="column"
      alignItems="flex-end"
    >
      {!isChatOpen && (
        <Circle
          size="60px"
          bg="blue.500"
          color="white"
          mb={2}
          cursor="pointer"
          onClick={handleToggleChat}
        >
          Chat
        </Circle>
      )}
      {isChatOpen && (
        <Box maxW="300px" boxShadow="lg" borderRadius="md" bg="white">
          <Flex
            bg="blue.500"
            color="white"
            p={2}
            justifyContent="space-between"
            alignItems="center"
            cursor="pointer"
            onClick={handleToggleChat}
          >
            <Text>Messages</Text>
            <Text>Close</Text>
          </Flex>
          <List
            p={2}
            maxH="500px"
            w="300px"
            overflowY="auto"
            paddingBottom={200}
          >
            {messages.map(({ username, message }, index) => (
              <ListItem key={index} display="flex" color="black">
                <Text fontWeight="bold">{username}: </Text>
                <Text>{message}</Text>
              </ListItem>
            ))}
          </List>
          <Flex>
            <Input
              autoFocus
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message"
              color="black"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(messageInput);
                  setMessageInput("");
                }
              }}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

Chat.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Chat;
