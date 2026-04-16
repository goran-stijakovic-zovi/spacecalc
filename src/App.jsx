import { useState } from 'react';
import { ConfigProvider, App as AntApp } from 'antd';
import { antdTheme } from './theme/antdTheme';
import useCalculator from './hooks/useCalculator';
import HeroSection from './sections/HeroSection';
import HowItWorksSection from './sections/HowItWorksSection';
import CalculatorSection from './sections/CalculatorSection';
import FooterSection from './sections/FooterSection';
import LeadModal from './components/lead/LeadModal';
import CalcNav from './components/ui/CalcNav';

// scene: 'hero' | 'zooming' | 'calc'
function AppContent() {
  const [scene, setScene] = useState('hero');
  const calc = useCalculator();

  const handleEnter = () => {
    setScene('zooming');
    setTimeout(() => setScene('calc'), 4000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', position: 'relative' }}>

      {scene !== 'calc' && (
        <HeroSection
          scene={scene}
          onEnter={handleEnter}
          onOpenModal={calc.openModal}
        />
      )}

      {scene === 'calc' && (
        <>
          <CalcNav onOpenModal={calc.openModal} />
          <div style={{ animation: 'calcReveal 0.5s ease both', paddingTop: '64px' }}>
            <HowItWorksSection />
            <CalculatorSection
              step={calc.step}
              inputs={calc.inputs}
              setInputs={calc.setInputs}
              result={calc.result}
              isLocked={calc.isLocked}
              step1Valid={calc.step1Valid}
              step2Valid={calc.step2Valid}
              goToStep2={calc.goToStep2}
              goToStep1={calc.goToStep1}
              calculate={calc.calculate}
              reset={calc.reset}
              onUnlock={calc.openModal}
            />
            <FooterSection />
          </div>
        </>
      )}

      <LeadModal
        open={calc.isModalOpen}
        onClose={calc.closeModal}
        onSubmit={calc.submitLead}
        leadSubmitted={calc.leadSubmitted}
      />
    </div>
  );
}

export default function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <AntApp>
        <AppContent />
      </AntApp>
    </ConfigProvider>
  );
}
