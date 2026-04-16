export default function CalcNav({ onOpenModal }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(24px, 5vw, 60px)',
      background: 'rgba(10,10,10,0.94)',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <span style={{ fontWeight: 700, fontSize: '16px', color: '#FFFFFF', letterSpacing: '-0.2px' }}>
        Space<span style={{ color: '#00D4A8' }}>Calc</span>
      </span>
      <button
        onClick={onOpenModal}
        style={{
          height: '36px',
          padding: '0 18px',
          fontSize: '13px',
          fontWeight: 500,
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#888',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'color 0.15s, border-color 0.15s',
          fontFamily: 'inherit',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
      >
        Talk to an expert
      </button>
    </nav>
  );
}
