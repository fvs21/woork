"use client";

import Link from "next/link";
import styles from "./Posting.module.scss";
import { useLayoutEffect, useRef, useState } from "react";
import ArrowButton from "@/components/ArrowButton/ArrowButton";
import SendSVG from "@/components/SVGs/Send";
import "leaflet/dist/leaflet.css";
import "leaflet";
import { lazy } from "react";
import { Suspense } from "react";
import LoadingModal from "@/components/LoadingModal/LoadingModal";
import { useApplyToJob, usePosting } from "@/api/hooks/postings";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { useUser } from "@/api/hooks/user";
import { useRouter } from "next/navigation";

const JobApplicantsList = lazy(() =>
  import("@/features/postingsdashboard/JobApplicantsList")
);

export default function PostingView({ id }) {
  const [user] = useUser();
  const isAuth = user != null;

  const { data, isLoading, isError } = usePosting(id);

  const postingData = data?.data;
  const application_status = data?.postingApplicationStatus;

  const images = postingData?.images_urls;

  const [imagePreviewed, setImagePreviewed] = useState(0);
  const [seeMore, setSeeMore] = useState(false);

  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState();

  const [jobApplicantsModal, setJobApplicantsModal] = useState(false);

  const { apply } = useApplyToJob(id);
  const router = useRouter();

  function changeImagePreviewed(value) {
    if (value < 0) setImagePreviewed(images.length - 1);
    else if (value > images.length - 1) setImagePreviewed(0);
    else setImagePreviewed(value);
  }

  async function applyToJob(e) {
    e.preventDefault();

    if(!isAuth) {
      router.push("/login");
      return;
    }

    try {
      await apply();
    } catch(error) {
      console.log(error);
    }
  }

  //map
  let map;

  //these are aproximate coordinates
  const coordinates = postingData?.display_coordinates;

  useLayoutEffect(() => {
    if (isLoading || isError) return;

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
  }, [isLoading]);

  if(isLoading || isError) 
    return <LoadingScreen />;

  return (
    <div className={styles.mainContainer}>
      <title>{"Woork - " + postingData?.title}</title>
      <div className={styles.imageContainer}>
        <div className={styles.imagesPreviewContainer}>
          <div className={styles.imagesPreview}>
            {images[0] != null || images[1] != null || images[2] != null ? (
              //if an image has been uploaded
              <>
                <img
                  src={images[imagePreviewed]}
                  className={styles.image}
                  alt={`Imagen ${imagePreviewed + 1} de anuncio de ${
                    postingData.title
                  }`}
                />
                {images.length > 1 && (
                  <>
                    <ArrowButton
                      width={"50px"}
                      direction={"right"}
                      click={() => changeImagePreviewed(imagePreviewed + 1)}
                    />
                    <ArrowButton
                      width={"50px"}
                      direction={"left"}
                      click={() => changeImagePreviewed(imagePreviewed - 1)}
                    />
                  </>
                )}
              </>
            ) : (
              <img src="/no-image.jpg" className={styles.image} alt="" />
            )}
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          {postingData.title}
          {postingData.userCreator && (
            <button
              className={styles.viewApplicantsBtn}
              onClick={() => setJobApplicantsModal(true)}
            >
              Ver aplicantes
            </button>
          )}
        </div>
        <div className={styles.creator}>
          Creador:{" "}
          <Link href={`/profile/show/${postingData.creatorUsername}`}>
            {postingData.creator}
          </Link>
        </div>
        <div className={styles.price}>{"Paga: $" + postingData.price}</div>
        <div className={styles.category}>
          {"Categoría: " + postingData.category}
        </div>
        {!postingData.userCreator && (
          <div className={styles.applyButtonContainer}>
            {application_status != "rejected" ? (
              <button
                className={`
                    ${styles.applyButton} 
                    ${
                        application_status == "requested"
                        ? styles.applyButton_requested
                        : styles.applyButton_request
                    }`}
                onClick={(e) => applyToJob(e)}
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
          <div className={styles.descriptionTitle}>Descripción del trabajo</div>
          <div
            ref={contentRef}
            className={`${styles.descriptionContent} ${
              !seeMore ? styles.hideContent : styles.showContent
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
          <div className={styles.locationTitle}>Ubicación aproximada</div>
          {postingData.userCreator && (
            <div className={styles.selectedLocationName}>
              {postingData.location_name} {"(Solo tú puedes ver este nombre)"}
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
      {jobApplicantsModal && (
        <Suspense fallback={<LoadingModal />}>
          <JobApplicantsList
            closeModal={() => setJobApplicantsModal(false)}
            postingUrl={postingData.url}
          />
        </Suspense>
      )}
    </div>
  );
}
