import { useState } from 'react'

function CopyItem({ icon, display, copyValue }) {
  const [copied, setCopied] = useState(false)
  const handle = () => {
    navigator.clipboard.writeText(copyValue).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={handle}
      className="group flex items-center gap-2.5 transition-colors duration-200"
      style={{ position: 'relative' }}
      title="点击复制"
    >
      <span style={{ color: 'rgba(88,89,173,0.6)' }}>{icon}</span>
      <span
        className="text-xs tracking-wide"
        style={{ color: copied ? '#5859AD' : 'rgba(27,34,51,0.40)' }}
      >
        {copied ? '已复制 ✓' : display}
      </span>
      {copied && (
        <span style={{
          position: 'absolute',
          top: '-28px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#5859AD',
          color: '#fff',
          fontSize: 11,
          padding: '2px 8px',
          borderRadius: 999,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          已复制 ✓
        </span>
      )}
    </button>
  )
}

export default function ContactBar() {
  return (
    <footer
      id="contact-section"
      className="px-6 md:px-16 lg:px-24 py-10"
      style={{ borderTop: '1px solid rgba(27,34,51,0.07)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        {/* Brand */}
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase mb-1" style={{ color: 'rgba(27,34,51,0.22)' }}>
            Let's create together
          </p>
          <p className="text-sm font-medium" style={{ color: 'rgba(27,34,51,0.45)' }}>
            运营设计 · UI/UX · 品牌周边开发
          </p>
        </div>

        {/* Contacts */}
        <div className="flex flex-wrap items-center gap-7">
          <CopyItem
            display="z18231799626"
            copyValue="z18231799626"
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5.5 7.5C5.5 5.015 7.515 3 10 3c2.485 0 4.5 2.015 4.5 4.5 0 .86-.242 1.664-.663 2.347l.163 1.653-1.5-.75A4.46 4.46 0 0110 11c-2.485 0-4.5-2.015-4.5-4.5z" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4.5 9.5A4.46 4.46 0 012 10l-1.5.75.163-1.653A4.46 4.46 0 01.5 6.5C.5 4.015 2.515 2 5 2c.5 0 .98.08 1.43.23" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            }
          />
          <CopyItem
            display="791372282@qq.com"
            copyValue="791372282@qq.com"
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="rgba(88,89,173,0.6)" strokeWidth="1.2" />
                <path d="M1 4.5l6 4 6-4" stroke="rgba(88,89,173,0.6)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            }
          />
          <CopyItem
            display="173 0220 8652"
            copyValue="17302208652"
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2h3l1.5 3.5-1.75 1.05a7.5 7.5 0 003.7 3.7L10 8.5 12 10v3a1 1 0 01-1 1A10 10 0 011 3a1 1 0 011-1z" stroke="rgba(88,89,173,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
        </div>

        {/* Copyright */}
        <p className="text-[11px]" style={{ color: 'rgba(27,34,51,0.18)' }}>
          © 2025 Portfolio
        </p>
      </div>
    </footer>
  )
}
