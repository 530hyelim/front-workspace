export type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export type TodoState = {
    todos: Todo[];
};

export const initialState: TodoState = {
    todos: [
        {
            id: 1,
            text: '맛있게 점심먹기!!',
            completed: false
        },
        {
            id: 2,
            text: '열심히 운동하기~!!',
            completed: false
        }
    ],
};