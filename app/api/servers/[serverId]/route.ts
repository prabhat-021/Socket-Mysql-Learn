import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();
        const { name, imageUrl } = await req.json();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id,
            },
            data: {
                name,
                imageUrl,
            }
        });

        return NextResponse.json(server);

    } catch (error) {

        console.log("[SERVER_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


// Define the route handler for deleting a server
export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
    try {
        // Retrieve the current user's profile
        const profile = await currentProfile();

        // Check if the user is authenticated (profile exists)
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the server with the provided serverId exists and is owned by the current profile
        const existingServer = await db.server.findFirst({
            where: {
                id: params.serverId,
                profileId: profile.id,
            },
        });

        // If the server doesn't exist or is not owned by the current profile, return an error
        if (!existingServer) {
            return new NextResponse("Server not found or unauthorized", { status: 404 });
        }

        // Delete the server and its associated data (channels, members, etc.)
        const server = await db.server.delete({
            where: {
                id: params.serverId,
            },
        });

        // Return a success response
        return NextResponse.json(server);
        
    } catch (error) {
        // Handle any errors that occur during the execution
        console.log("[SERVER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
