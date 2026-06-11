/**
 * TabContent — 无边界画册卡片
 * 白光微弱描边半透明卡片 · 上浮 hover · 白金菱形装饰
 */
import React, { useState } from 'react'
import { GRADIENT_TEXT, GRADIENT_BTN } from '../constants/styles'
import WorkDrawer from './WorkDrawer'
import { projects } from '../constants/projects'
import imgGamestar   from '../assets/盒级玩家.webp'
import imgChunjie   from '../assets/新春大促.webp'
import imgHalloween from '../assets/万圣节奇妙夜.webp'
import imgProcess   from '../assets/设计流程.webp'
import imgDaily     from '../assets/日常营销视觉.webp'
import imgCoreOps   from '../assets/A级核心运营专题.webp'
import imgAnime     from '../assets/二次元.webp'
import img3A        from '../assets/3a.webp'
import imgFPS       from '../assets/fps.webp'
import imgAbA      from '../assets/A.webp'
import imgAbB      from '../assets/B.webp'
import imgDoll     from '../assets/娃娃.webp'
import imgKeycap   from '../assets/键帽.webp'
import imgAcrylic  from '../assets/摇摇乐.webp'
import imgCard1    from '../assets/卡片一.webp'
import imgCard2    from '../assets/卡片二.webp'
import imgCard3    from '../assets/卡片三.webp'

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
  cardMinHeight = null,     // overrides default tall/short minHeight
  onClick = null,           // optional click handler
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
        minHeight: cardMinHeight ?? (tall ? '420px' : '260px'),
      }}
      onClick={onClick}
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
function OperationsTab({ onOpenProject }) {
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
          onClick={() => onOpenProject('tab01-card1')}
        />
        <WorkCard label="3D 毛毡风新春大促" tag="节日活动" image={imgChunjie} objectPosition="center top" overlayColor="rgba(80,10,10,0.92)" onClick={() => onOpenProject('tab01-card2')} />
        <WorkCard label="万圣节赛博惊奇夜" tag="节日活动" image={imgHalloween} objectPosition="center center" overlayColor="rgba(8,8,40,0.95)" onClick={() => onOpenProject('tab01-card3')} />
        <WorkCard label="AIGC 工作流复盘" tag="设计流程" wide image={imgProcess} objectPosition="center center" lightOverlay={true} overlayColor="rgba(40,35,80,0.95)" onClick={() => onOpenProject('tab01-card4')} />
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
function GamingTab({ onOpenProject }) {
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
          <WorkCard label="A 级核心运营专题" tag="社区运营" image={imgCoreOps} objectPosition="center center" overlayColor="rgba(35,35,35,0.90)" onClick={() => onOpenProject('tab02-card1')} />
          <WorkCard label="日常营销视觉" tag="社区运营" image={imgDaily} objectPosition="center center" overlayColor="rgba(35,35,35,0.90)" onClick={() => onOpenProject('tab02-card2')} />
        </div>
      </div>

      {/* ── 区块二：顶流游戏合作活动 ── */}
      <div>
        <SubSectionLabel>顶流游戏合作活动</SubSectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <WorkCard label="二次元游戏合作" tag="画风" image={imgAnime} objectPosition="center top" overlayColor="rgba(15,40,60,0.88)" onClick={() => onOpenProject('tab02-card3')} />
          <WorkCard label="3A 单机大作发行项目" tag="重工业" image={img3A} objectPosition="center 30%" overlayColor="rgba(20,15,10,0.88)" onClick={() => onOpenProject('tab02-card4')} />
          <WorkCard label="硬核战术 FPS 游戏" tag="硬核对抗" image={imgFPS} objectPosition="center center" overlayColor="rgba(80,40,5,0.88)" onClick={() => onOpenProject('tab02-card5')} />
        </div>
      </div>
    </div>
  )
}

