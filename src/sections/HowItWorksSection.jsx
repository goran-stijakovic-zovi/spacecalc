export default function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '48px clamp(20px, 5vw, 60px)',
      maxWidth: '1100px',
      margin: '0 auto',
      width: '100%',
    }}>
      <div className="hiw-strip">
        <span style={{ fontSize: '12px', color: '#444450', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', flexShrink: 0 }}>
          How it works
        </span>

        {[
          { n: '01', text: 'Enter your headcount, city, and office style' },
          { n: '02', text: 'Get an instant area and desk estimate' },
          { n: '03', text: 'Unlock the full cost breakdown' },
        ].map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <span style={{ fontSize: '12px', color: '#00D4A8', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {step.n}
            </span>
            <span style={{ fontSize: '14px', color: '#888896', lineHeight: 1.4, maxWidth: '180px' }}>
              {step.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
