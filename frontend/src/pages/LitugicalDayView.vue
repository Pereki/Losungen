<template>
  <v-app-bar title="📖 Die tägliche Losung" />
  <div class="pb-14">
    <div class="ml-auto mr-auto max-w-500 w-full sm:w-120 mt-3">
      <a class="text-gray-500 text-sm" style="cursor: pointer;" @click="goBack">‹ Zurück zur Übersicht</a>
    </div>
    <div v-if="liturgicalDay" v-for="liturgicDay in liturgicalDay">
      <v-card class="rounded-2xl p-5 mt-2 ml-auto mr-auto max-w-500 w-full sm:w-120">
        <div class="flex gap-3">
          <div class="bg-green-700 rounded-full flex items-center justify-center shrink-0" style="width: 48px; height: 48px;">
            <v-icon class="text-white">mdi-calendar-text</v-icon>
          </div>
          <div>
            <h1 class="text-2xl font-bold">{{ liturgicDay.summary }}</h1>
            <div class="flex gap-1 text-gray-500 mt-1">
              <v-icon size="small">mdi-calendar</v-icon>
              <div>{{ new Date(liturgicDay.date).toLocaleDateString() }}</div>
            </div>
          </div>
        </div>

        <div v-if="liturgicDay.liturgical_color" class="flex flex-wrap gap-2 mt-3">
          <v-chip size="small" variant="outlined">{{ liturgicDay.liturgical_color }}</v-chip>
          <v-chip v-if="liturgicDay.offering" size="small" variant="outlined">{{ liturgicDay.offering }}</v-chip>
          <v-chip v-if="liturgicDay.note" size="small" variant="outlined">{{ liturgicDay.note }}</v-chip>
        </div>

        <v-divider class="mt-5 mb-5" />

        <div class="flex flex-col gap-3">
          <h2 class="text-lg font-bold">Auf einen Blick</h2>
          <text-with-icon v-if="liturgicDay.sermon_text" icon-color="purple" icon="mdi-book-open-variant" heading="Predigttext" :text="liturgicDay.sermon_text" />
          <text-with-icon v-if="liturgicDay.weekly_saying" icon-color="purple" icon="mdi-bookmark" heading="Wochenspruch" :text="liturgicDay.weekly_saying" />
          <text-with-icon v-if="liturgicDay.daily_saying" icon-color="purple" icon="mdi-bookmark" heading="Tagesspruch" :text="liturgicDay.daily_saying" />
          <text-with-icon v-if="liturgicDay.weekly_psalm" icon-color="blue" icon="mdi-book-music" heading="Wochenpsalm" :text="liturgicDay.weekly_psalm" />
          <text-with-icon v-if="liturgicDay.daily_psalm" icon-color="blue" icon="mdi-book-music" heading="Tagespsalm" :text="liturgicDay.daily_psalm" />
          <text-with-icon v-if="liturgicDay.weekly_hymns" icon-color="blue" icon="mdi-music" heading="Wochenlieder" :text="liturgicDay.weekly_hymns" />
        </div>

        <v-divider v-if="liturgicDay.lessons" class="mt-5 mb-5" />

        <div v-if="liturgicDay.lessons" class="flex flex-col gap-3">
          <h2 class="text-lg font-bold">Lesungen</h2>
          <text-with-icon icon-color="green" icon="mdi-book-open" heading="Altes Testament" :text="liturgicDay.lessons.old_testament" />
          <text-with-icon icon-color="green" icon="mdi-book-open" heading="Epistel" :text="liturgicDay.lessons.epistle" />
          <text-with-icon icon-color="green" icon="mdi-book-open" heading="Evangelium" :text="liturgicDay.lessons.gospel" />
        </div>

        <v-divider v-if="liturgicDay.pericopes" class="mt-5 mb-5" />

        <div v-if="liturgicDay.pericopes" class="flex flex-col gap-3">
          <h2 class="text-lg font-bold">Perikopen</h2>
          <text-with-icon v-for="(verse, key) in liturgicDay.pericopes" :key="key" icon-color="amber" icon="mdi-file-document" :heading="'Perikope ' + key" :text="verse" />
        </div>
      </v-card>
    </div>
  </div>
<bottom-navigation/>
</template>

<script setup lang="ts">
import type { LiturgicalDay } from '@/api/models'
import { onMounted, ref, type Ref } from 'vue'
import { getLiturgicalDay } from '@/api/api'
import router from '@/router'
import TextWithIcon from '@/components/TextWithIcon.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'

const liturgicalDay: Ref<LiturgicalDay[] | undefined> = ref(undefined)

function goBack () {
  router.push('/liturgical-days')
}

onMounted(async () => {
  liturgicalDay.value = await getLiturgicalDay(router.currentRoute.value.params.date as string)
})
</script>

<style scoped>
@reference "../styles/tailwind.css";
</style>
