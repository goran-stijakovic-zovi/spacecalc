export const CITIES = [
  { id: 'london',        label: 'London, UK',           rent: 850,  fitout: 2200, fm: 120, currency: '£' },
  { id: 'paris',         label: 'Paris, France',         rent: 600,  fitout: 1800, fm: 95,  currency: '€' },
  { id: 'amsterdam',     label: 'Amsterdam, Netherlands',rent: 450,  fitout: 1600, fm: 90,  currency: '€' },
  { id: 'berlin',        label: 'Berlin, Germany',       rent: 380,  fitout: 1400, fm: 80,  currency: '€' },
  { id: 'madrid',        label: 'Madrid, Spain',         rent: 320,  fitout: 1200, fm: 70,  currency: '€' },
  { id: 'milan',         label: 'Milan, Italy',          rent: 420,  fitout: 1500, fm: 85,  currency: '€' },
  { id: 'zurich',        label: 'Zurich, Switzerland',   rent: 700,  fitout: 2000, fm: 110, currency: 'CHF' },
  { id: 'singapore',     label: 'Singapore',             rent: 1100, fitout: 2400, fm: 140, currency: 'S$' },
  { id: 'sydney',        label: 'Sydney, Australia',     rent: 750,  fitout: 2000, fm: 110, currency: 'A$' },
  { id: 'hong_kong',     label: 'Hong Kong',             rent: 1400, fitout: 2600, fm: 160, currency: 'HK$' },
  { id: 'dubai',         label: 'Dubai, UAE',            rent: 500,  fitout: 1600, fm: 85,  currency: 'AED' },
  { id: 'new_york',      label: 'New York, USA',         rent: 1200, fitout: 2800, fm: 150, currency: '$' },
  { id: 'san_francisco', label: 'San Francisco, USA',    rent: 1000, fitout: 2600, fm: 140, currency: '$' },
  { id: 'toronto',       label: 'Toronto, Canada',       rent: 600,  fitout: 1800, fm: 95,  currency: 'CA$' },
];
// rent = annual per sqm (GLA), fitout = one-time per sqm (NUA), fm = annual per sqm (NLA)

export const OFFICE_TYPES = [
  {
    id: 'open',
    label: 'Open Plan',
    description: 'Mostly open desking, minimal offices',
    nuaPerDesk: 8,
    supportRatio: 0.25,
  },
  {
    id: 'mixed',
    label: 'Mixed',
    description: 'Balance of open desks and meeting rooms',
    nuaPerDesk: 10,
    supportRatio: 0.30,
  },
  {
    id: 'cellular',
    label: 'Cellular',
    description: 'Private offices and focus rooms',
    nuaPerDesk: 14,
    supportRatio: 0.40,
  },
];

export const GROWTH_OPTIONS = [
  { id: 'stable', label: 'Stable (0–5%)',    multiplier: 1.05 },
  { id: 'low',    label: 'Moderate (5–20%)', multiplier: 1.15 },
  { id: 'medium', label: 'High (20–50%)',    multiplier: 1.30 },
  { id: 'rapid',  label: 'Rapid (50%+)',     multiplier: 1.50 },
];

export const DESK_SHARING_RATIO = { 1: 0.35, 2: 0.50, 3: 0.65, 4: 0.80, 5: 1.00 };

export const COLLAB_MULTIPLIERS = { low: 1.0, medium: 1.15, high: 1.30 };

export const NLA_FACTOR = 1.20;
export const GLA_FACTOR = 1.25;

export const COLLAB_LABELS = {
  low:    'Mostly focused work, few meetings',
  medium: 'Mix of focused and collaborative',
  high:   'High collaboration, many meeting rooms',
};

export const DAYS_LABELS = {
  1: 'Remote-first',
  2: 'Mostly remote',
  3: 'Hybrid balance',
  4: 'Office-led',
  5: 'Fully in-office',
};
