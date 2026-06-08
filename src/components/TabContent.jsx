/**
 * TabContent — 无边界画册卡片
 * 白光微弱描边半透明卡片 · 上浮 hover · 白金菱形装饰
 */
import React, { useState } from 'react'
import { GRADIENT_TEXT, GRADIENT_BTN } from '../constants/styles'
import imgGamestar   from '../assets/盒级玩家.png'
import imgChunjie   from '../assets/新春大促.png'
import imgHalloween from '../assets/万圣节奇妙夜.png'
import imgProcess   from '../assets/设计流程.png'
import imgDaily     from '../assets/日常营销视觉.png'
import imgCoreOps   from '../assets/A级核心运营专题.png'
import imgAnime     from '../assets/二次元.png'
import img3A        from '../assets/3a.png'
import imgFPS       from '../assets/fps.png'

/* ─── Shared sub-components ──────────────────────────────────────────────── */

/** Cyber slash lines decoration */
function CyberLines({ count = 4, className = '' }) {
  return (
    <div className={`flex items-center gap-[3px] ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '1.5px',
            height: '13px',
            background: '#5859AD',
            opacity: 0.30,
            transform: 'skewX(-18deg)',
            borderRadius: '1px',
          }}
        />
      ))}
    </div>
  )
}

/** Section header with diamond accent and cyber lines */
function SectionHeader({ index, title, subtitle, description }) {
  return (
    <div className="mb-14 max-w-2xl">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-5">
        <CyberLines count={3} />
        <span
          className="text-[11px] tracking-[0.32em] uppercase font-medium"
          style={{ color: '#5859AD' }}
        >
          {index}
        </span>
        {/* Diamond */}
        <div
          style={{
            width: 6, height: 6,
            background: '#5859AD',
            opacity: 0.5,
            transform: 'rotate(45deg)',
            borderRadius: '1px',
            flexShrink: 0,
          }}
        />
      </div>

      {/* Headline */}
      <h2
        className="font-bold leading-tight mb-1"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          letterSpacing: '-0.025em',
          ...GRADIENT_TEXT,
        }}
      >
        {title}
      </h2>


      {description && (
        <p
          className="font-light leading-[1.85]"
          style={{
            fontSize: '0.9rem',
            color: 'rgba(27,34,51,0.50)',
            maxWidth: '38rem',
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}

/** Glass-morphism work card */
function WorkCard({
  label, tag, wide = false, tall = false, image = null,
  objectPosition = 'center center',
  overlayColor = 'rgba(15,15,30,0.75)',
  lightOverlay = false,
  customOverlayBg = null,   // overrides computed overlayBg when provided
}) {
  const [hovered, setHovered] = useState(false)

  const defaultOverlayBg = lightOverlay
    ? 'linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.75) 55%, rgba(255,255,255,0.10) 80%, transparent 100%)'
    : `linear-gradient(to top, ${overlayColor} 0%, ${overlayColor.replace(/[\d.]+\)$/, '0.6)')} 55%, ${overlayColor.replace(/[\d.]+\)$/, '0.15)')} 80%, transparent 100%)`

  const overlayBg   = customOverlayBg ?? defaultOverlayBg
  const labelColor  = lightOverlay ? '#5859AD' : '#ffffff'
  const tagStyle    = lightOverlay
    ? { background: 'rgba(88,89,173,0.10)', color: '#5859AD', border: '1px solid rgba(88,89,173,0.22)' }
    : { background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }

  return (
    <div
      className={`group relative overflow-hidden cursor-pointer ${wide ? 'md:col-span-2' : ''}`}
      style={{
        background: '#ffffff',
        border: hovered ? '1px solid rgba(88,89,173,0.40)' : '1px solid rgba(200,196,210,0.55)',
        borderRadius: '16px',
        boxShadow: hovered
          ? '0 24px 56px rgba(27,34,51,0.14), 0 6px 16px rgba(27,34,51,0.08)'
          : '0 4px 24px rgba(27,34,51,0.08), 0 1px 4px rgba(27,34,51,0.05)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.5s ease-out',
        minHeight: tall ? '420px' : '260px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {image ? (
        /* ── Real image — position:absolute fills the card, no wrapper div ── */
        <img
          src={image}
          alt={label}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: objectPosition || 'center center',
          }}
        />
      ) : (
        <>
          {/* Placeholder gradient */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(145deg, #d8d5e8 0%, #ccc9dc 100%)' }}
          />
          {/* Fine grid texture */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(27,34,51,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(27,34,51,0.6) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              style={{
                width: 56, height: 56,
                borderRadius: 14,
                background: 'rgba(88,89,173,0.10)',
                border: '1px solid rgba(88,89,173,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.4s ease',
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="2.5" y="2.5" width="17" height="17" rx="3" stroke="rgba(88,89,173,0.6)" strokeWidth="1.3" />
                <circle cx="7.5" cy="7.5" r="1.5" fill="rgba(88,89,173,0.6)" />
                <path d="M2.5 14.5l4.5-4.5 3.5 3.5 2.5-2.5 5.5 5.5" stroke="rgba(88,89,173,0.6)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Bottom gradient meta bar */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-4"
        style={{ background: overlayBg }}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Label + tag in one row */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <p
              className="text-sm font-semibold whitespace-nowrap"
              style={{ color: labelColor }}
            >
              {label}
            </p>
            <span
              className="text-[11px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
              style={tagStyle}
            >
              {tag}
            </span>
          </div>
          {/* Arrow */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              background: hovered ? GRADIENT_BTN.background : 'rgba(88,89,173,0.12)',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.7)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke={hovered ? '#fff' : '#5859AD'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Tab 1: Operations ──────────────────────────────────────────────────── */
function OperationsTab() {
  return (
    <div>
      <SectionHeader
        index="01 / Campaign Design"
        title="AIGC 营销视觉演进"
        subtitle="AIGC & CAMPAIGN VISUAL"
        description="主导全站核心运营活动的主视觉设计。深度打通 AIGC 工作流，将创意概念至 AI 3D/黏土风视觉的落地周期缩短 40%，实现全链路高质感物料覆盖。"
      />

      {/* Process flow banner — steps only */}
      <div
        className="mb-8 px-5 py-4 rounded-2xl flex items-center gap-4"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(200,196,210,0.5)',
        }}
      >
        <CyberLines count={3} />
        {['创意概念', 'AI 提示词微调/场景合成', '视觉终稿', '多端物料延展'].map((step, i, arr) => (
          <span key={step} className="flex items-center gap-2">
            <span
              className="text-[11px] px-2.5 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(88,89,173,0.10)', color: '#5859AD', border: '1px solid rgba(88,89,173,0.2)' }}
            >
              {step}
            </span>
            {i < arr.length - 1 && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5h8M5 1l4 4-4 4" stroke="rgba(88,89,173,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <WorkCard
          label="GAME STAR 盒级玩家召集令"
          tag="校园招聘主视觉"
          wide tall
          image={imgGamestar}
          objectPosition="center 40%"
          lightOverlay={true}
          overlayColor="rgba(10,40,100,0.95)"
          customOverlayBg="linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.85) 52%, rgba(255,255,255,0.20) 75%, transparent 95%)"
        />
        <WorkCard label="3D 毛毡风新春大促" tag="节日活动" image={imgChunjie} objectPosition="center top" overlayColor="rgba(80,10,10,0.92)" />
        <WorkCard label="万圣节赛博惊奇夜" tag="节日活动" image={imgHalloween} objectPosition="center center" overlayColor="rgba(8,8,40,0.95)" />
        <WorkCard label="草图 → AI 3D → 成稿展示" tag="设计流程" wide image={imgProcess} objectPosition="center center" lightOverlay={true} overlayColor="rgba(40,35,80,0.95)" />
      </div>
    </div>
  )
}

/* ─── Sub-section label (reused in GamingTab & DataTab) ─────────────────── */
function SubSectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div style={{ width: 3, height: 20, background: '#5859AD', borderRadius: 2, flexShrink: 0 }} />
      <h3 className="text-sm font-semibold tracking-wide" style={{ color: 'rgba(88,89,173,0.65)' }}>
        {children}
      </h3>
    </div>
  )
}

/* ─── Tab 2: Gaming ──────────────────────────────────────────────────────── */
function GamingTab() {
  const ips = [
    { name: '原神',         color: 'rgba(99,154,255,0.12)',  border: 'rgba(99,154,255,0.25)',  text: 'rgba(60,100,200,0.75)' },
    { name: '崩坏：星穹铁道', color: 'rgba(255,180,80,0.10)', border: 'rgba(255,180,80,0.28)',  text: 'rgba(180,110,30,0.80)' },
    { name: '无限暖暖',      color: 'rgba(240,120,160,0.10)', border: 'rgba(240,120,160,0.28)', text: 'rgba(190,60,110,0.75)' },
    { name: '明日方舟',      color: 'rgba(60,60,70,0.07)',   border: 'rgba(60,60,70,0.20)',    text: 'rgba(27,34,51,0.55)' },
  ]

  return (
    <div>
      <SectionHeader
        index="02 / Gaming Campaign"
        title="热门 IP 联动与社区运营"
        description="立足小黑盒潮流游戏社区，主导平台高频 UGC 互动生态的视觉建设；同时面向米哈游、叠纸等顶流厂商，交付高标准的游戏跨界联动运营设计。"
      />

      {/* ── 区块一：UGC 互动激活活动 ── */}
      <div className="mb-14">
        <SubSectionLabel>
          UGC 互动激活活动
          <span
            className="ml-3 text-[11px] font-light tracking-widest"
            style={{ color: 'rgba(88,89,173,0.4)' }}
          >
            HeyBox Community &amp; UGC Activation
          </span>
        </SubSectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <WorkCard label="A 级核心运营专题" tag="社区运营" image={imgCoreOps} objectPosition="center center" overlayColor="rgba(35,35,35,0.90)" />
          <WorkCard label="日常营销视觉" tag="社区运营" image={imgDaily} objectPosition="center center" overlayColor="rgba(35,35,35,0.90)" />
        </div>
      </div>

      {/* ── 区块二：顶流游戏合作活动 ── */}
      <div>
        <SubSectionLabel>顶流游戏合作活动</SubSectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <WorkCard label="二次元游戏合作" tag="画风" image={imgAnime} objectPosition="center top" overlayColor="rgba(15,40,60,0.88)" />
          <WorkCard label="3A 单机大作发行项目" tag="重工业" image={img3A} objectPosition="center 30%" overlayColor="rgba(20,15,10,0.88)" />
          <WorkCard label="硬核战术 FPS 游戏" tag="硬核对抗" image={imgFPS} objectPosition="center center" overlayColor="rgba(80,40,5,0.88)" />
        </div>
      </div>
    </div>
  )
}

/* ─── Tab 3: UI/UX ───────────────────────────────────────────────────────── */
function UiUxTab() {
  const steps = [
    { num: '01', label: '建库',   desc: '题库自建 · 可视化管理' },
    { num: '02', label: '创作',   desc: '轻量化画板 · 弹窗引导' },
    { num: '03', label: '猜题',   desc: '趣味互动 · 实时反馈' },
    { num: '04', label: '裂变',   desc: 'VIRAL GROWTH' },
  ]

  return (
    <div>
      <SectionHeader
        index="03 / Product & Interaction"
        title="你画我猜社交工具"
        description="主导小黑盒「你画我猜」轻量化社交游戏工具链从 0 到 1 的体验设计。通过「题库自建与可视化」降低圈层创作者门槛，运用「闭环弹窗引导」阻断画板流失节点，跑通「建库-创作-猜题-裂变」的用户自增长机制，成功撬动 30w+ 用户参与并反哺 2.0 迭代。"
      />

      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-5 mb-12">
        {[
          { num: '30w+',   label: '用户参与' },
          { num: '8000+',   label: 'UGC 内容沉淀' },
          { num: '2.0版本', label: '数据反哺推动立项' },
        ].map(({ num, label }) => (
          <div
            key={label}
            className="rounded-2xl flex flex-col"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(200,196,210,0.5)',
              boxShadow: '0 4px 16px rgba(27,34,51,0.04)',
              padding: '20px 24px',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                fontWeight: 800,
                color: '#5859AD',
                lineHeight: 1,
                marginBottom: '6px',
              }}
            >
              {num}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'rgba(88,89,173,0.55)', lineHeight: 1.4 }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Design loop flow */}
      <div
        className="mb-10 p-6 rounded-2xl"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(200,196,210,0.5)',
          boxShadow: '0 8px 28px rgba(27,34,51,0.04)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <CyberLines count={3} />
          <p className="text-[11px] tracking-[0.28em] uppercase font-medium" style={{ color: 'rgba(27,34,51,0.35)' }}>
            设计闭环 · Design Loop
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr',
            gap: 0,
            alignItems: 'start',
          }}
        >
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              {/* Step item */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 16px',
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-bold"
                  style={{
                    background: 'rgba(88,89,173,0.10)',
                    border: '1px solid rgba(88,89,173,0.25)',
                    color: '#5859AD',
                    fontSize: '1rem',
                  }}
                >
                  {step.num}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: '#5859AD', marginTop: '12px' }}
                >
                  {step.label}
                </span>
                <span
                  className="text-xs"
                  style={{ color: 'rgba(88,89,173,0.50)', lineHeight: 1.6, marginTop: '6px' }}
                >
                  {step.desc}
                </span>
              </div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    paddingTop: '20px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 10h14M11 4l6 6-6 6" stroke="rgba(88,89,173,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main grid: iPhone mockup + cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* iPhone shell placeholder */}
        <div
          className="relative rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(200,196,210,0.5)',
            boxShadow: '0 10px 30px rgba(27,34,51,0.04)',
            minHeight: 500,
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(27,34,51,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(27,34,51,0.5) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative flex flex-col items-center gap-5">
            <div
              style={{
                width: 148, height: 300, borderRadius: 28,
                border: '3px solid rgba(27,34,51,0.12)',
                background: '#f0edf5',
                boxShadow: '0 20px 50px rgba(27,34,51,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
              }}
            >
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div style={{ width: 60, height: 18, borderRadius: 10, background: 'rgba(27,34,51,0.08)' }} />
              </div>
              <div
                className="flex-1 mx-2 mb-2 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(145deg, #d8d5e8, #ccc9dc)' }}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 10 Q10 3 17 10 Q10 17 3 10Z" stroke="rgba(88,89,173,0.55)" strokeWidth="1.2" fill="none" />
                    <circle cx="10" cy="10" r="2.5" fill="rgba(88,89,173,0.45)" />
                  </svg>
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(27,34,51,0.3)' }}>Prototype</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgba(27,34,51,0.25)' }}>
              Mobile Prototype
            </span>
          </div>
        </div>

        {/* Card stack */}
        <div className="space-y-4">
          <WorkCard label="你画我猜 — 题库自建与可视化系统" tag="创作者降门槛" />
          <WorkCard label="画板工具与轻量化创作交互" tag="体验流失阻断" />
          <WorkCard label="C端猜题场景与多维裂变链路" tag="社交裂变引流" />
        </div>
      </div>
    </div>
  )
}

/* ─── Tab 4: Data & Brand ────────────────────────────────────────────────── */
function DataTab() {
  return (
    <div>
      <SectionHeader
        index="04 / Data & Brand"
        title="数据策略与品牌周边"
        subtitle="DATA & BRAND"
        description="推行全链路 A/B Testing 验证机制，拒绝纯主观视觉推导。通过电商版面优化使核心 CTR 点击转化率获得 +34.5% 的显著提升；同时具备极强的跨媒介落地底蕴，独立主导小黑盒官方品牌周边的全链路研发——从 2D 视觉规范、工业三视图设计、到工艺打样及最终的工厂量产交付。"
      />

      {/* A/B Test section */}
      <div className="mb-12">
        <SubSectionLabel>
          黑盒商城核心链路改版 · CTR 点击转化率验证
        </SubSectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Version A */}
          <div
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: '#ffffff',
              border: '1px solid rgba(200,196,210,0.5)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 10px 30px rgba(27,34,51,0.03)',
            }}
          >
            <div
              className="px-5 py-3.5 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(27,34,51,0.05)' }}
            >
              <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: 'rgba(27,34,51,0.4)' }}>
                Version A — 突出折扣
              </span>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(185,28,28,0.70)', border: '1px solid rgba(239,68,68,0.15)' }}
              >
                CTR 5.5%
              </span>
            </div>
            <div
              className="flex items-center justify-center"
              style={{ height: 180, background: 'linear-gradient(145deg, #d8d5e8, #ccc9dc)' }}
            >
              <span className="text-[11px] tracking-widest uppercase" style={{ color: 'rgba(27,34,51,0.2)' }}>设计稿占位</span>
            </div>
          </div>

          {/* Version B — winner */}
          <div
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: '#ffffff',
              border: '1px solid rgba(88,89,173,0.35)',
              boxShadow: '0 10px 30px rgba(88,89,173,0.10)',
            }}
          >
            <div
              className="px-5 py-3.5 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(88,89,173,0.12)' }}
            >
              <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: '#5859AD' }}>
                Version B — 美化样式
              </span>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(52,211,153,0.10)', color: 'rgba(4,120,87,0.75)', border: '1px solid rgba(52,211,153,0.22)' }}
              >
                CTR 7.4%
              </span>
            </div>
            <div
              className="relative flex items-center justify-center"
              style={{ height: 180, background: 'linear-gradient(145deg, #d8d5e8, #ccc9dc)' }}
            >
              <span className="text-[11px] tracking-widest uppercase" style={{ color: 'rgba(27,34,51,0.2)' }}>设计稿占位</span>
              {/* Win badge */}
              <div
                className="absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full font-bold"
                style={{
                  background: 'rgba(88,89,173,0.12)',
                  color: '#5859AD',
                  border: '1px solid rgba(88,89,173,0.28)',
                }}
              >
                胜出 +34.5%
              </div>
            </div>
          </div>
        </div>

        {/* Uplift metric bar */}
        <div
          className="mt-5 px-5 py-4 rounded-2xl flex flex-wrap items-center gap-6"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(200,196,210,0.5)',
            backdropFilter: 'blur(6px)',
          }}
        >
          {[
            { label: 'CTR 点击率提升', value: '+34.5%', accent: true },
            { label: '测试周期',      value: '14 days' },
            { label: '样本量',        value: '120,000+' },
            { label: '结论置信度',    value: '95%' },
            { label: '线下周边转化',  value: '数据反哺' },
          ].map(m => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <span
                className="text-sm font-bold"
                style={{ color: m.accent ? '#5859AD' : '#1b2233' }}
              >
                {m.value}
              </span>
              <span className="text-[10px] tracking-wide" style={{ color: 'rgba(27,34,51,0.35)' }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Merchandise */}
      <SubSectionLabel>线上数据反哺线下 · 品牌周边全链路</SubSectionLabel>
      <p className="mb-6 -mt-2" style={{ fontSize: '0.8rem', color: 'rgba(27,34,51,0.45)' }}>
        三视图设计 → 厂商打样 → 量产落地，独立把控全流程
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <WorkCard label="小黑盒棉花娃娃" tag="毛绒软周边" tall />
        <WorkCard label="主题键帽设计" tag="硬核重工键帽" />
        <WorkCard label="亚克力周边系列" tag="品牌周边衍生" />
      </div>
    </div>
  )
}

/* ─── Main export ────────────────────────────────────────────────────────── */
export default function TabContent({ activeTab }) {
  const map = {
    operations: <OperationsTab />,
    gaming:     <GamingTab />,
    uiux:       <UiUxTab />,
    data:       <DataTab />,
  }

  return (
    <section className="min-h-[80vh] px-6 md:px-16 lg:px-24 py-16 max-w-6xl mx-auto">
      <div key={activeTab} className="tab-enter">
        {map[activeTab]}
      </div>
    </section>
  )
}
