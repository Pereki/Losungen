<template>
  <div class="pb-14">
    <v-app-bar title="Die tägliche Losung" />

    <div class="flex justify-center gap-5 mt-4 w-full">
      <v-btn @click="offset--"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-btn @click="loadDevotion"><v-icon>mdi-calendar-today</v-icon></v-btn>
      <v-btn @click="offset++"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>

    <v-container class="flex items-center" max-width="900">
      <DevotionsCard v-if="devotion" :devotion="devotion" />
    </v-container>

    <v-container>
      <NextChurchDayCard v-if="nextChurchDay" :devotion="nextChurchDay" />
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import type { Devotion } from '@/api/models'
  import { onMounted, ref, type Ref, watch } from 'vue'
  import { getDevotionOf, getDevotionOfTheDay, getNextChurchDay } from '@/api/api'
  import DevotionsCard from '@/components/DevotionsCard.vue'
  import NextChurchDayCard from './NextChurchDayCard.vue'
  const offset = ref(0)
  const devotion: Ref<Devotion | undefined> = ref(undefined)
  const nextChurchDay: Ref<Devotion | undefined> = ref(undefined)

  onMounted(async () => {
    await loadDevotion()
    await loadChurchDay()
  })

  async function loadDevotion () {
    devotion.value = await getDevotionOfTheDay()
    offset.value = 0
  }

  async function loadChurchDay () {
    nextChurchDay.value = await getNextChurchDay()
  }

  watch(offset, async () => {
    const date = new Date()
    date.setDate(date.getDate() + offset.value)
    devotion.value = await getDevotionOf(date.toISOString().split('T', 1)[0])
  })
</script>

<style scoped>
@reference "../styles/tailwind.css";

</style>
