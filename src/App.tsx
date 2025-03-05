import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Toaster } from "sonner";
import { useTodos } from "./hooks/useTodos";
import './App.css';

const App: React.FC = () => {
    const { todos, addTodo, editTodo, deleteTodo, toggleTodo, todoToEdit, setTodoToEdit } = useTodos();

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border">
            <Toaster />
            <h1 className="text-2xl font-bold text-center text-gray-700">Todo List</h1>

            <TodoForm addTodo={addTodo} editTodo={editTodo} todoToEdit={todoToEdit} clearEdit={() => setTodoToEdit(null)} />

            <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={setTodoToEdit} />
        </div>
    );
};

export default App;
