"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  useCreateChatMutation,
  useAddMessageToChatMutation,
  useGetUsersChatListQuery,
} from "../../store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setOpenChatDrawer } from "@/store/uiSlice";
import { RootState } from "@/store/store";
import { SendHorizontal } from "lucide-react";
import { AiFillAudio } from "react-icons/ai";
import { MdAttachFile } from "react-icons/md";

interface ChatProps {
  onClose: () => void;
}

export default function Chat({ onClose }: ChatProps) {
  const MODELS = [
    { name: "Chartwright" },
    { name: "TranscriptX" },
    { name: "Redactify" },
    { name: "Validify" },
  ];

  const dispatch = useDispatch();
  const [selectedModel, setSelectedModel] = useState(MODELS[0].name);
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const chatDrawerOpen = useSelector(
    (state: RootState) => state.ui.chatDrawerOpen
  );
  const [chatStarted, setChatStarted] = useState<boolean>(false);
  const [chatId, setChatId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [createChat] = useCreateChatMutation();
  const [addMessageToChat] = useAddMessageToChatMutation();
  const [search, setSearch] = useState("");
  const { data: chatListData, isLoading: chatListLoading } =
    useGetUsersChatListQuery(undefined, { skip: !chatDrawerOpen });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    setLoading(true);
    try {
      if (!chatStarted) {
        const res = await createChat({
          model_name: selectedModel,
          message_content: input,
        }).unwrap();
        const chatMessages = res?.data?.messages || [];
        const formattedMessages = chatMessages.map((msg: any) => ({
          sender: msg.sent_by === "bot" ? "ai" : "user",
          text: msg.message_content,
        }));
        setMessages(formattedMessages);
        setChatStarted(true);
        setChatId(res?.data?.id || null);
      } else {
        if (!chatId) throw new Error("No chat ID");
        const res = await addMessageToChat({
          chat_id: chatId,
          message_content: input,
          model_name: selectedModel,
        }).unwrap();
        const chatMessages = res?.data?.messages || [];
        const formattedMessages = chatMessages.map((msg: any) => ({
          sender: msg.sent_by === "bot" ? "ai" : "user",
          text: msg.message_content,
        }));
        setMessages(formattedMessages);
      }
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: "Error: Failed to get AI response." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleTabClick = (model: string) => {
    setSelectedModel(model);
    setMessages([]);
    setChatStarted(false);
    setChatId(null);
  };

  // Filtered chat list
  const filteredChats = (chatListData?.data || []).filter(
    (chat: any) =>
      search.trim() === "" ||
      (chat.title && chat.title.toLowerCase().includes(search.toLowerCase())) ||
      (chat.messages &&
        chat.messages.some((m: any) =>
          m.message_content.toLowerCase().includes(search.toLowerCase())
        ))
  );

  return (
    <div className="w-full h-full flex flex-col  bg-white dark:bg-gray-800 relative">
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
          ${chatDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          boxShadow: chatDrawerOpen
            ? "rgba(0,0,0,0.15) 0px 0px 40px 0px"
            : undefined,
        }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
          <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
            Chat History
          </span>
          <button
            onClick={() => dispatch(setOpenChatDrawer(false))}
            className="text-gray-500 hover:text-red-500 p-2 rounded focus:outline-none"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 border-b dark:border-gray-700">
          <input
            type="text"
            className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:text-gray-100"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex-1 overflow-y-scroll p-4 space-y-3">
          {chatListLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : filteredChats.length === 0 ? (
            <div className="text-center text-gray-400">No chats found.</div>
          ) : (
            filteredChats.map((chat: any) => (
              <button
                key={chat.id}
                className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                onClick={() => {
                  if (chat.messages && chat.messages.length > 0) {
                    const model = chat.messages[0].model_name || MODELS[0].name;
                    setSelectedModel(model);
                    setMessages(
                      chat.messages.map((msg: any) => ({
                        sender: msg.sent_by === "bot" ? "ai" : "user",
                        text: msg.message_content,
                      }))
                    );
                    setChatStarted(true);
                    setChatId(chat.id);
                    dispatch(setOpenChatDrawer(false));
                  }
                }}
              >
                <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {chat.title || "Untitled Chat"}
                </div>
                <div className="text-xs text-gray-500 mt-1 truncate">
                  {chat.messages && chat.messages.length > 0
                    ? chat.messages[chat.messages.length - 1].message_content
                    : "No messages"}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {chat.timestamp
                    ? new Date(chat.timestamp).toLocaleString()
                    : ""}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
      {/* Overlay to close drawer */}
      {chatDrawerOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => dispatch(setOpenChatDrawer(false))}
        />
      )}
      {/* Tabs */}
      <div className="flex items-center justify-center gap-6 py-3.5 bg-transparent relative z-10">
        {MODELS.map((model) => {
          const isActive = selectedModel === model.name;
          return (
            <button
              key={model.name}
              onClick={() => handleTabClick(model.name)}
              className={`px-6 py-2 rounded-m font-medium transition border-[1px] focus:outline-none
                ${
                  isActive
                    ? "bg-[#3B82F6] text-white border-blue-100 shadow-lg"
                    : "bg-white border-blue-100 hover:bg-blue-50"
                }
              `}
              style={{
                minWidth: 130,
                position: "relative",
                top: isActive ? "2px" : "6px",
              }}
            >
              {model.name}
            </button>
          );
        })}
      </div>
      {/* Divider under tabs, except where active tab overlaps */}
      <div className="h-0.5 bg-blue-100 w-full absolute left-0 top-[62px] z-0" />

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2">
        {messages.length === 0 && (
          <div>
            <div className="text-gray-400 text-center lg:w-[808px] lg:mx-auto">
              <h1 className="text-5xl text-start font-extrabold bg-gradient-to-l from-[#2059C9] to-[#3072F0] bg-clip-text text-transparent font-montserrat">
                Hello, Md. Aminul Islam Shaons
              </h1>
              <p className="text-start font-montserrat text-2xl">
                How Can I Help You Today
              </p>
            </div>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex gap-2 px-6 py-4 border-t border-black/40 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl"
      >
        <button type="button" className="mr-2" disabled={loading}>
          <MdAttachFile size={32} color="#a8a8a8"/>
        </button>
        <input
          type="text"
          className="flex-1 h-[66px] px-2 rounded border border-black/40 focus:outline-blue-300 dark:bg-gray-900 dark:text-gray-100"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />

        <button type="button" className="" disabled={loading}>
          <AiFillAudio size={32} color="#a8a8a8"/>
        </button>
        <button type="submit" className="ml-2" disabled={loading}>
          <SendHorizontal size={32} />
        </button>
      </form>
    </div>
  );
}
