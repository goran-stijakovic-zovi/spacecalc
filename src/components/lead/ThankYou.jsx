export default function ThankYou() {
  return (
    <div style={{ textAlign: 'center', padding: '24px 0' }} className="fade-in">
      {/* Animated check circle */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="35" stroke="#00D4A8" strokeWidth="2" opacity="0.3" />
          <circle
            cx="36" cy="36" r="35"
            stroke="#00D4A8" strokeWidth="2"
            strokeDasharray="220"
            strokeDashoffset="0"
            strokeLinecap="round"
            style={{
              animation: 'drawCheck 0.8s ease forwards',
              transformOrigin: 'center',
              transform: 'rotate(-90deg)',
            }}
          />
          <polyline
            points="22,37 32,47 50,28"
            stroke="#00D4A8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="100"
            style={{ animation: 'drawCheck 0.5s 0.4s ease forwards', strokeDashoffset: 100 }}
          />
        </svg>
      </div>

      <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
        You're all set!
      </h3>
      <p style={{ fontSize: '15px', color: '#9191A4', lineHeight: 1.65, maxWidth: '340px', margin: '0 auto' }}>
        Your full report is now unlocked above. A workspace expert will be in touch within 1 business day.
      </p>
    </div>
  );
}
