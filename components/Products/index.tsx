"use client";
import React, { useEffect, useState } from "react";
import s from "./Products.module.css";
import { getItems } from "@/lib/firebase";
import ProductsList from "../ProductsList";

const Products = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getItems().then((respuestaDatos) => setData(respuestaDatos));
    console.log(data);
  }, []);

  return (
    <div className={s.container}>
      <ProductsList data={data} />
    </div>
  );
};

export default Products;
