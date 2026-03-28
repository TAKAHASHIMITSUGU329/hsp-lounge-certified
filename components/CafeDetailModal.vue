<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div class="modal-backdrop" @click="$emit('close')" />

    <!-- Panel -->
    <div class="modal-panel">
      <!-- Close button -->
      <button class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-dark-800/40 hover:text-dark-800 z-10" @click="$emit('close')">
        <span class="material-symbols-outlined">close</span>
      </button>

      <!-- Photo Gallery -->
      <div v-if="cafe.photos && cafe.photos.length > 0" class="relative">
        <img :src="cafe.photos[activePhoto]" :alt="cafe.name" class="w-full h-56 md:h-72 object-cover">
        <!-- Photo nav dots -->
        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          <button
            v-for="(_, i) in cafe.photos"
            :key="i"
            class="w-2 h-2 rounded-full transition-colors"
            :class="i === activePhoto ? 'bg-white' : 'bg-white/40'"
            @click="activePhoto = i"
          />
        </div>
        <!-- Nav arrows -->
        <button v-if="cafe.photos.length > 1" class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-dark-900/40 text-white rounded-full flex items-center justify-center hover:bg-dark-900/60" @click="activePhoto = (activePhoto - 1 + cafe.photos.length) % cafe.photos.length">
          <span class="material-symbols-outlined" style="font-size:18px">chevron_left</span>
        </button>
        <button v-if="cafe.photos.length > 1" class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-dark-900/40 text-white rounded-full flex items-center justify-center hover:bg-dark-900/60" @click="activePhoto = (activePhoto + 1) % cafe.photos.length">
          <span class="material-symbols-outlined" style="font-size:18px">chevron_right</span>
        </button>
        <div class="absolute top-3 left-3 bg-dark-900/60 text-white text-[10px] px-2 py-0.5 rounded-sm font-serif">
          {{ activePhoto + 1 }} / {{ cafe.photos.length }}
        </div>
      </div>

      <!-- Header -->
      <div class="p-6 md:p-8 border-b border-marble-300">
        <div class="flex items-center gap-3 mb-3">
          <span :class="tier.class" class="rounded-sm">{{ tier.label }}</span>
          <span class="text-xs text-dark-800/40 font-serif">{{ cafe.area }}</span>
          <span v-if="cafe.hasPhoto" class="text-xs text-gold-400 flex items-center gap-1">
            <span class="material-symbols-outlined" style="font-size:14px">photo_camera</span>
          </span>
        </div>
        <h2 class="font-serif font-bold text-dark-800 text-2xl leading-tight mb-1">{{ cafe.name }}</h2>
        <p class="text-sm text-dark-800/40 font-serif">{{ formattedDate }}</p>
      </div>

      <!-- Metrics -->
      <div class="grid grid-cols-3 gap-3 p-6 md:p-8" v-if="cafe.measurements.db || cafe.measurements.lux || cafe.measurements.colorTempK">
        <div v-if="cafe.measurements.db" class="metric-card">
          <p class="metric-value">{{ cafe.measurements.db }}<span class="text-sm ml-1">dB</span></p>
          <p class="metric-label">騒音レベル</p>
        </div>
        <div v-if="cafe.measurements.colorTempK" class="metric-card">
          <p class="metric-value">{{ cafe.measurements.colorTempK }}<span class="text-sm ml-1">K</span></p>
          <p class="metric-label">色温度</p>
        </div>
        <div v-if="cafe.measurements.lux" class="metric-card">
          <p class="metric-value">{{ cafe.measurements.lux }}<span class="text-sm ml-1">lux</span></p>
          <p class="metric-label">照度</p>
        </div>
      </div>

      <!-- Score -->
      <div class="px-6 md:px-8 pb-6">
        <div class="flex items-center gap-4">
          <span class="font-serif font-bold text-3xl" :class="cafe.avgScore >= 3.8 ? 'text-gold-400' : 'text-dark-800'">{{ cafe.avgScore.toFixed(2) }}</span>
          <span class="text-sm text-dark-800/40">/ 4.00</span>
          <div class="flex-1 h-2 rounded-sm bg-marble-200 overflow-hidden">
            <div class="h-full rounded-sm bg-gold-400" :style="{ width: `${(cafe.avgScore / 4) * 100}%` }" />
          </div>
        </div>
      </div>

      <!-- Radar chart -->
      <div class="px-6 md:px-8 pb-6">
        <div class="w-52 h-52 mx-auto">
          <CafeRadarChart :axes="groupedRatings" />
        </div>
      </div>

      <!-- All 13 ratings -->
      <div class="px-6 md:px-8 pb-6">
        <div class="gold-molding mb-4" />
        <h3 class="font-serif font-bold text-dark-800 text-sm mb-4 tracking-wider">15項目 評価一覧</h3>
        <div class="grid grid-cols-2 gap-x-6 gap-y-2">
          <div v-for="(val, key) in cafe.ratings" :key="key" class="flex items-center justify-between py-1 border-b border-marble-200/50">
            <span class="text-xs text-dark-800/60">{{ ratingLabels[key as keyof typeof ratingLabels] || key }}</span>
            <span class="font-serif font-bold text-sm" :class="ratingColorClass(val)">{{ ratingSymbol(val) }}</span>
          </div>
        </div>
      </div>

      <!-- Service info -->
      <div v-if="cafe.service.orderMethod || cafe.service.priceTier || cafe.service.paymentMethod" class="px-6 md:px-8 pb-6">
        <div class="gold-molding mb-4" />
        <h3 class="font-serif font-bold text-dark-800 text-sm mb-3 tracking-wider">サービス情報</h3>
        <div class="flex flex-wrap gap-2">
          <span v-if="cafe.service.priceTier" class="text-xs bg-marble-200 text-dark-800/70 px-3 py-1 rounded-sm font-serif">価格: {{ cafe.service.priceTier }}</span>
          <span v-if="cafe.service.orderMethod" class="text-xs bg-marble-200 text-dark-800/70 px-3 py-1 rounded-sm font-serif">{{ cafe.service.orderMethod }}</span>
          <span v-if="cafe.service.paymentMethod" class="text-xs bg-marble-200 text-dark-800/70 px-3 py-1 rounded-sm font-serif">{{ cafe.service.paymentMethod }}</span>
        </div>
      </div>

      <!-- Highlights / Improvements -->
      <div v-if="cafe.highlights || cafe.improvements" class="px-6 md:px-8 pb-6">
        <div class="gold-molding mb-4" />
        <div v-if="cafe.highlights" class="mb-4">
          <h3 class="font-serif font-bold text-gold-400 text-xs tracking-wider mb-2">EXCELLENT POINTS</h3>
          <p class="text-sm text-dark-800/80 leading-relaxed">{{ cafe.highlights }}</p>
        </div>
        <div v-if="cafe.improvements">
          <h3 class="font-serif font-bold text-salmon-300 text-xs tracking-wider mb-2">AREAS FOR IMPROVEMENT</h3>
          <p class="text-sm text-dark-800/60 leading-relaxed">{{ cafe.improvements }}</p>
        </div>
      </div>

      <!-- Memos -->
      <div v-if="hasMemos" class="px-6 md:px-8 pb-8">
        <div class="gold-molding mb-4" />
        <h3 class="font-serif font-bold text-dark-800 text-sm mb-3 tracking-wider">詳細メモ</h3>
        <div class="space-y-2">
          <div v-for="(val, key) in cafe.memos" :key="key" class="bg-marble-100 rounded-sm p-3">
            <p class="text-[10px] font-serif font-bold text-gold-400 tracking-wider uppercase mb-1">{{ memoLabels[key] || key }}</p>
            <p class="text-xs text-dark-800/70 leading-relaxed">{{ val }}</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { CafeSurvey } from '~/composables/useCafeSurveyData'
import { getTier, memoLabels, ratingLabels } from '~/composables/useCafeSurveyData'

const props = defineProps<{ cafe: CafeSurvey & { avgScore: number } }>()
defineEmits<{ close: [] }>()

const { getGroupedRatings, ratingSymbol, ratingColorClass } = useCafeSurveyData()
const activePhoto = ref(0)
const tier = computed(() => getTier(props.cafe.avgScore))
const groupedRatings = computed(() => getGroupedRatings(props.cafe))
const hasMemos = computed(() => Object.keys(props.cafe.memos).length > 0)
const formattedDate = computed(() => {
  const d = new Date(props.cafe.date)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 調査`
})

onMounted(() => { document.body.style.overflow = 'hidden' })
onUnmounted(() => { document.body.style.overflow = '' })
</script>
