
# React Todo List - Unit Testing

This is an SWT301 assignment.








## 📌 Project Overview

This project is a React-based Todo List application designed to demonstrate unit testing best practices using Jest and React Testing Library. The application allows users to:

✅ Add new todos

✅ Mark todos as complete/incomplete

✅ Edit existing todos

✅ Delete todos

✅ Validate input

✅ Provide responsive design & visual feedback
## 🚀 Technologies Used

* React (Functional components with Hooks)

* Jest (Unit testing framework)

* Tailwind CSS (Styling)

* shadcn/ui (Alerts & notifications)

* Lucide React (Icons)






## Component Test - Necessary Import 

1. `import { render, screen, fireEvent } from "@testing-library/react";`

    * `render(component)`: Renders the component in the test environment.

    * `screen`: Provides methods to query the DOM (getByText, getByRole, queryByTestId, etc.).

    * `fireEvent`: Simulates events such as click, change, keypress, etc.

2. `import "@testing-library/jest-dom";`: 

use `jest` to write tests that assert various things about the state of a DOM. 

* Example: check "Learn TypeScript" is in HTML file.  

`expect(screen.getByText("Learn TypeScript")).toBeInTheDocument();`





## Component Test - Example 

In this test project, we can use AAA testing (Arrange-Act-Assert) parttern. 

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

Detail:

 `test("calls addTodo when submitting a valid new todo")`: test name

1 Arrange: 

    * A mock function (`mockAddTodo = jest.fn()`) is created to track calls to the `addTodo` function.

    * The render function mounts the `TodoForm` component

    * The input field (`todo-input`) and submit button (`todo-submit-btn`) are selected.

2 Act:
    
    * `fireEvent.change(input, { target: { value: "Learn TypeScript" } })`
        
        &#8594;  Simulates the user typing "Learn TypeScript" into the input field.

    * `fireEvent.click(submitButton);`

        &#8594; Simulates the user clicking the submit button.

3 Assert:

* `expect(mockAddTodo).toHaveBeenCalledWith("Learn TypeScript");`

&#8594; Verifies that mockAddTodo was called once and with the correct argument ("Learn TypeScript").
## Hook Test - Import

1. `import { renderHook, act } from "@testing-library/react";`
* `renderHook` is a utility function from `React Testing Library` used to test custom hooks.
* `act` is used to wrap state updates in tests to ensure React processes updates synchronously.



## Hook Test - Example

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

* Arrange:

    * The test calls `renderHook(() => useTodos())` to render the `useTodos` hook.

    * Using `act()`, it adds a new todo with "Toggle Task".

    * It retrieves the `id` of the newly added todo.

* Act (First Toggle - Mark as Completed)

    * Calls `toggleTodo(todoId)`, which should set completed to true.

* Assert (Check Completed State)

    * `expect(result.current.todos[0].completed).toBe(true);`

    &#8594; Ensures that the todo is now marked as completed.

* Act (Second Toggle - Mark as Incomplete)
   
    * Calls `toggleTodo(todoId)` again, which should set completed back to false.

* Assert (Check Incomplete State)

    * `expect(result.current.todos[0].completed).toBe(false);`

    &#8594; Ensures that the todo is now incomplete again.



## Test table list.

This is the all test from the project. 

| Test Component/Hook | Test name                                                               |
|---------------------|-------------------------------------------------------------------------|
| TodoForm Component  | renders input field and buttons                                         |
|                     | updates input when typing                                               |
|                     | calls addTodo when submitting a valid new todo                          |
|                     | pre-fills input when editing a todo                                     |
|                     | calls editTodo when submitting an edit                                  |
| TodoList Component  | renders todo items                                                      |
|                     | displays a message when no todos are available                          |
|                     | calls onToggle when clicking a todo item and shows a success toast      |
|                     | calls onDelete when clicking the delete button and shows an error toast |
|                     | calls onEdit when clicking the edit button and shows an info toast      |
|                     | does not call onToggle if clicking outside of a todo item               |
|                     | handles toggling a completed todo correctly                             |
|                     | handles multiple todos correctly                                        |
| useTodos Hook       | adds a new todo                                                         |
|                     | does not add a new todo if the text is empty                            |
|                     | does not add a new todo if the text length is under 3                   |
|                     | toggles a todo's completed state                                        |
|                     | edits a todo                                                            |
|                     | does not edit a todo if new text is empty                               |
|                     | deletes a todo                                                          |
|                     | clears todoToEdit when the edited todo is deleted                       |
|                     | sets a todo to be edited                                                |


## Test Coverage

| Component/Hook | Coverage by   | Coverage Percent |
|----------------|---------------|:----------------:|
| TodoForm       | TodoForm.test |        100       |
| TodoList       | TodoList.test |        100       |
| TodoItem       | TodoList.Test |        100       |
| useTodo        | useTodo.Test  |        100       |

## Link Youtube

[SWT301 UnitTest React](https://youtu.be/P_CxwURNKFk)

## Reference

[React Test Example](https://testing-library.com/docs/react-testing-library/example-intro/).

[React Testing Custom Hook](https://dev.to/manuartero/testing-a-custom-hook-like-a-pro-1b19).

