import { useSocket } from "@/components/providers/socket-provider"; // Importing custom hook to access socket context
import { Member, Message, Profile } from "@prisma/client"; // Importing types from Prisma client for type safety
import { useQueryClient } from "@tanstack/react-query"; // Importing hook to access query client for React Query
import { useEffect } from "react"; // Importing useEffect hook from React for side effects

type ChatSocketProps = {
    addKey: string; // Key for add event from socket
    updateKey: string; // Key for update event from socket
    queryKey: string; // Key for query data in React Query
}

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile; // Message type extended with member and profile details
    }
}

export default function useChatSocket({
    addKey, updateKey, queryKey
}: ChatSocketProps) {
    const { socket } = useSocket(); // Accessing socket object from socket context
    const queryClient = useQueryClient(); // Accessing query client from React Query

    useEffect(() => {
        if (!socket) return; // Return if socket is not available

        // Listen for update events from socket
        socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
            // Update query data in React Query cache
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    // If no previous data exists, return old data
                    return oldData;
                }

                // Map through old data pages to update the message
                const newData = oldData.pages.map((page: any) => {
                    return {
                        ...page,
                        items: page.item.map((item: MessageWithMemberWithProfile) => {
                            if (item.id === message.id) {
                                // Replace old message with updated message
                                return message;
                            }
                            return item;
                        })
                    }
                });

                return {
                    ...oldData,
                    pages: newData // Return updated data
                }
            });
        });

        // Listen for add events from socket
        socket.on(addKey, (message: MessageWithMemberWithProfile) => {
            // Update query data in React Query cache
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    // If no previous data exists, create new data with the message
                    return {
                        pages: [{
                            items: [message],
                        }]
                    }
                }

                // If previous data exists, prepend the new message to the existing data
                const newData = [...oldData.pages];

                newData[0] = {
                    ...newData[0],
                    items: [
                        message,
                        ...newData[0].items,
                    ]
                };

                return {
                    ...oldData,
                    pages: newData, // Return updated data
                }
            });
        });

        // Clean up socket event listeners when component unmounts
        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        }

    }, [queryClient, addKey, queryKey, socket, updateKey]); // Dependencies for useEffect
}

// Sure, here's a brief explanation of each socket function in the `useChatSocket` hook:

// 1. **Socket Initialization**: 
//    - The `useEffect` hook runs when the component mounts.
//    - It checks if the `socket` object is available. If not, it returns early.

// 2. **Update Event Listener**:
//    - The `socket.on(updateKey, ...)` function listens for "update" events from the socket.
//    - When an "update" event occurs, it triggers the callback function.
//    - Inside the callback function:
//      - It updates the query data in the React Query cache.
//      - It checks if there is existing data in the cache.
//      - If there is existing data, it maps through the pages and updates the message if found.
//      - If the message is found, it replaces the old message with the updated message.
//      - It returns the updated data to be stored in the cache.

// 3. **Add Event Listener**:
//    - The `socket.on(addKey, ...)` function listens for "add" events from the socket.
//    - When an "add" event occurs, it triggers the callback function.
//    - Inside the callback function:
//      - It updates the query data in the React Query cache.
//      - It checks if there is existing data in the cache.
//      - If there is no existing data, it creates a new data structure with the new message.
//      - If there is existing data, it prepends the new message to the existing data.
//      - It returns the updated data to be stored in the cache.

// 4. **Cleanup**:
//    - The `return` statement inside `useEffect` is a cleanup function.
//    - It removes the event listeners for "add" and "update" when the component unmounts.

// Overall, these socket functions ensure that the React Query cache is updated in real-time when new messages are added or existing messages are updated in the chat application.