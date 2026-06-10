/**
 * WorkDrawer — 全屏底部抽屉，按 project.blocks 顺序渲染内容模块
 */
import { useEffect, useState, useCallback } from 'react'
import { GRADIENT_TEXT, GRADIENT_BTN } from '../constants/styles'

/* ── 共用色值 ── */
const PRIMARY       = '#5859AD'
const TEXT_BODY     = 'rgba(88,89,173,0.75)'
const TAG_BG        = 'rgba(88,89,173,0.10)'
const TAG_BORDER    = 'rgba(88,89,173,0.22)'
const DIVIDER       = 'rgba(88,89,173,0.10)'
const TITLE_STYLE   = { ...GRADIENT_TEXT, fontWeight: 700, letterSpacing: '-0.02em' }

/* ── Lightbox 全屏预览 ── */
function Lightbox({ src, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // 挂载后触发淡入
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 200)   // 等淡出动画结束再卸载
  }, [onClose])

  // ESC 关闭
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleClose])

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* 关闭按钮 */}
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: 20,
          right: 24,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.12)',
          color: '#fff',
          fontSize: 20,
          lineHeight: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ×
      </button>

      {/* 图片 — 阻止冒泡，避免点图片时触发关闭 */}
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          objectFit: 'contain',
          borderRadius: 8,
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          transform: visible ? 'scale(1)' : 'scale(0.96)',
          transition: 'transform 0.2s ease',
        }}
      />
    </div>
  )
}

/* ── 标签色板 ── */
const TAG_PALETTE = [
  { bg: 'rgba(88,89,173,0.10)',  border: 'rgba(88,89,173,0.22)',  color: '#5859AD' },
  { bg: 'rgba(82,168,154,0.12)', border: 'rgba(82,168,154,0.28)', color: '#2E9E89' },
  { bg: 'rgba(230,130,80,0.12)', border: 'rgba(230,130,80,0.28)', color: '#C4621E' },
  { bg: 'rgba(180,90,160,0.12)', border: 'rgba(180,90,160,0.28)', color: '#A03D8F' },
  { bg: 'rgba(70,140,200,0.12)', border: 'rgba(70,140,200,0.28)', color: '#1E6FA8' },
  { bg: 'rgba(100,170,80,0.12)', border: 'rgba(100,170,80,0.28)', color: '#3A8020' },
]

/* ── 标签胶囊 ── */
function Tag({ children, index = 0 }) {
  const scheme = TAG_PALETTE[index % TAG_PALETTE.length]
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.04em',
        background: scheme.bg,
        color: scheme.color,
        border: `1px solid ${scheme.border}`,
      }}
    >
      {children}
    </span>
  )
}

/* ── Block: hero ── */
function HeroBlock({ block }) {
  return (
    <div>
      {/* Title */}
      <h2
        style={{
          ...TITLE_STYLE,
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          marginBottom: 10,
          lineHeight: 1.1,
        }}
      >
        {block.title}
      </h2>

      {/* Subtitle */}
      {block.subtitle && (
        <p style={{
          fontSize: '0.95rem',
          color: 'rgba(88,89,173,0.65)',
          lineHeight: 1.7,
          marginBottom: 14,
          marginTop: 0,
        }}>
          {block.subtitle}
        </p>
      )}

      {/* Tags */}
      {block.tags?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {block.tags.map((t, i) => <Tag key={t} index={i}>{t}</Tag>)}
        </div>
      )}
    </div>
  )
}

