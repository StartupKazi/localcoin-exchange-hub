import { ReactNode } from "react";
import { Bell, Search, User } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function AdminLayout({ title, description, actions, children }: AdminLayoutProps) {
  return (
    <div className="admin-theme">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background text-foreground">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 flex items-center justify-between gap-3 border-b border-border bg-card/60 backdrop-blur px-3 md:px-5 sticky top-0 z-30">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div className="hidden md:flex items-center gap-2 ml-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search admin..." className="h-9 w-72 border border-border bg-secondary/60 focus-visible:ring-1" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" aria-label="Notifications" className="hover:bg-secondary">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2 pl-2 border-l border-border">
                  <div className="h-8 w-8 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="hidden md:block leading-tight">
                    <div className="text-sm font-medium">Super Admin</div>
                    <div className="text-[11px] text-muted-foreground">admin@localcoin.io</div>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1 p-4 md:p-6 space-y-5 overflow-x-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h1>
                  {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
                </div>
                {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
              </div>
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
