import { NextResponse } from "next/server"; // Importing NextResponse type from Next.js for handling server responses
import { Message } from "@prisma/client"; // Importing Message type from Prisma client for type safety

import currentProfile from "@/lib/current-profile"; // Importing currentProfile function from lib for fetching the current user's profile
import { db } from "@/lib/db"; // Importing database instance from lib for database operations

const MESSAGES_BATCH = 10; // Define the number of messages to fetch in each batch

export async function GET(
    req: Request // Handler function for GET requests
) {
    try {
        const profile = await currentProfile(); // Fetch the current user's profile
        const { searchParams } = new URL(req.url); // Extract search parameters from the request URL

        const cursor = searchParams.get("cursor"); // Get the cursor parameter from the search parameters
        const channelId = searchParams.get("channelId"); // Get the channelId parameter from the search parameters

        // Check if user is authenticated
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 }); // Return unauthorized response if user is not authenticated
        }

        // Check if channelId is provided
        if (!channelId) {
            return new NextResponse("Channel ID missing", { status: 400 }); // Return bad request response if channelId is missing
        }

        let messages: Message[] = []; // Initialize an array to store fetched messages

        // Fetch messages based on cursor if provided
        if (cursor) {
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                skip: 1, // Skip the cursor message itself
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true, // Include profile details of message sender
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc", // Order messages by createdAt field in descending order
                }
            })
        } else { // Fetch messages without cursor (initial fetch)
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true, // Include profile details of message sender
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc", // Order messages by createdAt field in descending order
                }
            });
        }

        let nextCursor = null; // Initialize variable to store next cursor value

        // Determine if there are more messages to fetch
        if (messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id; // Set nextCursor to the last message id in the batch
        }

        // Return JSON response with fetched messages and next cursor
        return NextResponse.json({
            items: messages,
            nextCursor
        });
    } catch (error) { // Catch and handle errors
        console.log("[MESSAGES_GET]", error); // Log error for debugging purposes
        return new NextResponse("Internal Error", { status: 500 }); // Return internal server error response
    }
}
