// src/app/products/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage(props: any) {
  const router = useRouter();
  const [id, setId] = useState("");
  // Next.js 15: params อาจเป็น Promise
  useEffect(() => {
    (async () => {
      const _params = typeof props.params?.then === 'function' ? await props.params : props.params;
      setId(_params.id);
    })();
  }, [props.params]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("clothes");
  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setName(data.name);
      setPrice(data.price);
      setImage(data.image || "");
      setCategory(data.category || "clothes");
    }
    fetchProduct();
  }, [id]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price: parseFloat(price), image, category }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/products");
    } else {
      alert("Failed to update product");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required style={{ padding: "8px" }}/>
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required step="0.01" style={{ padding: "8px" }}/>
        <input type="url" placeholder="Image URL (ลิงก์รูปสินค้า)" value={image} onChange={e => setImage(e.target.value)} style={{ padding: "8px" }}/>
        {image && (<img src={image} alt="preview" style={{maxWidth:'100%',maxHeight:120,margin:'8px auto'}} />)}
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
        <button type="submit" style={{ padding: "10px", background: "orange", color: "#000", borderRadius: "6px", border: 0 }}>Update</button>
      </form>
    </div>
  );
}
