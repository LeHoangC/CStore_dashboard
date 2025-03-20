import { useState } from 'react';

const useModal = () => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        itemId: null,
        action: null,
    });

    const openModal = (itemId, action) => {
        setModalState({
            isOpen: true,
            itemId,
            action,
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            itemId: null,
            action: null,
        });
    };

    return { modalState, openModal, closeModal };
};

export default useModal;