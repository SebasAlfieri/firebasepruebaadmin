import React from "react";
import { motion } from "framer-motion";
import s from "./Product.module.css";
import Image from "next/image";

const Product = ({
  name,
  value,
  img,
  deleteButton,
}: {
  name: string;
  value: number | string;
  img?: string;
  deleteButton?: boolean;
}) => {
  return (
    <motion.div className={s.container}>
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
