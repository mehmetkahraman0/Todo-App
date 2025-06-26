import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../../model/Todo";

export interface TodoState {
    todos: Todo[]
}

const initialState: TodoState = {
    todos: JSON.parse(localStorage.getItem("todos") || "[]") as Todo[]
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            try {
               const exTodo = state.todos.find((item) => item.todo == action.payload.todo)
                if(exTodo){
                    console.log("Todo zaten kayıtlı");
                    return;
                }
                else if (action.payload.todo != "" || null) {
                    state.todos.push(action.payload)
                    localStorage.setItem("todos", JSON.stringify(state.todos))
                    console.log("todo eklendi")
                }
                else {
                    console.log("Bütün degerlerini giriniz.")
                    return;
                }
            } catch (err) {
                console.log(err)
            }
        },
        deleteTodo: (state, action: PayloadAction<Todo>) => {
            const exTodo = state.todos.find(item => item.todo == action.payload.todo)
            if (exTodo) {
                state.todos = state.todos.filter(item => item.todo !== action.payload.todo)
                localStorage.setItem("todos", JSON.stringify(state.todos))
            }
        },
        changeStatus: (state, action: PayloadAction<Todo>) => {
            const todo = state.todos.find(item => item.todo == action.payload.todo)
            if (todo) {
                todo.isOk = !todo.isOk
                localStorage.setItem("todos", JSON.stringify(state.todos))
            }
        }
    }
})

export const { addTodo, deleteTodo, changeStatus } = todoSlice.actions
export default todoSlice.reducer