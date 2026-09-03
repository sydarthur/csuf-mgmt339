export interface AccentTheme {
  solid: string
  solidText: string
  border: string
  borderStrong: string
  text: string
  soft: string
  softBorder: string
  chip: string
  dot: string
}

export const accentTheme: Record<string, AccentTheme> = {
  blue: {
    solid: 'bg-blue-600',
    solidText: 'text-white',
    border: 'border-blue-200',
    borderStrong: 'border-blue-600',
    text: 'text-blue-700',
    soft: 'bg-blue-50',
    softBorder: 'border-blue-200',
    chip: 'bg-blue-100 text-blue-700',
    dot: 'bg-blue-600',
  },
  green: {
    solid: 'bg-emerald-600',
    solidText: 'text-white',
    border: 'border-emerald-200',
    borderStrong: 'border-emerald-600',
    text: 'text-emerald-700',
    soft: 'bg-emerald-50',
    softBorder: 'border-emerald-200',
    chip: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-600',
  },
  yellow: {
    solid: 'bg-amber-400',
    solidText: 'text-ink',
    border: 'border-amber-200',
    borderStrong: 'border-amber-500',
    text: 'text-amber-700',
    soft: 'bg-amber-50',
    softBorder: 'border-amber-200',
    chip: 'bg-amber-100 text-amber-800',
    dot: 'bg-amber-500',
  },
  purple: {
    solid: 'bg-violet-600',
    solidText: 'text-white',
    border: 'border-violet-200',
    borderStrong: 'border-violet-600',
    text: 'text-violet-700',
    soft: 'bg-violet-50',
    softBorder: 'border-violet-200',
    chip: 'bg-violet-100 text-violet-700',
    dot: 'bg-violet-600',
  },
  gray: {
    solid: 'bg-slate-600',
    solidText: 'text-white',
    border: 'border-slate-200',
    borderStrong: 'border-slate-600',
    text: 'text-slate-700',
    soft: 'bg-slate-50',
    softBorder: 'border-slate-200',
    chip: 'bg-slate-100 text-slate-700',
    dot: 'bg-slate-500',
  },
  red: {
    solid: 'bg-rose-600',
    solidText: 'text-white',
    border: 'border-rose-200',
    borderStrong: 'border-rose-600',
    text: 'text-rose-700',
    soft: 'bg-rose-50',
    softBorder: 'border-rose-200',
    chip: 'bg-rose-100 text-rose-700',
    dot: 'bg-rose-600',
  },
}

export function getAccent(color: string): AccentTheme {
  return accentTheme[color] || accentTheme.gray
}
