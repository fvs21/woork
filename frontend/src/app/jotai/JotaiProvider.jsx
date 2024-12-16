import { useEffect, useState } from "react";
import { mainStore, setStore } from "./store";
import { Provider } from "jotai";
import LoadingScreen from "@/Components/LoadingScreen/LoadingScreen";

function JotaiContainer({pageProps, children}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setStore(pageProps);
        setIsLoading(false);
    }, [pageProps]);

    if(isLoading)
        return <LoadingScreen />

    return <>
        <Provider store={mainStore}>
            {children}
        </Provider>
    </>;
}

export default function JotaiProvider({ pageProps, children }) {
    return (
        <JotaiContainer pageProps={pageProps}>
            {children}
        </JotaiContainer>
    )
}