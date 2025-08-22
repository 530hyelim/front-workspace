import { useRef } from "react";
import styles from './TodoList.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addTodo, completeTodo, deleteTodo } from "../features/todoSlice";
import type { RootState } from "../store/store";

function TodoList() {
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const addTodoBtn = () => {
        if (!inputRef.current?.value) {
            alert('값을 입력해주세요');
            return;
        }
        dispatch(addTodo(inputRef.current.value));
        inputRef.current.value = "";
    };
    const todoList = useSelector((state: RootState) => state.todo.todos);
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Todo List</h2>
            <input ref={inputRef} type="text" className={styles.input}
                placeholder="할 일을 입력하세요…" />
            <button className={styles.addBtn} onClick={addTodoBtn}>Add</button>
            <ul className={styles.list}>
                {
                    todoList.map((todo) => {
                        return (
                            <li className={styles.item} onClick={() => dispatch(completeTodo(todo.id))}>
                                <span className={`${styles.text} ${todo.completed ? styles.completed : ''}`}>
                                    {todo.text}
                                </span>
                                <button className={styles.deleteBtn} onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(deleteTodo(todo.id));
                                }}>❌</button>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}

export default TodoList;