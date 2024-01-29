"use client";
import React, { useEffect, useState } from "react";
import s from "./Products.module.css";
import { getItems } from "@/lib/firebase";
import { ProductProps } from "@/types/model";
import { Product } from "@/components";

const Products = ({ admin }: { admin?: boolean }) => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getItems().then((respuestaDatos) => setData(respuestaDatos));
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupedProducts: { [key: string]: ProductProps[] } = {};

  data.forEach((product: ProductProps) => {
    const { type } = product;
    if (!groupedProducts[type]) {
      groupedProducts[type] = [];
    }
    groupedProducts[type].push(product);
  });

  return (
    <div className={s.container}>
      {/* <button onClick={() => console.log(data)}>test</button> */}
      {Object.keys(groupedProducts).map((type) => (
        <div key={type}>
          <h3>{type}</h3>
          {groupedProducts[type].map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              value={product.value}
              img={product.image}
              deleteButton={admin}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Products;
