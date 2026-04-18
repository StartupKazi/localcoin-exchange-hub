---
name: Admin Panel
description: Full admin panel with collapsible sidebar and 30+ pages for users, ads, trades, withdrawals, tickets, reports, settings
type: feature
---
Admin panel mounted at /admin with sidebar (AdminSidebar) and shared AdminLayout (header with search, notifications, profile). Reusable primitives: StatCard, DataTableShell, StatusBadge, GenericListPage<T>.

Routes:
- /admin (Dashboard with 14 stat cards + recharts area/bar charts)
- /admin/users/{active,email-unverified,mobile-unverified,banned,kyc-unverified,kyc-pending,all,notification}
- /admin/ads/{limit,all}
- /admin/trades/{running,reported,completed,all}
- /admin/crypto, /admin/fiat, /admin/payment-windows, /admin/deposits, /admin/subscribers
- /admin/withdrawals/{pending,approved,rejected,all}
- /admin/tickets/{pending,closed,answered,all}
- /admin/reports/{transactions,logins,notifications}
- /admin/settings/{general,system,referral,notification}

Sidebar uses sidebar-* design tokens (dark navy). Main content uses light theme. Recharts for dashboard analytics.
