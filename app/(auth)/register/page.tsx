import type { Metadata } from "next";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Inscription | Event Congo",
  description: "Créez votre compte Event Congo en tant que participant ou organisateur.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm />
    </main>
  );
}
