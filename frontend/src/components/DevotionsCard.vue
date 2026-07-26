<template>
  <v-card class="rounded-2xl p-5 ml-auto mr-auto max-w-500 w-120">
    <div class="flex gap-1 mb-2 text-gray-500"><v-icon>mdi-calendar</v-icon><h1 class="mb-2 bold">{{ devotion.weekday }}, {{ new Date(devotion.date).toLocaleDateString() }}</h1></div>

    <div class="flex gap-3">
      <v-icon class="bg-purple-500 rounded-full p-1 text-white text-4xl">mdi-format-quote-open</v-icon>

      <div>
        <h1 class="text-xl mb-2 font-bold">Losung</h1>
        <div>{{ devotion.text }}</div>
        <div class="font-bold">{{ devotion.verse }}</div>
      </div>
    </div>

    <v-divider class="mt-5 mb-5" />

    <div class="flex gap-3">
      <v-icon class="bg-green-700 rounded-full p-1 text-white text-4xl">mdi-format-quote-open</v-icon>

      <div>
        <h1 class="text-xl mb-2 font-bold">Lehrtext</h1>
        <div>{{ devotion.teaching }}</div>
        <div class="font-bold">{{ devotion.teaching_verse }}</div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import type { Devotion } from '@/api/models'
  import { VContainer } from 'vuetify/components'

  defineProps<{ devotion: Devotion }>()
</script>
