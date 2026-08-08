import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { users } from "../data/users";
import MessagePage from "./MessagePage";
import { PhoneCallIcon } from "lucide-react";
import { VideoIcon } from "lucide-react";

const MessageInput = () => {
  const { id } = useParams();
  const user = users.find((u) => u.id === Number(id));
  console.log(user);
  console.log(id);
  console.log(Number(id));
  console.log(users);




  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);  // ✅ Add this

  // ✅ Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function messageHandler() {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, input]);
    setInput("");
  }

  return (
    <>
      <div className="w-[400px] mx-auto pt-4 h-[100vh] flex flex-col relative z-10 ">
        {/* Messages - scrollable */}
        <div className="flex-1 overflow-y-auto ">
          <div className="max-w-[380px] mx-auto">
            <div className="flex gap-4 items-center justify-between   ">
              <div className="flex items-center gap-3">
                <div>
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div>
                  <h1 className="font-semibold">{user?.name}</h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                  <PhoneCallIcon size={22} />
                </button>

                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                  <VideoIcon size={22} />
                </button>
              </div>
            </div>



            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-blue-500 text-white p-2 rounded-lg w-fit ml-auto mb-3"
                >
                  {msg}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center mt-40">No messages yet</p>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input - sticky */}
        <div className="sticky bottom-20  bg-white pt-3 w-[400px] mx-auto">
          <div className="w-[400px] mx-auto">
            <div className="max-w-[380px] mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && messageHandler()}
                  className="flex-1 border rounded-lg px-3 py-2 outline-none "
                />
                <button
                  onClick={messageHandler}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      
    </>
  );
};

export default MessageInput;