import { Head, Link, router, usePage } from "@inertiajs/react";
import styles from "./Posting.module.scss";
import { useEffect, useRef, useState } from "react";
import ArrowButton from "@/components/ArrowButton/ArrowButton";
import SendSVG from "@/components/SVGs/Send";
import "leaflet/dist/leaflet.css";
import "leaflet";
import CloseSVG from "@/components/SVGs/Close";
import Layout from "@/components/Layout/Layout";
import { lazy } from "react";
import { Suspense } from "react";
import LoadingModal from "@/components/LoadingModal/LoadingModal";

const JobApplicantsList = lazy(() => import("@/features/postingsdashboard/JobApplicantsList"));

export default function Posting({ data, application_status, flash }) {
    const postingData = data.data;
    const images = postingData?.images_urls;

    const [imagePreviewed, setImagePreviewed] = useState(0);
    const [seeMore, setSeeMore] = useState(false);

    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState();

    const [jobApplicantsModal, setJobApplicantsModal] = useState(false);

    function changeImagePreviewed(value) {
        if (value < 0) setImagePreviewed(images.length - 1);
        else if (value > images.length - 1) setImagePreviewed(0);
        else setImagePreviewed(value);
    }

    function apply(e) {
        e.preventDefault();

        router.post(
            "/posting/apply",
            {
                posting_id: postingData.url,
            },
            {
                preserveScroll: true,
            }
        );
    }

    //map
    let map;

    //these are aproximate coordinates
    const coordinates = postingData.display_coordinates;

    useEffect(() => {
        setContentHeight(contentRef.current.clientHeight);

        const view = [coordinates.latitude, coordinates.longitude];
        map = L.map("map").setView(view, 12);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        L.circle([coordinates.latitude, coordinates.longitude], {
            color: "rgb(157, 157, 157)",
            fillColor: "rgb(190, 190, 190)",
            fillOpacity: 0.5,
            radius: 3000,
        }).addTo(map);

        return () => map.remove();
    }, []);

    return (
        <Layout>
            <Head title={postingData.title} />
            <div className={styles.mainContainer}>
                <div className={styles.imageContainer}>
                    <div className={styles.imagesPreviewContainer}>
                        <div className={styles.imagesPreview}>
                            {images[0] != null ||
                            images[1] != null ||
                            images[2] != null ? (
                                //if an image has been uploaded
                                <>
                                    <img
                                        src={images[imagePreviewed]}
                                        className={styles.image}
                                        alt={`Imagen ${imagePreviewed+1} de anuncio de ${postingData.title}`}
                                    />
                                    {images.length > 1 && (
                                        <>
                                            <ArrowButton
                                                width={"50px"}
                                                direction={"right"}
                                                click={() =>
                                                    changeImagePreviewed(
                                                        imagePreviewed + 1
                                                    )
                                                }
                                            />
                                            <ArrowButton
                                                width={"50px"}
                                                direction={"left"}
                                                click={() =>
                                                    changeImagePreviewed(
                                                        imagePreviewed - 1
                                                    )
                                                }
                                            />
                                        </>
                                    )}
                                </>
                            ) : (
                                <img
                                    src="/no-image.jpg"
                                    className={styles.image}
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.title}>
                        {postingData.title}
                        {postingData.isUserCreator &&
                            <button className={styles.viewApplicantsBtn} onClick={() => setJobApplicantsModal(true)}>
                                Ver aplicantes
                            </button>
                        }
                    </div>
                    <div className={styles.creator}>
                        Creador:{" "}
                        <Link
                            href={`/profile/show/${postingData.creatorUsername}`}
                        >
                            {postingData.creator}
                        </Link>
                    </div>
                    <div className={styles.price}>
                        {"Paga: $" + postingData.price}
                    </div>
                    <div className={styles.category}>
                        {"Categoría: " + postingData.category}
                    </div>
                    {!postingData.isUserCreator && (
                        <div className={styles.applyButtonContainer}>
                            {application_status != "rejected" ? (
                                <button
                                    className={`
                                            ${styles.applyButton} 
                                            ${
                                                application_status ==
                                                "requested"
                                                    ? styles.applyButton_requested
                                                    : styles.applyButton_request
                                            }`}
                                    onClick={(e) => apply(e)}
                                >
                                    <SendSVG width={"18px"} color={"white"} />
                                    <span>
                                        {application_status == "requested"
                                            ? "Solicitud enviada"
                                            : "Enviar solicitud"}
                                    </span>
                                </button>
                            ) : (
                                <span className={styles.rejected}>
                                    Tu solicitud fue rechazada por el autor
                                </span>
                            )}
                        </div>
                    )}
                    <div className={styles.description}>
                        <div className={styles.descriptionTitle}>
                            Descripción del trabajo
                        </div>
                        <div
                            ref={contentRef}
                            className={`${styles.descriptionContent} ${
                                !seeMore
                                    ? styles.hideContent
                                    : styles.showContent
                            }`}
                        >
                            {postingData.description}
                        </div>
                        {contentHeight > 31 && (
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setSeeMore(!seeMore)}
                                    className={styles.seeMoreBtn}
                                >
                                    {!seeMore ? "Ver más" : "Mostrar menos"}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={styles.location}>
                        <div className={styles.locationTitle}>
                            Ubicación aproximada
                        </div>
                        {postingData.isUserCreator && (
                            <div className={styles.selectedLocationName}>
                                {postingData.location_name}{" "}
                                {"(Solo tú puedes ver este nombre)"}
                            </div>
                        )}
                    </div>
                    <div className={styles.mapContainer}>
                        <div
                            style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: "6px",
                                border: "1px solid #d4d4d4",
                                cursor: "auto",
                                zIndex: 0,
                            }}
                            id="map"
                        ></div>
                    </div>
                </div>
            </div>
            {jobApplicantsModal && 
                <Suspense fallback={<LoadingModal />}>
                    <JobApplicantsList closeModal={() => setJobApplicantsModal(false)} postingUrl={postingData.url}/>
                </Suspense>
            }
        </Layout>
    );
}
