import { renderHook, act } from "@testing-library/react";
import { useTodos }  from "../hooks/useTodos";

describe("useTodos Hook", () => {
    test("adds a new todo", () => {
        // Arrange
        const { result } = renderHook(() => useTodos());

        // Act
        act(() => {
            result.current.addTodo("New Task");
        });

        // Assert
        expect(result.current.todos).toHaveLength(1);
        expect(result.current.todos[0].text).toBe("New Task");
    });

    test("does not add a new todo if the text is empty", () => {
        // Arrange
        const { result } = renderHook(() => useTodos());

        // Act
        act(() => {
            result.current.addTodo(""); // Empty string
        });

        // Assert
        expect(result.current.todos).toHaveLength(0);
    });

    test("does not add a new todo if the text length is under 3", () => {
        // Arrange
        const { result } = renderHook(() => useTodos());

        // Act
        act(() => {
            result.current.addTodo("12"); // Less than 3 characters
        });

        // Assert
        expect(result.current.todos).toHaveLength(0);
    });

    test("toggles a todo's completed state", () => {
        // Arrange
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("Toggle Task");
        });

        const todoId = result.current.todos[0].id;

        // Act (toggle completed)
        act(() => {
            result.current.toggleTodo(todoId);
        });

        // Assert (should be completed)
        expect(result.current.todos[0].completed).toBe(true);

        // Act (toggle back to incomplete)
        act(() => {
            result.current.toggleTodo(todoId);
        });

        // Assert (should be incomplete)
        expect(result.current.todos[0].completed).toBe(false);
    });

    test("edits a todo", () => {
        // Arrange
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("Original Task");
        });

        const todoId = result.current.todos[0].id;

        // Act
        act(() => {
            result.current.editTodo({ id: todoId, text: "Updated Task", completed: false });
        });

        // Assert
        expect(result.current.todos[0].text).toBe("Updated Task");
        expect(result.current.todos[0].completed).toBe(false);
    });

    test("does not edit a todo if new text is empty", () => {
        // Arrange
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("Task to Edit");
        });

        const todoId = result.current.todos[0].id;

        // Act (attempt to edit with empty text)
        act(() => {
            result.current.editTodo({ id: todoId, text: "", completed: false });
        });

        // Assert (should remain unchanged)
        expect(result.current.todos[0].text).toBe("Task to Edit");
    });

    test("deletes a todo", () => {
        // Arrange
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("Delete Task");
        });

        const todoId = result.current.todos[0].id;

        // Act
        act(() => {
            result.current.deleteTodo(todoId);
        });

        // Assert
        expect(result.current.todos).toHaveLength(0);
    });

    test("clears todoToEdit when the edited todo is deleted", () => {
        // Arrange
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("Task to be deleted");
        });

        const todoId = result.current.todos[0].id;

        act(() => {
            result.current.setTodoToEdit(result.current.todos[0]);
        });

        // Act (delete the todo being edited)
        act(() => {
            result.current.deleteTodo(todoId);
        });

        // Assert
        expect(result.current.todoToEdit).toBeNull();
        expect(result.current.todos).toHaveLength(0);
    });

    test("sets a todo to be edited", () => {
        // Arrange
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo("Task to Edit");
        });

        const todo = result.current.todos[0];

        // Act
        act(() => {
            result.current.setTodoToEdit(todo);
        });

        // Assert
        expect(result.current.todoToEdit).toEqual(todo);
    });
});
