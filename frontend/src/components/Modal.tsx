"use client";

import { useEffect, useRef, useState } from "react";
import './Modal.css'

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Function;
  onOpen?: Function;
  onClose?: Function;
};

export const Modal = (props: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null)

  const closeModal = () => {
    if (props.onClose) props.onClose();
    setIsClosing(true);
    setTimeout(() => {
      props.setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (props.onOpen) props.onOpen();
  }, []);

  useEffect(() => {
    if (!modalRef.current) return
    const closeButton = modalRef.current.querySelector("#close-button") as HTMLButtonElement
    if (!closeButton) return
    closeButton.onclick = closeModal
  }, [props.children])

  return (
    props.isOpen && (
      <div
        ref={modalRef}
        onClick={closeModal}
        className={`modal-container ${
          isClosing ? "modal-container-vanish" : ""
        }`}
      >
        <article
          onClick={(e) => e.stopPropagation()}
          className={`modal ${isClosing ? "modal-shrink" : "modal-grow"}`}
        >
          {props.children}
        </article>
      </div>
    )
  );
};
