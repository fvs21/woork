import { Head } from "@inertiajs/react";
import CreatePostingForm from "@/Features/CreatePosting/CreatePostingForm";
import Layout from "@/Components/Layout/Layout";


//Esta información no será visible para todos. Unicamente cuando usted acepte la solicitud de algún aplicante, tendrá la 
//opción de compartir esta dirección

export default function Create({...props}) {
    return (
        <Layout>
            <div style={{backgroundColor: "var(--card-bg)"}}>
                <Head title="Crear anuncio de trabajo" />
                <CreatePostingForm />
            </div>
        </Layout>
    )
}