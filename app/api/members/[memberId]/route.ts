import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import currentProfile from "@/lib/current-profile";

export async function PATCH(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        // Retrieve the current profile using the currentProfile function
        const profile = await currentProfile();

        // Extract search parameters from the request URL
        const { searchParams } = new URL(req.url);

        // Extract role from the JSON body of the request
        const { role } = await req.json();

        // Extract serverId from the search parameters
        const serverId = searchParams.get("serverId");

        // Check if the user is authenticated (profile exists)
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if serverId is provided in the request
        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        // Check if memberId is provided in the request parameters
        if (!params.memberId) {
            return new NextResponse("Member ID missing", { status: 400 });
        }

        // Update the role of the specified member in the server
        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id,
                            },
                        },
                        data: {
                            role,
                        },
                    },
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc",
                    },
                },
            },
        });

        // Return a JSON response with the updated server information
        return NextResponse.json(server);
    } catch (error) {
        // Handle any errors that occur during the execution
        console.log("[MEMBERS_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: {
        params: { memberId: string }
    }) {
    try {
        // Retrieve the current profile using the currentProfile function
        const profile = await currentProfile();

        // Extract search parameters from the request URL
        const { searchParams } = new URL(req.url);

        // Extract serverId from the search parameters
        const serverId = searchParams.get("serverId");

        // Check if the user is authenticated (profile exists)
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if serverId is provided in the request
        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        // Check if memberId is provided in the request parameters
        if (!params.memberId) {
            return new NextResponse("Member ID missing", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id,
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        });

        // Return a JSON response with the updated server information
        return NextResponse.json(server);

    } catch (error) {
        console.log("MEMBER_ID_DELETE", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

