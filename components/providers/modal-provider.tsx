"use client";

import CreateServerModal from "@/components/models/create-server-modal";
import { useEffect, useState } from "react";
import InviteModal from "@/components/models/invite-modal";
import EditServerModal from "@/components/models/edit-server-modal";

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
        </>
    )
}