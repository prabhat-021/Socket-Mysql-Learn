"use client";

// Importing necessary modules from React
import { createContext, useContext, useEffect, useState } from "react";
// Importing socket.io-client library for creating a WebSocket client
import { io as cleintIO } from "socket.io-client";

// Defining the type for the context value
type SocketContextType = {
    socket: any | null; // Socket object or null
    isConnected: boolean; // Boolean flag indicating whether the socket is connected
}

// Creating a context with initial values for socket and connection status
const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
})

// Custom hook for accessing the socket context
export const useSocket = () => {
    return useContext(SocketContext);
}

// SocketProvider component to provide the socket context to its children
export const SocketProvider = ({
    children
}: { children: React.ReactNode }) => {
    // State variables to hold the socket object and connection status
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    // Effect hook to run once after the component mounts
    useEffect(() => {
        // Creating a new socket instance with the provided URL and options
        const socketInstance = new (cleintIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false,
        });

        // Event listener for the 'connect' event
        socketInstance.on("connect", () => {
            // Setting the connection status to true when connected
            setIsConnected(true);
        });

        // Event listener for the 'disconnect' event
        socketInstance.on("disconnect", () => {
            // Setting the connection status to false when disconnected
            setIsConnected(false);
        });

        // Setting the socket object to the created socket instance
        setSocket(socketInstance)

        // Cleanup function to disconnect the socket when the component unmounts
        return () => {
            socketInstance.disconnect();
        }

    }, []); // Dependency array to run the effect only once

    // Providing the socket context value to its children
    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}
