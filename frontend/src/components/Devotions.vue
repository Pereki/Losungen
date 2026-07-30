<template>
  <div class="pb-14">
    <v-app-bar title="Die tägliche Losung" />

    <div class="flex justify-center gap-5 mt-4 w-full">
      <v-btn @click="decreaseOffsetDate"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-btn @click="loadDevotion"><v-icon>mdi-calendar-today</v-icon></v-btn>
      <v-btn @click="increaseOffsetDate"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>

    <v-container class="flex items-center" max-width="900">
      <DevotionsCard v-if="devotion" :devotion="devotion" />
    </v-container>

    <v-container>
      <NextChurchDayCard v-if="nextChurchDay" :devotion="nextChurchDay" @more-information="el => offset = new Date(el)" />
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import type { Devotion } from '@/api/models'
  import { onMounted, ref, type Ref, watch } from 'vue'
  import { getDevotionOf, getDevotionOfTheDay, getNextChurchDay } from '@/api/api'
  import DevotionsCard from '@/components/DevotionsCard.vue'
  import NextChurchDayCard from './NextChurchDayCard.vue'
  const offset = ref(new Date())
  const devotion: Ref<Devotion | undefined> = ref(undefined)
  const nextChurchDay: Ref<Devotion | undefined> = ref(undefined)

  onMounted(async () => {
    await loadDevotion()
    await loadChurchDay()
  })

  async function loadDevotion () {
    offset.value = new Date()
    devotion.value = await getDevotionOf(toDateString(offset.value))
  }

  function toDateString (date: Date): string {
    return date.toISOString().split('T', 1)[0]
  }

  async function loadChurchDay () {
    nextChurchDay.value = await getNextChurchDay()
  }

  function increaseOffsetDate () {
    const date = new Date(offset.value)
    date.setDate(date.getDate() + 1)
    offset.value = date
  }

  function decreaseOffsetDate () {
    const date = new Date(offset.value)
    date.setDate(date.getDate() - 1)
    offset.value = date
  }

  watch(offset, async () => {
    devotion.value = await getDevotionOf(toDateString(offset.value))
  })
</script>

<style scoped>
@reference "../styles/tailwind.css";

</style>
