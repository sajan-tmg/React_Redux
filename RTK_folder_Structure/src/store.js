
import {configureStore} from '@reduxjs/toolkit'
import { taskReducers } from './features/task/taskSlice';

// RTK method
export const store = configureStore(
    {
        reducer: {
            taskReducers: taskReducers.reducer
        },
    }
);

export default store;


export const fetchTasks = () => {
    return async (dispatch) => {
        // Note: we get access to dispatch function by default
        try {
          const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");   // limit = 3 to limit no. tasks we get as a response  
          const tasks = await res.json();  
          console.log(tasks);

        //   tasks.map(task => dispatch({type: FETCH_TASKS, payload: task.title})); // This calls dispatch three times or we can do

        dispatch({type: FETCH_TASKS, payload: tasks.map(task => task.title)});

        } catch (error) {
            console.log(error)
        }
    }
   
}


