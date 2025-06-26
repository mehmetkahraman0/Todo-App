import type { Todo } from "./model/Todo"
import TodoComponents from "./components/TodoComponents"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./redux/store"
import { addTodo } from "./redux/features/todoSlice"
import { useState } from "react"
import moment from "moment"

function App() {
  const [todoText, setTodoText] = useState("")
  const [todoDate, setTodoDate] = useState(moment().format('YYYY-MM-DD'))
  const [todoTime, setTodoTime] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const todos = useSelector((state: RootState) => state.todo.todos)

  const todo: Todo = {
    todo: todoText,
    date: todoTime,
    time: todoDate,
    isOk: false,
  }

  const addButton = () => {
    dispatch(addTodo(todo))
  }

  return (
    <div className="max-w-fit min-h-[90vh] my-5 bg-blue-600 p-5 mx-auto rounded-xl">
      <div className="flex flex-col justify-between bg-white mb-7 rounded-xl">
        <input className="w-[650px] mt-2 mb-2 p-1 bg-white outline-0" value={todoText} onChange={(e) => setTodoText(e.target.value)} type="text" placeholder="Ne Planlıyorsun ?" />
        <hr />
        <div className="flex flex-row justify-between mt-2 mb-2 mx-2">
          <div className="flex flex-row gap-10">
            <input value={todoDate} onChange={(e) => setTodoDate(e.target.value)} type="date" />
            <input value={todoTime} min="00:00" max="23:59" step="60" onChange={(e) => setTodoTime(e.target.value)} type="time" />
          </div>
          <button className="text-[14px]  hover:text-blue-700 transition-all" onClick={addButton}>Ekle</button>
        </div>
      </div>
      <div className="">
        {todos.map((todo, index) => (
          <TodoComponents key={index} todo={todo} />
        ))}
      </div>
    </div>
  )
}

export default App
