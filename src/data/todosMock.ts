import { Todo } from "../types/Todo";

export const todosMock: Todo[] = [
    {
        title: '✅ Dokončit návrh projektu',
        id: 0,
        priority: 'high',
        finished: true,
    },
    {
        title: '📝 Napsat článek do IT časopisu',
        id: 1,
        priority: 'normal',
        finished: false,
    },
    {
        title: '📅 Plánování týmového setkání',
        id: 2,
        priority: 'low',
        finished: false,
    },
    {
        title: '🔧 Opravit kritickou chybu v aplikaci',
        id: 3,
        priority: 'high',
        finished: false,
    },
    {
        title: '💼 Dokončit úkol do práce',
        id: 4,
        priority: 'normal',
        finished: false,
    }
];