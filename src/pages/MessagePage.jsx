import { useNavigate } from "react-router-dom";
import { users } from "../data/users";
import MessageInput from "./MessageInput";
import { Notes } from "../data/notes";
import { User } from "lucide-react";
import { useState } from "react";


const MessagePage = () => {
  const [show, setShow] = useState(false)
  const [inputnote, setnoteInput] = useState()
  const [storenote, setNote] = useState()
  const navigate = useNavigate();
  console.log(storenote);



  function noteinputhandler() {
    setNote(pev => [...pev, inputnote])
    setnoteInput("")
    setShow(false)
  }

  return (
    <>
      <div className="w-[400px] h-auto mx-auto  overflow-y-auto overflow-x-auto scrollbar-none  ">
        <div className="max-w-[380px] mx-auto">

          {show && (
            <div className="fixed bottom-20 z-30 flex items-start justify-center w-[400px] mx-auto">
              <div className="bg-white h-[60vh] w-[380px] rounded-2xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.25)] ">

                <div className="flex flex-col gap-4 ">
                  <input
                    type="text"
                    placeholder="Reply Your notes......."
                    value={inputnote}
                    onChange={(e) => setnoteInput(e.target.value)}

                    className="border border-gray-400 bg-white p-2 roundedn w-50px"
                  />

                  <button
                    onClick={noteinputhandler}
                    className="bg-black text-white px-4 py-2 rounded "
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => setShow(false)}
                    className="bg-black text-white px-4 py-2 rounded "
                  >
                    back
                  </button>


                </div>

              </div>
            </div>
          )}

          <div className="flex gap-6 items-end pt-3 overflow-x-auto scrollbar-none text-center">
            {Notes.map((i) => {
              const user = users.find((u) => u.id === i.userId);
              return (
                <div key={i.id}>
                  <div className="w-17 h-auto border flex flex-wrap p-1 rounded-lg  ">
                    <h1 onClick={() => setShow(true)}>{i.note.slice(0, 10)}</h1>
                  </div>
                  <div>
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-[60] h-[60] rounded-full object-cover "
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      <div className="w-[400px] h-auto mx-auto overflow-x-auto scrollbar-none z-0">
        <div className="max-w-[380px] mx-auto">
          <div className="flex justify-between pt-6">
            <h1>Message</h1>
            <h1>Requests</h1>
          </div>
        </div >
      </div >



      <div className="w-[400px] h-[500px] mx-auto overflow-y-auto pt-6 overflow-x-auto scrollbar-none z-0">
        <div className="max-w-[380px] mx-auto">
          <div className="flex flex-col ">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => navigate(`/messages/${user.id}`)}
                className="cursor-pointer "
              >
                <div className="flex gap-7 items-center pb-5  ">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover " />
                  <h2 >{user.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div >

    </>
  );
};

export default MessagePage;