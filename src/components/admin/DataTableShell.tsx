import { ReactNode } from "react";
import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableShellProps {
  children: ReactNode;
  searchPlaceholder?: string;
  rightSlot?: ReactNode;
  footer?: ReactNode;
}

export default function DataTableShell({
  children,
  searchPlaceholder = "Search...",
  rightSlot,
  footer,
}: DataTableShellProps) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 md:p-4 border-b border-border">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder={searchPlaceholder} className="h-9 border-0 bg-muted/40 focus-visible:ring-1" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {rightSlot}
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-3.5 w-3.5" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">{children}</div>
      {footer ?? (
        <div className="flex items-center justify-between gap-3 p-3 md:p-4 border-t border-border text-xs text-muted-foreground">
          <span>Showing 1–10 of demo entries</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function StatusBadge({
  status,
  tone,
}: {
  status: string;
  tone: "success" | "warning" | "destructive" | "info" | "muted";
}) {
  const map: Record<string, string> = {
    success: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20",
    warning: "bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    info: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    muted: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${map[tone]}`}>
      {status}
    </span>
  );
}
