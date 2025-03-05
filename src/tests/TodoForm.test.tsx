import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoForm from "../components/TodoForm";



describe("TodoForm Component", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renders input field and buttons", () => {
        // Arrange
        render(<TodoForm addTodo={jest.fn()} editTodo={jest.fn()} todoToEdit={null} clearEdit={jest.fn()} />);

        // Act: No user action needed

        // Assert
        expect(screen.getByTestId("todo-input")).toBeInTheDocument();
        expect(screen.getByTestId("todo-submit-btn")).toBeInTheDocument();
    });

    test("updates input when typing", () => {
        // Arrange
        render(<TodoForm addTodo={jest.fn()} editTodo={jest.fn()} todoToEdit={null} clearEdit={jest.fn()} />);
        const input = screen.getByTestId("todo-input");

        // Act
        fireEvent.change(input, { target: { value: "New Todo" } });

        // Assert
        expect(input).toHaveValue("New Todo");
    });

    test("calls addTodo when submitting a valid new todo", () => {
        // Arrange
        const mockAddTodo = jest.fn();
        render(<TodoForm addTodo={mockAddTodo} editTodo={jest.fn()} todoToEdit={null} clearEdit={jest.fn()} />);
        const input = screen.getByTestId("todo-input");
        const submitButton = screen.getByTestId("todo-submit-btn");

        // Act
        fireEvent.change(input, { target: { value: "Learn TypeScript" } });
        fireEvent.click(submitButton);

        // Assert
        expect(mockAddTodo).toHaveBeenCalledWith("Learn TypeScript");
    });

    test("pre-fills input when editing a todo", () => {
        // Arrange
        const mockTodo = { id: 1, text: "Edit this todo", completed: false };
        render(<TodoForm addTodo={jest.fn()} editTodo={jest.fn()} todoToEdit={mockTodo} clearEdit={jest.fn()} />);
        const input = screen.getByTestId("todo-input");

        // Act: No user action needed

        // Assert
        expect(input).toHaveValue("Edit this todo");
    });

    test("calls editTodo when submitting an edit", () => {
        // Arrange
        const mockEditTodo = jest.fn();
        const mockTodo = { id: 1, text: "Existing Todo", completed: false };
        render(<TodoForm addTodo={jest.fn()} editTodo={mockEditTodo} todoToEdit={mockTodo} clearEdit={jest.fn()} />);
        const input = screen.getByTestId("todo-input");
        const submitButton = screen.getByTestId("todo-submit-btn");

        // Act
        fireEvent.change(input, { target: { value: "Updated Todo" } });
        fireEvent.click(submitButton);

        // Assert
        expect(mockEditTodo).toHaveBeenCalledWith({ ...mockTodo, text: "Updated Todo" });
    });
});
