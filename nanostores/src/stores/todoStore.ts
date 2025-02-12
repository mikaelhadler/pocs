import { persistentAtom } from "@nanostores/persistent";

export interface Todo {
  id: string;
  task: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

export const todosStore = persistentAtom<Todo[]>("todos", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addTodo(data: Omit<Todo, "id" | "completed">) {
  const newTodo: Todo = {
    ...data,
    id: crypto.randomUUID(),
    completed: false,
  };

  todosStore.set([...todosStore.get(), newTodo]);
}

export function toggleTodo(id: string) {
  const todos = todosStore.get();
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  todosStore.set(updatedTodos);
}

export function removeTodo(id: string) {
  const todos = todosStore.get();
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  todosStore.set(filteredTodos);
}

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
