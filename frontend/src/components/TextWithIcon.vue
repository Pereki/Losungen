<template>
  <div class="flex gap-3 items-center">
    <div :class="`rounded-full ${bgClass} flex items-center justify-center`" style="width: 32px; height: 32px;">
      <v-icon class="text-white" size="x-small">{{ icon }}</v-icon>
    </div>
    <div class="flex justify-between w-100">
      <div class="font-medium text-gray-600">{{ heading }}</div>
      <div class="font-bold">{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ text: string, heading: string, icon: string, iconColor?: string }>()

const bgClass = computed(() => {
  switch (props.iconColor) {
    case 'purple': return 'bg-purple-500'
    case 'green': return 'bg-green-700'
    case 'blue': return 'bg-blue-600'
    case 'amber': return 'bg-amber-600'
    default: return 'bg-green-700'
  }
})
</script>
