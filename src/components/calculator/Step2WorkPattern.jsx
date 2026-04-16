import { Select, Slider } from 'antd';
import { GROWTH_OPTIONS, DAYS_LABELS } from '../../data/benchmarks';

const GROWTH_SELECT = GROWTH_OPTIONS.map(g => ({ value: g.id, label: g.label }));

const COLLAB_OPTIONS = [
  { id: 'low',    label: 'Focused',       desc: 'Mostly heads-down work' },
  { id: 'medium', label: 'Balanced',      desc: 'Mix of desk and meeting rooms' },
  { id: 'high',   label: 'Collaborative', desc: 'Lots of meetings and pods' },
];

const SLIDER_MARKS = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' };

export default function Step2WorkPattern({ inputs, setInputs, onBack, onCalculate, valid }) {
  return (
    <div className="slide-in-right" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      <Field label={`Days in office — ${DAYS_LABELS[inputs.daysPerWeek]}`}>
        <div style={{ padding: '0 6px' }}>
          <Slider
            min={1} max={5} step={1}
            marks={SLIDER_MARKS}
            value={inputs.daysPerWeek}
            onChange={val => setInputs({ daysPerWeek: val })}
            tooltip={{ formatter: v => DAYS_LABELS[v] }}
          />
        </div>
      </Field>

      <Field label="Collaboration style">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {COLLAB_OPTIONS.map(opt => {
            const selected = inputs.collaborationLevel === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setInputs({ collaborationLevel: opt.id })}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  border: `1px solid ${selected ? 'rgba(0,212,168,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  background: selected ? 'rgba(0,212,168,0.06)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, background 0.15s',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 600, color: selected ? '#00D4A8' : '#FFFFFF' }}>
                  {opt.label}
                </span>
                <span style={{ fontSize: '13px', color: '#555562' }}>{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Expected headcount growth">
        <Select
          size="large"
          placeholder="Select growth scenario"
          value={inputs.growthId}
          onChange={val => setInputs({ growthId: val })}
          options={GROWTH_SELECT}
          style={{ width: '100%' }}
        />
      </Field>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onBack}
          style={ghostBtn}
          onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        >
          ← Back
        </button>
        <button
          disabled={!valid}
          onClick={onCalculate}
          style={{
            ...primaryBtn,
            flex: 1,
            opacity: valid ? 1 : 0.35,
            cursor: valid ? 'pointer' : 'not-allowed',
          }}
          onMouseEnter={e => valid && (e.currentTarget.style.background = '#00EFC5')}
          onMouseLeave={e => (e.currentTarget.style.background = '#00D4A8')}
        >
          Get my estimate →
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#AAAABC', marginBottom: '10px' }}>
        {label}
      </div>
      {children}
    </div>
  );
}

const primaryBtn = {
  height: '50px',
  fontSize: '15px',
  fontWeight: 600,
  borderRadius: '6px',
  border: 'none',
  background: '#00D4A8',
  color: '#0A0A0A',
  cursor: 'pointer',
  transition: 'background 0.15s',
  fontFamily: 'inherit',
};

const ghostBtn = {
  height: '50px',
  padding: '0 20px',
  fontSize: '14px',
  fontWeight: 500,
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#888',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'color 0.15s, border-color 0.15s',
  fontFamily: 'inherit',
};
