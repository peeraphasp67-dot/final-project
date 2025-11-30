"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LayoutWithNav({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  // Hide Navbar on '/', '/login', '/register'
  const hideNav = path === '/' || path === '/login' || path === '/register';
  return (
    <>
      {!hideNav && <Navbar />}
      {children}
    </>
  );
}

