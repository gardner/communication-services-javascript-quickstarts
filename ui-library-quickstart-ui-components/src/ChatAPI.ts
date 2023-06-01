import { useState, useEffect, useRef } from "react";

export function useMessageHistory<Type>(
  msgs: Array<Type> = []
): [Array<Type>, (message: Type) => void] {
  const [messages, setMessages] = useState<Array<Type>>([]);
  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initializing WebSocket connection
    websocket.current = new WebSocket("ws://localhost:8000/ws");

    websocket.current.onopen = () => {
      console.log("connected to the server");
    };

    // Listening to message event
    websocket.current.onmessage = (event: MessageEvent) => {
      const newMessage: Type = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    websocket.current.onclose = () => {
      console.log("disconnected from the server");
    };

    // Cleanup
    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, []);

  // Sending message to WebSocket server
  const sendMessage = (message: Type) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify(message));
    } else {
      console.error("Websocket isn't open");
    }
  };

  // // Handling form submission
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   sendMessage(inputMessage);
  //   setInputMessage("");
  // };

  // // Handling input change
  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInputMessage(event.target.value);
  // };

  return [messages, sendMessage];
}
