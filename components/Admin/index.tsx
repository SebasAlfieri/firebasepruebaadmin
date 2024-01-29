"use client";
import React, { useState } from "react";
import { createPost } from "@/lib/firebase";
import ItemCreator from "../ItemCreator";

const Admin = () => {
  return (
    <div>
      <ItemCreator />
    </div>
  );
};

export default Admin;
