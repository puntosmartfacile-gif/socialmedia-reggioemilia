import { Suspense } from "react";
import LoginClientPage from "@/app/components/auth/LoginClientPage";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF7]" />}>
      <LoginClientPage />
    </Suspense>
  );
}