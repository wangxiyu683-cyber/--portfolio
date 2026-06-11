/**
 * HeroSection — 科技感时尚画册首屏
 * 浮雕底纹 · 斜线科技装饰 · 拍立得头像 · 呼吸 Pulse CTA
 */
import { useState } from 'react'
import { GRADIENT_TEXT, GRADIENT_BTN } from '../constants/styles'
import ResumeDrawer from './ResumeDrawer'

/** 一组倾斜极细浅金线，用于标题装饰 */
function CyberLines({ count = 5, className = '' }) {
  return (
    <div className={`flex items-center gap-[3px] ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '1.5px',
            height: '14px',
            background: '#5859AD',
            opacity: 0.35,
            transform: 'skewX(-18deg)',
            borderRadius: '1px',
          }}
        />
      ))}
    </div>
  )
}

/** 拍立得头像容器 — 独立组件，持有自己的 hover 状态 */
function Polaroid() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="group relative" style={{ perspective: '800px' }}>
      {/* Polaroid frame */}
      <div
        className="relative bg-white p-3 pb-12"
        style={{
          transform: hovered ? 'rotate(0deg) scale(1.015)' : 'rotate(1deg) scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: '0 24px 60px rgba(27,34,51,0.12), 0 6px 16px rgba(27,34,51,0.06)',
          borderRadius: '4px',
          willChange: 'transform',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Photo area */}
        <div className="w-64 h-72 md:w-72 md:h-80 overflow-hidden relative">
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(27,34,51,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(27,34,51,0.5) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* Real photo */}
          <img
            src="/avatar.webp"
            alt="个人照片"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          {/* Corner accent lines — top-left */}
          <div className="absolute top-3 left-3 flex flex-col gap-[3px]">
            {[14, 10, 6].map(w => (
              <div key={w} style={{ width: w, height: 1.2, background: 'rgba(88,89,173,0.4)', borderRadius: 1 }} />
            ))}
          </div>
          {/* Corner accent lines — bottom-right */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-[3px] items-end">
            {[6, 10, 14].map(w => (
              <div key={w} style={{ width: w, height: 1.2, background: 'rgba(88,89,173,0.4)', borderRadius: 1 }} />
            ))}
          </div>
        </div>

        {/* Polaroid bottom strip */}
        <div className="mt-3 flex items-center justify-between px-1">
          <span
            className="text-[11px] tracking-[0.18em] uppercase font-light"
            style={{ color: 'rgba(27,34,51,0.35)' }}
          >
            UI · UX · Visual
          </span>
          <CyberLines count={3} />
        </div>
      </div>

      {/* Ground shadow */}
      <div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full blur-2xl"
        style={{ width: '75%', height: 24, background: 'rgba(27,34,51,0.10)' }}
      />

      {/* Floating stat pill — top-right */}
      <div
        className="absolute -right-8 top-10 px-4 py-2.5 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 8px 24px rgba(27,34,51,0.08)',
        }}
      >
        <div className="text-base font-black" style={{ color: '#5859AD', lineHeight: 1 }}>Designer</div>
      </div>

      {/* Floating stat pill — bottom-left */}
      <div
        className="absolute -left-8 bottom-16 px-4 py-2.5 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 8px 24px rgba(27,34,51,0.08)',
        }}
      >
        <div className="text-base font-black" style={{ color: '#5859AD', lineHeight: 1 }}>AIGC</div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const [ctaHovered,    setCtaHovered]    = useState(false)
  const [resumeHovered, setResumeHovered] = useState(false)
  const [linkHovered,   setLinkHovered]   = useState(false)
  const [resumeOpen,    setResumeOpen]    = useState(false)

  return (
    <>
    <ResumeDrawer open={resumeOpen} onClose={() => setResumeOpen(false)} />
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ padding: '80px 0 60px' }}
    >
      {/* ── Deep-space watermark ─────────────────────────────── */}
      <div
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <span
          style={{
            fontSize: 'clamp(80px, 18vw, 220px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#5859AD',
            opacity: 0.028,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          DEEPSPACE
        </span>
      </div>

      {/* ── Ambient radial blobs ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '-8%', right: '-4%',
          width: 520, height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(88,89,173,0.10) 0%, transparent 65%)',
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: '5%', left: '-6%',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(88,89,173,0.07) 0%, transparent 65%)',
        }}
      />

      {/* ── Main grid ────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ════ LEFT — Polaroid ════ */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <Polaroid />
          </div>

          {/* ════ RIGHT — Text ════ */}
          <div className="order-1 lg:order-2 space-y-7">

            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <CyberLines count={4} />
              <span
                className="text-[11px] tracking-[0.32em] uppercase font-medium"
                style={{ color: '#5859AD' }}
              >
                Portfolio 2025
              </span>
              <CyberLines count={2} />
            </div>

            {/* Headline */}
            <div className="space-y-0 leading-none">
              <h1 className="font-bold leading-[1.05]" style={{ letterSpacing: '-0.025em' }}>
                <span
                  className="block"
                  style={{ fontSize: 'clamp(3rem, 7.5vw, 5.8rem)', ...GRADIENT_TEXT }}
                >
                  设计作品
                </span>
                <span
                  className="block"
                  style={{ fontSize: 'clamp(3rem, 7.5vw, 5.8rem)', ...GRADIENT_TEXT }}
                >
                  合集
                </span>
              </h1>
              <p
                className="font-light tracking-[0.12em]"
                style={{
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.95rem)',
                  color: 'rgba(27,34,51,0.28)',
                  marginTop: '8px',
                }}
              >
                视觉设计 · UI/UX Design
              </p>
            </div>

            {/* Thin rule */}
            <div style={{ width: 48, height: 1, background: 'rgba(88,89,173,0.45)' }} />

            {/* Hero statement */}
            <p
              className="leading-[1.9] max-w-md"
              style={{
                fontSize: 'clamp(0.88rem, 1.6vw, 1rem)',
                fontWeight: 400,
                color: 'rgba(88,89,173,0.6)',
              }}
            >
              具备大厂运营设计思维的视觉创作者。擅长将商业逻辑转化为具有美学高度的视觉语言。
              精通{' '}
              <span style={{ color: '#5859AD', fontWeight: 500 }}>Figma</span>
              {' '}与{' '}
              <span style={{ color: '#5859AD', fontWeight: 500 }}>AIGC</span>
              {' '}工具，致力于创意与数据的双重增长。
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2">
              {['运营活动设计', 'UI/UX', '品牌视觉', 'AIGC 创作', '数据驱动'].map(tag => (
                <span
                  key={tag}
                  className="text-[11px] px-3 py-1.5 rounded-full font-medium tracking-wide"
                  style={{
                    background: 'rgba(255,255,255,0.70)',
                    border: '1px solid rgba(88,89,173,0.28)',
                    color: 'rgba(88,89,173,0.55)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex items-center gap-5 pt-1">
              {/* Primary button — pulse glow + reactive hover */}
              <button
                className="btn-pulse flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide"
                style={{
                  ...GRADIENT_BTN,
                  color: '#fff',
                  letterSpacing: '0.04em',
                  transform: ctaHovered ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: ctaHovered
                    ? '0 8px 28px rgba(88,89,173,0.55)'
                    : '0 4px 18px rgba(88,89,173,0.40)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                onClick={() => document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                查看作品
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Ghost link — view resume */}
              <button
                onClick={() => setResumeOpen(true)}
                className="text-sm font-medium tracking-wide"
                style={{
                  color: resumeHovered ? '#5859AD' : 'rgba(27,34,51,0.35)',
                  transition: 'color 0.2s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                onMouseEnter={() => setResumeHovered(true)}
                onMouseLeave={() => setResumeHovered(false)}
              >
                查看简历 →
              </button>

              {/* Ghost link — scroll to contact */}
              <button
                onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium tracking-wide"
                style={{
                  color: linkHovered ? '#5859AD' : 'rgba(27,34,51,0.35)',
                  transition: 'color 0.2s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                onMouseEnter={() => setLinkHovered(true)}
                onMouseLeave={() => setLinkHovered(false)}
              >
                联系我 →
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats bar ──────────────────────────────────────── */}
        <div
          className="mt-20 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8"
          style={{ borderTop: '1px solid rgba(88,89,173,0.20)' }}
        >
          {[
            { num: '2+',   label: '年设计经验',    en: 'Years Exp.'  },
            { num: '150+', label: '落地项目',       en: 'Projects'    },
            { num: '10+',  label: '顶流 IP 合作',   en: 'IP Collab'   },
            { num: '40%',  label: 'AIGC 效率提升', en: 'Efficiency'  },
          ].map(({ num, label, en }) => (
            <div key={label} className="text-center">
              <div
                className="font-black mb-0.5"
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                  letterSpacing: '-0.02em',
                  color: '#5859AD',
                }}
              >
                {num}
              </div>
              <div className="text-xs font-medium mb-0.5" style={{ color: 'rgba(88,89,173,0.55)' }}>
                {label}
              </div>
              <div className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(27,34,51,0.2)' }}>
                {en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
