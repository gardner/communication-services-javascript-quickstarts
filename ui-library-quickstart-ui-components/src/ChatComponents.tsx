import {
  MessageThread,
  ChatMessage as WebUiChatMessage,
  SendBox,
  DEFAULT_COMPONENT_ICONS,
  MessageContentType,
  MessageStatus,
} from "@azure/communication-react";
import React, { useEffect } from "react";
import { registerIcons } from "@fluentui/react";
import { useMessageHistory } from "./ChatAPI";
import { GetHistoryChatMessages } from "./samplechat";

export const ChatComponents = () => {
  const [messages, sendMessage] = useMessageHistory<WebUiChatMessage>(
    GetHistoryChatMessages()
  );

  useEffect(() => {
    registerIcons({ icons: DEFAULT_COMPONENT_ICONS });
  }, []);

  return (
    <>
      {/* Chat thread component with message status indicator feature enabled */}
      <MessageThread
        userId={"1"}
        messages={messages}
        showMessageStatus={true}
      />

      <SendBox
        disabled={false}
        onSendMessage={async (content: string) => {
          const newMessage: WebUiChatMessage = {
            messageType: "chat",
            contentType: "text" as MessageContentType,
            senderId: "1",
            senderDisplayName: "User1",
            messageId: Math.random().toString(),
            content,
            createdOn: new Date(),
            mine: true,
            attached: false,
            status: "seen" as MessageStatus,
          };
          sendMessage(newMessage);
          return;
        }}
        onTyping={async () => {
          console.log("=== = TYPING - ");
          return;
        }}
      />
    </>
  );
};
