<template>
  <div>
    <!-- ============================================
         HEADER NAV
    ============================================ -->
    <header class="sticky top-0 z-40 bg-marble-50/95 backdrop-blur-sm border-b border-marble-300/50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <span class="font-serif font-bold text-dark-800 text-sm tracking-wider">HSP Lounge Certified</span>
        <nav class="hidden md:flex items-center gap-6">
          <a href="#about" class="text-xs text-dark-800/50 hover:text-gold-400 font-serif tracking-wider transition-colors">ABOUT</a>
          <a href="#ranking" class="text-xs text-dark-800/50 hover:text-gold-400 font-serif tracking-wider transition-colors">RANKING</a>
          <a href="#cafes" class="text-xs text-dark-800/50 hover:text-gold-400 font-serif tracking-wider transition-colors">CAFES</a>
          <a href="#criteria" class="text-xs text-dark-800/50 hover:text-gold-400 font-serif tracking-wider transition-colors">CRITERIA</a>
        </nav>
      </div>
    </header>

    <!-- ============================================
         1. HERO
    ============================================ -->
    <section class="relative marble-bg overflow-hidden">
      <!-- Gold molding top -->
      <div class="gold-molding-thick mt-0" />

      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
        <p class="section-label mb-6 reveal">HSP Lounge Certified</p>
        <h1 class="font-serif font-bold text-dark-800 text-3xl md:text-5xl leading-tight mb-6 reveal reveal-delay-100">
          繊細なあなたに、<span class="text-gold-400">安心できる居場所</span>を
        </h1>
        <p class="text-dark-800/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 reveal reveal-delay-200">
          光・音・空間・接客。五感の視点から26店舗のカフェ環境を<br class="hidden md:block">
          15の基準で科学的に評価し、認定しています。
        </p>
        <div class="reveal reveal-delay-300">
          <a href="#ranking" class="btn-salmon">おすすめ店舗を見る</a>
        </div>
      </div>

      <!-- Stats -->
      <div class="border-t border-marble-300">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
          <div class="grid grid-cols-3 divide-x divide-marble-300">
            <div class="py-8 text-center reveal reveal-delay-100">
              <p class="metric-value">26</p>
              <p class="metric-label">調査店舗</p>
            </div>
            <div class="py-8 text-center reveal reveal-delay-200">
              <p class="metric-value">15</p>
              <p class="metric-label">評価基準</p>
            </div>
            <div class="py-8 text-center reveal reveal-delay-300">
              <p class="metric-value">{{ tierGroups.S.length }}</p>
              <p class="metric-label">Tier S 認定</p>
            </div>
          </div>
        </div>
      </div>
      <div class="gold-molding" />
    </section>

    <!-- ============================================
         2. ABOUT HSP
    ============================================ -->
    <section id="about" class="py-20 md:py-24 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <p class="section-label mb-3 reveal">About HSP</p>
          <h2 class="section-title reveal reveal-delay-100">HSPとは？</h2>
          <p class="text-dark-800/50 text-base mt-3 max-w-2xl mx-auto reveal reveal-delay-200">
            HSP（Highly Sensitive Person）は、環境からの刺激に対してより敏感に反応する気質を持つ人のこと。人口の約15〜20%が該当します。
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div v-for="(sense, i) in senses" :key="sense.title" class="reveal" :class="`reveal-delay-${(i+1)*100}`">
            <div class="text-center p-5 bg-marble-100 rounded-sm border border-marble-300/30">
              <span class="material-symbols-outlined text-gold-400 mb-2" style="font-size:28px">{{ sense.icon }}</span>
              <h3 class="font-serif font-bold text-dark-800 text-sm mb-1">{{ sense.title }}</h3>
              <p class="text-[11px] text-dark-800/40 leading-relaxed">{{ sense.desc }}</p>
            </div>
          </div>
        </div>

        <div class="mt-10 text-center bg-marble-200/30 rounded-sm p-6 border border-marble-300/30 reveal reveal-delay-600">
          <p class="text-sm text-dark-800/60 leading-relaxed font-body italic">
            「良い空間とは、意識しなくて済む空間のこと。」<br>
            HSPにとっての居心地の良さを、私たちは科学的に定義します。
          </p>
        </div>
      </div>
    </section>

    <!-- ============================================
         3. TIER S RANKING
    ============================================ -->
    <section id="ranking" class="py-20 md:py-24 marble-bg">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <div class="gold-molding mb-12" />
        <div class="text-center mb-12">
          <p class="section-label mb-3 reveal">Tier S</p>
          <h2 class="section-title reveal reveal-delay-100">Tier S 認定店舗</h2>
          <p class="text-dark-800/50 text-base mt-3 reveal reveal-delay-200">全15基準で最高水準を達成した店舗</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(cafe, i) in tierGroups.S" :key="cafe.id" class="reveal" :class="`reveal-delay-${(i+1)*100}`">
            <div class="elegant-card cursor-pointer overflow-hidden" @click="selectedCafe = cafe">
              <!-- Gold top border -->
              <div class="h-1 bg-gold-400" />
              <div class="p-6">
                <span class="tier-s rounded-sm mb-3 inline-block">Tier S</span>
                <h3 class="font-serif font-bold text-dark-800 text-lg leading-tight mb-2">{{ cafe.name }}</h3>
                <p class="text-xs text-dark-800/40 mb-3 font-serif">{{ cafe.area }}</p>

                <!-- Measurements -->
                <div v-if="cafe.measurements.db" class="flex gap-3 mb-3">
                  <span class="text-xs text-dark-800/50 bg-marble-200/70 px-2 py-0.5 rounded-sm font-serif">{{ cafe.measurements.db }} dB</span>
                  <span v-if="cafe.measurements.colorTempK" class="text-xs text-dark-800/50 bg-marble-200/70 px-2 py-0.5 rounded-sm font-serif">{{ cafe.measurements.colorTempK }} K</span>
                </div>

                <p v-if="cafe.highlights" class="text-xs text-dark-800/60 leading-relaxed line-clamp-2">{{ cafe.highlights }}</p>

                <div class="flex items-center justify-between mt-4 pt-3 border-t border-marble-200">
                  <span class="font-serif font-bold text-xl text-gold-400">{{ cafe.avgScore.toFixed(1) }}</span>
                  <span class="text-xs text-gold-400 font-serif flex items-center gap-1">
                    詳細を見る <span class="material-symbols-outlined" style="font-size:14px">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="gold-molding mt-12" />
      </div>
    </section>

    <!-- ============================================
         4. CATEGORY ANALYSIS
    ============================================ -->
    <section class="py-20 md:py-24 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <p class="section-label mb-3 reveal">Analysis</p>
          <h2 class="section-title reveal reveal-delay-100">15項目 評価傾向</h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="reveal reveal-delay-100">
            <CafeBarChart :items="categoryAverages" />
          </div>
          <div class="reveal reveal-delay-200 space-y-4">
            <div class="bg-marble-100 rounded-sm p-5 border border-marble-300/30">
              <div class="flex items-center gap-2 mb-2">
                <span class="material-symbols-outlined text-gold-400" style="font-size:18px">trending_up</span>
                <h4 class="font-serif font-bold text-dark-800 text-sm">最も高評価</h4>
              </div>
              <p class="text-xs text-dark-800/60 leading-relaxed">
                <span class="font-bold text-gold-400">{{ categoryAverages[0]?.label }}</span>が平均
                <span class="font-bold text-gold-400">{{ categoryAverages[0]?.avg.toFixed(2) }}</span>で最高評価。
              </p>
            </div>
            <div class="bg-marble-100 rounded-sm p-5 border border-salmon-200/30">
              <div class="flex items-center gap-2 mb-2">
                <span class="material-symbols-outlined text-salmon-300" style="font-size:18px">trending_down</span>
                <h4 class="font-serif font-bold text-dark-800 text-sm">改善が必要</h4>
              </div>
              <p class="text-xs text-dark-800/60 leading-relaxed">
                <span class="font-bold text-salmon-300">{{ lastCategory?.label }}</span>が平均
                <span class="font-bold text-salmon-300">{{ lastCategory?.avg.toFixed(2) }}</span>で最低評価。
              </p>
            </div>
            <div class="bg-marble-100 rounded-sm p-5 border border-marble-300/30">
              <h4 class="font-serif font-bold text-dark-800 text-sm mb-2">評価スケール</h4>
              <div class="flex gap-4 text-xs font-serif">
                <span class="rating-excellent font-bold">◎ 4点</span>
                <span class="rating-good font-bold">○ 3点</span>
                <span class="rating-fair font-bold">△ 2点</span>
                <span class="rating-poor font-bold">× 1点</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================
         5. ALL CAFES BY TIER
    ============================================ -->
    <section id="cafes" class="py-20 md:py-24 marble-bg">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <div class="gold-molding mb-12" />
        <div class="text-center mb-8">
          <p class="section-label mb-3 reveal">All Cafes</p>
          <h2 class="section-title reveal reveal-delay-100">認定店舗一覧</h2>
        </div>

        <!-- Filter -->
        <div class="flex flex-wrap justify-center gap-2 mb-8 reveal reveal-delay-200">
          <button v-for="filter in filters" :key="filter.value" class="filter-btn" :class="activeFilter === filter.value ? 'filter-btn-active' : 'filter-btn-inactive'" @click="activeFilter = filter.value">
            {{ filter.label }}
          </button>
        </div>

        <!-- Search -->
        <div class="max-w-md mx-auto mb-8 reveal reveal-delay-300">
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-dark-800/30" style="font-size:18px">search</span>
            <input v-model="searchQuery" type="text" placeholder="店舗名で検索..." class="w-full pl-10 pr-4 py-2.5 bg-white border border-marble-300 rounded-sm text-sm font-body text-dark-800 placeholder:text-dark-800/30 focus:outline-none focus:border-gold-400 transition-colors">
          </div>
        </div>

        <!-- Tier groups -->
        <div v-for="tierKey in ['S','A','B','C']" :key="tierKey">
          <div v-if="filteredByTier(tierKey as 'S'|'A'|'B'|'C').length > 0" class="mb-10">
            <div class="flex items-center gap-3 mb-4 reveal">
              <span :class="tierKey === 'S' ? 'tier-s' : tierKey === 'A' ? 'tier-a' : tierKey === 'B' ? 'tier-b' : 'tier-c'" class="rounded-sm">Tier {{ tierKey }}</span>
              <div class="flex-1 h-px bg-marble-300" />
              <span class="text-xs text-dark-800/30 font-serif">{{ filteredByTier(tierKey as 'S'|'A'|'B'|'C').length }}店舗</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="(cafe, i) in filteredByTier(tierKey as 'S'|'A'|'B'|'C')" :key="cafe.id" class="reveal" :class="`reveal-delay-${Math.min((i%6+1)*100,600)}`">
                <CafeStoreCard :cafe="cafe" @select="selectedCafe = $event" />
              </div>
            </div>
          </div>
        </div>
        <div class="gold-molding mt-4" />
      </div>
    </section>

    <!-- ============================================
         6. OWNER INSIGHTS
    ============================================ -->
    <section class="py-20 md:py-24 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <p class="section-label mb-3 reveal">For Cafe Owners</p>
          <h2 class="section-title reveal reveal-delay-100">カフェオーナーの皆様へ</h2>
          <p class="text-dark-800/50 text-base mt-3 reveal reveal-delay-200">調査データから見えた、HSP顧客満足度を高める5つの改善ポイント</p>
        </div>

        <div class="space-y-4">
          <div v-for="(tip, i) in ownerTips" :key="tip.title" class="reveal" :class="`reveal-delay-${(i+1)*100}`">
            <div class="flex gap-5 p-5 bg-marble-100 rounded-sm border border-marble-300/30">
              <div class="w-8 h-8 bg-gold-400 text-white rounded-sm flex items-center justify-center font-serif font-bold text-sm flex-shrink-0">
                {{ i + 1 }}
              </div>
              <div>
                <h3 class="font-serif font-bold text-dark-800 text-sm mb-1">{{ tip.title }}</h3>
                <p class="text-xs text-dark-800/50 leading-relaxed">{{ tip.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================
         7. METHODOLOGY
    ============================================ -->
    <section id="criteria" class="py-20 md:py-24 marble-bg">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <div class="gold-molding mb-12" />
        <div class="text-center mb-12">
          <p class="section-label mb-3 reveal">Criteria</p>
          <h2 class="section-title reveal reveal-delay-100">評価基準</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="reveal reveal-delay-100">
            <div class="elegant-card p-6">
              <h3 class="font-serif font-bold text-dark-800 text-base mb-5">認定ティア</h3>
              <div class="space-y-3">
                <div class="flex items-center gap-4">
                  <span class="tier-s rounded-sm w-16 text-center">Tier S</span>
                  <p class="text-xs text-dark-800/60">平均スコア 3.8以上 — 最高水準</p>
                </div>
                <div class="flex items-center gap-4">
                  <span class="tier-a rounded-sm w-16 text-center">Tier A</span>
                  <p class="text-xs text-dark-800/60">平均スコア 3.3以上 — 優良</p>
                </div>
                <div class="flex items-center gap-4">
                  <span class="tier-b rounded-sm w-16 text-center">Tier B</span>
                  <p class="text-xs text-dark-800/60">平均スコア 2.8以上 — 標準</p>
                </div>
                <div class="flex items-center gap-4">
                  <span class="tier-c rounded-sm w-16 text-center">Tier C</span>
                  <p class="text-xs text-dark-800/60">平均スコア 2.8未満 — 要改善</p>
                </div>
              </div>
            </div>
          </div>
          <div class="reveal reveal-delay-200">
            <div class="elegant-card p-6">
              <h3 class="font-serif font-bold text-dark-800 text-base mb-5">15の評価カテゴリ</h3>
              <div class="grid grid-cols-2 gap-y-2 gap-x-4">
                <div v-for="cat in methodCategories" :key="cat" class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span class="text-xs text-dark-800/60">{{ cat }}</span>
                </div>
              </div>
              <div class="mt-5 pt-4 border-t border-marble-300/50">
                <p class="text-[11px] text-dark-800/40">調査期間: 2024年6月 〜 2026年3月</p>
                <p class="text-[11px] text-dark-800/40 mt-1">計測機器: 照度計・騒音計・色温度計（2026年3月〜）</p>
              </div>
            </div>
          </div>
        </div>
        <div class="gold-molding mt-12" />
      </div>
    </section>

    <!-- ============================================
         FOOTER
    ============================================ -->
    <footer class="py-12 bg-dark-900 text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <p class="font-serif text-marble-400 text-sm tracking-wider mb-2">HSP Lounge Certified</p>
        <p class="text-xs text-marble-500/50 italic">繊細なあなたに、安心できる居場所を。</p>
        <div class="gold-molding mt-6 mb-4 opacity-30" />
        <p class="text-[10px] text-marble-500/30">&copy; 2026 HSP Lounge Certified. All rights reserved.</p>
      </div>
    </footer>

    <!-- ============================================
         DETAIL MODAL
    ============================================ -->
    <CafeDetailModal v-if="selectedCafe" :cafe="selectedCafe" @close="selectedCafe = null" />
  </div>
</template>

<script setup lang="ts">
import type { CafeSurvey } from '~/composables/useCafeSurveyData'
import { getTier } from '~/composables/useCafeSurveyData'

useScrollReveal()

const { tierGroups, categoryAverages, sortedByScore, getGroupedRatings, ratingSymbol, ratingColorClass } = useCafeSurveyData()

const selectedCafe = ref<(CafeSurvey & { avgScore: number }) | null>(null)
const activeFilter = ref('all')
const searchQuery = ref('')

const filters = [
  { label: 'すべて', value: 'all' },
  { label: 'Tier S', value: 'S' },
  { label: 'Tier A', value: 'A' },
  { label: '写真あり', value: 'photo' },
  { label: '計測データあり', value: 'measured' },
]

const filteredCafes = computed(() => {
  let list = sortedByScore.value
  if (activeFilter.value === 'measured') list = list.filter(c => c.measurements.lux !== null)
  else if (activeFilter.value === 'photo') list = list.filter(c => c.photos && c.photos.length > 0)
  else if (['S', 'A', 'B', 'C'].includes(activeFilter.value)) list = list.filter(c => getTier(c.avgScore).label === `Tier ${activeFilter.value}`)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c => c.name.toLowerCase().includes(q) || c.area.toLowerCase().includes(q) || c.highlights.toLowerCase().includes(q))
  }
  return list
})

