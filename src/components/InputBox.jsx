// import React, { useCallback } from "react";
import { useEffect, useState } from "react";

function InputBox() {
    const getLocalData = () => {
        const lists = localStorage.getItem("myTodo");
        if (lists) {
            return JSON.parse(lists);
        } else {
            return [];
        }
    };
    const [input, setInput] = useState("");
    const [task, setTask] = useState(getLocalData());
    const [showPrevious, setShowPrevious] = useState(true);
    const [editToggle, setEditToggle] = useState(false);
    const [getId, setGetId] = useState("");
    let [checkShow, setCheckShow] = useState(true);

    const addTask = () => {
        if (input.trim() === "") return;
        if (editToggle) {
            setTask(
                task.map((ele) => {
                    if (ele.id == getId) {
                        return { ...ele, text: input };
                    }
                    return ele;
                })
            );
            setInput("");
            setEditToggle(false);
        } else {
            setTask([...task, { id: Date.now().toString(36), text: input, completed: false }]);
        }

        setInput("");
    };
    const toggleTask = (id) => {
        setTask(task.map((tasks) => (tasks.id === id ? { ...tasks, completed: !tasks.completed } : tasks)));
    };

    const deleteItem = (keyId) => {
        const updateItem = task.filter((currElem) => {
            return currElem.id != keyId;
        });
        console.log(updateItem);
        setTask(updateItem);
    };

    const editTask = (id) => {
        setGetId(id);
        addTask(id);
    };

    useEffect(() => {
        localStorage.setItem("myTodo", JSON.stringify(task));
    }, [task]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">To-Do List</h2>

                <div className="flex mb-4">
                    <input type="text" value={input} className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add a new task..." onChange={(e) => setInput(e.target.value)} />
                    <button className="bg-blue-500 text-white px-4 py-2 mx-2 cursor-pointer rounded-r-lg hover:bg-blue-600" onClick={addTask}>
                        Add
                    </button>
                </div>

                <ul className="space-y-3">
                    <div className="flex gap-5">
                        <input type="checkbox" checked={!showPrevious} onChange={() => setShowPrevious((prev) => !prev)} />
                        <span>Show Previous Tasks</span>
                    </div>
                    {task.map((ele) => (
                        <li key={ele.id} className={`flex items-center justify-between p-3 bg-gray-200 rounded-lg ${ele.completed ? "line-through opacity-50" : ""} ${showPrevious && ele.completed ? "hidden" : ""}`}>
                            <div className="flex gap-2">
                                <input type="checkbox" checked={ele.completed} onChange={() => toggleTask(ele.id)} />
                                <span className={`text-gray-800 outline-0 ${checkShow ? "" : "opacity-50"}`} contentEditable={!checkShow && true} suppressContentEditableWarning={!checkShow && true}>
                                    {ele.text}
                                </span>
                            </div>

                            <div className="flex gap-5">
                                {/* edit button */}
                                <span
                                    className={`cursor-pointer text-right`}
                                    onClick={(e) => {
                                        editTask(ele.id);
                                        setEditToggle((prev) => !prev);
                                        setCheckShow((prev) => !prev);
                                        setInput(e.target.closest("li").querySelector("span").innerText);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-200 hover:text-green-600 shadow-green-500" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm18.71-11.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0L15.34 4.66l3.75 3.75 2.62-2.62z" />
                                    </svg>
                                </span>

                                {/* delete button  */}
                                <span
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.currentTarget.parentElement.classList.toggle("line-through");
                                        deleteItem(ele.id);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="transition-colors duration-200 hover:text-red-600"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                                        <path d="M10 11v6"></path>
                                        <path d="M14 11v6"></path>
                                        <path d="M9 6V3h6v3"></path>
                                    </svg>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default InputBox;
