
export interface Todo {
    title: string,
    id: number,
    priority: 'low' | 'high' | 'normal',
    finished: boolean
}