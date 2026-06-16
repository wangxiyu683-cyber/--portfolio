import { useState } from 'react'
import { motion } from 'framer-motion'
import HeroSection from './components/HeroSection'
import TabContent from './components/TabContent'
import ContactBar from './components/ContactBar'
import { TABS } from './constants/tabs'

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)

  /** From the in-section strip: switch tab only, no scroll */
  const switchTabInStrip = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Work Tabs Section ────────────────────────────────── */}
      <div id="work-section">
        {/* Secondary tab strip */}
        <div className="px-6 md:px-16 lg:px-24 pt-4">
          <div className="max-w-6xl mx-auto flex justify-center">
            <nav
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                borderRadius: '100px',
                padding: '6px',
              }}
            >
              {TABS.map((tab, i) => {
                const isActive = activeTab === tab.id
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => switchTabInStrip(tab.id)}
                    className="relative flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap select-none transition-colors duration-300"
                    style={{
                      color: isActive ? '#5859AD' : 'rgba(27,34,51,0.45)',
                      background: isActive ? 'rgba(88,89,173,0.10)' : 'transparent',
                    }}
                    {...(!isActive && i > 0 ? {
                      animate: { y: [0, -4, 0] },
                      transition: { delay: 1.2 + i * 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1], repeat: 1, repeatDelay: 0.1 },
                    } : {})}
                  >
                    <span style={{ opacity: isActive ? 0.6 : 0.3, fontWeight: 300, fontSize: '10px' }}>
                      {tab.index}
                    </span>
                    {tab.label}
                    {/* Active diamond */}
                    <span
                      style={{
                        position: 'absolute',
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
                  </motion.button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab content */}
        <TabContent activeTab={activeTab} />
      </div>

      {/* ── Footer Contact Bar ───────────────────────────────── */}
      <ContactBar />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
