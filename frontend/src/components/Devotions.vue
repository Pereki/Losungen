<template>
  <v-app-bar title="Die tägliche Losung"></v-app-bar>
  <v-container class="h-full flex items-center" max-width="900">
    <DevotionsCard v-if="devotion" :devotion="devotion" />
  </v-container>

  <footer class="mt-8 border-t pt-4 text-center text-xs text-gray-500">
    <p>
      Losungen® © Evangelische Brüder-Unität – Herrnhuter Brüdergemeine
    </p>
    <p>
      Bibeltexte: Lutherbibel 2017 © Deutsche Bibelgesellschaft
    </p>
  </footer>
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
