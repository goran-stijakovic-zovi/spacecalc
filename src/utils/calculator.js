import {
  CITIES, OFFICE_TYPES, GROWTH_OPTIONS,
  DESK_SHARING_RATIO, COLLAB_MULTIPLIERS,
  NLA_FACTOR, GLA_FACTOR,
} from '../data/benchmarks';

export function calculateResult(inputs) {
  const { employees, cityId, officeTypeId, daysPerWeek, collaborationLevel, growthId } = inputs;

  const city = CITIES.find(c => c.id === cityId);
  const officeType = OFFICE_TYPES.find(t => t.id === officeTypeId);
  const growth = GROWTH_OPTIONS.find(g => g.id === growthId);

  if (!city || !officeType || !growth) return null;

  // 1. Sharing ratio & base desks
  const sharingRatio = DESK_SHARING_RATIO[daysPerWeek] ?? 0.65;
  const baseDesks = Math.ceil(employees * sharingRatio);

  // 2. Apply growth
  const desksNeeded = Math.ceil(baseDesks * growth.multiplier);

  // 3. Collaboration multiplier on support space
  const collabMult = COLLAB_MULTIPLIERS[collaborationLevel] ?? 1.0;

  // 4. Area calculations
  const nuaWorkstation = desksNeeded * officeType.nuaPerDesk;
  const nuaSupport     = Math.ceil(nuaWorkstation * officeType.supportRatio * collabMult);
  const nua            = nuaWorkstation + nuaSupport;
  const nla            = Math.ceil(nua * NLA_FACTOR);
  const gla            = Math.ceil(nla * GLA_FACTOR);

  // 5. Cost calculations
  const annualRent   = gla * city.rent;
  const monthlyRent  = Math.ceil(annualRent / 12);
  const fitoutCost   = Math.ceil(nua * city.fitout);
  const annualFM     = Math.ceil(nla * city.fm);
  const monthlyFM    = Math.ceil(annualFM / 12);
  const monthlyTotal = monthlyRent + monthlyFM;
  const annualTotal  = annualRent + annualFM;

  // 6. Derived metrics
  const sqmPerPerson = Math.round((gla / employees) * 10) / 10;
  const nuaPerPerson = Math.round((nua / employees) * 10) / 10;
  const industryAvg  = 10; // sqm NUA per person benchmark
  const efficiencyPct = Math.round(((industryAvg - nuaPerPerson) / industryAvg) * 100);

  // 7. Three scenarios (for locked section)
  const scenarios = [
    {
      name: 'Optimise in Place',
      rentMultiplier: 1.0,
      fitoutMultiplier: 0.6,
      description: 'Refurbish your current space',
    },
    {
      name: 'Move — Grade A',
      rentMultiplier: 1.2,
      fitoutMultiplier: 1.0,
      description: 'Premium new-build or trophy office',
    },
    {
      name: 'Move — Grade B',
      rentMultiplier: 0.85,
      fitoutMultiplier: 0.85,
      description: 'Quality space at lower cost',
    },
  ].map(s => ({
    name: s.name,
    description: s.description,
    monthlyRent:  Math.ceil(monthlyRent * s.rentMultiplier),
    fitoutCost:   Math.ceil(fitoutCost * s.fitoutMultiplier),
    annualTotal:  Math.ceil((annualRent * s.rentMultiplier) + (annualFM)),
  }));

  return {
    // Free
    desksNeeded,
    gla,
    sqmPerPerson,
    efficiencyPct,      // positive = more efficient than avg
    nuaPerPerson,
    currency: city.currency,
    cityLabel: city.label,

    // Locked
    nua,
    nla,
    monthlyRent,
    fitoutCost,
    monthlyFM,
    monthlyTotal,
    annualTotal,
    scenarios,
  };
}

export function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}k`;
  return String(n);
}

export function formatCurrency(currency, n) {
  if (n >= 1_000_000) return `${currency}${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${currency}${Math.round(n / 1000)}k`;
  return `${currency}${n.toLocaleString()}`;
}
