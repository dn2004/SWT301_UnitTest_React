import React from "react";
import {Pencil, Trash2, CheckCircle, Circle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TodoItemProps} from "../types/todo";

const TodoItem: React.FC<TodoItemProps> = ({todo, onToggle, onDelete, onEdit}) => {
    return (
        <div
            className="flex flex-col sm:flex-row items-center sm:justify-between p-3 border rounded-lg bg-gray-50 shadow gap-y-2 sm:gap-0"
            data-testid={`todo-item-${todo.id}`}>

            <div className="flex items-start gap-x-3 w-full cursor-pointer"
                 onClick={() => onToggle(todo.id)}
                 data-testid={`todo-toggle-${todo.id}`}>

                {todo.completed ? (
                    <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0"/>
                ) : (
                    <Circle className="text-gray-400 w-6 h-6 flex-shrink-0"/>
                )}
                <span className="max-w-full break-words sm:max-w-xs flex-grow text-gray-700">
                    {todo.text}
                </span>
            </div>


            <div className="flex gap-3 justify-center sm:justify-end w-full sm:w-auto">
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 hover:bg-gray-200 rounded-full"
                    onClick={() => onEdit(todo)}
                    aria-label="Edit"
                    data-testid={`todo-edit-${todo.id}`}>
                    <Pencil className="w-5 h-5 text-gray-600"/>
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 hover:bg-red-100 rounded-full"
                    onClick={() => onDelete(todo.id)}
                    aria-label="Delete"
                    data-testid={`todo-delete-${todo.id}`}>
                    <Trash2 className="w-5 h-5 text-red-500"/>
                </Button>
            </div>
        </div>

    );
};

export default TodoItem;
