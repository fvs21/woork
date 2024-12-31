"use client"

import { useEffect, useState } from "react"

type Dimensions = {
    width: number;
    height: number;
}

function getWindowDimensions(): Dimensions {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

export default function useWindowDimensions() {
    const [dimensions, setDimensions] = useState<Dimensions>(getWindowDimensions());


    useEffect(() => {
        function handleResize() {
            setDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return dimensions;
}

export function usePageScrollTop(): number {
    const [scrollTop, setScroll] = useState<number>(document.documentElement.scrollTop);

    useEffect(() => {
        function handleScroll() {
            setScroll(document.documentElement.scrollTop);
        }
        
        window.addEventListener('scroll', handleScroll);

        return () =>  window.removeEventListener('scroll', handleScroll)
    }, []);

    return scrollTop;
}