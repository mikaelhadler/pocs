import { useStore } from "@nanostores/react";
import { todosStore } from "./stores/todoStore";
import { TodoForm } from "./components/TodoForm";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";

export function App() {
  const $todos = useStore(todosStore);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
        Management of Tasks
      </h1>
      <TodoForm />
      <div className="mt-4 sm:mt-6">
        <DataTable
          columns={columns}
          data={$todos}
        />
      </div>
    </div>
  );
}

export default App;
