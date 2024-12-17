import {applyMiddleware, createStore} from 'redux'
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

// defining  initiall state for the store
const initialState = {
    tasks: [
        "Buy milk",
        "Go swimming"
    ],
}

// naming our actions
const ADD_TASK = 'task/add';
const DELETE_TASK = 'task/delete';
const FETCH_TASKS = 'task/fetch';

// defining our reducers
const taskReducers = (state = initialState, action) => {
    switch(action.type)
    {
        case ADD_TASK:
            return {
                ...state, 
                tasks: [...state.tasks, action.payload.activity]
            }

        case DELETE_TASK:
            // we will be using index of item in the array as the id
            const updatedTask = state.tasks.filter((currTask, currIndex) => {
               return currIndex != action.payload;
            });

            console.log(updatedTask);
            return {
                ...state,
                tasks: updatedTask
                // tasks: [updatedTask]  : actually causes array to be stored inside an array as updated task is already an array because filiter returns an array

            };

        case FETCH_TASKS:   // case for fetching data using API and handling using Redux Thunk middleware
            return {
                ...state,
                tasks: [...state.tasks, ...action.payload]
            };

        default:
            return state;
    }


}

// Creating action creators 
export const addTask = (activity) => {
    return {
        type: ADD_TASK,
        payload: {
            activity: activity,
        }
    }
}

export const deleteTask = (id) => {
    return {
        type: DELETE_TASK,
        payload: id  // to delete a task we only need the id  
    }
}

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


// Creating our store
// createStore takes a reducer as argument hence we defined our reducer above first
const store = createStore(taskReducers, composeWithDevTools(
    applyMiddleware(thunk)
));

console.log("hello");
export default store;