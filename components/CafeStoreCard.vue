<template>
  <div class="elegant-card cursor-pointer overflow-hidden" @click="$emit('select', cafe)">
    <!-- Thumbnail photo -->
    <div v-if="cafe.photos && cafe.photos.length > 0" class="relative h-36 overflow-hidden">
      <img :src="cafe.photos[0]" :alt="cafe.name" class="w-full h-full object-cover" loading="lazy">
      <div class="absolute top-2 right-2 bg-dark-900/60 text-white text-[10px] px-2 py-0.5 rounded-sm flex items-center gap-1">
        <span class="material-symbols-outlined" style="font-size:12px">photo_camera</span>
        {{ cafe.photos.length }}
      </div>
    </div>
    <div class="p-5">
      <!-- Header: Tier + Area -->
      <div class="flex items-center justify-between mb-3">
        <span :class="tier.class" class="rounded-sm">{{ tier.label }}</span>
        <span class="text-xs text-dark-800/40 font-serif">{{ cafe.area }}</span>
      </div>

      <!-- Name -->
      <h3 class="font-serif font-bold text-dark-800 text-base leading-tight mb-1">{{ cafe.name }}</h3>
      <p class="text-xs text-dark-800/40 mb-3">{{ formattedDate }}</p>

      <!-- Score + Bar -->
      <div class="flex items-center gap-3 mb-3">
        <span class="font-serif font-bold text-xl" :class="cafe.avgScore >= 3.8 ? 'text-gold-400' : 'text-dark-800'">{{ cafe.avgScore.toFixed(1) }}</span>
        <div class="flex-1 h-1.5 rounded-sm bg-marble-200 overflow-hidden">
          <div class="h-full rounded-sm bg-gold-400" :style="{ width: `${(cafe.avgScore / 4) * 100}%` }" />
        </div>
      </div>

      <!-- Measurements -->
      <div v-if="cafe.measurements.db || cafe.measurements.lux" class="flex flex-wrap gap-2 mb-3">
        <span v-if="cafe.measurements.db" class="text-[10px] text-dark-800/50 bg-marble-200/70 px-2 py-0.5 rounded-sm font-serif">{{ cafe.measurements.db }} dB</span>
        <span v-if="cafe.measurements.colorTempK" class="text-[10px] text-dark-800/50 bg-marble-200/70 px-2 py-0.5 rounded-sm font-serif">{{ cafe.measurements.colorTempK }} K</span>
        <span v-if="cafe.measurements.lux" class="text-[10px] text-dark-800/50 bg-marble-200/70 px-2 py-0.5 rounded-sm font-serif">{{ cafe.measurements.lux }} lux</span>
      </div>

      <!-- Highlights -->
      <p v-if="cafe.highlights" class="text-xs text-dark-800/60 leading-relaxed line-clamp-2">{{ cafe.highlights }}</p>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { CafeSurvey } from '~/composables/useCafeSurveyData'
import { getTier } from '~/composables/useCafeSurveyData'

const props = defineProps<{ cafe: CafeSurvey & { avgScore: number } }>()
defineEmits<{ select: [cafe: CafeSurvey & { avgScore: number }] }>()

const tier = computed(() => getTier(props.cafe.avgScore))
const formattedDate = computed(() => {
  const d = new Date(props.cafe.date)
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
})
</script>
