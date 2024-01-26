"use client"

import { Search } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    }, []);

    const router = useRouter();
    const params = useParams();

    const onClick = ({ id, type }: { id: string, type: "channel" | "member" }) => {
        setOpen(false);

        if (type == "member") {
            return router.push(`/servers/${params?.serverId}/conversations/${id}`);
        }

        if (type === "channel") {
            return router.push(`/servers/${params?.serverId}/channels/${id}`);
        }
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition  "
            >
                <Search
                    className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <p
                    className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition ">
                    Search
                </p>
                <kbd
                    className="h-5 pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span className="text-xs">ctrl</span>k
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members" />
                <CommandList>
                    <CommandEmpty>
                        No Results found
                    </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;

                        return (

                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, icon, name }) => {
                                    return (
                                        <CommandItem
                                            onSelect={() => onClick({ id, type })}
                                            key={id}
                                        >
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    }
                    )}
                </CommandList>
            </CommandDialog>
        </>
    )
}