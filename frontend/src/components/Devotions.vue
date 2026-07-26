<template>
  <div class="pb-14">
    <v-app-bar title="Die tägliche Losung"></v-app-bar>
    <v-container class="flex items-center" max-width="900">
      <DevotionsCard v-if="devotion" :devotion="devotion" />
    </v-container>

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
