import { createSlice } from '@reduxjs/toolkit';
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
    insert: (state, action) => {
      state.todos = [
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
        ...state.todos,
      ];
    },
    remove: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    update: (state, action) => {
      const { id, text, completed } = action.payload;

      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text, completed } : todo
      );
    },
  },
});

export const { insert, remove, update } = todoSlice.actions;
export const Todos = (state: RootState) => state.todo.todos;
export default todoSlice.reducer;
