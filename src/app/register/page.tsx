"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  async function handleRegister(e: any) {
    e.preventDefault(); setLoading(true); setMsg("");
    const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }), });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error); } else {
      setMsg("สมัครสมาชิกสำเร็จ!");
      // save name for navbar
      if(name) localStorage.setItem("userName-for-demo", name.slice(0,12));
      window.dispatchEvent(new Event('storage'));
    }
    setLoading(false);
  }
  return (
    <main style={{minHeight:'70vh',display:'flex',justifyContent:'center',alignItems:'center',background:'var(--background)'}}>
      <section className="card" style={{width:370,boxShadow:'var(--card-shadow)',padding:'42px 38px',borderRadius:'var(--border-radius)',position:'relative'}}>
        {/* ปุ่มปิด (กากบาท) ไม่มีวงกลมซ้อน */}
        <button aria-label="close" onClick={()=>{ router.back(); setTimeout(()=>router.push('/'),320); }} style={{position:'absolute',top:13,right:14,background:'transparent',color:'#222',border:'none',fontWeight:900,fontSize:34,width:38,height:38,lineHeight:1,display:'flex',alignItems:'center',justifyContent:'center',zIndex:10,cursor:'pointer',padding:0}}>
          ×
        </button>
        <h1 style={{textAlign:'center',fontSize:'2.5rem',fontWeight:800,letterSpacing:'-1.6px',margin:'0 0 28px',color:'#111'}}>สมัครสมาชิก</h1>
        <form onSubmit={handleRegister}>
          <input placeholder="ชื่อ" value={name} onChange={e => setName(e.target.value)} disabled={loading}/>
          <input placeholder="อีเมลของคุณ" value={email} onChange={e => setEmail(e.target.value)} disabled={loading}/>
          <input type="password" placeholder="รหัสผ่าน" value={password} onChange={e => setPassword(e.target.value)} disabled={loading}/>
          <button disabled={loading}>{loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}</button>
        </form>
        {msg && <div style={{margin:'16px 0 0',textAlign:'center',color:msg.includes('สำเร็จ')?'#12824e':'#d32752',fontWeight:700,fontSize:'1rem',transition:'color 0.2s'}}>{msg}</div>}
      </section>
    </main>
  );
}
