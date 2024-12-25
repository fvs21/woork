"use client"

import styles from "./PostingsDashboard.module.scss";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import dayjs from "dayjs";
import { useUser } from "@/api/hooks/user";
import React from "react";

type PostingsDashboardLayoutProps = {
    option: number;
    children: React.ReactNode
}

export default function PostingsDashboardLayout({option, children}: PostingsDashboardLayoutProps) {
    const [user] = useUser();
    const time: number = dayjs().hour();

    return (
        <section>
            <div className={styles.postingsDashboardContainer}>
                <div className={`${styles.postingsDashboardHeader} ${styles.spacer}`}>
                    ¡{time >= 12 ? "Buenas tardes" : "Buenos días"}, {user.firstName}!
                    <Link href="/posting/create" className={styles.createPostingLink}>Crear anuncio</Link>
                </div>
                <div className={styles.spacer}>
                    <hr style={{marginTop: "1.25rem"}} className="hr-line"/>
                </div>
                <div className={`${styles.optionSelector} ${styles.spacer}`}>
                    <Link href="/jobs" className={option == 0 ? styles.selectedOption : styles.option} aria-disabled={option == 0}>
                        Trabajos pendientes
                    </Link>
                    <Link href="/jobs/postings" className={option == 1 ? styles.selectedOption : styles.option} aria-disabled={option == 1}>
                        Anuncios creados
                    </Link>
                </div>
                <div className={`${styles.pendingJobsContainer} ${styles.spacer}`}>
                    {children}
                </div>
            </div>
            <Footer />
        </section>
    )
}