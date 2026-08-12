import { useNavigate } from "react-router-dom";
import { users } from "../data/users";
import { Notes } from "../data/notes";
import { useState } from "react";

import akash from "../assets/akash.jpeg";

const MessagePage = () => {

    const [show, setShow] = useState(false);

    // My Note input
    const [inputnote, setnoteInput] = useState("");

    // Store newly created notes
    const [storenote, setNote] = useState([]);

    const [input, setInput] = useState("");

    const navigate = useNavigate();

    // ==========================================
    // GET STORED USER
    // ==========================================

    const savedUser =
        localStorage.getItem("user");

    let storedUser = {};

    try {

        storedUser = savedUser
            ? JSON.parse(savedUser)
            : {};

    } catch (error) {

        storedUser = {};

    }

    // ==========================================
    // DEFAULT AVATAR
    // ==========================================

    const myAvatar =
        storedUser?.avatar || akash;

    // ==========================================
    // STORED NOTES
    // ==========================================

    const myNotes =
        JSON.parse(
            localStorage.getItem("notes")
        ) || [];

    // ==========================================
    // POST MY NOTE
    // ==========================================

    function noteinputhandler() {

        if (!inputnote.trim()) return;

        const newNote = {
            id: Date.now(),
            note: inputnote,
        };

        setNote((prev) => [
            ...prev,
            newNote,
        ]);

        setnoteInput("");

        setShow(false);
    }

    // ==========================================
    // MESSAGE NOTE
    // ==========================================

    function mtnotehandler() {

        if (!input.trim()) return;

        setNote((prev) => [
            ...prev,
            input,
        ]);

        setInput("");
    }

    return (
        <>

            {/* ========================================= */}
            {/* NOTES */}
            {/* ========================================= */}

            <div className="w-full max-w-[400px] h-auto mx-auto overflow-y-auto overflow-x-hidden scrollbar-none">

                <div className="w-[calc(100%-20px)] max-w-[380px] mx-auto">

                    {/* ========================================= */}
                    {/* NOTES REPLY POPUP */}
                    {/* ========================================= */}

                    {show && (

                        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/30">

                            <div className="bg-gray-100 h-[70vh] w-full max-w-[380px] pt-20 shadow-lg rounded-t-3xl">

                                <div className="flex flex-col gap-4 p-8">

                                    <h2 className="text-base sm:text-lg font-bold">
                                        Add Note
                                    </h2>


                                    {/* INPUT */}

                                    <input
                                        type="text"
                                        placeholder="Write your note..."
                                        value={inputnote}
                                        onChange={(e) =>
                                            setnoteInput(
                                                e.target.value
                                            )
                                        }
                                        className="border border-gray-400 bg-white p-2 rounded text-sm sm:text-base outline-none"
                                    />


                                    {/* POST */}

                                    <button
                                        onClick={
                                            noteinputhandler
                                        }
                                        className="bg-black text-white px-4 py-2 rounded text-sm sm:text-base"
                                    >
                                        Post
                                    </button>


                                    {/* BACK */}

                                    <button
                                        onClick={() =>
                                            setShow(false)
                                        }
                                        className="bg-black text-white px-4 py-2 rounded text-sm sm:text-base"
                                    >
                                        Back
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}


                    {/* ========================================= */}
                    {/* MY NOTE + OTHER NOTES */}
                    {/* ========================================= */}

                    <div className="flex gap-5 sm:gap-6 items-end pt-4 overflow-x-auto scrollbar-none text-center">


                        {/* ================================= */}
                        {/* MY NOTE */}
                        {/* ================================= */}

                        <div className="min-w-[80px] flex-shrink-0">

                            {/* MY NOTE INPUT */}

                            <div
                                onClick={() =>
                                    setShow(true)
                                }
                                className="w-[80px] min-h-[35px] border border-gray-300 p-1 rounded-lg cursor-pointer bg-white"
                            >

                                <h1 className="text-xs sm:text-sm truncate">

                                    {storenote.length > 0
                                        ? storenote[
                                            storenote.length - 1
                                        ]?.note

                                        : myNotes.length > 0

                                            ? myNotes[
                                                myNotes.length - 1
                                            ]?.note ||

                                            myNotes[
                                                myNotes.length - 1
                                            ]

                                            : "Add note"}

                                </h1>

                            </div>


                            {/* MY AVATAR */}

                            <img
                                src={myAvatar}
                                alt={
                                    storedUser?.username ||
                                    "Profile"
                                }
                                className="w-[60px] h-[60px] mt-2 mx-auto rounded-full object-cover"
                            />


                            {/* MY NAME */}

                            <p className="text-xs sm:text-sm mt-1 truncate">

                                {storedUser?.name ||
                                    storedUser?.username ||
                                    "Your Name"}

                            </p>

                        </div>


                        {/* ================================= */}
                        {/* OTHER USERS NOTES */}
                        {/* ================================= */}

                        {Notes.map((i) => {

                            const user =
                                users.find(
                                    (u) =>
                                        u.id === i.userId
                                );

                            return (

                                <div
                                    key={i.id}
                                    className="min-w-[80px] flex-shrink-0"
                                >

                                    {/* NOTE */}

                                    <div
                                        onClick={() =>
                                            setShow(true)
                                        }
                                        className="w-[80px] min-h-[35px] border border-gray-300 p-1 rounded-lg cursor-pointer bg-white"
                                    >

                                        <h1 className="text-xs sm:text-sm truncate">

                                            {i.note?.slice(
                                                0,
                                                10
                                            )}

                                        </h1>

                                    </div>


                                    {/* AVATAR */}

                                    <img
                                        src={
                                            user?.avatar ||
                                            akash
                                        }
                                        alt={
                                            user?.name ||
                                            "User"
                                        }
                                        className="w-[60px] h-[60px] mt-2 mx-auto rounded-full object-cover"
                                    />


                                    {/* NAME */}

                                    <p className="text-xs sm:text-sm mt-1 truncate">

                                        {user?.name ||
                                            "User"}

                                    </p>

                                </div>

                            );

                        })}

                    </div>

                </div>

            </div>


            {/* ========================================= */}
            {/* MESSAGE / REQUEST */}
            {/* ========================================= */}

            <div className="w-full max-w-[400px] h-auto mx-auto overflow-x-hidden scrollbar-none">

                <div className="w-[calc(100%-20px)] max-w-[380px] mx-auto">

                    <div className="flex justify-between pt-8">

                        <h1 className="text-sm sm:text-base font-semibold">
                            Message
                        </h1>

                        <h1 className="text-sm sm:text-base font-semibold">
                            Requests
                        </h1>

                    </div>

                </div>

            </div>


            {/* ========================================= */}
            {/* USER MESSAGE LIST */}
            {/* ========================================= */}

            <div className="w-full max-w-[400px] h-[500px] mx-auto overflow-y-auto scrollbar-none">

                <div className="w-[calc(100%-20px)] max-w-[380px] mx-auto">

                    <div className="flex flex-col pt-8">

                        {users.map((user) => (

                            <div
                                key={user.id}
                                onClick={() =>
                                    navigate(
                                        `/messages/${user.id}`
                                    )
                                }
                                className="cursor-pointer"
                            >

                                <div className="flex gap-4 sm:gap-6 items-center pb-5">

                                    {/* ================================= */}
                                    {/* AVATAR */}
                                    {/* ================================= */}

                                    <img
                                        src={
                                            user?.avatar ||
                                            akash
                                        }
                                        alt={
                                            user?.name ||
                                            "User"
                                        }
                                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                                    />


                                    {/* ================================= */}
                                    {/* NAME */}
                                    {/* ================================= */}

                                    <h2 className="text-sm sm:text-base font-medium">

                                        {user?.name ||
                                            "User"}

                                    </h2>

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