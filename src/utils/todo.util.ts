import { Todo } from "../types/Todo";

export function getNumberFromPriority(priority: string) {
    switch (priority) {
        case "low":
            return 0;
        case "normal":
            return 1;
        case "high":
            return 2;
        default:
            return 0;
    }
};

export function getOrderedTodosByPriorityAndState(todos: Todo[]): Todo[] {
    return todos.sort((todoA, todoB) => {
        if (todoA.finished === todoB.finished) {
            return getNumberFromPriority(todoB.priority) - getNumberFromPriority(todoA.priority);
        }
        
        return todoA.finished ? 1 : -1;
    });
}