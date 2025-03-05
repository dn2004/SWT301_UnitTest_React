
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface TodoFormProps {
    addTodo: (text: string) => void;
    editTodo: (updatedTodo: Todo) => void;
    todoToEdit: Todo | null;
    clearEdit: () => void;
}

export interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (todo: Todo) => void;
}
