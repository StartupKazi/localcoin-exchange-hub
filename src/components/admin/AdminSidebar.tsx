import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Repeat,
  Bitcoin,
  Banknote,
  CreditCard,
  ArrowDownToLine,
  ArrowUpFromLine,
  LifeBuoy,
  FileBarChart,
  Mail,
  Settings,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import logo from "@/assets/logo.png";

type Item = {
  title: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { title: string; url: string }[];
};

const items: Item[] = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  {
    title: "Manage Users",
    icon: Users,
    children: [
      { title: "Active Users", url: "/admin/users/active" },
      { title: "Email Unverified", url: "/admin/users/email-unverified" },
      { title: "Mobile Unverified", url: "/admin/users/mobile-unverified" },
      { title: "Banned Users", url: "/admin/users/banned" },
      { title: "KYC Unverified", url: "/admin/users/kyc-unverified" },
      { title: "KYC Pending", url: "/admin/users/kyc-pending" },
      { title: "All Users", url: "/admin/users/all" },
      { title: "Notification to All", url: "/admin/users/notification" },
    ],
  },
  {
    title: "Manage Ads",
    icon: Megaphone,
    children: [
      { title: "Limit", url: "/admin/ads/limit" },
      { title: "All Adverts", url: "/admin/ads/all" },
    ],
  },
  {
    title: "Manage Trades",
    icon: Repeat,
    children: [
      { title: "Running", url: "/admin/trades/running" },
      { title: "Reported", url: "/admin/trades/reported" },
      { title: "Completed", url: "/admin/trades/completed" },
      { title: "All", url: "/admin/trades/all" },
    ],
  },
  { title: "Crypto Currencies", url: "/admin/crypto", icon: Bitcoin },
  { title: "Fiat Gateways", url: "/admin/fiat", icon: Banknote },
  { title: "Payment Windows", url: "/admin/payment-windows", icon: CreditCard },
  { title: "Deposits", url: "/admin/deposits", icon: ArrowDownToLine },
  {
    title: "Withdrawals",
    icon: ArrowUpFromLine,
    children: [
      { title: "Pending Withdrawals", url: "/admin/withdrawals/pending" },
      { title: "Approved Withdrawals", url: "/admin/withdrawals/approved" },
      { title: "Rejected Withdrawals", url: "/admin/withdrawals/rejected" },
      { title: "All Withdrawals", url: "/admin/withdrawals/all" },
    ],
  },
  {
    title: "Support Ticket",
    icon: LifeBuoy,
    children: [
      { title: "Pending Ticket", url: "/admin/tickets/pending" },
      { title: "Closed Ticket", url: "/admin/tickets/closed" },
      { title: "Answered Ticket", url: "/admin/tickets/answered" },
      { title: "All Tickets", url: "/admin/tickets/all" },
    ],
  },
  {
    title: "Report",
    icon: FileBarChart,
    children: [
      { title: "Transaction Log", url: "/admin/reports/transactions" },
      { title: "Login History", url: "/admin/reports/logins" },
      { title: "Notification History", url: "/admin/reports/notifications" },
    ],
  },
  { title: "Subscribers", url: "/admin/subscribers", icon: Mail },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General Setting", url: "/admin/settings/general" },
      { title: "System Configuration", url: "/admin/settings/system" },
      { title: "Referral Setting", url: "/admin/settings/referral" },
      { title: "Notification Setting", url: "/admin/settings/notification" },
    ],
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (url: string) =>
    url === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(url);

  const linkCls = ({ isActive: a }: { isActive: boolean }) =>
    `flex items-center gap-2 w-full ${a ? "bg-sidebar-accent text-sidebar-primary font-medium" : "hover:bg-sidebar-accent/60"}`;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <img src={logo} alt="Admin" className="h-7 w-7 rounded" />
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-bold text-sidebar-foreground">LocalCoin</div>
              <div className="text-[10px] uppercase tracking-wide text-sidebar-foreground/60">Admin Panel</div>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                if (!item.children) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <NavLink to={item.url!} end className={linkCls}>
                          <Icon className="h-4 w-4 shrink-0" />
                          {!collapsed && <span className="truncate">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
                const groupActive = item.children.some((c) => isActive(c.url));
                return (
                  <Collapsible key={item.title} defaultOpen={groupActive} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title} className={groupActive ? "text-sidebar-primary" : ""}>
                          <Icon className="h-4 w-4 shrink-0" />
                          {!collapsed && (
                            <>
                              <span className="truncate flex-1 text-left">{item.title}</span>
                              <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!collapsed && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.url}>
                                <SidebarMenuSubButton asChild isActive={isActive(child.url)}>
                                  <NavLink to={child.url}>{child.title}</NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
