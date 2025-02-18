import { useState } from "react";
import { addTodo } from "@/stores/todoStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TodoForm() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    addTodo({
      task: task.trim(),
      description: "",
      priority,
    });

    setTask("");
    setPriority("medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 sm:gap-4"
    >
      <Input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder="New task..."
        className="flex-1"
      />
      <Select
        value={priority}
        onValueChange={(value) =>
          setPriority(value as "low" | "medium" | "high")
        }
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Selecione a prioridade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      <Button
        type="submit"
        className="w-full sm:w-auto"
      >
        Add
      </Button>
    </form>
  );
}
