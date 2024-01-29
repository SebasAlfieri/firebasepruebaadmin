"use client";
import React, { useEffect, useState } from "react";
import s from "./Products.module.css";
import { getItems } from "@/lib/firebase";

interface Product {
  id: string;
  nombre: string;
  valor: string;
  tipo: string;
}

const Products = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getItems().then((respuestaDatos) => setData(respuestaDatos));
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupedProducts: { [key: string]: Product[] } = {};

  data.forEach((product: Product) => {
    const { tipo } = product;
    if (!groupedProducts[tipo]) {
      groupedProducts[tipo] = [];
    }
    groupedProducts[tipo].push(product);
  });

  return (
    <div className={s.container}>
      <button onClick={() => console.log(data)}>test</button>
      {Object.keys(groupedProducts).map((tipo) => (
        <div key={tipo}>
          <h3>{tipo}</h3>
          <ul>
            {groupedProducts[tipo].map((product) => (
              <li key={product.id}>
                {product.nombre} - {product.valor}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Products;
