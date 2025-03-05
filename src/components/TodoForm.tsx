import React, { useEffect, useState } from "react";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoFormProps {
    addTodo: (text: string) => void;
    editTodo: (updatedTodo: Todo) => void;
    todoToEdit: Todo | null;
    clearEdit: () => void;
}



const TodoForm: React.FC<TodoFormProps> = ({ addTodo, editTodo, todoToEdit, clearEdit }) => {
    const [text, setText] = useState("");

    useEffect(() => {
        setText(todoToEdit ? todoToEdit.text : "");
    }, [todoToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (todoToEdit) {
            editTodo({ ...todoToEdit, text });
        } else {
            addTodo(text);
        }
        setText("");
        clearEdit();
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 mt-4" data-testid="todo-form">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add new todo..."
                className="p-2 border rounded-lg w-full"
                data-testid="todo-input"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg" data-testid="todo-submit-btn">
                {todoToEdit ? "Update" : "Add"}
            </button>
        </form>
    );
};

export default TodoForm;
