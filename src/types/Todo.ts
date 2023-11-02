
export interface Todo {
    title: string,
    id: string,
    priority: 'low' | 'normal' | 'high',
    finished: boolean
}