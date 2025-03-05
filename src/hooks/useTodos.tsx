import { useState } from "react";
import { toast } from "sonner";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

    const validateInput = (text: string): boolean => {
        const trimmedText = text.trim();

        if (!trimmedText) {
            toast.error("Error", { description: "Todo cannot be empty!" });
            return false;
        }

        if (trimmedText.length < 3 || trimmedText.length > 50) {
            toast.error("Error", { description: "Todo must be between 3 and 50 characters!" });
            return false;
        }

        return true;
    };

    const addTodo = (text: string) => {

        if (!validateInput(text)) return;

        setTodos([...todos, { id: Date.now(), text: text.trim(), completed: false }]);
        toast.success("Added", { description: `"${text.trim()}" added successfully!` });
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const editTodo = (updatedTodo: Todo) => {
        if(!validateInput(updatedTodo.text.trim())) return;

        setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
        setTodoToEdit(null);

        toast.info("Updated", { description: `"${updatedTodo.text}" has been updated.` });
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));


        if (todoToEdit && todoToEdit.id === id) {
            setTodoToEdit(null);
        }

        toast.error("Deleted", { description: "Todo was removed." });

    };


    return { addTodo, todoToEdit, todos, toggleTodo, deleteTodo, editTodo, setTodoToEdit };
}
