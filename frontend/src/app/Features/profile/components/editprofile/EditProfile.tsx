"use client"

import { useUser } from "@/api/hooks/user";
import LoadingModal from "@/components/LoadingModal/LoadingModal";
import { lazy, MouseEvent, Suspense, useState } from "react";
import styles from "./Edit.module.scss";
import { useEditProfile } from "@/api/hooks/profile";
import { useRouter } from "next/navigation";
import { flash } from "@/flash-message/flashMessageCreator";
import CategoryTagInput from "./CategoryTagInput";
import { CategoriesList } from "@/services/Categories";

const AboutModal = lazy(() => import("./AboutModal"));

type EditProfileProps = {
    editInformation: {
        about: string;
        categories: string[];
    };
}

export default function EditProfile({editInformation}: EditProfileProps) {
    const [user] = useUser();

    const [about, setAbout] = useState(editInformation.about);


    const [categories, setAddedCategories] = useState(
        editInformation.categories.map(category => CategoriesList.find(cat => cat.tag === category)!)
    );

    const [aboutModal, setAboutModal] = useState(false);
    const openModal = () => setAboutModal(true);
    const closeModal = () => setAboutModal(false);
    
    const { edit } = useEditProfile();
    const router = useRouter();

    async function submitEdit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if(about == editInformation.about && categories.map(cat => cat.tag).sort() == editInformation.categories.sort()) {
            return;
        }

        try {
            await edit({
                about: about,
                categories: user.is_worker ? categories.map(cat => cat.tag) : []
            });
            router.push("/profile");
        } catch(error) {
            flash(error.response.data.message, 4000, "error");
        }
    }

    return (
        <>
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
                        <div className={styles.editableSection}>
                            <div className={styles.editableSectionTitle}>
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
                        {user.is_worker && (
                            <>
                                <hr className="hr-line" />
                                <div className={styles.editableSection}>
                                    <div className={styles.editableSectionTitle}>
                                        Categorías de trabajo
                                    </div>
                                    <div className={styles.jobCategoriesDescription}>
                                        Agrega las categorías de trabajo en las que tienes experiencia y te gustaría ofrecer tus servicios.
                                    </div>
                                    <div className={styles.categoryContainer}>
                                        <CategoryTagInput categories={categories} setCategories={setAddedCategories}/>
                                    </div>
                                </div>
                            </>
                        )}
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
        </>
    )
}