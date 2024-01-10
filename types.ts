import { Server, Member, Profile } from "@prisma/client"

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};


// In summary, ServerWithMembersWithProfiles is a 
// composite type that includes server-related 
// information and an array of members. Each member in
//  the array includes detailed information about its
//  associated profile. This type is useful when you 
// want to retrieve server data along with information 
// about its members and their profiles from a 
// database using Prisma.
// 