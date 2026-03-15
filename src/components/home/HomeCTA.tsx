'use client'

import Link from 'next/link'
import { ArrowRight, PawPrint, Zap, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const FLOATING_TAGS = [
  { text: 'Enchufe WiFi', emoji: '⚡', x: '8%',  y: '20%', delay: 0 },
  { text: 'Bebedero',     emoji: '💧', x: '82%', y: '15%', delay: 0.3 },
  { text: 'Tiras LED',    emoji: '🌈', x: '5%',  y: '70%', delay: 0.6 },
  { text: 'Cepillo',      emoji: '🐾', x: '78%', y: '72%', delay: 0.9 },
  { text: 'Soporte',      emoji: '💻', x: '88%', y: '44%', delay: 0.15 },
  { text: 'Yape ✓',       emoji: '📱', x: '2%',  y: '44%', delay: 0.45 },
]

export default function HomeCTA() {
  const [visible, setVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width  - 0.5) * 30,
        y: ((e.clientY - rect.top)  / rect.height - 0.5) * 30,
      })
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  return (
    <>
      <style>{`
        /* ── SECTION ── */
        .cta-section {
          position: relative;
          overflow: hidden;
          padding: 160px 48px;
          text-align: center;
          background: #080808;
        }

        /* ── GRID BG ── */
        .cta-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }

        /* ── GLOWS ── */
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.08); }
        }
        .cta-glow-blue {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%);
          pointer-events: none;
          animation: glowPulse 6s ease-in-out infinite;
        }
        .cta-glow-amber {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%);
          pointer-events: none;
          animation: glowPulse 8s ease-in-out infinite reverse;
        }

        /* ── FLOATING TAGS ── */
        @keyframes tagFloat {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-10px) rotate(1deg); }
        }
        .cta-tag {
          position: absolute;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 7px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          backdrop-filter: blur(8px);
          white-space: nowrap;
          pointer-events: none;
          animation: tagFloat 4s ease-in-out infinite;
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .cta-tag.cta-tag-in { opacity: 1; }

        /* ── LABEL ── */
        .cta-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: rgba(37,99,235,0.15);
          border: 1px solid rgba(37,99,235,0.25);
          border-radius: 100px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #60A5FA;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s,
                      transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s;
        }
        .cta-label.cta-in { opacity: 1; transform: translateY(0); }

        /* ── HEADLINE ── */
        .cta-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px, 12vw, 148px);
          line-height: 0.86;
          letter-spacing: -0.01em;
          color: #FAFAF8;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s,
                      transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s;
        }
        .cta-headline.cta-in { opacity: 1; transform: translateY(0); }

        /* ── SUBTEXT ── */
        .cta-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          line-height: 1.65;
          max-width: 480px;
          margin: 0 auto 48px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s,
                      transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s;
        }
        .cta-sub.cta-in { opacity: 1; transform: translateY(0); }

        /* ── BUTTONS ── */
        .cta-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s,
                      transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s;
        }
        .cta-btns.cta-in { opacity: 1; transform: translateY(0); }

        .cta-btn-primary {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          background: #FAFAF8; color: #080808;
          padding: 18px 40px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700; font-size: 15px;
          text-decoration: none; border: none; cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.3s ease;
        }
        .cta-btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: #2563EB; border-radius: inherit;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cta-btn-primary:hover::before { transform: translateX(0); }
        .cta-btn-primary:hover {
          transform: scale(1.04);
          box-shadow: 0 12px 40px rgba(37,99,235,0.45);
        }
        .cta-btn-primary:hover > * { color: #fff; }
        .cta-btn-primary > * { position: relative; z-index: 1; transition: color 0.3s; }

        .cta-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: rgba(255,255,255,0.6);
          padding: 17px 36px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 15px;
          border: 1.5px solid rgba(255,255,255,0.12);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .cta-btn-secondary:hover {
          border-color: rgba(255,255,255,0.35);
          color: #fff;
          background: rgba(255,255,255,0.06);
          transform: scale(1.03);
        }

        /* ── BOTTOM STRIP ── */
        .cta-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          margin-top: 72px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.06);
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s;
          flex-wrap: wrap;
        }
        .cta-strip.cta-in { opacity: 1; }
        .cta-strip-item {
          display: flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        /* ── SPARKLE ── */
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
          50%       { transform: scale(1.3) rotate(20deg); opacity: 1; }
        }
        .cta-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .cta-tag { display: none; }
          .cta-section { padding: 100px 24px; }
        }
      `}</style>

      <section ref={sectionRef} className="cta-section">
        {/* Grid bg */}
        <div className="cta-grid" />

        {/* Glow blobs */}
        <div
          className="cta-glow-blue"
          style={{
            width: '600px', height: '600px',
            top: '-100px', left: '50%',
            transform: `translateX(-50%) translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
            transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        <div
          className="cta-glow-amber"
          style={{
            width: '400px', height: '400px',
            bottom: '0', right: '10%',
            transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`,
            transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)',
          }}
        />

        {/* Floating product tags */}
        {FLOATING_TAGS.map((tag, i) => (
          <div
            key={tag.text}
            className={`cta-tag ${visible ? 'cta-tag-in' : ''}`}
            style={{
              left: tag.x, top: tag.y,
              animationDelay: `${tag.delay}s`,
              transitionDelay: `${0.3 + tag.delay}s`,
              animationDuration: `${3.5 + i * 0.4}s`,
            }}
          >
            <span>{tag.emoji}</span>
            {tag.text}
          </div>
        ))}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Label */}
          <div className={`cta-label ${visible ? 'cta-in' : ''}`}
            style={{ display: 'inline-flex' }}
          >
            <Sparkles size={12} className="cta-sparkle" />
            ¿Listo para simplificar tu vida?
          </div>

          {/* Headline */}
          <div className={`cta-headline ${visible ? 'cta-in' : ''}`}>
            VIVE MÁS<br />
            <span style={{ color: '#2563EB' }}>INTELIGENTE.</span>
          </div>

          {/* Sub */}
          <p className={`cta-sub ${visible ? 'cta-in' : ''}`}>
            Únete a más de 500 peruanos que ya simplificaron su día a día con tecnología inteligente y productos para mascotas.
          </p>

          {/* Buttons */}
          <div className={`cta-btns ${visible ? 'cta-in' : ''}`}>
            <Link href="/productos" className="cta-btn-primary">
              <span>Ver todos los productos</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/productos?cat=mascotas" className="cta-btn-secondary">
              <PawPrint size={16} />
              Para tu mascota
            </Link>
          </div>

          {/* Bottom strip */}
          <div className={`cta-strip ${visible ? 'cta-in' : ''}`}>
            {[
              { icon: <Zap size={12} />,      text: 'Envíos en 2–3 días Lima' },
              { icon: <span>📱</span>,         text: 'Pago con Yape' },
              { icon: <span>🔒</span>,         text: 'Compra 100% segura' },
              { icon: <span>↩</span>,          text: 'Garantía 30 días' },
            ].map(item => (
              <div key={item.text} className="cta-strip-item">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}