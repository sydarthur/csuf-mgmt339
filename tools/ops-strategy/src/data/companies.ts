export interface StrategyOption {
  name: string
  upfrontCost: number | string
  chipsNeeded?: number | string
  grossRevenue: string
  allocation?: string
  die: string
  dependencies: string
}

export interface Company {
  id: string
  name: string
  tagline: string
  description: string
  advantages: string[]
  disadvantages: string[]
  superPower: { name: string; effect: string; type: 'nuclear' | 'regenerating'; reason: string }
  strategies: StrategyOption[]
  hasChipsColumn: boolean
  hasAllocationColumn: boolean
  negotiationNotes: string[]
  accentColor: string
}

export const companies: Company[] = [
  {
    id: 'pearcom',
    name: 'PearCom, Inc.',
    tagline: 'The Consumer King',
    description:
      'You are the consumer king. Your brand stands for premium design, privacy, and security. You dominate consumer devices but have a weak enterprise footprint. Your challenge is to defend your fortress or pivot into enterprise without losing your core.',
    advantages: [
      'Strong consumer loyalty and ecosystem lock-in',
      'Security reputation is industry leading',
      'Historic leverage with Silicore',
    ],
    disadvantages: [
      'Weak AI capabilities without partners',
      'Limited enterprise distribution',
      'Supply chain exposure if chips are constrained',
    ],
    superPower: {
      name: 'Lock-In',
      effect:
        'You can veto Silicore from selling chips to SoftCom this round. Effect: SoftCom gets 0 chips; Silicore loses 2B revenue.',
      type: 'nuclear',
      reason: 'If used twice, SoftCom is mathematically eliminated.',
    },
    strategies: [
      {
        name: 'Fortress',
        upfrontCost: 3,
        chipsNeeded: 90,
        grossRevenue: '12B',
        die: 'None',
        dependencies:
          'Safe. Needs >=45 chips to avoid failure. Shock B gives +1 to die if any roll is used.',
      },
      {
        name: 'Enterprise Pivot',
        upfrontCost: 5,
        chipsNeeded: 30,
        grossRevenue: '22B',
        die: 'Standard',
        dependencies:
          'Requires CorpSolutions Integrator and AI access (SoftCom AI Arms Dealer or OpenAIco Open Model/Hardware Integration). Needs >=15 chips. Enterprise-tagged. Shock B gives -2 die roll.',
      },
      {
        name: 'Partner w/ SoftCom',
        upfrontCost: 1,
        chipsNeeded: 0,
        grossRevenue: '8B',
        die: 'None',
        dependencies:
          'Requires SoftCom AI Arms Dealer. Net profit split 50/50 with SoftCom.',
      },
    ],
    hasChipsColumn: true,
    hasAllocationColumn: false,
    negotiationNotes: [
      'Enterprise Pivot is high upside but can fail if either AI or CorpSolutions is missing.',
      'Fortress is steady but chip-hungry; it becomes vulnerable under capacity shocks.',
      'Partnership is stable but forces you to share upside with SoftCom.',
    ],
    accentColor: 'purple',
  },
  {
    id: 'softcom',
    name: 'SoftCom Systems',
    tagline: 'The Enterprise Giant',
    description:
      'You are the enterprise giant. You dominate cloud, productivity, and AI via OpenAIco, but your consumer hardware track record is weak. Your challenge is to enter hardware without collapsing under risk.',
    advantages: [
      'Deep enterprise relationships and distribution power',
      'AI leadership through OpenAIco',
      'Strong corporate lock-in across industries',
    ],
    disadvantages: [
      'Weak consumer device credibility',
      'Exposed to supply chain constraints',
      'AI integration risks backlash in security-sensitive markets',
    ],
    superPower: {
      name: 'The Bundle',
      effect:
        'If CorpSolutions refuses to sell your hardware, their revenue is cut by 3B (cloud license pressure). Applies when you choose Hardware Blitz and CorpSolutions is not Integrator_SoftCom.',
      type: 'regenerating',
      reason: "It's just pricing leverage.",
    },
    strategies: [
      {
        name: 'Hardware Blitz',
        upfrontCost: 8,
        chipsNeeded: 40,
        grossRevenue: '25B',
        die: 'Standard',
        dependencies:
          'Requires AmeriShop PremiumPartner_SoftCom. Needs >=20 chips. Enterprise-tagged. Shock B gives -2 die roll.',
      },
      {
        name: 'AI Arms Dealer',
        upfrontCost: 2,
        chipsNeeded: 0,
        grossRevenue: '10B',
        die: 'Standard',
        dependencies:
          'Requires PearCom Enterprise Pivot or Partner w/ SoftCom.',
      },
      {
        name: 'Stay Software',
        upfrontCost: 0,
        chipsNeeded: 0,
        grossRevenue: '6B -> 5B -> 4B',
        die: 'None',
        dependencies: 'Declines by 1 per round (melting ice cube).',
      },
    ],
    hasChipsColumn: true,
    hasAllocationColumn: false,
    negotiationNotes: [
      'Hardware Blitz is high upside but fails without retailer access and chips.',
      'Arms Dealer creates leverage over PearCom but requires a buyer.',
      'Staying pure software is safest early, but decays over time.',
    ],
    accentColor: 'red',
  },
  {
    id: 'amerishop',
    name: 'AmeriShop',
    tagline: 'The Retail Gatekeeper',
    description:
      'You are the dominant consumer retailer. You control demand visibility, logistics, and online sales. Your power is indirect but decisive.',
    advantages: [
      'Control over consumer demand and distribution',
      'Data-driven pricing and ranking power',
      'Can extract rents from manufacturers',
    ],
    disadvantages: [
      'Low margins',
      'Risk of being bypassed by direct sales',
      'Exposed to regulatory attention',
    ],
    superPower: {
      name: 'The Algorithm',
      effect:
        'You can boost or bury one manufacturer\'s die roll (+1 or -1) by adjusting search ranking. Baked into Premium Partner (+1) and Private Label (-1).',
      type: 'regenerating',
      reason: "It's just software.",
    },
    strategies: [
      {
        name: 'Open Market',
        upfrontCost: 0,
        grossRevenue: '4B',
        die: 'None',
        dependencies: 'Safe baseline.',
      },
      {
        name: 'Private Label',
        upfrontCost: 2,
        grossRevenue: '8B',
        die: 'None',
        dependencies:
          'Target (PearCom or SoftCom) loses 3B gross and -1 die roll.',
      },
      {
        name: 'Premium Partner',
        upfrontCost: 1,
        grossRevenue: '2B + 25% of target gross',
        die: 'None',
        dependencies:
          'Target loses 25% of gross but gains +1 die roll. Required for SoftCom Hardware Blitz.',
      },
    ],
    hasChipsColumn: false,
    hasAllocationColumn: false,
    negotiationNotes: [
      'You can profit most by extracting a revenue share.',
      'You can punish a manufacturer with Private Label, but that can destabilize the ecosystem.',
    ],
    accentColor: 'yellow',
  },
  {
    id: 'corpsolutions',
    name: 'CorpSolutions',
    tagline: 'The Enterprise Kingmaker',
    description:
      'You are the enterprise integration kingmaker. CIOs and governments depend on you for secure deployments. Your certification can make or break an enterprise strategy.',
    advantages: [
      'Trusted by enterprise buyers and regulators',
      'Deep history with SoftCom enterprise stack',
      'Control over enterprise access',
    ],
    disadvantages: [
      'Limited consumer footprint',
      'Vulnerable to manufacturer bypass',
      'Heavy dependence on partner hardware',
    ],
    superPower: {
      name: 'The Veto',
      effect:
        'You can refuse to certify a device, cutting its enterprise revenue to 0 for the round. Modeled via Migration Agent against the opposing manufacturer.',
      type: 'nuclear',
      reason: 'Blocking revenue repeatedly forces the manufacturer to fire you, destroying the partnership dynamic.',
    },
    strategies: [
      {
        name: 'Agnostic',
        upfrontCost: 0,
        grossRevenue: '3B (or 5B if PearCom Enterprise Pivot)',
        die: 'None',
        dependencies: 'Neutral stance, modest revenue.',
      },
      {
        name: 'Migration Agent',
        upfrontCost: 0,
        grossRevenue: '6B',
        die: 'None',
        dependencies:
          'Target pays 6B bounty; opposing manufacturer loses 5B and has enterprise strategy vetoed.',
      },
      {
        name: 'Integrator',
        upfrontCost: 1,
        grossRevenue: '25% of target gross',
        die: 'None',
        dependencies:
          'Grants enterprise access to target. Subject to Shock C fine.',
      },
    ],
    hasChipsColumn: false,
    hasAllocationColumn: false,
    negotiationNotes: [
      'Integrator is the key gate for enterprise pivots.',
      'Migration Agent is a powerful disruption tool that can swing outcomes.',
    ],
    accentColor: 'gray',
  },
  {
    id: 'openai',
    name: 'OpenAIco',
    tagline: 'The AI Brain Trust',
    description:
      'You are the AI brain trust. Your models power the next wave of enterprise and consumer AI. You can deepen your SoftCom alliance, open your models to all, or go all-in on hardware integration.',
    advantages: [
      'Best-in-class AI technology',
      'High demand from both consumer and enterprise markets',
      'Powerful leverage over platform strategy',
    ],
    disadvantages: [
      'Heavy compute costs',
      'Dependent on partner distribution',
      'Regulatory and security scrutiny',
    ],
    superPower: {
      name: 'Model Degradation',
      effect:
        "If you switch partners, the old partner's next die roll suffers a -2 penalty. Applies in Round 2 if you are not SoftCom Exclusive.",
      type: 'regenerating',
      reason: 'Happens automatically every time they switch.',
    },
    strategies: [
      {
        name: 'SoftCom Exclusive',
        upfrontCost: 0,
        grossRevenue: '4B -> 3B -> 2B',
        die: 'None',
        dependencies: 'Safe but declining each round. Subject to Shock C fine.',
      },
      {
        name: 'Open Model',
        upfrontCost: 2,
        grossRevenue: '12B',
        die: 'OpenModel (1=0x, 2-3=0.5x, 4-6=1.0x)',
        dependencies: 'Shock B gives -2 die roll.',
      },
      {
        name: 'Hardware Integration',
        upfrontCost: 4,
        grossRevenue: '20B',
        die: 'HW Integration (1-3=0x, 4-6=1.0x)',
        dependencies:
          'Requires PearCom Enterprise Pivot. Shock B gives -2 die roll.',
      },
    ],
    hasChipsColumn: false,
    hasAllocationColumn: false,
    negotiationNotes: [
      'Open Model is the balanced play with moderate upside and controlled risk.',
      'Hardware Integration is boom or bust and depends on PearCom\'s pivot.',
      'Staying exclusive to SoftCom becomes less valuable over time.',
    ],
    accentColor: 'green',
  },
  {
    id: 'silicore',
    name: 'Silicore Technologies',
    tagline: 'The Chip Chokepoint',
    description:
      'You are the chokepoint of secure hardware. Regulations make your chips the only trusted option for premium security. Everyone needs you, but capacity is limited.',
    advantages: [
      'Monopoly-like control of trusted chip supply',
      'Strong regulatory standing',
      'Historic partnership with PearCom',
    ],
    disadvantages: [
      'Capacity constraints create hard trade-offs',
      'Breaking exclusivity damages long-term contracts',
      'High capital costs to scale',
    ],
    superPower: {
      name: 'Allocation Priority',
      effect:
        'In a shortage, you choose who gets chips. You can demand bribes to prioritize a customer (GM adjudication).',
      type: 'nuclear',
      reason: 'Doing this repeatedly destroys your reputation as a "neutral" supplier.',
    },
    strategies: [
      {
        name: 'PearCom Exclusive',
        upfrontCost: 2,
        grossRevenue: '10B',
        allocation: '90 Pear / 10 Soft',
        die: 'None',
        dependencies:
          'Stable. SoftCom is starved. Shock B gives +1 die roll if any roll is used.',
      },
      {
        name: 'Split Fab',
        upfrontCost: 3,
        grossRevenue: '15B',
        allocation: '50 Pear / 50 Soft',
        die: 'Yield Roll',
        dependencies:
          'On yield fail (roll 1-3), capacity drops to 60 for the round.',
      },
      {
        name: 'Spot Market',
        upfrontCost: 0,
        grossRevenue: '8B',
        allocation: 'Auction',
        die: 'None',
        dependencies:
          'Allocation by spot market; methods are proportional or highest-bidder.',
      },
    ],
    hasChipsColumn: false,
    hasAllocationColumn: true,
    negotiationNotes: [
      'Your allocation can make or break both giants.',
      'Under capacity shocks, your power spikes dramatically.',
    ],
    accentColor: 'blue',
  },
]
