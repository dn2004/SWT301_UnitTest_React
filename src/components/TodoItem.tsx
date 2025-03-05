import React from "react";
import { Pencil, Trash2, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
    return (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 shadow" data-testid={`todo-item-${todo.id}`}>
            <div className="flex items-center cursor-pointer" onClick={() => onToggle(todo.id)} data-testid={`todo-toggle-${todo.id}`}>
                {todo.completed ? <CheckCircle className="text-green-500" /> : <Circle className="text-gray-400" />}
                <span className={`ml-2 ${todo.completed ? "line-through text-gray-500" : "text-gray-700"}`}>{todo.text}</span>
            </div>

            <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(todo)} aria-label="Edit" data-testid={`todo-edit-${todo.id}`}>
                    <Pencil className="w-5 h-5" />
                </Button>

                <Button variant="ghost" size="icon" onClick={() => onDelete(todo.id)} aria-label="Delete" data-testid={`todo-delete-${todo.id}`}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
            </div>
        </div>
    );
};

export default TodoItem;
