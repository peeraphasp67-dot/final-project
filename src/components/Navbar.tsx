"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Clothes", value: "clothes" },
  { name: "Pants", value: "pants" },
  { name: "Shoes", value: "shoes" },
  { name: "Accessories", value: "accessories" },
];

export default function Navbar() {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  function refreshUserState() {
    const token = document.cookie.includes("session-token=");
    setLogged(token);
    if (token) {
      try {
        const userNameFromLS = localStorage.getItem("userName-for-demo");
        setUsername(userNameFromLS || "USER");
      } catch {
        setUsername("USER");
      }
    } else {
      setUsername("");
    }
  }
  useEffect(() => {
    refreshUserState();
    window.addEventListener('storage', refreshUserState);
    const interval = setInterval(refreshUserState, 1600);
    return () => {
      window.removeEventListener('storage', refreshUserState);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav style={{justifyContent:'space-between', boxShadow:'0 1.5px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', padding: '10px 0 10px 0'}}> 
      <div style={{display: 'flex',alignItems: 'center',gap: 22}}>
        <Link href="/" style={{fontWeight:800,fontSize:'1.6rem',letterSpacing:'-3px',color:'#111',textDecoration:'none',fontFamily:'var(--font-geist-sans, Arial)'}}>VIBE</Link>
        {/* หมวดหมู่เมนู - เสมอและดูเหมือนปุ่ม */}
        <div style={{display:'flex',gap:10,marginLeft:22}}>
          {categories.map(cat => (
            <Link
              key={cat.value}
              href={`/products/category/${cat.value}`}
              style={{
                fontWeight:600, fontSize:'1.04rem', color:'#123', borderRadius:9, padding:'7px 21px', textDecoration:'none', border:'2.1px solid #0ea5e9', background:'#fff', transition:'all 0.15s', marginRight:3, boxShadow:'0 2px 10px rgba(14,165,233,0.07)', display:'inline-block', letterSpacing:'-0.5px', lineHeight:'1.15'
              }}
              onMouseOver={e=>{e.currentTarget.style.background="#0ea5e9";e.currentTarget.style.color="#fff";e.currentTarget.style.border="#0274c7";}}
              onMouseOut={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color="#123";e.currentTarget.style.border="#0ea5e9";}}
            >{cat.name}</Link>
          ))}
        </div>        
      </div>
      <div style={{display:'flex',alignItems:'center',gap:18}}>
        <Link href="/cart">Cart</Link>
        {!logged ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <>
            <Link href="/products">Products</Link>
            <Link href="/products/create">Add Product</Link>
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                localStorage.removeItem("userName-for-demo");
                window.location.href = "/";
              }}
            >Logout</button>
            <div style={{background:'#eee',color:'#222',borderRadius:'50%',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',marginLeft:12,fontWeight:700,fontSize:'1.16rem',border:'1.2px solid #bbb',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}} title={username}>
              {username ? username[0].toUpperCase() : '?'}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
