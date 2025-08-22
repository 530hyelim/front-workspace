import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../type/todo";

const todoSlice = createSlice({
    name : 'todo',
    initialState : initialState,
    reducers : {
        addTodo : (state, action) => {
            let newId = Math.max(...state.todos.map((todo) => todo.id));
            if (newId == -Infinity) newId = 0;
            state.todos.push({
                id : newId + 1,
                text : action.payload,
                completed : false
            });
        },
        completeTodo : (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo : (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            return {todos : state.todos.filter((t) => t.id != todo?.id)};
        }
    }
});

export const {addTodo, completeTodo, deleteTodo} = todoSlice.actions; 
export default todoSlice.reducer;