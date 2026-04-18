import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "destructive" | "muted" | "info";
  hint?: string;
}

const toneClasses: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  warning: "bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))]",
  destructive: "bg-destructive/10 text-destructive",
  muted: "bg-muted text-muted-foreground",
  info: "bg-blue-500/10 text-blue-600",
};

export default function StatCard({ label, value, icon: Icon, tone = "primary", hint }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
      <div className={cn("h-11 w-11 rounded-lg flex items-center justify-center shrink-0", toneClasses[tone])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-wide text-muted-foreground truncate">{label}</div>
        <div className="text-2xl font-bold mt-0.5 leading-none">{value}</div>
        {hint && <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>}
      </div>
    </div>
  );
}
