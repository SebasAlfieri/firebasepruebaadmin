"use client";
import React, { useCallback } from "react";
import _ from "lodash";
import { Modal, ItemCreator, Products } from "@/components";
import {
  useModalState,
  useModalDispatch,
  toggleModal,
} from "@/context/ModalContext";

const Admin = () => {
  const { current } = useModalState();
  const dispatch = useModalDispatch();

  const handleClickModal = useCallback(() => {
    dispatch(toggleModal(`item-creator`));
  }, [dispatch]);

  const handleClickLogout = () => {
    localStorage.removeItem("ps");
    window.location.reload();
  };

  return (
    <div>
      <button onClick={handleClickLogout}>cerrar sesión</button>
      <button onClick={handleClickModal}>crear</button>
      {current && _.isEqual(current, "item-creator") && (
        <Modal key="item-creator">
          <ItemCreator />
        </Modal>
      )}
      <Products />
    </div>
  );
};

export default Admin;
