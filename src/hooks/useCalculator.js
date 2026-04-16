import { useState, useCallback } from 'react';
import { calculateResult } from '../utils/calculator';

const INITIAL_INPUTS = {
  employees:          null,
  cityId:             null,
  officeTypeId:       null,
  daysPerWeek:        3,
  collaborationLevel: null,
  growthId:           null,
};

export default function useCalculator() {
  const [step, setStep]               = useState('step1');
  const [slideDir, setSlideDir]       = useState('right');
  const [inputs, setInputsState]      = useState(INITIAL_INPUTS);
  const [result, setResult]           = useState(null);
  const [isLocked, setIsLocked]       = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const setInputs = useCallback((patch) => {
    setInputsState(prev => ({ ...prev, ...patch }));
  }, []);

  const step1Valid = !!(inputs.employees && inputs.cityId && inputs.officeTypeId);
  const step2Valid = !!(inputs.daysPerWeek && inputs.collaborationLevel && inputs.growthId);

  const goToStep2 = useCallback(() => {
    setSlideDir('right');
    setStep('step2');
  }, []);

  const goToStep1 = useCallback(() => {
    setSlideDir('left');
    setStep('step1');
  }, []);

  const calculate = useCallback(() => {
    const r = calculateResult(inputs);
    setResult(r);
    setSlideDir('right');
    setStep('results');
  }, [inputs]);

  const reset = useCallback(() => {
    setStep('step1');
    setSlideDir('right');
    setResult(null);
    setInputsState(INITIAL_INPUTS);
    setIsLocked(true);
    setLeadSubmitted(false);
  }, []);

  const openModal  = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const submitLead = useCallback((leadData) => {
    const WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL;
    const payload = { ...leadData, inputs, result, submittedAt: new Date().toISOString() };

    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(err => console.error('[Lead webhook error]', err));
    } else {
      console.log('[Lead captured]', payload);
    }

    setLeadSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsLocked(false);
      setLeadSubmitted(false);
    }, 2500);
  }, [inputs, result]);

  return {
    step, slideDir, inputs, result,
    isLocked, isModalOpen, leadSubmitted,
    step1Valid, step2Valid,
    setInputs,
    goToStep2, goToStep1, calculate, reset,
    openModal, closeModal, submitLead,
  };
}
