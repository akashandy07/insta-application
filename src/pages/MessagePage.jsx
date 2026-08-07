import { useNavigate } from "react-router-dom";
import { users } from "../data/users";
import MessageInput from "./MessageInput";
import { Notes } from "../data/notes";
import { User } from "lucide-react";


const MessagePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-[500px] h-auto mx-auto  overflow-y-auto overflow-x-auto scrollbar-none  ">
        <div className="max-w-[410px] mx-auto">

          <div className="flex gap-6 items-end pt-3 overflow-x-auto scrollbar-none text-center">
            {Notes.map((i) => {
              const user = users.find((u) => u.id === i.userId);
              return (
                <div key={i.id}>
                  <div className="w-17 h-auto border flex flex-wrap p-1 rounded-lg  ">
                    <h1>{i.note.slice(0,10)}</h1>
                  </div>
                  <div>
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-[12] h-[12] rounded-full object-cover "
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      <div className="w-[500px] h-auto mx-auto overflow-x-auto scrollbar-none">
        <div className="max-w-[410px] mx-auto">
          <div className="flex justify-between pt-6">
            <h1>Message</h1>
            <h1>Requests</h1>
          </div>
        </div >
      </div >



      <div className="w-[500px] h-[500px] mx-auto overflow-y-auto pt-6 overflow-x-auto scrollbar-none">
        <div className="max-w-[410px] mx-auto">
          <div className="flex flex-col ">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => navigate(`/messages/${user.id}`)}
                className="cursor-pointer "
              >
                <div className="flex gap-4 items-center pb-5  ">
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