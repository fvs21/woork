import Layout from "@/Components/Layout/Layout";
import styles from "./Edit.module.scss";
import { Head, router } from "@inertiajs/react";
import { useUser } from "@/jotai/user";
import { useState } from "react";
import { Suspense } from "react";
import LoadingScreen from "@/Components/LoadingScreen/LoadingScreen";
import { lazy } from "react";
import LoadingSpinner from "@/Components/LoadingSpinner/LoadingSpinner";
import LoadingModal from "@/Components/LoadingModal/LoadingModal";

const AboutModal = lazy(() => import("@/Features/Profile/AboutModal"));

export default function Edit({editInformation}) {
    const [user] = useUser();

    const [about, setAbout] = useState(editInformation.about);
    const [aboutModal, setAboutModal] = useState(false);
    const openModal = () => setAboutModal(true);
    const closeModal = () => setAboutModal(false);

    function submitEdit(e) {
        e.preventDefault();

        if(about == editInformation.about) {
            return;
        }

        router.put("/profile/edit", {
            'about': about
        });
    }

    return (
        <Layout>
            <Head title="Edita tu perfil" />
            <div className={styles.editProfileContainer}>
                <section className={styles.editSection}>
                    <div className={styles.profilePictureContainer}>
                        <button className={styles.profilePictureBtn}>
                            <img className={styles.profilePicture} src={user.pfp_url}/>
                        </button>
                    </div>
                    <div className={styles.informationContainer}>
                        <div className={styles.informationContainerTitle}>
                            Tu perfil
                        </div>
                        <div className={styles.disclaimer}>
                            La información que compartas sirve para que otros trabajadores y personas puedan conocerte mejor.
                        </div>
                        <hr className="hr-line" />
                        <div className={styles.aboutSection}>
                            <div className={styles.aboutTitle}>
                                Acerca de ti
                            </div>
                            <div className={styles.aboutContainer}>
                                {about ?
                                    <>
                                        <div className={styles.about}>
                                            {about}
                                        </div>
                                        <button className={styles.editButton} onClick={openModal}>
                                            Editar
                                        </button>
                                    </>
                                :
                                    <div>
                                        <div className={styles.addDescriptionText}>Agrega una descripción sobre ti.</div>
                                        <button className={styles.editButton} onClick={openModal}>
                                            Escribir
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className={styles.editFooter}>
                <div style={{marginRight: "40px"}}>
                    <button className={styles.saveEditBtn} onClick={(e) => submitEdit(e)}>
                        Guardar
                    </button>
                </div>
            </div>
            {aboutModal && 
                <Suspense fallback={<LoadingModal />}>
                    <AboutModal about={about} setAbout={setAbout} closeModal={closeModal}/>
                </Suspense>
            }
        </Layout>
    )
}