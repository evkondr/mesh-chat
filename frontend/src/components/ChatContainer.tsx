import useChatStore from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";

const ChatContainer = () => {
  const { messages, isMessagesLoading, selectedUser } = useChatStore();
  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">{selectedUser?.fullName}</div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName || ''} />
        )}
      </div>
    </>
  );
};

export default ChatContainer;