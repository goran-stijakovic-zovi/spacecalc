import { useEffect, useRef, useState } from 'react';
import { formatCurrency } from '../../utils/calculator';
import ScenarioTable from './ScenarioTable';

export default function ResultsPanel({ result, isLocked, onUnlock, onReset }) {
  const {
    desksNeeded, gla, sqmPerPerson, efficiencyPct,
    nua, nla, monthlyRent, fitoutCost, monthlyFM, monthlyTotal, annualTotal,
    scenarios, currency, cityLabel,
  } = result;

  const effPositive = efficiencyPct >= 0;

  return (
    <div className="fade-in">

      {/* Header */}
      <div style={{ marginBottom: '56px' }}>
        <p style={{ fontSize: '12px', color: '#00D4A8', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
          Your estimate · {cityLabel}
        </p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: '-1px',
          color: '#FFFFFF',
          margin: 0,
        }}>
          You need{' '}
          <span style={{ color: '#00D4A8' }}>{desksNeeded} desks</span>
          {' '}across{' '}
          <span style={{ color: '#00D4A8' }}>{gla} sqm.</span>
        </h2>
        <p style={{ fontSize: '15px', color: '#555562', marginTop: '16px' }}>
          {sqmPerPerson} sqm per person · {effPositive ? `${efficiencyPct}% more efficient` : `${Math.abs(efficiencyPct)}% above`} than market average
        </p>
      </div>

      {/* Free stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '48px',
      }}>
        {[
          { label: 'Desks needed',   value: desksNeeded, unit: '' },
          { label: 'Total area (GLA)', value: gla,        unit: ' sqm' },
          { label: 'Sqm per person', value: sqmPerPerson, unit: ' sqm' },
          { label: 'vs. market avg', value: `${effPositive ? '+' : ''}${efficiencyPct}`, unit: '%', color: effPositive ? '#00D4A8' : '#F5A623' },
        ].map((s, i) => (
          <div key={i} className={`result-card-${i + 1}`} style={{ background: '#0E0E0E', padding: '28px 24px' }}>
            <div style={{ fontSize: '12px', color: '#444450', marginBottom: '12px', fontWeight: 500, letterSpacing: '0.5px' }}>
              {s.label}
            </div>
            <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: s.color ?? '#FFFFFF', lineHeight: 1 }}>
              {typeof s.value === 'number' ? <AnimatedNumber value={s.value} /> : s.value}
              <span style={{ fontSize: '16px', fontWeight: 400, color: '#555562', marginLeft: '3px' }}>{s.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Divider + section label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <span style={{ fontSize: '12px', color: '#444450', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', flexShrink: 0 }}>
          Cost breakdown
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Locked section */}
      <LockedWrapper isLocked={isLocked} onUnlock={onUnlock}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '32px',
        }}>
          {[
            { label: 'Monthly rent',  value: formatCurrency(currency, monthlyRent) },
            { label: 'Fitout cost',   value: formatCurrency(currency, fitoutCost) },
            { label: 'Monthly FM',    value: formatCurrency(currency, monthlyFM) },
            { label: 'Monthly total', value: formatCurrency(currency, monthlyTotal), highlight: true },
          ].map((s, i) => (
            <div key={i} style={{
              background: s.highlight ? 'rgba(0,212,168,0.05)' : '#0E0E0E',
              padding: '28px 24px',
            }}>
              <div style={{ fontSize: '12px', color: '#444450', marginBottom: '12px', fontWeight: 500, letterSpacing: '0.5px' }}>
                {s.label}
              </div>
              <div style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: s.highlight ? '#00D4A8' : '#FFFFFF', lineHeight: 1 }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden', marginBottom: '32px' }}>
          {[
            { label: 'Net Usable', value: `${nua} sqm` },
            { label: 'Net Lettable', value: `${nla} sqm` },
            { label: 'Gross Lettable', value: `${gla} sqm` },
          ].map((r, i) => (
            <div key={i} style={{ flex: 1, background: '#0E0E0E', padding: '20px 20px' }}>
              <div style={{ fontSize: '11px', color: '#444450', marginBottom: '8px', fontWeight: 500, letterSpacing: '0.5px' }}>{r.label}</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF' }}>{r.value}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: '12px', color: '#444450', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
          Scenario comparison
        </div>
        <div style={{ overflowX: 'auto' }}>
          <ScenarioTable scenarios={scenarios} currency={currency} />
        </div>
      </LockedWrapper>

      <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={onReset}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#555562',
            borderRadius: '6px',
            height: '40px',
            padding: '0 20px',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#555562'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        >
          ← Recalculate
        </button>
      </div>
    </div>
  );
}

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const duration = 900;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

function LockedWrapper({ isLocked, onUnlock, children }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        filter: isLocked ? 'blur(4px)' : 'none',
        opacity: isLocked ? 0.45 : 1,
        userSelect: isLocked ? 'none' : 'auto',
        pointerEvents: isLocked ? 'none' : 'auto',
        transition: 'filter 0.5s ease, opacity 0.5s ease',
      }}>
        {children}
      </div>

      {isLocked && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'rgba(10,10,10,0.75)',
          backdropFilter: 'blur(2px)',
          borderRadius: '12px',
          gap: '16px',
          padding: '40px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '14px', color: '#888896', maxWidth: '280px', lineHeight: 1.6, margin: 0 }}>
            Leave your details to unlock the full cost breakdown and speak to an expert.
          </p>
          <button
            onClick={onUnlock}
            style={{
              height: '48px',
              padding: '0 32px',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              background: '#00D4A8',
              color: '#0A0A0A',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#00EFC5')}
            onMouseLeave={e => (e.currentTarget.style.background = '#00D4A8')}
          >
            Get my full report →
          </button>
        </div>
      )}
    </div>
  );
}
