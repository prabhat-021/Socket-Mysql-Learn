"use client"

// Define the interface for the props of a component or function dealing with server search results
interface ServerSearchProps {
    // An array of objects, each representing a category of search results on the server
    data: {
        // The label or title of the search category (e.g., "Channels" or "Members")
        label: string;
        // The type of search results within the category, specifying whether it's related to channels or members
        type: "channel" | "member";
        // An array of objects representing the actual search results within the category
        data: {
            // An icon associated with the search result (React.ReactNode)
            icon: React.ReactNode;
            // The name or title of the search result
            name: string;
            // The unique identifier of the search result
            id: string;
        }[] | undefined; // The type also includes undefined, allowing for no search results in a particular category
    }[];
}

export default function ServerSearch({
    data
}: ServerSearchProps) {
    return (
        <div>
            this is  my server search
        </div>
    )
}