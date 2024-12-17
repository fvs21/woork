import styles from "./JobFilters.module.scss";
import JobCategoryButton from "@/components/JobCategoryButton/JobCategoryButton";
import { router } from "@inertiajs/react";
import { CategoriesList } from "@/services/Categories";
import LocationSVG from "@/components/SVGs/Location";
import { useEffect, useRef, useState } from "react";
import ArrowBackSVG from "@/components/SVGs/ArrowBack";
import ArrowRightSVG from "@/components/SVGs/ArrowRight";
import useWindowDimensions from "@/hooks/window";
import { useSearchLocation } from "@/jotai/user";
import { useTheme } from "@/hooks/theme";
import { lazy } from "react";
import { Suspense } from "react";
import LoadingModal from "@/components/LoadingModal/LoadingModal";

const LocationFilter = lazy(() => import("./LocationFilter"));

export default function JobFilters({category, setCategory}) {
    const [locationFilter, setLocationFilter] = useState(false);
    const categoriesRef = useRef(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollEnd, setScrollEnd] = useState(false);
    const {width} = useWindowDimensions();

    const [searchLocation] = useSearchLocation();

    const [theme] = useTheme();

    const color = theme == 'dark' ? "white" : "black";

    function clickCategory(category) {
        setCategory(category);
        if(searchLocation?.id)
            router.visit(`/explore/${searchLocation.id}?category_tag=${category}`);
        else
            router.visit(`/explore?category_tag=${category}`);
    }

    function scrollToRight() {
        const shift = scrollLeft + (width - 140 - 60 - 20 - 60);
        categoriesRef.current.scrollLeft = shift;
        setScrollLeft(categoriesRef.current.scrollLeft);
        checkEnd();
    }

    function scrollToLeft() {
        const shift = scrollLeft - (width - 140 - 60 - 20 - 60);
        categoriesRef.current.scrollLeft = shift;
        setScrollLeft(categoriesRef.current.scrollLeft);
        checkEnd();
    }

    function checkEnd() {
        if (Math.floor(categoriesRef.current.scrollWidth - categoriesRef.current.scrollLeft) <= categoriesRef.current.offsetWidth) {
            setScrollEnd(true);
        } else {
            setScrollEnd(false);
        }
    }

    useEffect(() => {
        setScrollLeft(categoriesRef.current.scrollLeft);
        checkEnd();
    }, [width]);

    return (
        <div ref={categoriesRef} className={styles.jobFiltersContainer}>
            <div className={styles.locationSelectorContainer}>
                <button 
                    className={styles.locationSelector}
                    onClick={() => setLocationFilter(true)}>
                    <div>
                        <LocationSVG width={"25px"} color={color}/>
                    </div>
                    <div>
                        Elegir ubicación
                    </div>
                </button>
            </div>
            <div className={styles.categoriesListContainer}>
                <div className={styles.leftArrowedButtonContainer}>
                    {scrollLeft > 0 && 
                        <button 
                            className={styles.arrowedButton}
                            onClick={() => scrollToLeft()}>
                                <ArrowBackSVG width={"20px"} color={color}/>
                        </button>
                    }
                </div>
                <div className={styles.categoriesList}>
                    {CategoriesList.map(function(cat, i) {
                        return <JobCategoryButton 
                            key={cat.name}
                            name={cat.name}
                            selected={category == cat.tag}
                            icon={cat.icon}
                            click={() => clickCategory(cat.tag)}
                        />
                    })}
                </div>
                <div className={styles.rightArrowedButtonContainer}>
                    {!scrollEnd && 
                        <button 
                            className={styles.arrowedButton}
                            onClick={(() => scrollToRight())}>
                                <ArrowRightSVG width={"20px"} color={color}/>
                        </button>
                    }
                </div>
            </div>
            {locationFilter && 
                <Suspense fallback={<LoadingModal />}>
                    <LocationFilter 
                        setDisplayModal={setLocationFilter}/>
                </Suspense>
            }
        </div>
    )
}