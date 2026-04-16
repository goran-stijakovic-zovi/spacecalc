import { formatCurrency } from '../../utils/calculator';

export default function ScenarioTable({ scenarios, currency }) {
  const rows = [
    { label: 'Monthly rent', key: 'monthlyRent', format: v => formatCurrency(currency, v) },
    { label: 'Fitout cost',  key: 'fitoutCost',  format: v => formatCurrency(currency, v) },
    { label: 'Annual cost',  key: 'annualTotal',  format: v => formatCurrency(currency, v) },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `140px repeat(${scenarios.length}, 1fr)`, background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden', gap: '1px' }}>
      {/* Header */}
      <div style={cell({ muted: true, header: true })} />
      {scenarios.map((s, i) => (
        <div key={i} style={cell({ header: true })}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>{s.name}</div>
          <div style={{ fontSize: '11px', color: '#444450', marginTop: '3px' }}>{s.description}</div>
        </div>
      ))}

      {/* Data rows */}
      {rows.map((row, ri) => (
        <>
          <div key={`l${ri}`} style={cell({ muted: true })}>{row.label}</div>
          {scenarios.map((s, i) => (
            <div key={`${ri}-${i}`} style={cell({})}>
              {row.format(s[row.key])}
            </div>
          ))}
        </>
      ))}
    </div>
  );
}

const cell = ({ muted, header } = {}) => ({
  background: '#0E0E0E',
  padding: header ? '18px 20px' : '14px 20px',
  fontSize: muted ? '12px' : '15px',
  fontWeight: muted ? 400 : 600,
  color: muted ? '#444450' : '#FFFFFF',
  fontVariantNumeric: 'tabular-nums',
});
