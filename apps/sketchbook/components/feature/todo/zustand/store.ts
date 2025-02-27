import { create } from 'zustand';

export type TodoData = {
  id: number;
  text: string;
  completed: boolean;
};

interface TodoState {
  todos: TodoData[];
  insert: (action: TodoData) => void;
  remove: (action: TodoData) => void;
  update: (action: TodoData) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  insert: (action) =>
    set((state) => ({
      todos: [action, ...state.todos],
    })),
  remove: (action: TodoData) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== action.id),
    })),
  update: (action: TodoData) =>
    set((state) => ({
      todos: (state.todos = state.todos.map((todo) =>
        todo.id === action.id
          ? {
              ...todo,
              text: action.text,
              completed: action.completed,
            }
          : todo
      )),
    })),
}));
