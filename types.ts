import { Server as NetServer, Socket } from "net"; // Importing classes from the "net" module for creating a TCP server
import { NextApiResponse } from "next"; // Importing Next.js API response type
import { Server as SocketIoServer } from "socket.io"; // Importing Server class from the "socket.io" module for creating a WebSocket server

import { Server, Member, Profile } from "@prisma/client"

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

// Define a custom type NextApiResponseServerIo that extends NextApiResponse
export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & { // Define a nested property "socket" of type Socket
    server: NetServer & { // Define a nested property "server" of type NetServer
      io: SocketIoServer; // Add a property "io" of type SocketIoServer (Socket.io server instance)
    }
  }
}


// In summary, ServerWithMembersWithProfiles is a
// composite type that includes server-related
// information and an array of members. Each member in
//  the array includes detailed information about its
//  associated profile. This type is useful when you
// want to retrieve server data along with information
// about its members and their profiles from a
// database using Prisma.
// 