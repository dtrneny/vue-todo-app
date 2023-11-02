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