/* ── Block: overview ── */
function OverviewBlock({ block }) {
  const items = [
    { label: 'Situation', sublabel: '背景', value: block.background },
    { label: 'Task',      sublabel: '任务', value: block.task },
    { label: 'Action',    sublabel: '行动', value: block.action },
    { label: 'Result',    sublabel: '成果', value: block.result },
  ].filter(i => i.value)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
      {items.map(({ label, sublabel, value }) => (
        <div
          key={label}
          style={{
            padding: '18px 20px',
            borderRadius: 14,
            background: 'rgba(88,89,173,0.04)',
            border: '1px solid rgba(88,89,173,0.10)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: PRIMARY, margin: 0 }}>{label}</p>
            <p style={{ fontSize: 10, color: 'rgba(88,89,173,0.45)', margin: 0 }}>{sublabel}</p>
          </div>
          <p style={{ fontSize: '0.9rem', color: TEXT_BODY, lineHeight: 1.6, margin: 0 }}>{value}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Block: image ── */
function ImageBlock({ block }) {
  const [lightboxSrc, setLightboxSrc] = useState(null)

  // images[] can be strings or {src, label} objects
  const rawImages = Array.isArray(block.images)
    ? block.images
    : block.src
      ? [block.src]
      : []
  const images = rawImages.map(item =>
    typeof item === 'string' ? { src: item, label: null } : item
  )
  const isGrid = images.length > 1
  // 列数规则：2张→2列，3张→3列，4张及以上→最多3列自动换行
  const gridCols = images.length === 2
    ? 'repeat(2, 1fr)'
    : images.length === 3
      ? 'repeat(3, 1fr)'
      : 'repeat(3, 1fr)'

  return (
    <>
      <div>
        <div
          style={{
            display: isGrid ? 'grid' : 'block',
            gridTemplateColumns: isGrid ? gridCols : undefined,
            gap: isGrid ? 12 : undefined,
          }}
        >
          {images.map(({ src, label }, i) => (
            <div key={i}>
              <div
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: 'rgba(88,89,173,0.04)',
                  cursor: 'zoom-in',
                }}
                onClick={() => setLightboxSrc(src)}
              >
                <img
                  src={src}
                  alt={label || ''}
                  onError={(e) => { e.target.style.border = '2px solid red'; e.target.alt = '路径错误: ' + e.target.src }}
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain', pointerEvents: 'none' }}
                />
              </div>
              {label && label.trim() && (
                <p
                  style={{
                    marginTop: 8,
                    fontSize: '0.8rem',
                    color: 'rgba(88,89,173,0.5)',
                    textAlign: 'center',
                    letterSpacing: '0.02em',
                  }}
                >
                  {label}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  )
}

/* ── Block: video ── */
function VideoBlock({ block }) {
  return (
    <div style={{ borderRadius: 14, overflow: 'hidden' }}>
      <video
        src={block.src}
        autoPlay loop muted playsInline
        style={{ width: '100%', display: 'block' }}
      />
    </div>
  )
}

/* ── Block: video-row（横排多视频） ── */
function VideoRowBlock({ block }) {
  const count = block.videos?.length || 0
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${count}, 1fr)`,
        gap: 12,
        alignItems: 'start',
      }}
    >
      {block.videos?.map((v, i) => (
        <div
          key={i}
          style={{
            borderRadius: 14,
            overflow: 'hidden',
            background: 'rgba(88,89,173,0.04)',
          }}
        >
          <video
            src={v.src}
            autoPlay loop muted playsInline
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      ))}
    </div>
  )
}

/* ── Block: text ── */
function TextBlock({ block }) {
  return (
    <div>
      {block.title && (
        <h3
          style={{
            ...TITLE_STYLE,
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            marginBottom: 12,
          }}
        >
          {block.title}
        </h3>
      )}
      {block.content && (
        <p style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.9 }}>
          {block.content}
        </p>
      )}
    </div>
  )
}

/* ── Block: stats ── */
function StatsBlock({ block }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
      {block.items?.map(({ value, label }) => (
        <div
          key={label}
          style={{
            flex: '1 1 120px',
            padding: '18px 20px',
            borderRadius: 14,
            background: 'rgba(88,89,173,0.04)',
            border: `1px solid ${DIVIDER}`,
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 800,
              color: PRIMARY,
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            {value}
          </p>
          <p style={{ fontSize: 12, color: TEXT_BODY }}>{label}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Block: section-title ── */
function SectionTitleBlock({ block }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginTop: '2rem',
        paddingTop: '2rem',
        borderTop: `1px solid rgba(88,89,173,0.10)`,
      }}
    >
      <div
        style={{
          width: 4,
          height: 22,
          borderRadius: 2,
          background: PRIMARY,
          flexShrink: 0,
        }}
      />
      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          color: PRIMARY,
          letterSpacing: '-0.01em',
          margin: 0,
        }}
      >
        {block.title}
      </h3>
    </div>
  )
}

/* ── Block: highlight ── */
function HighlightBlock({ block }) {
  const cols = block.items?.length >= 3 ? 3 : block.items?.length || 2
  return (
    <div>
      {block.title && (
        <h3
          style={{
            ...TITLE_STYLE,
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            marginBottom: 16,
          }}
        >
          {block.title}
        </h3>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 14,
        }}
      >
        {block.items?.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '20px 22px',
              borderRadius: 14,
              background: 'rgba(88,89,173,0.04)',
              border: `1px solid ${DIVIDER}`,
            }}
          >
            {item.icon && (
              <div style={{ fontSize: 22, marginBottom: 10 }}>{item.icon}</div>
            )}
            <p style={{ fontSize: 14, fontWeight: 600, color: PRIMARY, marginBottom: 6 }}>
              {item.title}
            </p>
            <p style={{ fontSize: 13, color: TEXT_BODY, lineHeight: 1.7 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Block dispatcher ── */
function Block({ block }) {
  switch (block.type) {
    case 'hero':      return <HeroBlock block={block} />
    case 'overview':  return <OverviewBlock block={block} />
    case 'image':     return <ImageBlock block={block} />
    case 'video':     return <VideoBlock block={block} />
    case 'text':      return <TextBlock block={block} />
    case 'stats':     return <StatsBlock block={block} />
    case 'highlight':     return <HighlightBlock block={block} />
    case 'section-title': return <SectionTitleBlock block={block} />
    case 'video-row':     return <VideoRowBlock block={block} />
    default:              return null
  }
}

/* ── WorkDrawer (main export) ── */
export default function WorkDrawer({ project, onClose }) {
  const isOpen = !!project

  /* 打开时锁定 body 滚动 */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* ESC 关闭 */
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <>
      {/* ── Overlay ── */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.50)',
          zIndex: 100,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* ── Drawer panel ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 101,
          height: '92vh',
          background: '#ffffff',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -8px 40px rgba(27,34,51,0.18)',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* ── Drag handle ── */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 999,
              background: 'rgba(88,89,173,0.18)',
            }}
          />
        </div>

        {/* ── Close button ── */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 20,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(88,89,173,0.08)',
            color: PRIMARY,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            lineHeight: 1,
            zIndex: 10,
          }}
        >
          ×
        </button>

        {/* ── Scrollable content ── */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 0 60px',
          }}
        >
          <div
            style={{
              maxWidth: 800,
              margin: '0 auto',
              padding: '0 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
            }}
          >
            {project?.blocks?.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
