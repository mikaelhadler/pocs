import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  data: T[];
  columns: {
    id: string;
    header: string;
    cell: (item: T) => React.ReactNode;
    sortable?: boolean;
  }[];
  onSelectionChange?: (selectedItems: T[]) => void;
  itemsPerPage?: number;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onSelectionChange,
  itemsPerPage = 4,
}: DataTableProps<T>) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Filtragem
  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Ordenação
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = (a as any)[sortConfig.key];
    const bValue = (b as any)[sortConfig.key];
    return sortConfig.direction === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  // Paginação
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Manipulação de seleção
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedItems(newSelection);
    onSelectionChange?.(data.filter((item) => newSelection.has(item.id)));
  };

  const toggleAll = () => {
    if (selectedItems.size === paginatedData.length) {
      setSelectedItems(new Set());
      onSelectionChange?.([]);
    } else {
      const newSelection = new Set(paginatedData.map((item) => item.id));
      setSelectedItems(newSelection);
      onSelectionChange?.(paginatedData);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button
          variant="outline"
          size="sm"
        >
          Colunas <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b hover:bg-transparent">
              <TableHead className="w-[40px]">
                <input
                  type="checkbox"
                  checked={selectedItems.size === paginatedData.length}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </TableHead>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={cn(column.sortable && "cursor-pointer")}
                  onClick={() => {
                    if (column.sortable) {
                      setSortConfig({
                        key: column.id,
                        direction:
                          sortConfig?.key === column.id &&
                          sortConfig.direction === "asc"
                            ? "desc"
                            : "asc",
                      });
                    }
                  }}
                >
                  {column.header}
                  {sortConfig?.key === column.id && (
                    <span className="ml-2">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </TableHead>
              ))}
              <TableHead className="w-[40px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-50"
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => toggleSelection(item.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.cell(item)}</TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {selectedItems.size} de {paginatedData.length} selecionado(s)
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
