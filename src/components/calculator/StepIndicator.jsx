export default function StepIndicator({ current }) {
  const steps = ['step1', 'step2'];
  const currentIdx = steps.indexOf(current);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {steps.map((_, i) => (
        <div key={i} style={{
          height: '2px',
          width: i <= currentIdx ? '32px' : '16px',
          background: i <= currentIdx ? '#00D4A8' : 'rgba(255,255,255,0.12)',
          borderRadius: '2px',
          transition: 'width 0.3s ease, background 0.3s ease',
        }} />
      ))}
      <span style={{ fontSize: '12px', color: '#444450', marginLeft: '4px', fontWeight: 500 }}>
        {currentIdx + 1} / {steps.length}
      </span>
    </div>
  );
}