function filteredByTier(tier: 'S' | 'A' | 'B' | 'C') {
  return filteredCafes.value.filter(c => getTier(c.avgScore).label === `Tier ${tier}`)
}

const lastCategory = computed(() => categoryAverages.value[categoryAverages.value.length - 1])

// Escape key to close modal
onMounted(() => {
  const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') selectedCafe.value = null }
  window.addEventListener('keydown', handleEsc)
  onUnmounted(() => window.removeEventListener('keydown', handleEsc))
})

const senses = [
  { title: '光', desc: '照度・色温度', icon: 'light_mode' },
  { title: '音', desc: '騒音レベル', icon: 'volume_down' },
  { title: '空間', desc: '広さ・家具', icon: 'space_dashboard' },
  { title: '接客', desc: '気配り・配慮', icon: 'sentiment_satisfied' },
  { title: '安全', desc: '心理的安全性', icon: 'shield' },
]

const ownerTips = [
  { title: '席間隔を80cm以上に', desc: '最も多い改善指摘は「席間隔の狭さ」。隣のお客様との距離がHSPの安心感に直結します。間仕切りやキャビネットの活用も効果的です。' },
  { title: '椅子の安定性と快適性', desc: '椅子の小ささ、不安定さ、連結による振動伝達は頻出の問題点。独立した安定した椅子が高評価につながります。' },
  { title: '荷物置き場の確保', desc: 'HSPにとって荷物を安心して置ける環境は重要。フック・バスケット・隣席との仕切りで荷物スペースを確保しましょう。' },
  { title: '間接照明と暖色系の採用', desc: 'Tier S店舗の色温度は2300-3600K。蛍光灯(5000K以上)を避け、暖色系の間接照明に切り替えることで居心地が向上します。' },
  { title: 'モバイルオーダー・コールボタンの導入', desc: '口頭注文はHSPにとって負荷となりうる場面。モバイルオーダーやコールボタンの設置がTier S店舗では多く採用されています。' },
]

const methodCategories = [
  '光環境（照度）', '光環境（色温度）', '色彩・視覚', '音環境',
  '空間の広さ', '床', 'テーブル', '椅子', '荷物置き場',
  '接客・応対', '空気・温熱', '案内・認知', '衛生面', '安全負荷', '価格',
]
</script>
