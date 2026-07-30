<template>
  <v-card class="rounded-2xl p-5 ml-auto mr-auto max-w-500 w-full sm:w-120">
    <div class="flex gap-1 mb-2 text-gray-500"><v-icon>mdi-calendar</v-icon><h1 class="mb-2 bold">{{ devotion.weekday }}, {{ new Date(devotion.date).toLocaleDateString() }}</h1></div>

    <div class="flex gap-3">
      <v-icon class="bg-purple-500 rounded-full p-1 text-white text-4xl">mdi-format-quote-open</v-icon>

      <div>
        <h1 class="text-xl mb-2 font-bold">Losung</h1>
        <div>{{ devotion.text }}</div>

        <div class="font-bold flex items-center gap-1">
          {{ devotion.verse.book }} {{ devotion.verse.chapter }},{{ devotion.verse.verse }}
          <a class="text-blue-500 hover:text-blue-700" :href="getBibleLink(devotion.verse.book, devotion.verse.chapter, devotion.verse.verse)" rel="noopener noreferrer" target="_blank">
            <v-icon size="x-small">mdi-open-in-new</v-icon>
          </a>
        </div>
      </div>
    </div>

    <v-divider class="mt-5 mb-5" />

    <div class="flex gap-3">
      <v-icon class="bg-green-700 rounded-full p-1 text-white text-4xl">mdi-format-quote-open</v-icon>

      <div>
        <h1 class="text-xl mb-2 font-bold">Lehrtext</h1>
        <div>{{ devotion.teaching }}</div>

        <div class="font-bold flex items-center gap-1">
          {{ devotion.teaching_verse.book }} {{ devotion.teaching_verse.chapter }},{{ devotion.teaching_verse.verse }}
          <a class="text-blue-500 hover:text-blue-700" :href="getBibleLink(devotion.teaching_verse.book, devotion.teaching_verse.chapter, devotion.teaching_verse.verse)" rel="noopener noreferrer" target="_blank">
            <v-icon size="x-small">mdi-open-in-new</v-icon>
          </a>
        </div>
      </div>
    </div>

    <v-divider class="mt-5 mb-5" />

    <p>
      Losungen® © Evangelische Brüder-Unität – Herrnhuter Brüdergemeine, <a href="https://www.losungen.de">www.losungen.de</a>
    </p>
  </v-card>

</template>

<script setup lang="ts">
  import type { Devotion } from '@/api/models'
  import { VContainer } from 'vuetify/components'

  import { getBibleLink } from '@/api/util'

  defineProps<{ devotion: Devotion }>()
</script>
