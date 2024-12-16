import { useEffect, useState } from "react"

function getWindowDimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

export default function useWindowDimensions() {
    const [dimensions, setDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return dimensions;
}

export function usePageScrollTop() {
    const [scrollTop, setScroll] = useState(document.documentElement.scrollTop);

    useEffect(() => {
        function handleScroll() {
            setScroll(document.documentElement.scrollTop);
        }
        
        window.addEventListener('scroll', handleScroll);

        return () =>  window.removeEventListener('scroll', handleScroll)
    }, []);

    return scrollTop;
}