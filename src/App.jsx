import { useState } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import TabContent from './components/TabContent'
import ContactBar from './components/ContactBar'
import { TABS } from './constants/tabs'

export default function App() {
  const [activeTab,    setActiveTab]    = useState(TABS[0].id)
  /** From top nav: switch tab AND scroll work-section into view */
  const switchTabFromNav = (tabId) => {
    setActiveTab(tabId)
    document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  /** From the in-section strip: switch tab only, no scroll */
  const switchTabInStrip = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── Sticky Pill Nav ──────────────────────────────────── */}
      <Navigation
        tabs={TABS}
        activeTab={activeTab}
        setActiveTab={switchTabFromNav}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Work Tabs Section ────────────────────────────────── */}
      <div id="work-section">
        {/* Secondary tab strip */}
        <div
          className="px-6 md:px-16 lg:px-24"
          style={{ borderBottom: '1px solid rgba(27,34,51,0.07)' }}
        >
          <div className="max-w-6xl mx-auto flex gap-0.5 overflow-x-auto no-scrollbar">
            {TABS.map(tab => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => switchTabInStrip(tab.id)}
                  className={`tab-strip-btn${isActive ? ' active' : ''} shrink-0 relative flex items-center gap-2 px-5 py-4 text-xs font-medium tracking-wide whitespace-nowrap`}
                  style={{
                    color: isActive ? '#5859AD' : 'rgba(27,34,51,0.40)',
                    background: 'transparent',
                  }}
                >
                  <span style={{ opacity: isActive ? 0.55 : 0.28, fontWeight: 300, fontSize: '10px' }}>
                    {tab.index}
                  </span>
                  {tab.label}
                  <span
                    className="hidden sm:inline font-light tracking-widest uppercase"
                    style={{ fontSize: '10px', opacity: 0.4 }}
                  >
                    {tab.en}
                  </span>

                  {/* Bottom active bar */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: '28px',
                      height: '2px',
                      background: '#5859AD',
                      borderRadius: '2px 2px 0 0',
                      transform: `translateX(-50%) scaleX(${isActive ? 1 : 0})`,
                      transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  />
                </button>
              )
            })}
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