/* ─── Tab 3: UI/UX ───────────────────────────────────────────────────────── */
function UiUxTab({ onOpenProject }) {
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
        {/* Video player */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'transparent',
            border: 'none',
            boxShadow: '0 10px 30px rgba(27,34,51,0.04)',
            minHeight: 500,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/demo.mp4"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '16px',
            }}
          />
        </div>

        {/* Card stack */}
        <div className="space-y-4">
          <WorkCard label="前期调研" tag="竞品分析 · 交互框架" image={imgCard1} lightOverlay={true} customOverlayBg="linear-gradient(to top, rgba(200,238,255,0.97) 0%, rgba(200,238,255,0.85) 20%, rgba(200,238,255,0.40) 50%, rgba(200,238,255,0.08) 75%, transparent 100%)" onClick={() => onOpenProject('tab03-card1')} />
          <WorkCard label="交互体验设计" tag="创作者降门槛" image={imgCard2} lightOverlay={true} customOverlayBg="linear-gradient(to top, rgba(200,238,255,0.97) 0%, rgba(200,238,255,0.85) 20%, rgba(200,238,255,0.40) 50%, rgba(200,238,255,0.08) 75%, transparent 100%)" onClick={() => onOpenProject('tab03-card2')} />
          <WorkCard label="项目复盘" tag="2.0版本迭代" image={imgCard3} lightOverlay={true} customOverlayBg="linear-gradient(to top, rgba(200,238,255,0.97) 0%, rgba(200,238,255,0.85) 20%, rgba(200,238,255,0.40) 50%, rgba(200,238,255,0.08) 75%, transparent 100%)" onClick={() => onOpenProject('tab03-card3')} />
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
        description="主导小黑盒商城及周边业务的体验设计。通过推行核心版面的 A/B Testing 策略验证，打破纯视觉推导主观盲区，精准定位核心转化节点；同时具备跨媒介物理落地底蕴，主导官方周边全链路研发。实现从 2D 设计规范、工艺打样、供应链跟进到工厂量产交付的闭环自证。"
      />

      {/* A/B Test section */}
      <div className="mb-12">
        <SubSectionLabel>
          黑盒商城核心链路改版，点击转化率验证
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
                Version A — 突出游戏名称
              </span>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(185,28,28,0.70)', border: '1px solid rgba(239,68,68,0.15)' }}
              >
                pv点击率：55%
              </span>
            </div>
            <div style={{ aspectRatio: '16/9', height: 'auto', overflow: 'hidden' }}>
              <img src={imgAbA} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} />
            </div>
          </div>

          {/* Version B */}
          <div
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: '#ffffff',
              border: '1px solid rgba(200,196,210,0.5)',
              boxShadow: '0 10px 30px rgba(27,34,51,0.03)',
            }}
          >
            <div
              className="px-5 py-3.5 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(27,34,51,0.05)' }}
            >
              <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: 'rgba(27,34,51,0.4)' }}>
                Version B — 突出折扣
              </span>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(34,197,94,0.08)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.25)' }}
              >
                pv点击率：74%
              </span>
            </div>
            <div style={{ aspectRatio: '16/9', height: 'auto', overflow: 'hidden' }}>
              <img src={imgAbB} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} />
            </div>
          </div>
        </div>

        {/* A/B Test 结论 */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { value: '74%',  label: '版本 B PV 点击率' },
            { value: '+19%', label: '较版本 A 提升' },
            { value: '80+',  label: '覆盖游戏宣发页面数量' },
          ].map(({ value, label }) => (
            <div
              key={label}
              style={{
                padding: '16px 18px',
                borderRadius: 14,
                background: 'rgba(88,89,173,0.04)',
                border: '1px solid rgba(88,89,173,0.10)',
              }}
            >
              <p style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 800, color: '#5859AD', lineHeight: 1, marginBottom: 6 }}>
                {value}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(88,89,173,0.6)' }}>{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🔍', title: '发现问题',  desc: '纯视觉主导导致折扣信息被忽略，点击转化率偏低' },
            { icon: '✅', title: '验证假设',  desc: '价格锚点前置后用户决策路径更短，点击意愿显著提升' },
            { icon: '📐', title: '制定标准',  desc: '将「折扣信息优先级 > 游戏名称」确立为商城出稿规范并全面执行' },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{
                padding: '18px 20px',
                borderRadius: 14,
                background: 'rgba(88,89,173,0.04)',
                border: '1px solid rgba(88,89,173,0.10)',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#5859AD', marginBottom: 4 }}>{title}</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(88,89,173,0.65)', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Merchandise */}
      <SubSectionLabel>品牌周边全链路</SubSectionLabel>
      <p className="mb-6 -mt-2" style={{ fontSize: '0.8rem', color: 'rgba(27,34,51,0.45)' }}>
        三视图设计 → 厂商打样 → 量产落地，独立把控全流程
      </p>

      {/* Merchandise grid: 棉花娃娃 1.4fr + 键帽 1fr + 亚克力 1fr */}
      <style>{`@media (min-width: 768px) { .merch-grid { grid-template-columns: 1.4fr 1fr 1fr; } }`}</style>
      <div className="merch-grid grid grid-cols-1 gap-5" style={{ pointerEvents: 'none', cursor: 'default' }}>
        <WorkCard label="小黑盒棉花娃娃" tag="毛绒软周边" image={imgDoll} objectPosition="center top" lightOverlay={true} customOverlayBg="linear-gradient(to top, rgba(225,222,243,0.97) 0%, rgba(225,222,243,0.75) 55%, rgba(225,222,243,0.10) 80%, transparent 100%)" cardMinHeight="300px" />
        <WorkCard label="主题键帽设计" tag="硬核重工键帽" image={imgKeycap} objectPosition="center center" lightOverlay={true} customOverlayBg="linear-gradient(to top, rgba(225,222,243,0.97) 0%, rgba(225,222,243,0.75) 55%, rgba(225,222,243,0.10) 80%, transparent 100%)" cardMinHeight="300px" />
        <WorkCard label="亚克力周边系列" tag="品牌周边衍生" image={imgAcrylic} objectPosition="center center" lightOverlay={true} customOverlayBg="linear-gradient(to top, rgba(225,222,243,0.97) 0%, rgba(225,222,243,0.75) 55%, rgba(225,222,243,0.10) 80%, transparent 100%)" cardMinHeight="300px" />
      </div>

    </div>
  )
}

/* ─── Main export ────────────────────────────────────────────────────────── */
export default function TabContent({ activeTab }) {
  const [activeProject, setActiveProject] = useState(null)
  const openProject  = (id) => setActiveProject(projects[id] ?? null)
  const closeProject = () => setActiveProject(null)

  const map = {
    operations: <OperationsTab onOpenProject={openProject} />,
    gaming:     <GamingTab onOpenProject={openProject} />,
    uiux:       <UiUxTab onOpenProject={openProject} />,
    data:       <DataTab />,
  }

  return (
    <>
      <section className="min-h-[80vh] px-6 md:px-16 lg:px-24 py-16 max-w-6xl mx-auto">
        <div key={activeTab} className="tab-enter">
          {map[activeTab]}
        </div>
      </section>

      <WorkDrawer project={activeProject} onClose={closeProject} />
    </>
  )
}
