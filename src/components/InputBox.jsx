// import React, { useCallback } from "react";
import { useRef, useState } from "react";

function InputBox() {
    const [input, setInput] = useState("");
    const [task, setTask] = useState([]);
    // const [checkAllow, setCheckAllow] = useState(false);

    const addTask = () => {
        if (input.trim() === "") return;
        setTask([...task, { id: new Date(), text: input }]);
        console.log(task);
        setInput("");
    };
    let a = useRef(null);
    // useEffect(() => {
    //     // console.log(a.current);
    // }, [a]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">To-Do List</h2>

                <div className="flex mb-4">
                    <input type="text" className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} />
                    <button className="bg-blue-500 text-white px-4 py-2 mx-2 cursor-pointer rounded-r-lg hover:bg-blue-600" onClick={addTask}>
                        Add
                    </button>
                </div>

                <ul className="space-y-3">
                    {task.map((ele) => (
                        <li key={ele.id} className={`flex items-center justify-between p-3 bg-gray-200 rounded-lg `} ref={a}>
                            <span className="text-gray-800 ">{ele.text}</span>
                            <input className="text-red-500  hover:text-red-600" type="checkbox" onChange={() => a.current.classList.toggle("line-through")} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default InputBox;
