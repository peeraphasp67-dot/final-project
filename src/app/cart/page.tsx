"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const items = JSON.parse(localStorage.getItem('cart-items') || '[]');
      setCart(items);
    }
  }, []);

  function removeFromCart(idx) {
    const updated = [...cart];
    updated.splice(idx, 1);
    setCart(updated);
    localStorage.setItem('cart-items', JSON.stringify(updated));
  }

  const total = cart.reduce((acc, p) => acc + Number(p.price), 0);

  return (
    <div style={{padding:'40px',minHeight:'80vh'}}>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <div style={{color:'#aaa',fontSize:'1.19rem',textAlign:'center',marginTop:60}}>No items in cart.</div>
      ) : (
        <div>
          <div style={{fontSize:'1.15rem',margin:'22px 0 34px 0',fontWeight:800}}>Total: {total} THB</div>
          <button style={{background:'#0ea5e9',color:'#fff',borderRadius:8,padding:'18px 38px',fontWeight:700,border:'none',fontSize:'1.18rem',marginBottom:44,marginRight:0,display:'block'}}>Checkout (ยังไม่เปิด)</button>
          <ul style={{maxWidth:740,margin:'0 0 30px 0',padding:0,listStyle:'none'}}>
            {cart.map((item, idx) => (
              <li key={idx} style={{
                display:'flex',alignItems:'center',justifyContent:'flex-start',gap:32,padding:'22px 0',borderBottom:'1.2px solid #222',fontSize:'1.07rem'}}>
                <div style={{width:68, height:68, background:'#f6f6f6', borderRadius:14, display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{maxWidth:68,maxHeight:66,objectFit:'contain',borderRadius:14}} />
                  ) : (
                    <span style={{fontSize:38, color:'#bbb'}}>🖼️</span>
                  )}
                </div>
                <span style={{fontWeight:700,minWidth:200}}>{item.name}</span>
                <span style={{color:'#85b7dd',minWidth:90}}>{item.price} THB</span>
                <button onClick={()=>removeFromCart(idx)} style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:8,padding:'7px 18px',fontWeight:700,fontSize:'1rem'}}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div style={{marginTop:24}}>
        <Link href="/products" style={{textDecoration:'underline',color:'#0ea5e9',fontWeight:700}}>Back to Products</Link>
      </div>
    </div>
  );
}
