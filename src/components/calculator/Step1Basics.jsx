import { InputNumber, Select } from 'antd';
import { CITIES, OFFICE_TYPES } from '../../data/benchmarks';

const CITY_OPTIONS = CITIES.map(c => ({ value: c.id, label: c.label }));

export default function Step1Basics({ inputs, setInputs, onNext, valid }) {
  return (
    <div className="slide-in-right" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      <Field label="Number of employees" hint="Total headcount including remote workers">
        <InputNumber
          size="large"
          min={1} max={10000}
          placeholder="e.g. 150"
          value={inputs.employees}
          onChange={val => setInputs({ employees: val })}
          style={{ width: '100%' }}
          controls={false}
        />
      </Field>

      <Field label="City">
        <Select
          size="large"
          showSearch
          placeholder="Select your city"
          value={inputs.cityId}
          onChange={val => setInputs({ cityId: val })}
          options={CITY_OPTIONS}
          style={{ width: '100%' }}
          filterOption={(input, opt) => opt.label.toLowerCase().includes(input.toLowerCase())}
        />
      </Field>

      <Field label="Office layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {OFFICE_TYPES.map(type => {
            const selected = inputs.officeTypeId === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setInputs({ officeTypeId: type.id })}
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
                  {type.label}
                </span>
                <span style={{ fontSize: '13px', color: '#555562' }}>
                  {type.description}
                </span>
              </button>
            );
          })}
        </div>
      </Field>

      <button
        disabled={!valid}
        onClick={onNext}
        style={{
          ...primaryBtn,
          opacity: valid ? 1 : 0.35,
          cursor: valid ? 'pointer' : 'not-allowed',
        }}
        onMouseEnter={e => valid && (e.currentTarget.style.background = '#00EFC5')}
        onMouseLeave={e => (e.currentTarget.style.background = '#00D4A8')}
      >
        Next →
      </button>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#AAAABC', marginBottom: '10px', letterSpacing: '-0.1px' }}>
        {label}
      </div>
      {children}
      {hint && <div style={{ fontSize: '12px', color: '#444450', marginTop: '6px' }}>{hint}</div>}
    </div>
  );
}

const primaryBtn = {
  height: '50px',
  width: '100%',
  fontSize: '15px',
  fontWeight: 600,
  borderRadius: '6px',
  border: 'none',
  background: '#00D4A8',
  color: '#0A0A0A',
  cursor: 'pointer',
  transition: 'background 0.15s',
  fontFamily: 'inherit',
  letterSpacing: '-0.2px',
};
