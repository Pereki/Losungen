<template>
  <div class="flex flex-col min-h-dvh">
    <v-app-bar title="Die tägliche Losung"></v-app-bar>
    <v-container class="flex-1 flex items-center" max-width="900">
      <DevotionsCard v-if="devotion" :devotion="devotion" />
    </v-container>

    <footer class="border-t pt-4 pb-4 text-center text-xs text-gray-500">
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
