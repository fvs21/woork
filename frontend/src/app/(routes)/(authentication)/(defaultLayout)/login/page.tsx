import LoginForm from "@/features/login/LoginForm";
import "@/styles/globals.scss";

export const metadata = {
    title: "Woork - Inicia sesión"
}

export default async function Page({searchParams}) {
    const search = await searchParams;
    
    const error: string = search.failed == 'true' ? "La contraseña que colocaste no es correcta." : ""; 

    return (
        <LoginForm error={error} />
    )
}