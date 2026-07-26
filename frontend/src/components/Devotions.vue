<template>
  <div class="pb-14">
    <v-app-bar title="Die tägliche Losung" />

    <v-card class="p-2 mt-4 text-center ml-auto mr-auto text-xl rounded-2xl" max-width="480">
      Dieser Sonntag ({{ nextSunday ? new Date(nextSunday.date).toLocaleDateString() : '' }}) ist der <span class="font-bold">{{ nextSunday?.liturgical_day }}</span>
    </v-card>

    <v-container class="flex items-center" max-width="900">

      <DevotionsCard v-if="devotion" :devotion="devotion" />
    </v-container>

    <div class="flex justify-center gap-5 w-full items-center">
      <v-btn @click="offset--"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-btn @click="offset++"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>

    <footer class="fixed bottom-0 left-0 right-0 border-t pt-2 pb-2 text-center text-xs text-gray-500 bg-white">
      <p>
        Losungen® © Evangelische Brüder-Unität – Herrnhuter Brüdergemeine
      </p>

      <p>
        Bibeltexte: Lutherbibel 2017 © Deutsche Bibelgesellschaft
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import type { Devotion } from '@/api/models'
  import { onMounted, ref, type Ref, watch } from 'vue'
  import { getDevotionOf, getDevotionOfTheDay, getNextSunday } from '@/api/api'
  import DevotionsCard from '@/components/DevotionsCard.vue'
  const offset = ref(0)
  const devotion: Ref<Devotion | undefined> = ref(undefined)
  const nextSunday: Ref<Devotion | undefined> = ref(undefined)

  onMounted(async () => {
    devotion.value = await getDevotionOfTheDay()
    nextSunday.value = await getNextSunday()
  })

  watch(offset, async () => {
    const date = new Date()
    date.setDate(date.getDate() + offset.value)
    devotion.value = await getDevotionOf(date.toISOString().split('T', 1)[0])
  })
</script>

<style scoped>
@reference "../styles/tailwind.css";

</style>
