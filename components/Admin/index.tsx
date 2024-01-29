"use client";
import React, { useCallback } from "react";
import _ from "lodash";
import { Modal, ItemCreator } from "@/components";
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

  return (
    <div>
      <button onClick={handleClickModal}>crear</button>
      {current && _.isEqual(current, "item-creator") && (
        <Modal key="item-creator">
          <ItemCreator />
        </Modal>
      )}
    </div>
  );
};

export default Admin;
