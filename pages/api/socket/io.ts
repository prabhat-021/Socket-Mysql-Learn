import { NextApiResponseServerIo } from "@/types"; // Importing custom Next.js API response type that includes WebSocket support
import { Server as NetServer } from "http"; // Importing classes from the "http" module for creating an HTTP server
import { NextApiRequest } from "next"; // Importing Next.js API request type
import { Server as SocketIO } from "socket.io"; // Importing Server class from the "socket.io" module for creating a WebSocket server

// Configuration object for the API route
export const config = {
    api: {
        bodyParser: false // Disabling default body parsing for the API route
    }
}

// API route handler function for handling WebSocket connections
export default function ioHandler(req: NextApiRequest, res: NextApiResponseServerIo) {
    // Check if the WebSocket server instance is not already created
    if (!res.socket.server.io) {
        const path = "/api/socket/io"; // Define the WebSocket server path
        const httpServer: NetServer = res.socket.server as any; // Get the underlying HTTP server
        const io = new SocketIO(httpServer, { // Create a new Socket.io server instance
            path: path, // Specify the WebSocket server path
            addTrailingSlash: false // Disable adding trailing slashes to the WebSocket server path
        });

        res.end(); // End the HTTP response (WebSocket server is now initialized)
    }
}
