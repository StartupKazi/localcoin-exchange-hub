import GenericListPage, { StatusBadge } from "@/components/admin/GenericListPage";

type User = { id: string; name: string; email: string; mobile: string; country: string; joined: string; status: string };

const sample: User[] = Array.from({ length: 10 }, (_, i) => ({
  id: `USR-${1000 + i}`,
  name: ["Alice Doe","Bob Smith","Chen Wei","Diego Ruiz","Emma Stone","Farah Ali","Grace Park","Hugo Pena","Ivy Chen","Jon Snow"][i],
  email: ["alice@mail.com","bob@mail.com","chen@mail.com","diego@mail.com","emma@mail.com","farah@mail.com","grace@mail.com","hugo@mail.com","ivy@mail.com","jon@mail.com"][i],
  mobile: `+1 555-01${(20 + i).toString().padStart(2, "0")}`,
  country: ["US","UK","CN","MX","FR","AE","KR","BR","SG","CA"][i],
  joined: `2025-0${(i % 9) + 1}-12`,
  status: ["Active","Active","Active","Active","Active","Active","Active","Active","Active","Active"][i],
}));

export function ActiveUsers() {
  return (
    <GenericListPage<User>
      title="Active Users"
      description="Verified, currently active platform users"
      searchPlaceholder="Search active users..."
      rows={sample}
      columns={[
        { key: "id", header: "User ID" },
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "mobile", header: "Mobile" },
        { key: "country", header: "Country" },
        { key: "joined", header: "Joined" },
        { key: "status", header: "Status", render: () => <StatusBadge status="Active" tone="success" /> },
      ]}
    />
  );
}

export function EmailUnverified() {
  return (
    <GenericListPage<User>
      title="Email Unverified Users"
      description="Users yet to verify their email address"
      rows={sample.map((s) => ({ ...s, status: "Unverified" }))}
      columns={[
        { key: "id", header: "User ID" },
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "joined", header: "Joined" },
        { key: "status", header: "Status", render: () => <StatusBadge status="Email Unverified" tone="warning" /> },
      ]}
    />
  );
}

export function MobileUnverified() {
  return (
    <GenericListPage<User>
      title="Mobile Unverified Users"
      rows={sample}
      columns={[
        { key: "id", header: "User ID" },
        { key: "name", header: "Name" },
        { key: "mobile", header: "Mobile" },
        { key: "country", header: "Country" },
        { key: "status", header: "Status", render: () => <StatusBadge status="Mobile Unverified" tone="warning" /> },
      ]}
    />
  );
}

export function BannedUsers() {
  return (
    <GenericListPage<User>
      title="Banned Users"
      description="Users restricted from accessing the platform"
      rows={sample.map((s) => ({ ...s, status: "Banned" }))}
      columns={[
        { key: "id", header: "User ID" },
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "joined", header: "Banned On" },
        { key: "status", header: "Status", render: () => <StatusBadge status="Banned" tone="destructive" /> },
      ]}
    />
  );
}

export function KycUnverified() {
  return (
    <GenericListPage<User>
      title="KYC Unverified Users"
      rows={sample}
      columns={[
        { key: "id", header: "User ID" },
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "country", header: "Country" },
        { key: "status", header: "KYC", render: () => <StatusBadge status="Not Submitted" tone="muted" /> },
      ]}
    />
  );
}

export function KycPending() {
  return (
    <GenericListPage<User>
      title="KYC Pending Review"
      rows={sample}
      columns={[
        { key: "id", header: "User ID" },
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "joined", header: "Submitted" },
        { key: "status", header: "KYC", render: () => <StatusBadge status="Pending Review" tone="warning" /> },
      ]}
    />
  );
}

export function AllUsers() {
  return (
    <GenericListPage<User>
      title="All Users"
      description="Complete list of registered users"
      rows={sample}
      columns={[
        { key: "id", header: "User ID" },
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "mobile", header: "Mobile" },
        { key: "country", header: "Country" },
        { key: "joined", header: "Joined" },
        { key: "status", header: "Status", render: () => <StatusBadge status="Active" tone="success" /> },
      ]}
    />
  );
}
