import AdminLayout from "@/components/admin/AdminLayout";
import DataTableShell, { StatusBadge } from "@/components/admin/DataTableShell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface Props<T> {
  title: string;
  description?: string;
  columns: Column<T>[];
  rows: T[];
  primaryAction?: { label: string; onClick?: () => void };
  searchPlaceholder?: string;
}

export default function GenericListPage<T extends Record<string, any>>({
  title,
  description,
  columns,
  rows,
  primaryAction,
  searchPlaceholder,
}: Props<T>) {
  return (
    <AdminLayout
      title={title}
      description={description}
      actions={
        primaryAction ? (
          <Button size="sm" className="gap-1" onClick={primaryAction.onClick}>
            <Plus className="h-4 w-4" /> {primaryAction.label}
          </Button>
        ) : null
      }
    >
      <DataTableShell searchPlaceholder={searchPlaceholder}>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              {columns.map((c) => (
                <TableHead key={String(c.key)} className={c.className}>{c.header}</TableHead>
              ))}
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((c) => (
                  <TableCell key={String(c.key)} className={c.className}>
                    {c.render ? c.render(row) : String(row[c.key as keyof T] ?? "")}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTableShell>
    </AdminLayout>
  );
}

export { StatusBadge };
