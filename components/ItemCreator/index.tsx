"use client";
import React, { useState } from "react";
import { createPost } from "@/lib/firebase";
import s from "./ItemCreator.module.css";

interface InputChangeEvent {
  target: {
    name: string;
    value: string;
  };
}

interface FormData {
  [key: string]: number | string;
}

const ItemCreator = () => {
  function handlePost(event: React.FormEvent) {
    event.preventDefault();
    const orderData = {
      nombre: dataForm.nombre,
      valor: dataForm.valor,
    };

    createPost(orderData);
  }

  const [dataForm, setDataForm] = useState<FormData>({
    nombre: "",
    valor: 0,
  });

  function inputChangeHandler(evento: InputChangeEvent) {
    let inputName = evento.target.name;
    let value = evento.target.value;

    const newDataForm: FormData = {
      ...dataForm,
      [inputName]: value,
    };

    setDataForm(newDataForm);
  }

  return (
    <div className={s.container}>
      <h3>{dataForm.nombre}</h3>
      <h4>{dataForm.valor}</h4>
      <form onSubmit={handlePost}>
        <input
          type="text"
          className="inputText"
          onChange={inputChangeHandler}
          value={dataForm.name}
          name="nombre"
          placeholder="producto"
          required
        />

        <input
          type="number"
          className="inputNumber"
          onChange={inputChangeHandler}
          value={dataForm.value}
          name="valor"
          placeholder="valor"
          required
        />
        <div className="inputsBottom"></div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default ItemCreator;
