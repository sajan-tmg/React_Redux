import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    tasks: [
        "Buy milk",
        "Go swimming"
    ],

}

// Creating Slice
export const taskReducers = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask(state, action) {
            state.tasks.push(action.payload)
        },
        deleteTask(state, action) {
            state.tasks = state.tasks.filter((currTask, index) => index !== action.payload)
        }
    },
})

// Since, action creators are inside the actions object
export const {addTask, deleteTask} = taskReducers.actions;