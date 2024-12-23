"use server"

import { redirect } from "next/navigation";

export const logoutServer = async () => {
    redirect("/login");
}