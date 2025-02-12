import { useState } from "react";
import { updateTodo, deleteTodo, toggleTodo } from "../stores/todoStore";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  task: string;
  completed: boolean;
}

export function TodoItem({ id, task, completed }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleUpdate = () => {
    updateTodo(id, { task: editedTask });
    setIsEditing(false);
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={completed}
          onCheckedChange={() => toggleTodo(id)}
        />
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
            autoFocus
          />
        ) : (
          <span
            className={cn("cursor-pointer", {
              "line-through": completed,
            })}
            onClick={() => setIsEditing(true)}
          >
            {task}
          </span>
        )}
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => deleteTodo(id)}
        >
          Excluir
        </Button>
      </TableCell>
    </TableRow>
  );
}
