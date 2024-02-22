import { useEffect, useState } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>; // Reference to the chat container element
    bottomRef: React.RefObject<HTMLDivElement>; // Reference to the bottom sentinel element
    shouldLoadMore: boolean; // Flag indicating whether more messages should be loaded
    loadMore: () => void; // Function to load more messages
    count: number; // Total count of messages
}

export default function useChatScroll({
    chatRef, bottomRef, shouldLoadMore, loadMore, count
}: ChatScrollProps) {
    const [hasInitialized, setHasInitialized] = useState(false); // State to track initialization

    useEffect(() => {
        const topDiv = chatRef?.current; // Reference to the chat container element

        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop; // Scroll position from the top

            // Check if user has scrolled to the top and more messages should be loaded
            if (scrollTop === 0 && shouldLoadMore) {
                loadMore(); // Load more messages
            };
        };
        topDiv?.addEventListener("scroll", handleScroll); // Attach scroll event listener

        return () => {
            topDiv?.removeEventListener("scroll", handleScroll); // Clean up event listener
        }

    }, [shouldLoadMore, loadMore, chatRef]); // Dependencies for useEffect

    useEffect(() => {
        const bottomDiv = bottomRef?.current; // Reference to the bottom sentinel element
        const topDiv = chatRef.current; // Reference to the chat container element

        // Function to determine whether auto-scrolling should occur
        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true); // Set initialization state
                return true; // Auto-scroll if just initialized
            }

            if (!topDiv) {
                return false; // Don't auto-scroll if chat container is not available
            }

            // Calculate distance from bottom to current scroll position
            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;

            // Auto-scroll if distance from bottom is within threshold
            return distanceFromBottom <= 100;
        };

        // Auto-scroll to bottom of chat if conditions are met
        if (shouldAutoScroll()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth" // Smooth scrolling animation
                })
            }, 100) // Delay before scrolling to ensure rendering is complete
        }
    }, [bottomRef, chatRef, count, hasInitialized]); // Dependencies for useEffect
}
