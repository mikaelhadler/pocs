import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../services/api';

export interface Todo {
  id: string;
  completed: boolean;
  text: string;
}

interface TodoState {
  items: Todo[];
  completedItems: Todo[];
  status: string;
  error: null | string;
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await api.get('/todos');
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
});

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (text: string) => {
    const response = await api.post('/todos', {
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    return response.data;
  },
);

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async (todo: Todo) => {
    const response = await api.patch(`/todos/${todo.id}`, {
      completed: !todo.completed,
    });
    return response.data;
  },
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [] as Todo[],
    completedItems: [] as Todo[],
    status: 'idle',
    error: null,
  } as TodoState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.filter((todo: Todo) => !todo.completed);
        state.completedItems = action.payload.filter(
          (todo: Todo) => todo.completed,
        );
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        if (action.payload.completed) {
          state.items = state.items.filter(
            todo => todo.id !== action.payload.id,
          );
          state.completedItems.push(action.payload);
        } else {
          state.completedItems = state.completedItems.filter(
            todo => todo.id !== action.payload.id,
          );
          state.items.push(action.payload);
        }
      });
  },
});

export default todoSlice.reducer;
