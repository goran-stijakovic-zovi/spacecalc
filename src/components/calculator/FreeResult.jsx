import { useEffect, useRef, useState } from 'react';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (target === null || target === undefined) return;
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

export default function FreeResult({ icon, label, value, unit, suffix, className, hint, hintPositive }) {
  const animated = useCountUp(typeof value === 'number' ? value : 0);
  const displayValue = typeof value === 'number' ? animated : value;

  return (
    <div className={className} style={{
      background: '#111117',
      border: '1px solid #252530',
      borderRadius: '16px',
      padding: '28px 28px 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{
          width: '32px', height: '32px',
          background: 'rgba(0,212,168,0.1)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', color: '#00D4A8',
        }}>
          {icon}
        </div>
        <span style={{ fontSize: '12px', fontWeight: 500, color: '#5C5C70', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
          {label}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span style={{ fontSize: '44px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
          {displayValue.toLocaleString()}
        </span>
        {unit && <span style={{ fontSize: '18px', color: '#9191A4', fontWeight: 400 }}>{unit}</span>}
        {suffix && <span style={{ fontSize: '14px', color: '#9191A4', marginLeft: '2px' }}>{suffix}</span>}
      </div>

      {hint !== undefined && (
        <div style={{
          marginTop: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '13px',
          color: hintPositive ? '#00D4A8' : '#F5A623',
          fontWeight: 500,
        }}>
          {hintPositive
            ? <RiseOutlined style={{ fontSize: '12px' }} />
            : <FallOutlined style={{ fontSize: '12px' }} />}
          {hint}
        </div>
      )}
    </div>
  );
}
