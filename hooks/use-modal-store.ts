// Importing the `create` function from `zustand`
import { create } from "zustand";
import { Server } from "@prisma/client";

// Define the possible modal types
export type ModalType = "createServer" | "invite" | "editServer" | "members";

interface ModalData {
    server?: Server
}
// Define the modal store interface
interface ModalStore {
    type: ModalType | null; // Current modal type or null if no modal is open
    data: ModalData;
    isOpen: boolean; // Boolean indicating whether the modal is open or closed
    onOpen: (type: ModalType, data?: ModalData) => void; // Function to open a modal of a specific type
    onClose: () => void; // Function to close the currently open modal
}

// Create and export the `useModal` store
export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }), // Open a modal of the specified type
    onClose: () => set({ type: null, isOpen: false }), // Close the currently open modal
}));
