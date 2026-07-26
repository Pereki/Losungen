<template>
  <v-container class="h-full flex items-center" max-width="900">
    <DevotionsCard v-if="devotion" :devotion="devotion" />
  </v-container>
</template>

<script setup lang="ts">
  import type { Devotion } from '@/api/models'
  import { onMounted, ref, type Ref } from 'vue'
  import { getDevotionOfTheDay } from '@/api/api'
  import DevotionsCard from '@/components/DevotionsCard.vue'

  const devotion: Ref<Devotion | undefined> = ref(undefined)

  onMounted(async () => {
    devotion.value = await getDevotionOfTheDay()
  })
</script>

<style scoped>
@reference "../styles/tailwind.css";

</style>
