import { Head, Link } from "@inertiajs/react";
import styles from "./Profile.module.scss";
import StarSVG from "@/components/SVGs/Star";
import { svgColor } from "@/utils/extra/utils";
import Layout from "@/components/Layout/Layout";
import PhoneSVG from "@/components/SVGs/Phone";
import EmailSVG from "@/components/SVGs/Email";
import VerifiedSVG from "@/components/SVGs/Identity";
import Electrical from "@/components/SVGs/JobCategories/Electrical";
import Pet from "@/components/SVGs/JobCategories/Pet";
import Plumbery from "@/components/SVGs/JobCategories/Plumbery";
import Plant from "@/components/SVGs/JobCategories/Plant";
import Footer from "@/components/Footer/Footer";
import { useState } from "react";
import { Suspense } from "react";
import LoadingModal from "@/components/LoadingModal/LoadingModal";
import { lazy } from "react";

const UserPictureViewer = lazy(() => import("@/features/profile/UserPictureViewer"));

export default function Profile({isUsersAccount, publicProfile}) {
    const profile = publicProfile.data;

    const time = (profile.timeInPlatform.time != 0 ? profile.timeInPlatform.time : 1 );

    const [pfpViewer, setPfpViewer] = useState(false);

    function formatUnits() {
        if(profile.timeInPlatform.units == "months") {
            return time == 1 ? "mes" : "meses";
        } else 
            return time == 1 ? "año" : "años";
    }

    return (
        <Layout>
            <Head title={"Perfil de " + profile.firstName}></Head>
            {isUsersAccount &&
                <Link href="/profile/edit" className={styles.editProfileBtn}>
                    Edita tu perfil
                </Link>
            }
            <div className={styles.mainContainer}> 
                <div className={styles.profileContainer}>
                    <div className={styles.basicInfoContainer}>
                        <div className={styles.photoAndNameContainer}>
                            <button className={styles.userPhotoBtn} onClick={() => setPfpViewer(true)}>
                                <img className={styles.userPhoto} src={profile?.pfp_url} />
                            </button>
                            <div className={styles.name}>{profile.firstName}</div>
                        </div>
                        <div className={styles.statsInformation}>
                            <div className={styles.experience}>
                                <div className={styles.time}>
                                    {
                                        time + `${profile.timeInPlatform.units == "months" ? ` ${formatUnits()}` : ` ${formatUnits()}`} en Woork`
                                    }
                                </div>
                                <span className={styles.statsSubtitle}>
                                    {profile.isWorker ? "Trabajador" : "Miembro"}
                                </span>
                            </div>
                            {profile.isWorker && 
                                <div className={styles.starsContainer}>
                                    <div className={styles.stars}>
                                        4.34
                                        <StarSVG width={"25px"} color={svgColor()}/>
                                    </div>
                                    <span className={styles.statsSubtitle}>Calificación</span>
                                </div>
                            }
                            {profile.isWorker && 
                                <div className={styles.jobCompletedContainer}>
                                    <div className={styles.jobCompleted}>
                                        72
                                    </div>
                                    <span className={styles.statsSubtitle}>trabajos completados</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={styles.verificationSection}>
                        <div className={styles.verificationTitle}>
                            Información verificada de {profile.firstName}
                        </div>
                        <div className={styles.verificatedInformation}>
                            {profile.phoneVerified && 
                                <div className={styles.verificatedItem}>
                                    <PhoneSVG width={"20px"} color={svgColor()} />
                                    Número de teléfono
                                </div>
                            }
                            {profile.emailVerified &&
                                <div style={{marginTop: "24px"}} className={styles.verificatedItem}>
                                    <EmailSVG width={"20px"} color={svgColor()} />
                                    Correo electrónico
                                </div>
                            }
                            {profile.identityVerified && 
                                <div style={{marginTop: "24px"}} className={styles.verificatedItem}>
                                    <VerifiedSVG width={"20px"} color={svgColor()} />
                                    Identidad
                                </div> 
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.userInfoContainer}>
                    <div className={`${styles.userInfoSection} ${styles.aboutSection}`}>
                        <div className={styles.aboutTitle}>
                            Acerca de {profile.firstName}
                        </div>
                        <div className={styles.about}>
                            {profile.about ? 
                                profile.about
                            :
                                `${profile.firstName} no ha agregado una descripción.`
                            }
                        </div>
                        {profile.isWorker && 
                            <>
                                <hr className="hr-line" />
                                <div className={styles.categoryTags}>
                                    <div className={styles.categoryTagsTitle}>
                                        Categorías
                                    </div>
                                    <div className={styles.categoryTagsList}>
                                        <div className={styles.tag}>
                                            <Electrical width={"20px"} />
                                            Electricidad
                                        </div>
                                        <div className={styles.tag}>
                                            <Pet width={"20px"} />
                                            Mascotas
                                        </div>
                                        <div className={styles.tag}>
                                            <Plumbery width={"20px"} />
                                            Plomería
                                        </div>
                                        <div className={styles.tag}>
                                            <Plant width={"20px"} />
                                            Jardinería
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div className={`${styles.userInfoSection} ${styles.ratingsSection}`}>
                        <div className={styles.aboutTitle}>
                            Calificaciones
                        </div>
                        <div className={styles.ratings}>
                            {profile.firstName + " no ha recibido ninguna calificación."}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {pfpViewer && 
                <Suspense fallback={<LoadingModal />} >
                    <UserPictureViewer name={profile.firstName} url={profile?.pfp_url} closeModal={() => setPfpViewer(false)} />
                </Suspense>
            }
        </Layout>
    );
}