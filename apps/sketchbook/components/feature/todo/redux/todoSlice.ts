import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type TodoData = {
  id: number;
  text: string;
  completed: boolean;
};

export interface TodoState {
  todos: TodoData[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    insert: (state, action: PayloadAction<string>) => {
      state.todos.unshift({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    remove: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    update: (
      state,
      action: PayloadAction<{ id: number; text: string; completed: boolean }>
    ) => {
      const { id, text, completed } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.text = text;
        todo.completed = completed;
      }
    },
  },
});

export const { insert, remove, update } = todoSlice.actions;
export const Todos = (state: RootState) => state.todo.todos;
export default todoSlice.reducer;