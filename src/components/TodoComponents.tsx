import { useDispatch } from "react-redux";
import type { Todo } from "../model/Todo"
import { changeStatus, deleteTodo } from "../redux/features/todoSlice";
import { MdDeleteOutline, MdCancel, MdCheckCircle } from "react-icons/md";

type TodoProps = {
    todo: Todo
}

const TodoComponents = ({ todo }: TodoProps) => {

    const dispatch = useDispatch()

    const deleteButton = () => {
        dispatch(deleteTodo(todo))
    }
    const isOkButton = () => {
        dispatch(changeStatus(todo))
    }

    return (
        <div className="flex flex-row justify-between max-w-[650px] bg-white p-2  mt-3 rounded-2xl">
            <div className="flex flex-row justify-center">
                <p className="w-[350px]">{todo.isOk ? <s>{todo.todo}</s> : todo.todo}</p>
                <p className="mr-2 text-sm">{todo.date}</p>
                <p className="text-sm">{todo.time}</p>
            </div>
            <div className="w-[100px] flex flex-row justify-evenly">
                <button className="text-xl" onClick={isOkButton}>{todo.isOk ? <MdCancel /> : <MdCheckCircle />}</button>
                <button className="text-xl" onClick={deleteButton}><MdDeleteOutline /></button>
            </div>
        </div>
    )
}

export default TodoComponents;