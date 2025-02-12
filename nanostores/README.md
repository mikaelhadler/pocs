# Nanostores POC - Task Manager

A proof of concept demonstrating Nanostores with React for global and persistent state management.

## Demonstrated Concepts

### 1. Persistent Store

Nanostores enables creating persistent stores that automatically save data to localStorage:

```ts
import { persistentAtom } from "@nanostores/persistent";
export const todosStore = persistentAtom<Todo[]>("todos", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
```

- `persistentAtom`: Creates an atomic store that persists data
- First parameter: localStorage key
- Second parameter: initial value
- Third parameter: encode/decode functions

### 2. CRUD Operations

The store implements all CRUD operations:

```ts
export function addTodo(data: Omit<Todo, "id" | "completed">) {
  const newTodo: Todo = {
    ...data,
    id: crypto.randomUUID(),
    completed: false,
  };
  todosStore.set([...todosStore.get(), newTodo]);
}

const todos = useStore(todosStore);

export function updateTodo(id: string, data: Partial<Omit<Todo, "id">>) {
  const todos = todosStore.get();
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, ...data } : todo
  );
  todosStore.set(updatedTodos);
}

export function deleteTodo(id: string) {
  const todos = todosStore.get();
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  todosStore.set(filteredTodos);
}
```

### 3. React Integration

Nanostores integrates easily with React using the `useStore` hook:

```tsx
import { useStore } from "@nanostores/react";
function TodoList() {
  const todos = useStore(todosStore);
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
        />
      ))}
    </div>
  );
}
```

### 4. Strong Typing

The project uses TypeScript for type safety:

```ts
type Todo = {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
};
```

## Nanostores Features Used

1. `persistentAtom`: For persistent store creation
2. `useStore`: Hook to connect store to React
3. `store.get()`: Gets current store value
4. `store.set()`: Updates store value
5. Type safety with TypeScript

## Project Structure

```
src/
├── App.tsx
├── components/
│ ├── TodoForm.tsx
│ ├── TodoItem.tsx
├── stores/
│ ├── todoStore.ts
```

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Run the project:

```bash
npm run dev
```

## Nanostores Advantages

1. **Simplicity**: Minimalist, direct API
2. **Performance**: Optimized for efficient updates
3. **Persistence**: Native localStorage support
4. **Type Safety**: Excellent TypeScript support
5. **Size**: Very small bundle size (~1KB)

## Usage Considerations

- Ideal for applications needing simple global state
- Great for cases requiring data persistence
- Lightweight Redux/MobX alternative
- Works well with SSR (Server Side Rendering)
