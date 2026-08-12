
import { useNavigate } from "react-router-dom";
import { users } from "../data/users";
import MessageInput from "./MessageInput";
import { Notes } from "../data/notes";
import { useState } from "react";

const MessagePage = () => {
  const [show, setShow] = useState(false);
  const [inputnote, setnoteInput] = useState("");
  const [storenote, setNote] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();


  const storedUser = JSON.parse(localStorage.getItem("user"));
e
  const myNotes =
    JSON.parse(localStorage.getItem("notes")) || [];

  function noteinputhandler() {
    if (!inputnote.trim()) return;

    setNote((prev) => [...prev, inputnote]);
    setnoteInput("");
    setShow(false);
  }

  function mtnotehandler() {
    if (!input.trim()) return;

    setNote((prev) => [...prev, input]);
    setInput("");
  }


  return (
    <>
      {/* ================= NOTES ================= */}
      <div className="w-[400px] h-auto mx-auto overflow-y-auto overflow-x-auto scrollbar-none">
        <div className="max-w-[380px] mx-auto">

          {/* Notes Reply Popup */}
          {show && (
            <div className="fixed bottom-18 flex items-end justify-center z-30">
              <div className="bg-gray-100 h-[70vh] w-[380px] pt-20 shadow-lg rounded-3xl">

                <div className="flex flex-col gap-4 p-10">

                  <input
                    type="text"
                    placeholder="Reply Your notes......."
                    value={inputnote}
                    onChange={(e) =>
                      setnoteInput(e.target.value)
                    }
                    className="border border-gray-400 bg-white p-2 rounded"
                  />

                  <button
                    onClick={noteinputhandler}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Reply
                  </button>

                  <button
                    onClick={() => setShow(false)}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Back
                  </button>

                </div>
              </div>
            </div>
          )}

          {/* ================= MY NOTE + OTHER NOTES ================= */}
          <div className="flex gap-6 items-end pt-4 overflow-x-auto scrollbar-none text-center">

            {/* ================= MY NOTE ================= */}
            <div className="min-w-[80px]">

              {/* My Note */}
              <div
                onClick={() => setShow(true)}
                className="w-[80px] min-h-[35px] border p-1 rounded-lg cursor-pointer"
              >
                <h1 className="text-sm truncate">
                  {myNotes.length > 0
                    ? myNotes[myNotes.length - 1]?.note ||
                    myNotes[myNotes.length - 1]
                    : "Add note"}
                </h1>
              </div>

              {/* My Avatar */}
              <img
                src={storedUser?.avatar}
                alt={storedUser?.username}
                className="w-[60px] h-[60px] mt-2 mx-auto rounded-full object-cover"
              />

              {/* My Name */}
              <p className="text-sm mt-1 truncate">
                {storedUser?.name || storedUser?.username}
              </p>

            </div>

            {/* ================= OTHER USERS NOTES ================= */}
            {Notes.map((i) => {
              const user = users.find(
                (u) => u.id === i.userId
              );

              return (
                <div
                  key={i.id}
                  className="min-w-[80px]"
                >

                  {/* Note */}
                  <div
                    onClick={() => setShow(true)}
                    className="w-[80px] min-h-[35px] border p-1 rounded-lg cursor-pointer"
                  >
                    <h1 className="text-sm truncate">
                      {i.note.slice(0, 10)}
                    </h1>
                  </div>

                  {/* Avatar */}
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-[60px] h-[60px] mt-2 mx-auto rounded-full object-cover"
                  />

                  {/* Name under avatar */}
                  <p className="text-sm mt-1 truncate">
                    {user?.name}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* ================= MESSAGE / REQUEST ================= */}
      <div className="w-[400px] h-auto mx-auto overflow-x-auto scrollbar-none overflow-y-auto">
        <div className="max-w-[380px] mx-auto">

          <div className="flex justify-between pt-8">
            <h1>Message</h1>
            <h1>Requests</h1>
          </div>

        </div>
      </div>

      {/* ================= USER MESSAGE LIST ================= */}
      <div className="w-[400px] h-[500px] mx-auto overflow-y-auto  scrollbar-none">
        <div className="max-w-[380px] mx-auto">

          <div className="flex flex-col pt-8">

            {users.map((user) => (
              <div
                key={user.id}
                onClick={() =>
                  navigate(`/messages/${user.id}`)
                }
                className="cursor-pointer"
              >

                <div className="flex gap-6 items-center pb-5">

                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  <h2>{user.name}</h2>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>


    </>
  );
};

export default MessagePage;

