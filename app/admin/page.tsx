"use client";
import { useEffect } from "react";
import { Admin } from "@/components";
import { useRouter } from "next/router";
import { db } from "@/lib/firebase";
import { ModalContextProvider } from "@/context/ModalContext";
import { authenticate } from "../auth";

export default function AdminPage() {
  useEffect(() => {
    // Si ya estás autenticado, redirige al dashboard
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const isAuthenticated = await authenticate(password);

      if (isAuthenticated) {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error authenticating:", error);
      setError("Error de autenticación");
    }
  };

  return (
    <ModalContextProvider>
      <main>
        <Admin />
      </main>
    </ModalContextProvider>
  );
}
