
export interface Todo {
    title: string,
    id: string | number,
    priority: 'low' | 'normal' | 'high',
    finished: boolean
}