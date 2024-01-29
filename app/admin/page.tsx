"use client";
import { Admin } from "@/components";
import { ModalContextProvider } from "@/context/ModalContext";

export default function AdminPage() {
  return (
    <ModalContextProvider>
      <main>
        <Admin />
      </main>
    </ModalContextProvider>
  );
}
