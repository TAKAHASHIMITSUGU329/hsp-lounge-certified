<template>
  <div class="space-y-3">
    <div v-for="item in items" :key="item.label">
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm font-serif text-dark-800/70">{{ item.label }}</span>
        <span class="text-xs font-serif font-bold text-gold-400">{{ item.avg.toFixed(2) }}</span>
      </div>
      <div class="w-full h-2 rounded-sm overflow-hidden bg-marble-200">
        <div class="h-full rounded-sm transition-all duration-1000 ease-out" :class="item.avg >= 3.3 ? 'bg-gold-400' : item.avg >= 3.0 ? 'bg-gold-300' : item.avg >= 2.7 ? 'bg-marble-400' : 'bg-salmon-300'" :style="{ width: `${(item.avg / 4) * 100}%` }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ items: { label: string; avg: number }[] }>()
</script>
