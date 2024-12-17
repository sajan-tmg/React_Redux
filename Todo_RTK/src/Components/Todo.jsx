import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../store";

function Todo()
{
    const tasks = useSelector(state => state.taskReducers.tasks);    // retrieving the tasks array from state inside taskReducers explicitly

    // To display all todoTasks we need to access the store and retrieve the task[] array
    /* 
        Since App is wrapped by the provider the store will be accessible to App and all its chidren components.
        Todo is wrapped inside the App component so it also has access to the store.
        Hence, calling the useSelector hook returns the whole state of the store 
    */

    const [task, setTask] = useState("");
    const dispatch = useDispatch(); // dispatch hook

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTask(task));    // addTask is imported from store.js
        setTask("");    // clear the input field as value of local state task is used as value for input field
    }

    const handleDelete = (index) => {
        dispatch(deleteTask(index));
    }

    

    const handleFetchTasks = () => {
        dispatch(fetchTasks());
    }
    return (
        <>
         <div className="TodoContainer">
            <h1>To do List App</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder="Add a task"
                value={task} /* current value of task will be displayed in the input field */
                onChange={(e) => setTask(String(e.target.value))}
                />
                <button>Add a task</button>
            </form>

            <button onClick={handleFetchTasks}>Fetch Task</button>

            <div>
                <ul id="allTodoList">
                    {
                        tasks.map((task, index) => {
                            return (
                                    <li key={index}>
                                        <p>{index}: {task}</p>
                                        <button onClick={() =>handleDelete(index)}>Delete</button>
                                    </li>
                            )
                        })
                    }
                </ul>
            </div>
         </div>
        </>

    )
}

export default Todo;

