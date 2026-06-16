/**
 * LanyardCard — lightweight CSS/SVG hanging ID-card
 * Strap + clip + card, idle pendulum swing (CSS keyframes), with a
 * mouse-driven interactive nudge layered on top via inline transform.
 */
import { useRef, useState } from 'react'

function CyberLines({ count = 3 }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '1.5px',
            height: '13px',
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

export default function LanyardCard({ image = '/avatar.webp' }) {
  const wrapRef = useRef(null)
  const [nudge, setNudge] = useState(0)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5 // -0.5..0.5
    setNudge(px * 14) // degrees
  }
  const handleMouseLeave = () => {
    setHovered(false)
    setNudge(0)
  }

  return (
    <div className="relative" style={{ paddingTop: 56 }}>
      {/* Anchor point on the "ceiling" */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 rounded-full"
        style={{ width: 10, height: 10, background: '#5859AD', boxShadow: '0 0 0 4px rgba(88,89,173,0.12)' }}
      />

      <div
        ref={wrapRef}
        className="lanyard-swing"
        style={{
          transformOrigin: 'top center',
          transform: hovered ? `rotate(${nudge}deg)` : undefined,
          transition: hovered ? 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' : undefined,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Strap — fabric ribbon in brand purple */}
        <div className="mx-auto" style={{ width: 14, height: 56, position: 'relative' }}>
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, #6668CB 0%, #5859AD 55%, #3C3D85 100%)',
              borderRadius: 3,
              boxShadow: 'inset 2px 0 3px rgba(255,255,255,0.25), inset -2px 0 3px rgba(0,0,0,0.10)',
            }}
          />
          {/* Stitch texture */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 7px, rgba(255,255,255,0.4) 7px, rgba(255,255,255,0.4) 8px)',
            }}
          />
        </div>

        {/* Clip connecting strap to card */}
        <div className="mx-auto relative" style={{ width: 34, height: 16, marginTop: -2 }}>
          <div
            style={{
              width: '100%', height: '100%',
              borderRadius: 5,
              background: 'linear-gradient(180deg, #c9c9d8 0%, #9d9db0 100%)',
              boxShadow: '0 2px 6px rgba(27,34,51,0.25)',
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: -4, width: 16, height: 10, border: '3px solid #9d9db0', borderBottom: 'none', borderRadius: '8px 8px 0 0' }}
          />
        </div>

        {/* Card */}
        <div
          className="relative bg-white"
          style={{
            width: 280,
            borderRadius: 18,
            padding: 14,
            paddingBottom: 18,
            marginTop: -2,
            border: '1px solid rgba(88,89,173,0.18)',
            boxShadow: '0 28px 60px rgba(27,34,51,0.16), 0 8px 20px rgba(27,34,51,0.08)',
          }}
        >
          {/* Punch hole */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{ top: 14, width: 16, height: 16, background: 'rgba(241,237,245,0.9)', border: '1px solid rgba(88,89,173,0.25)' }}
          />

          {/* Photo */}
          <div
            className="overflow-hidden relative"
            style={{ width: '100%', height: 300, borderRadius: 12, marginTop: 22 }}
          >
            <img
              src={image}
              alt="个人照片"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(88,89,173,0.15)', borderRadius: 12 }}
            />
          </div>

          {/* Bottom strip */}
          <div className="mt-3 flex items-center justify-between px-1">
            <span
              className="text-[11px] tracking-[0.18em] uppercase font-light"
              style={{ color: 'rgba(27,34,51,0.35)' }}
            >
              Wang Si Yu
            </span>
            <CyberLines count={3} />
          </div>
        </div>
      </div>

      {/* Ground shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full blur-2xl"
        style={{ bottom: -10, width: '60%', height: 22, background: 'rgba(27,34,51,0.12)' }}
      />
    </div>
  )
}
