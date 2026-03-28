import cafeData from '~/public/data/cafe-survey.json'

export interface CafeRatings {
  light: number | null; visual: number | null; sound: number | null
  spaceWidth: number | null; floor: number | null; table: number | null
  chair: number | null; baggage: number | null; service: number | null
  airTemp: number | null; guidance: number | null; hygiene: number | null
  safetyBurden: number | null
}

export interface CafeSurvey {
  id: number; name: string; area: string; date: string
  ratings: CafeRatings
  measurements: { lux: number | null; db: number | null; colorTempK: number | null }
  service: { priceTier: string | null; orderMethod: string | null; paymentMethod: string | null }
  visitContext: { timeSlot: string | null; weather: string | null }
  highlights: string; improvements: string
  totalScore: number | null
  memos: Record<string, string>
  hasPhoto: boolean
  photos: string[]
}

export const ratingLabels: Record<keyof CafeRatings, string> = {
  light: '光環境', visual: '色彩・視覚', sound: '音環境',
  spaceWidth: '空間の広さ', floor: '床', table: 'テーブル',
  chair: '椅子', baggage: '荷物置き場', service: '接客・応対',
  airTemp: '空気・温熱', guidance: '案内・認知', hygiene: '衛生面',
  safetyBurden: '安全負荷',
}

export const memoLabels: Record<string, string> = {
  light: '光環境', visual: '色彩・視覚', sound: '音環境',
  space: '空間・動線', service: '接客・応対', psychSafety: '心理的安全性',
  airTemp: '空気・温熱', guidance: '案内・認知', hygiene: '休息・衛生',
  equipment: '設備・什器', otherFacility: 'その他施設', safetyBurden: '安全負荷',
}

const groupedCategories: { label: string; keys: (keyof CafeRatings)[] }[] = [
  { label: '光環境', keys: ['light'] },
  { label: '色彩', keys: ['visual'] },
  { label: '音環境', keys: ['sound'] },
  { label: '空間', keys: ['spaceWidth', 'floor', 'table', 'chair', 'baggage'] },
  { label: '接客', keys: ['service'] },
  { label: '空気', keys: ['airTemp'] },
  { label: '案内', keys: ['guidance'] },
  { label: '衛生', keys: ['hygiene', 'safetyBurden'] },
]

function averageRating(cafe: CafeSurvey, keys: (keyof CafeRatings)[]): number | null {
  const values = keys.map(k => cafe.ratings[k]).filter((v): v is number => v !== null)
  return values.length === 0 ? null : values.reduce((a, b) => a + b, 0) / values.length
}

export function overallScore(cafe: CafeSurvey): number {
  const values = Object.values(cafe.ratings).filter((v): v is number => v !== null)
  return values.length === 0 ? 0 : values.reduce((a, b) => a + b, 0) / values.length
}

export function getTier(score: number): { label: string; class: string } {
  if (score >= 3.8) return { label: 'Tier S', class: 'tier-s' }
  if (score >= 3.3) return { label: 'Tier A', class: 'tier-a' }
  if (score >= 2.8) return { label: 'Tier B', class: 'tier-b' }
  return { label: 'Tier C', class: 'tier-c' }
}

export function useCafeSurveyData() {
  const cafes = cafeData as CafeSurvey[]

  const sortedByScore = computed(() =>
    [...cafes].map(c => ({ ...c, avgScore: overallScore(c) })).sort((a, b) => b.avgScore - a.avgScore)
  )

  const topCafes = computed(() => sortedByScore.value.slice(0, 5))

  const tierGroups = computed(() => {
    const groups = { S: [] as any[], A: [] as any[], B: [] as any[], C: [] as any[] }
    sortedByScore.value.forEach(c => {
      const t = getTier(c.avgScore)
      if (t.label === 'Tier S') groups.S.push(c)
      else if (t.label === 'Tier A') groups.A.push(c)
      else if (t.label === 'Tier B') groups.B.push(c)
      else groups.C.push(c)
    })
    return groups
  })

  const categoryAverages = computed(() => {
    const keys = Object.keys(ratingLabels) as (keyof CafeRatings)[]
    return keys.map(key => {
      const values = cafes.map(c => c.ratings[key]).filter((v): v is number => v !== null)
      const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0
      return { key, label: ratingLabels[key], avg, count: values.length }
    }).sort((a, b) => b.avg - a.avg)
  })

  const luxData = computed(() =>
    cafes.filter(c => c.measurements.lux !== null).map(c => ({ name: c.name, lux: c.measurements.lux!, avgScore: overallScore(c) }))
  )
  const dbData = computed(() =>
    cafes.filter(c => c.measurements.db !== null).map(c => ({ name: c.name, db: c.measurements.db!, avgScore: overallScore(c) }))
  )
  const colorTempData = computed(() =>
    cafes.filter(c => c.measurements.colorTempK !== null).map(c => ({ name: c.name, colorTempK: c.measurements.colorTempK!, avgScore: overallScore(c) }))
  )

  const allAreas = computed(() => [...new Set(cafes.map(c => c.area))].sort())

  function getGroupedRatings(cafe: CafeSurvey) {
    return groupedCategories.map(g => ({ label: g.label, value: averageRating(cafe, g.keys) }))
  }

  const ratingSymbol = (val: number | null): string => {
    if (val === null) return '-'
    if (val >= 3.5) return '◎'
    if (val >= 2.5) return '○'
    if (val >= 1.5) return '△'
    return '×'
  }

  const ratingColorClass = (val: number | null): string => {
    if (val === null) return 'text-marble-400'
    if (val >= 3.5) return 'rating-excellent'
    if (val >= 2.5) return 'rating-good'
    if (val >= 1.5) return 'rating-fair'
    return 'rating-poor'
  }

  return {
    cafes, sortedByScore, topCafes, tierGroups, categoryAverages,
    luxData, dbData, colorTempData, allAreas,
    getGroupedRatings, groupedCategories,
    ratingLabels, memoLabels, ratingSymbol, ratingColorClass, overallScore, getTier,
  }
}
