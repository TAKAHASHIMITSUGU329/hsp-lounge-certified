<template>
  <svg :viewBox="`0 0 ${size} ${size}`" class="w-full h-full">
    <circle v-for="level in 4" :key="'bg-' + level" :cx="center" :cy="center" :r="(radius / 4) * level" fill="none" stroke="#D6C9B6" stroke-width="0.5" opacity="0.5" />
    <line v-for="(_, i) in axes" :key="'axis-' + i" :x1="center" :y1="center" :x2="getPoint(i, 4).x" :y2="getPoint(i, 4).y" stroke="#D6C9B6" stroke-width="0.5" opacity="0.3" />
    <polygon :points="polygonPoints" fill="rgba(197,160,82,0.15)" stroke="#C5A052" stroke-width="1.5" stroke-linejoin="round" />
    <circle v-for="(axis, i) in axes" :key="'point-' + i" :cx="getPoint(i, axis.value ?? 0).x" :cy="getPoint(i, axis.value ?? 0).y" r="3" fill="#C5A052" :opacity="axis.value === null ? 0.3 : 1" />
    <text v-for="(axis, i) in axes" :key="'label-' + i" :x="getLabelPoint(i).x" :y="getLabelPoint(i).y" fill="#2C2520" :fill-opacity="0.6" font-size="9" text-anchor="middle" dominant-baseline="central" font-weight="500">{{ axis.label }}</text>
  </svg>
</template>

<script setup lang="ts">
interface Axis { label: string; value: number | null }
const props = defineProps<{ axes: Axis[] }>()
const size = 220; const center = size / 2; const radius = 75; const labelOffset = 22

function getPoint(index: number, value: number) {
  const angle = (Math.PI * 2 * index) / props.axes.length - Math.PI / 2
  const r = (value / 4) * radius
  return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) }
}
function getLabelPoint(index: number) {
  const angle = (Math.PI * 2 * index) / props.axes.length - Math.PI / 2
  const r = radius + labelOffset
  return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) }
}
const polygonPoints = computed(() => props.axes.map((axis, i) => { const p = getPoint(i, axis.value ?? 0); return `${p.x},${p.y}` }).join(' '))
</script>
