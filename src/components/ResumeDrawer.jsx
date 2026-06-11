/**
 * ResumeDrawer — 简历底部抽屉
 * 与 WorkDrawer 同款交互：点击「查看简历」从底部滑入
 */
import { useEffect, useRef } from 'react'

export default function ResumeDrawer({ open, onClose }) {
  const overlayRef = useRef(null)

  // 禁止背景滚动
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // ESC 关闭
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <>
      {/* 遮罩 */}
      <div
        ref={overlayRef}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(27,34,51,0.45)',
          backdropFilter: 'blur(6px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* 抽屉 */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
          height: '92vh',
          background: '#fff',
          borderRadius: '20px 20px 0 0',
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
          overflow: 'hidden',
        }}
      >
        {/* 顶栏 */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px 14px',
            borderBottom: '1px solid rgba(27,34,51,0.07)',
          }}
        >
          {/* 拖拽把手 */}
          <div style={{ width: 36, height: 3, background: 'rgba(27,34,51,0.12)', borderRadius: 99, margin: '0 auto', position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)' }} />

          <span style={{ fontSize: 15, fontWeight: 600, color: '#1b2233', letterSpacing: '-0.01em' }}>
            个人简历
          </span>

          {/* 下载按钮 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a
              href="/resume.pdf"
              download
              style={{
                fontSize: 12,
                color: 'rgba(88,89,173,0.75)',
                textDecoration: 'none',
                padding: '5px 12px',
                border: '1px solid rgba(88,89,173,0.3)',
                borderRadius: 99,
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(88,89,173,0.06)'
                e.currentTarget.style.color = '#5859AD'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(88,89,173,0.75)'
              }}
            >
              下载 PDF ↓
            </a>

            {/* 关闭 */}
            <button
              onClick={onClose}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(27,34,51,0.06)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(27,34,51,0.5)',
                fontSize: 16, lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* 内容区 */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '24px 16px 40px',
            background: 'rgba(27,34,51,0.03)',
          }}
        >
          <img
            src="/resume-pages/page-01.jpg"
            alt="个人简历"
            style={{
              maxWidth: 760,
              width: '100%',
              borderRadius: 8,
              boxShadow: '0 8px 40px rgba(27,34,51,0.15)',
            }}
          />
        </div>
      </div>
    </>
  )
}
