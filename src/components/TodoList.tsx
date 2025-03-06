import React from "react";
import TodoItem from "./TodoItem";
import {TodoListProps} from "../types/todo";

const TodoList: React.FC<TodoListProps> = ({todos, onToggle, onDelete, onEdit}) => {
    return (
        <div className="mt-4 space-y-2">
            {todos.length > 0 ? (
                todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit}/>
                ))
            ) : (
                <p className="text-gray-500 text-center" data-testid="todo-empty">
                    No todos available.
                </p>
            )}
        </div>
    );
};

export default TodoList;
