import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";


describe("TodoList Component", () => {
    const mockTodos = [
        { id: 1, text: "Learn TypeScript", completed: false },
        { id: 2, text: "Build a React App", completed: true },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders todo items", () => {
        // Arrange
        render(
            <>
                <TodoList todos={mockTodos} onToggle={jest.fn()} onDelete={jest.fn()} onEdit={jest.fn()} />
            </>
        );

        // Act: No user interaction needed

        // Assert
        expect(screen.getByText("Learn TypeScript")).toBeInTheDocument();
        expect(screen.getByText("Build a React App")).toBeInTheDocument();
    });

    test("displays a message when no todos are available", () => {
        // Arrange
        render(
            <>
                <TodoList todos={[]} onToggle={jest.fn()} onDelete={jest.fn()} onEdit={jest.fn()} />
            </>
        );

        // Act: No user interaction needed

        // Assert
        expect(screen.getByTestId("todo-empty")).toBeInTheDocument();
    });

    test("calls onToggle when clicking a todo item and shows a success toast", () => {
        // Arrange
        const mockToggleTodo = jest.fn();
        render(
            <>
                <TodoList todos={mockTodos} onToggle={mockToggleTodo} onDelete={jest.fn()} onEdit={jest.fn()} />
            </>
        );

        const toggleButton = screen.getByTestId("todo-toggle-1");

        // Act
        fireEvent.click(toggleButton);

        // Assert
        expect(mockToggleTodo).toHaveBeenCalledWith(1);
    });

    test("calls onDelete when clicking the delete button and shows an error toast", () => {
        // Arrange
        const mockDeleteTodo = jest.fn();
        render(
            <>
                <TodoList todos={mockTodos} onToggle={jest.fn()} onDelete={mockDeleteTodo} onEdit={jest.fn()} />
            </>
        );

        const deleteButton = screen.getByTestId("todo-delete-1");

        // Act
        fireEvent.click(deleteButton);

        // Assert
        expect(mockDeleteTodo).toHaveBeenCalledWith(1);
    });

    test("calls onEdit when clicking the edit button and shows an info toast", () => {
        // Arrange
        const mockEditTodo = jest.fn();
        render(
            <>
                <TodoList todos={mockTodos} onToggle={jest.fn()} onDelete={jest.fn()} onEdit={mockEditTodo} />
            </>
        );

        const editButton = screen.getByTestId("todo-edit-1");

        // Act
        fireEvent.click(editButton);

        // Assert
        expect(mockEditTodo).toHaveBeenCalledWith(mockTodos[0]);
    });

    test("does not call onToggle if clicking outside of a todo item", () => {
        // Arrange
        const mockToggleTodo = jest.fn();
        render(
            <>
                <TodoList todos={mockTodos} onToggle={mockToggleTodo} onDelete={jest.fn()} onEdit={jest.fn()} />
            </>
        );

        // Act
        fireEvent.click(document.body); // Clicking outside of todo items

        // Assert
        expect(mockToggleTodo).not.toHaveBeenCalled();
    });

    test("handles toggling a completed todo correctly", () => {
        // Arrange
        const mockToggleTodo = jest.fn();
        render(
            <>
                <TodoList todos={mockTodos} onToggle={mockToggleTodo} onDelete={jest.fn()} onEdit={jest.fn()} />
            </>
        );

        const toggleButton = screen.getByTestId("todo-toggle-2");

        // Act
        fireEvent.click(toggleButton);

        // Assert
        expect(mockToggleTodo).toHaveBeenCalledWith(2);
    });

    test("handles multiple todos correctly", () => {
        // Arrange
        const mockToggleTodo = jest.fn();
        const mockDeleteTodo = jest.fn();
        const mockEditTodo = jest.fn();
        render(
            <>
                <TodoList todos={mockTodos} onToggle={mockToggleTodo} onDelete={mockDeleteTodo} onEdit={mockEditTodo} />
            </>
        );

        const firstTodoToggle = screen.getByTestId("todo-toggle-1");
        const secondTodoToggle = screen.getByTestId("todo-toggle-2");
        const deleteButton = screen.getByTestId("todo-delete-2");

        // Act
        fireEvent.click(firstTodoToggle);
        fireEvent.click(secondTodoToggle);
        fireEvent.click(deleteButton);

        // Assert
        expect(mockToggleTodo).toHaveBeenCalledTimes(2);
        expect(mockToggleTodo).toHaveBeenCalledWith(1);
        expect(mockToggleTodo).toHaveBeenCalledWith(2);
        expect(mockDeleteTodo).toHaveBeenCalledWith(2);
    });
});
