import { ReactNode } from "react";
import DashboardSidebar from "@/app/components/dashboard/DashboardSidebar";
import { mockUser } from "@/app/lib/dashboard-data";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#2C2C2C]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <DashboardSidebar user={mockUser} />
        <main className="min-w-0 flex-1 px-5 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-10 lg:pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}