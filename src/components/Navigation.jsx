/**
 * Navigation — 白金悬浮顶栏
 * tabs 数据由外部传入，不在内部重复定义
 */
import { useState } from 'react'

export default function Navigation({ activeTab, setActiveTab, tabs }) {
  // 用单一 state 追踪当前悬停的 tab id，避免对 DOM style 直接操作
  const [hoveredId, setHoveredId] = useState(null)
  return (
    <div
      className="sticky top-0 z-50 w-full"
      style={{ paddingTop: '14px', paddingBottom: '14px' }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-16">
        <nav
          style={{
            background: 'rgba(241, 237, 245, 0.60)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.90)',
            borderRadius: '100px',
            boxShadow:
              '0 4px 20px rgba(27, 34, 51, 0.04), 0 1px 3px rgba(27, 34, 51, 0.03), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          <div className="flex items-center justify-between h-14 px-5">

            {/* ── Logo ─────────────────────────────────────────────── */}
            <a
              href="#"
              className="flex items-center gap-2.5 shrink-0"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black tracking-tight select-none"
                style={{
                  background: 'linear-gradient(135deg, #5859AD 0%, #5859AD 100%)',
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(88,89,173,0.4)',
                }}
              >
                W
              </div>
              <span
                className="text-xs font-semibold tracking-[0.18em] uppercase hidden sm:block"
                style={{ color: '#5859AD', opacity: 0.6 }}
              >
                Portfolio
              </span>
            </a>

            {/* ── Tabs — desktop ──────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-1">
              {tabs.map(tab => {
                const isActive  = activeTab === tab.id
                const isHovered = hoveredId === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    onMouseEnter={() => setHoveredId(tab.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="relative flex flex-col items-center px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 select-none"
                    style={{
                      color: isActive
                        ? '#5859AD'
                        : isHovered
                          ? 'rgba(27,34,51,0.75)'
                          : 'rgba(27,34,51,0.45)',
                      background: isActive ? 'rgba(88,89,173,0.10)' : 'transparent',
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="font-light text-[10px]" style={{ opacity: isActive ? 0.6 : 0.3 }}>
                        {tab.index}
                      </span>
                      {tab.label}
                    </span>
                    {/* Active diamond anchor */}
                    <span
                      className="absolute"
                      style={{
                        bottom: '-1px',
                        left: '50%',
                        width: '6px',
                        height: '6px',
                        background: '#5859AD',
                        transform: `translateX(-50%) rotate(45deg) scale(${isActive ? 1 : 0})`,
                        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        borderRadius: '1px',
                      }}
                    />
                  </button>
                )
              })}
            </div>

            {/* ── Tabs — mobile ───────────────────────────────────── */}
            <div className="flex md:hidden items-center gap-1">
              {tabs.map(tab => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative w-9 h-9 rounded-full text-[11px] font-semibold transition-all duration-300"
                    style={{
                      color: isActive ? '#5859AD' : 'rgba(27,34,51,0.35)',
                      background: isActive ? 'rgba(88,89,173,0.10)' : 'transparent',
                    }}
                  >
                    {tab.index}
                    <span
                      className="absolute"
                      style={{
                        bottom: '1px',
                        left: '50%',
                        width: '4px',
                        height: '4px',
                        background: '#5859AD',
                        transform: `translateX(-50%) rotate(45deg) scale(${isActive ? 1 : 0})`,
                        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        borderRadius: '0.5px',
                      }}
                    />
                  </button>
                )
              })}
            </div>

            {/* ── Available badge ──────────────────────────────────── */}
            <a
              href="mailto:wangxiyu683@gmail.com"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium tracking-wide shrink-0"
              style={{
                border: hoveredId === '__available'
                  ? '1px solid rgba(88,89,173,0.6)'
                  : '1px solid rgba(88,89,173,0.35)',
                color: '#5859AD',
                background: hoveredId === '__available'
                  ? 'rgba(88,89,173,0.14)'
                  : 'rgba(88,89,173,0.06)',
                transition: 'background 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={() => setHoveredId('__available')}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span className="dot-pulse w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Available
            </a>

          </div>
        </nav>
      </div>
    </div>
  )
}
