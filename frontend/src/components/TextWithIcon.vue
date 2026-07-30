<template>
  <div class="flex gap-3 items-center">
    <div :class="`rounded-full ${bgClass} flex items-center justify-center shrink-0`" style="width: 32px; height: 32px;">
      <v-icon class="text-white" size="x-small">{{ icon }}</v-icon>
    </div>

    <div class="flex justify-between w-100 items-center gap-2">
      <div class="font-medium text-gray-600">{{ heading }}</div>

      <div class="font-bold flex items-center gap-1">
        {{ text }}
        <a
          v-if="bibleLink"
          class="text-blue-500 hover:text-blue-700 shrink-0"
          :href="bibleLink"
          rel="noopener noreferrer"
          target="_blank"
        >
          <v-icon size="x-small">mdi-open-in-new</v-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { getBibleLink, parseGermanBibleRef } from '@/api/util'

  const props = defineProps<{ text: string, heading: string, icon: string, iconColor?: string }>()

  const bgClass = computed(() => {
    switch (props.iconColor) {
      case 'purple': { return 'bg-purple-500'
      }
      case 'green': { return 'bg-green-700'
      }
      case 'blue': { return 'bg-blue-600'
      }
      case 'amber': { return 'bg-amber-600'
      }
      default: { return 'bg-green-700'
      }
    }
  })

  const bibleLink = computed(() => {
    const ref = parseGermanBibleRef(props.text)
    if (!ref) return null
    return getBibleLink(ref.book, ref.chapter, ref.verses)
  })
</script>
