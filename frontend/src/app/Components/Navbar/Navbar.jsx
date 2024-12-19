"use client"

import styles from "./Navbar.module.scss";
import Logotype from "../Logotype/Logotype";
import Link from "next/link";
import { useState } from "react";
import NotificationsButton from "../NotificationsButton/NotificationsButton";
//import NotificationsDropdown from "@/features/notificationstab/NotificationsDropdown";
import { useUser } from "@/api/hooks/user";
import { getUnreadNotificationsCount } from "@/utils/notification";
import UserDropdown from "../UserDropdown/UserDropdown";
import { useEffect } from "react";
import Searchbar from "../Searchbar/Searchbar";

export default function Navbar() {
    const [user] = useUser();
    const loggedIn = user != null;

    const [accountDropdown, setAccountDropdown] = useState(false);
    const [notificationsDropdown, setNotificationDropdown] = useState(false);

    //const { notifications, addNotification } = useNotifications();

    function isLeftClick(e) {
        return e.buttons === 1 || e.buttons === 0;
    }

    useEffect(() => {
        /**
        window.Echo.private(`notifications.` + user.id).listen(
            ".notification.received",
            (e) => {
                addNotification(e);
            }
        );
        */
    }, []);

    return (
        <div>
            <header
                className={`${styles.mainNavBar}`}
            >
                <div className={styles.logo}>
                    <Logotype width={"100px"} />
                </div>
                <Searchbar />
                <div className={styles["auth-buttons-container"]}>
                    {loggedIn ? (
                        <>
                            <div className={styles.notifications}>
                                <NotificationsButton
                                    count={getUnreadNotificationsCount(
                                        []
                                    )}
                                    click={() => {
                                        setNotificationDropdown(
                                            !notificationsDropdown
                                        );
                                        if (accountDropdown)
                                            setAccountDropdown(false);
                                    }}
                                />
                            </div>
                            <Link href={"/posting/create"}>
                                <button className={styles.createPostingBtn}>
                                    Crea un anuncio
                                </button>
                            </Link>
                            <div
                                className={styles.dropdown}
                                onFocus={(e) => {
                                    if (!isLeftClick(e)) return;

                                    setAccountDropdown(true);
                                    if (notificationsDropdown)
                                        setNotificationDropdown(false);
                                }}
                                onBlur={() => setAccountDropdown(false)}
                            >
                                <button
                                    tabIndex={0}
                                    className={styles["profile-btn"]}
                                    onMouseDown={(e) => {
                                        if (isLeftClick(e)) {
                                            if (notificationsDropdown)
                                                setNotificationDropdown(false);
                                            setAccountDropdown(
                                                !accountDropdown
                                            );
                                        }
                                    }}
                                >
                                    <img
                                        className={styles.pfp}
                                        src={
                                            user?.pfp_url ||
                                            "/images/default-pfp"
                                        }
                                    />
                                </button>
                                {accountDropdown && <UserDropdown />}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                href={"/login"}
                                className={styles["nav-bar-btn"]}
                            >
                                Inicia sesión
                            </Link>
                            <Link href={"/register"}>
                                <button className={styles["nav-bar-btn"]}>
                                    Regístrate
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
}
