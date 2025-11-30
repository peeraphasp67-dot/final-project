"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getEmailHistory, addEmailToHistory } from "../../lib/emailHistory";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  // เพิ่ม
  const [emailHistory, setEmailHistory] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setEmailHistory(getEmailHistory());
  }, []);
  const filteredEmails = email
    ? emailHistory.filter(e => e.toLowerCase().includes(email.toLowerCase()))
    : emailHistory;

  async function handleLogin(e: any) {
    e.preventDefault(); setLoading(true); setMsg("");
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }), });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error); setLoading(false); return; }
    setMsg("เข้าสู่ระบบสำเร็จ!");
    if (email) {
      localStorage.setItem("userName-for-demo", email.split("@")[0].slice(0, 12));
      addEmailToHistory(email); // เพิ่ม email ลงประวัติ
    }
    window.dispatchEvent(new Event('storage'));
    router.push("/products");
  }
  return (
    <main style={{minHeight:'70vh',display:'flex',justifyContent:'center',alignItems:'center',background:'var(--background)'}}>
      <section className="card" style={{width:370,boxShadow:'var(--card-shadow)',padding:'42px 38px',borderRadius:'var(--border-radius)',position:'relative'}}>
        <button aria-label="close" onClick={()=>{ router.back(); setTimeout(()=>router.push('/'),320); }} style={{position:'absolute',top:13,right:14,background:'transparent',color:'#222',border:'none',fontWeight:900,fontSize:34,width:38,height:38,lineHeight:1,display:'flex',alignItems:'center',justifyContent:'center',zIndex:10,cursor:'pointer',padding:0}}>
          ×
        </button>
        <h1 style={{textAlign:'center',fontSize:'2.5rem',fontWeight:800,letterSpacing:'-1.6px',margin:'0 0 28px',color:'#111'}}>เข้าสู่ระบบ</h1>
        <form onSubmit={handleLogin} autoComplete="off">
          <div style={{position:'relative'}}>
            <input
              ref={emailInputRef}
              placeholder="อีเมลของคุณ"
              value={email}
              autoComplete="off"
              onChange={e => { setEmail(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(()=>setShowDropdown(false), 180)}
              disabled={loading}
              style={{position:'relative',zIndex:5}}
            />
            {showDropdown && filteredEmails.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 48,
                  background: '#222',
                  color: 'white',
                  borderRadius: 12,
                  boxShadow: '0 6px 32px rgba(0,0,0,0.16)',
                  padding: '0 0 0',
                  zIndex: 20
                }}
              >
                {filteredEmails.map((e, i) => (
                  <div
                    key={e}
                    onMouseDown={() => { setEmail(e); setShowDropdown(false); emailInputRef.current?.blur(); }}
                    style={{ padding: '12px 20px', borderBottom: i < filteredEmails.length-1 ? '1px solid #444' : 'none', cursor: 'pointer', fontWeight: (email===e)?700:400, background: email===e?"#333":"inherit" }}
                  >
                    {e}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input placeholder="รหัสผ่าน" type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={loading}/>
          <button disabled={loading}>{loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}</button>
        </form>
        {msg && <div style={{margin:'16px 0 0',textAlign:'center',color:msg.includes('สำเร็จ')?'#12824e':'#d32752',fontWeight:700,fontSize:'1rem',transition:'color 0.2s'}}>{msg}</div>}
      </section>
    </main>
  );
}
