import { useEffect, useState } from 'react';
import useBreakpoint from '../hooks/useBreakpoint';

const OFFICE_IMAGE = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80';

export default function HeroSection({ scene, onEnter, onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const isZooming = scene === 'zooming';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100svh', minHeight: '560px', overflow: 'hidden' }}>

      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${OFFICE_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'center center' : 'center 40%',
        transformOrigin: 'center center',
        willChange: 'transform, filter',
        animation: isZooming ? 'zoomIntoOffice 4s cubic-bezier(0.25, 0.1, 0.1, 1) both' : 'none',
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isMobile
          ? 'rgba(8,10,28,0.85)'
          : `linear-gradient(105deg, rgba(8,10,28,0.92) 0%, rgba(8,10,28,0.72) 50%, rgba(8,10,28,0.4) 100%)`,
        pointerEvents: 'none',
      }} />

      {/* Navbar */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 20px' : '0 clamp(24px, 5vw, 60px)',
        background: scrolled ? 'rgba(8,10,28,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background 0.25s, border-color 0.25s',
      }}>
        <span style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF' }}>
          Space<span style={{ color: '#00D4A8' }}>Calc</span>
        </span>
        {!isMobile && (
          <button
            onClick={onOpenModal}
            style={ghostBtn}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#AAA'; }}
          >
            Talk to an expert
          </button>
        )}
      </nav>

      {/* Hero content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: isMobile
          ? '80px 20px 140px'
          : `clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) 120px`,
        animation: isZooming ? 'heroTextOut 4s ease both' : 'none',
      }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: isMobile ? '20px' : '28px' }}>
          <div style={{ width: '24px', height: '1px', background: '#00D4A8' }} />
          <span style={{ fontSize: '10px', fontWeight: 600, color: '#00D4A8', letterSpacing: '3px', textTransform: 'uppercase' }}>
            Workspace calculator
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: isMobile ? '36px' : isTablet ? '52px' : 'clamp(52px, 6.5vw, 80px)',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: isMobile ? '-0.5px' : '-1.5px',
          color: '#FFFFFF',
          margin: `0 0 ${isMobile ? '16px' : '24px'}`,
          maxWidth: isMobile ? '100%' : '620px',
        }}>
          Expert workspace planning,{' '}
          <span style={{ color: '#00D4A8' }}>instantly.</span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: isMobile ? '14px' : '16px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.65,
          maxWidth: '380px',
          margin: `0 0 ${isMobile ? '32px' : '44px'}`,
          fontWeight: 400,
        }}>
          Find out how much office space your company needs — and what it will cost — in 60 seconds.
        </p>

        {/* CTAs */}
        <div className="hero-ctas">
          <button
            onClick={onEnter}
            disabled={isZooming}
            style={{
              ...primaryBtn,
              width: isMobile ? '100%' : 'auto',
              boxShadow: '0 0 0 1px rgba(0,212,168,0.3), 0 8px 32px rgba(0,212,168,0.15)',
            }}
            onMouseEnter={e => { if (!isZooming) e.currentTarget.style.background = '#00EFC5'; }}
            onMouseLeave={e => (e.currentTarget.style.background = '#00D4A8')}
          >
            Let's start →
          </button>
          <button
            onClick={onOpenModal}
            style={{ ...ghostBtn, width: isMobile ? '100%' : 'auto' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#AAA'; }}
          >
            Talk to an expert
          </button>
        </div>
      </div>

      {/* Stats strip — pinned to bottom */}
      <div
        className="hero-stats"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(8,10,28,0.65)',
          backdropFilter: 'blur(10px)',
          animation: isZooming ? 'heroTextOut 4s ease both' : 'none',
        }}
      >
        {[
          { n: '250k+',  label: 'sqm estimated' },
          { n: '15',     label: 'cities covered' },
          { n: '$2.1B+', label: 'costs modelled' },
        ].map((s, i) => (
          <div key={i} className="hero-stat-item" style={{
            padding: isMobile ? '18px 20px' : '24px 40px 24px 0',
            marginRight: isMobile ? 0 : '40px',
            borderRight: (!isMobile && i < 2) ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <div style={{ fontSize: isMobile ? '20px' : 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
              {s.n}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '5px' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const primaryBtn = {
  height: '48px',
  padding: '0 28px',
  fontSize: '15px',
  fontWeight: 600,
  borderRadius: '6px',
  border: 'none',
  background: '#00D4A8',
  color: '#08091A',
  cursor: 'pointer',
  transition: 'background 0.15s',
  fontFamily: 'inherit',
  letterSpacing: '-0.2px',
};

const ghostBtn = {
  height: '48px',
  padding: '0 22px',
  fontSize: '14px',
  fontWeight: 500,
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.12)',
  color: '#AAA',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'color 0.15s, border-color 0.15s',
  fontFamily: 'inherit',
};
