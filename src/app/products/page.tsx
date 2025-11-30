"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Cart helper functions
function getCart() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('cart-items') || '[]');
  } catch {
    return [];
  }
}
function addToCart(product) {
  const cart = getCart();
  // Only one per product for simplicity; you could implement quantity
  cart.push(product);
  localStorage.setItem('cart-items', JSON.stringify(cart));
}

export default function ProductsPage({ category: categoryParam }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  // category may come from param or route (dynamic)
  const category = categoryParam || pathname.startsWith('/products/category/') ? pathname.split('/').slice(-1)[0] : null;

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(category ? data.filter((p) => p.category === category) : data);
    setLoading(false);
  }

  useEffect(() => { fetchProducts(); }, [category]);

  async function handleDelete(id) {
    if (!confirm("ลบสินค้านี้ ?")) return;
    setDeletingId(id);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setDeletingId(null);
    fetchProducts();
  }

  return (
    <div style={{background:'#111',minHeight:'100vh',paddingTop:'18px'}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'24px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h1 style={{color:'#fff',fontSize:'2.6rem',fontWeight:800,letterSpacing:'-2px'}}>Products{category ? `: ${category.charAt(0).toUpperCase()+category.slice(1)}` : ""}</h1>
          <Link href="/products/create"><button>+ Add Product</button></Link>
        </div>
        <div className="product-grid" style={{display:'flex',flexWrap:'wrap',gap:'32px',marginTop:'32px'}}>
        {loading ? <p style={{color:'#aaa'}}>Loading...</p> : products.length === 0 ? <p style={{color:'#fff'}}>No products found.</p> : null}
        {products.map((p) => (
          <div className="product-card" key={p.id} style={{background:'#fff',color:'#111',borderRadius:18,boxShadow:'0 6px 32px rgba(0,0,0,0.09)',padding:'0 24px 26px',width:260,minHeight:374,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',position:'relative'}}>
            {/* IMAGE slot (ใหญ่ขึ้น!) */}
            <div style={{width:'100%',height:220,display:'flex',alignItems:'center',justifyContent:'center',background:'#f6f6f6',borderRadius:'18px 18px 0 0',margin:'-18px 0 18px 0',overflow:'hidden'}}>
              {p.image ? (
                <img src={p.image} alt={p.name} style={{objectFit:'contain',maxWidth:'100%',maxHeight:218}} />
              ) : (
                <span style={{fontSize:64,color:'#bbb'}}>🖼️</span>
              )}
            </div>
            <div style={{width:'100%'}}>
              <div style={{fontWeight:700,fontSize:'1.25rem',marginBottom:7,wordBreak:'break-word'}}>
                <Link href={`/products/${p.id}`} style={{color:'#111',textDecoration:'none'}}>{p.name}</Link>
              </div>
              <div style={{fontSize:'1.13rem',color:'#555',marginBottom:14}}>{p.price} <span style={{fontWeight:400,color:'#888'}}>THB</span></div>
            </div>
            <div style={{width:'100%',display:'flex',gap:10,justifyContent:'center',marginTop:5}}>
              <button onClick={() => addToCart(p)} style={{background:'#34d399',color:'#111',border:'none',padding:'7px 16px',borderRadius:8,fontWeight:600}}>Buy</button>
              <Link href={`/products/${p.id}/edit`}><button style={{background:'#fff',color:'#111',border:'1px solid #111',padding:'7px 16px',borderRadius:8,fontWeight:600}}>อัปเดต</button></Link>
              <button onClick={()=>handleDelete(p.id)} disabled={deletingId===p.id} style={{background:'#ef4444',color:'#fff',border:'none',padding:'7px 16px',borderRadius:8,fontWeight:600}}>{deletingId===p.id?"กำลังลบ...":"ลบ"}</button>
            </div>    
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
