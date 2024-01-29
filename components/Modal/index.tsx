import React, { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactSVG } from "react-svg";
import s from "./Modal.module.css";
import {
  useModalState,
  useModalDispatch,
  closeModal,
} from "@/context/ModalContext";
import useLockBodyScroll from "@/hooks/use-lock-body-scroll";
// import { Button } from '@/components';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

interface ModalProps {
  children: React.ReactNode;
  plantas?: boolean;
  default?: boolean;
}

const ModalBody: FC<ModalProps> = ({ children, plantas }) => {
  const dispatch = useModalDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };

  useLockBodyScroll();
  return (
    <motion.div
      className={s.modal}
      key="modal"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className={s.modal__container}>
        {children}
        {plantas ? (
          <button className={s.modal__buttonPlantas} onClick={handleClose}>
            <ReactSVG src={"/icons/menu-cerrar.svg"} width={31} height={31} />
          </button>
        ) : (
          <div className={s.modal__button}>
            {/* <Button label="CERRAR" onClick={handleClose} /> */}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Modal: FC<ModalProps> = ({ children, plantas }) => {
  const state = useModalState();
  return (
    <>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {plantas
          ? state.visible && <ModalBody plantas>{children}</ModalBody>
          : state.visible && <ModalBody>{children}</ModalBody>}
      </AnimatePresence>
    </>
  );
};

export default Modal;
