"use client";

import CreateServerModal from "@/components/models/create-server-modal";
import { useEffect, useState } from "react";
import InviteModal from "@/components/models/invite-modal";
import EditServerModal from "@/components/models/edit-server-modal";
import MembersModal from "@/components/models/members-modal";
import CreateChannelModal from "@/components/models/create-channel-modal";
import LeaveServerModal from "@/components/models/leave-server-modal";
import DeleteServerModal from "@/components/models/delete-server-modal";
import DeleteChannelModal from "@/components/models/delete-channel-model";

export const ModalProvider = () => {

    const [isMounted, setIsmounted] = useState(false);

    useEffect(() => {
        setIsmounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
            <DeleteChannelModal />
        </>
    )
}