import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { deleteTodo, toggleTodo, Todo } from "@/stores/todoStore";

interface DataTableSelectedActionsProps<TData> {
  table: Table<TData>;
}

export function DataTableSelectedActions<TData>({
  table,
}: DataTableSelectedActionsProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleDelete = () => {
    const selectedTodos = selectedRows.map((row) => (row.original as Todo).id);
    selectedTodos.forEach((id) => deleteTodo(id));
    table.toggleAllPageRowsSelected(false);
  };

  const handleToggleComplete = () => {
    const selectedTodos = selectedRows.map((row) => (row.original as Todo).id);
    selectedTodos.forEach((id) => toggleTodo(id));
    table.toggleAllPageRowsSelected(false);
  };

  if (selectedRows.length === 0) return null;

  return (
    <div className="flex items-center gap-2 py-2">
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
      >
        Delete selected
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleToggleComplete}
      >
        Change status
      </Button>
      <span className="ml-2 text-sm text-muted-foreground">
        {selectedRows.length} item(s) selected
      </span>
    </div>
  );
}
