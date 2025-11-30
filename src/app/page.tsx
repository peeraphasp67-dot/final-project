"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const token = document.cookie.includes("session-token=");
    setLogged(token);
  }, []);
  return (
    <main style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#101024',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* SVG Big brand name "VIBE" bg */}
      <BigBrandBg />
      {/* SVG Hourglass Glow BG */}
      <BgHourglassGlow />
      <section style={{
        zIndex:2,
        position:'relative',
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{
          fontSize:'2.8rem',
          fontWeight:900,
          letterSpacing:'-2.5px',
          color:'#fff',
          textShadow:'0 4px 32px #843cff99, 0 1.6px 2px #000',
          marginBottom:'19px',
          textAlign:'center',
        }}>
          Discover. FeeL Own your style.
        </h1>
        <div style={{
          fontSize: '1.23rem',
          color:'#feeaff',
          fontWeight:700,
          background:'rgba(80,65,170,0.13)',
          borderRadius:'15px',
          padding:'7px 18px 9px 18px',
          boxShadow:'0 2px 20px #9b72d888',
          marginBottom:28,
          textShadow:'0 2px 12px #7739cf77,0 1px 2px #000',
        }}>
          Elevate every product you sell.
        </div>
        {!logged?
          <div style={{display:'flex',gap:30,justifyContent:'center',marginTop:36}}>
            <Link href="/login"><button style={buttonStyle}>Login</button></Link>
            <Link href="/register"><button style={buttonStyle}>Register</button></Link>
          </div>
        :
          <div style={{marginTop:32}}>
            <Link href="/products"><button style={{...buttonStyle, minWidth:170}}>Go to Products</button></Link>
          </div>
        }
      </section>
    </main>
  );
}

const buttonStyle = {
  background: 'linear-gradient(90deg,#842cff 0%, #8867fa 32%, #47cfff 100%)',
  color: '#fff',
  fontWeight: 800,
  fontSize: '1.26rem',
  padding: '20px 48px',
  borderRadius: '18px',
  border: 'none',
  boxShadow: '0 6px 42px #7c5ce7bb, 0 2px 8px #0ff5e777',
  letterSpacing: '-1px',
  cursor:'pointer',
  transition: 'background 0.18s, transform 0.13s',
} as React.CSSProperties;

// --- Hourglass effect BG ---
function BgHourglassGlow() {
  return (
    <svg
      width="100vw" height="110vh"
      viewBox="0 0 1920 1080"
      style={{
        position:'absolute',
        left:0, top:0,
        width:'100vw', height:'110vh',
        zIndex:0,
        pointerEvents:'none',
        objectFit:'cover'
      }}
      aria-hidden
    >
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8"/>
          <stop offset="40%" stopColor="#b7aaff"/>
          <stop offset="85%" stopColor="#633cee"/>
          <stop offset="100%" stopColor="#151161"/>
        </radialGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff"/>
          <stop offset="70%" stopColor="#7c56ff"/>
          <stop offset="100%" stopColor="#221e54"/>
        </linearGradient>
      </defs>
      <g opacity=".32">
        <path d="M0,1080 Q960,540 1920,1080 T1920,0 Q960,540 0,0 Z" fill="url(#g1)"/>
        <path d="M250,1080 Q960,590 1670,1080 T1670,0 Q960,490 250,0 Z" fill="url(#g2)" opacity=".71" filter="url(#blur1)"/>
      </g>
      <filter id="blur1">
        <feGaussianBlur stdDeviation="80" />
      </filter>
    </svg>
  );
}

// --- BIG VIBE outline/word BG layer ---
function BigBrandBg() {
  return (
    <svg
      width="100vw"
      height="100vh"
      viewBox="0 0 1920 1080"
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.21,
        filter: 'blur(0.4px)',
      }}
      aria-hidden
    >
      <text
        x="50%" y="60%"
        textAnchor="middle"
        fontFamily="Geist, Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="420"
        letterSpacing="46"
        stroke="#fff" strokeWidth="11"
        fill="none"
        opacity="0.79"
        style={{
          textTransform:'uppercase',
          paintOrder: 'stroke fill',
        }}
      >VIBE</text>
      <text
        x="50%" y="60%"
        textAnchor="middle"
        fontFamily="Geist, Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="420"
        letterSpacing="46"
        fill="#bdbbff"
        opacity="0.18"
        style={{
          textTransform:'uppercase',
        }}
      >VIBE</text>
    </svg>
  );
}
