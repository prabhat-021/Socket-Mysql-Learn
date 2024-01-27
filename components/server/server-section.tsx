"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "@/components/action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

// Define an interface named ServersectionProps to describe the expected shape of props for a component
interface ServerSectionProps {
    // A required property representing the label for the section
    label: string;
    // An optional property representing the role of the member
    role?: MemberRole;
    // A required property indicating the type of section ("channel" or "member")
    sectionType: "channels" | "members";
    // An optional property representing the type of channel
    channelType?: ChannelType;
    // An optional property representing server details including members and profiles
    server?: ServerWithMembersWithProfiles;
};

export default function ServerSection({
    label, role, sectionType, channelType, server
}: ServerSectionProps) {

    const { onOpen } = useModal();

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label="Create Channel" side="top">
                    <button
                        onClick={() => onOpen("createChannels")}
                        className="text-zinc-500 hover:text-zinc-600 drak:text-zinc-400 dark:hover::text-zinc-300 transition"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
            {role !== MemberRole.ADMIN && sectionType === "members" && (
                <ActionTooltip label="Create Channel" side="top">
                    <button
                        onClick={() => onOpen("members", { server })}
                        className="text-zinc-500 hover:text-zinc-600 drak:text-zinc-400 dark:hover::text-zinc-300 transition"
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}