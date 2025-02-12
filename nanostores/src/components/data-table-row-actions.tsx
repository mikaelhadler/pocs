import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toggleTodo, deleteTodo, Todo } from "@/stores/todoStore";

interface DataTableRowActionsProps {
  row: Row<Todo>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const todo = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleTodo(todo.id)}>
          {todo.completed ? "Uncheck" : "Check"} as completed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteTodo(todo.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
