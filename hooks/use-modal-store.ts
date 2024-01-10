// Importing the `create` function from `zustand`
import { create } from "zustand";

// Define the possible modal types
export type ModalType = "createServer";

// Define the modal store interface
interface ModalStore {
    type: ModalType | null; // Current modal type or null if no modal is open
    isOpen: boolean; // Boolean indicating whether the modal is open or closed
    onOpen: (type: ModalType) => void; // Function to open a modal of a specific type
    onClose: () => void; // Function to close the currently open modal
}

// Create and export the `useModal` store
export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set({ isOpen: true, type }), // Open a modal of the specified type
    onClose: () => set({ type: null, isOpen: false }), // Close the currently open modal
}));
