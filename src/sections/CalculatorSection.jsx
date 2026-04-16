import StepIndicator from '../components/calculator/StepIndicator';
import Step1Basics from '../components/calculator/Step1Basics';
import Step2WorkPattern from '../components/calculator/Step2WorkPattern';
import ResultsPanel from '../components/calculator/ResultsPanel';
import useBreakpoint from '../hooks/useBreakpoint';

export default function CalculatorSection({
  step, inputs, setInputs, result, isLocked,
  step1Valid, step2Valid,
  goToStep2, goToStep1, calculate, reset, onUnlock,
}) {
  const { isMobile } = useBreakpoint();
  const isResults = step === 'results';

  return (
    <section id="calculator" style={{
      padding: `clamp(56px, 10vw, 100px) clamp(20px, 5vw, 60px)`,
      maxWidth: '1100px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
    }}>

      {!isResults && (
        <div className="calc-grid">
          {/* Left — heading + step indicator */}
          <div className="calc-grid-left" style={{ paddingTop: '4px' }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.8px',
              color: '#FFFFFF',
              margin: '0 0 16px',
            }}>
              {step === 'step1' ? 'Tell us about your company.' : 'How does your team work?'}
            </h2>
            <p style={{ fontSize: '14px', color: '#555562', lineHeight: 1.7, maxWidth: '300px', margin: '0 0 40px' }}>
              {step === 'step1'
                ? 'Three quick answers — that\'s all we need.'
                : 'This shapes desk sharing and collaboration space.'}
            </p>
            <StepIndicator current={step} />
          </div>

          {/* Right — form */}
          <div>
            {step === 'step1' && (
              <Step1Basics inputs={inputs} setInputs={setInputs} onNext={goToStep2} valid={step1Valid} />
            )}
            {step === 'step2' && (
              <Step2WorkPattern inputs={inputs} setInputs={setInputs} onBack={goToStep1} onCalculate={calculate} valid={step2Valid} />
            )}
          </div>
        </div>
      )}

      {isResults && result && (
        <ResultsPanel
          result={{ ...result, inputs }}
          isLocked={isLocked}
          onUnlock={onUnlock}
          onReset={reset}
        />
      )}
    </section>
  );
}
