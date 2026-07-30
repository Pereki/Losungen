<template>
  <v-card class="rounded-2xl p-5 ml-auto mr-auto max-w-500 w-120">
      <div class="flex gap-3">
        <v-icon class="rounded-full p-1 text-blue-950 text-4xl">mdi-calendar</v-icon>

        <div>
      <div class="font-bold">Nächster besonderer Tag</div>
      {{new Date(devotion.date).toLocaleDateString()}} - {{ devotion.liturgical_day }}
        </div>
      </div>
  </v-card>

</template>

<script setup lang="ts">
  import type { Devotion } from '@/api/models'

  defineProps<{ devotion: Devotion }>()
</script>
