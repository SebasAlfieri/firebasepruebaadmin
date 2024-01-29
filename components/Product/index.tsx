import React from "react";
import { motion } from "framer-motion";
import s from "./Product.module.css";
import Image from "next/image";
import { deleteItem } from "@/lib/firebase";

const Product = ({
  id,
  name,
  value,
  img,
  deleteButton,
}: {
  id?: string;
  name: string;
  value: number | string;
  img?: string;
  deleteButton?: boolean;
}) => {
  async function handleDelete() {
    try {
      await deleteItem(id!);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return (
    <motion.div className={s.container}>
      {deleteButton && id && (
        <button className={s.container__delete} onClick={handleDelete}>
          X
        </button>
      )}
      {img && (
        <div className={s.container__image}>
          <Image src={img} width={200} height={200} alt={name} />
        </div>
      )}

      <div className={s.container__info}>
        <h3>{name}</h3>
        <p>${value}</p>
      </div>
    </motion.div>
  );
};

export default Product;
