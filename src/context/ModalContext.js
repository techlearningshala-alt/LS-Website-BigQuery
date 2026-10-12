// context/ModalContext.js
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openModalId, setOpenModalId] = useState(null);

  const openModal = (id) => setOpenModalId(id);
  const closeModal = () => setOpenModalId(null);

  return (
    <ModalContext.Provider value={{ openModalId, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook for easier usage
export const useModal = () => useContext(ModalContext);
