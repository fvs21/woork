"use client";

import { QueryClientProvider, QueryClient } from "react-query";

export default function Provider({ children }) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}