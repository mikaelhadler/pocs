import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await api.get('/todos');
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async text => {
  const response = await api.post('/todos', {
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  });
  return response.data;
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async todo => {
  const response = await api.patch(`/todos/${todo.id}`, {
    completed: !todo.completed,
  });
  return response.data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    completedItems: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.filter(todo => !todo.completed);
        state.completedItems = action.payload.filter(todo => todo.completed);
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
