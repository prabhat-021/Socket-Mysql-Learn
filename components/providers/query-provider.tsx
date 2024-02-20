"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
    children
}: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

// By wrapping the root of the component tree with
// QueryProvider, all child components within the tree
//  can use React Query hooks like useQuery and 
// useMutation to interact with the query client and 
// manage data fetching and caching.
// 
