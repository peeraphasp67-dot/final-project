// src/app/products/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("clothes");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price: parseFloat(price), image, category }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/products");
    } else {
      alert("Failed to create product");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required style={{ padding: "8px" }}/>
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required step="0.01" style={{ padding: "8px" }}/>
        <input type="url" placeholder="Image URL (ใส่ลิงก์รูป)" value={image} onChange={e => setImage(e.target.value)} style={{ padding: "8px" }}/>
        <select value={category} onChange={e => setCategory(e.target.value)} 
  style={{
    padding:'9px',
    fontWeight:600,
    borderRadius:7,
    background:'#f5fafe',
    border:'2.1px solid #0284c7',
    color:'#0c2461',
    boxShadow:'0 1.5px 9px #85C1E933',
    outline:'none',
    fontSize:'1.06rem',
    marginTop:'2px'
  }} required>
          <option value="clothes">Clothes</option>
          <option value="pants">Pants</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
        </select>
        <button type="submit" style={{ padding: "10px", background: "green", color: "#fff", borderRadius: "6px", border: 0 }}>Create</button>
      </form>
    </div>
  );
}
