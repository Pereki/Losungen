<template>
  <v-app-bar title="📖 Liturgischer Kalender" />
  <v-container class="pb-14">
    <v-text-field
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      label="Suchen..."
      variant="outlined"
      density="compact"
      hide-details
      class="ml-auto mr-auto max-w-500 w-full sm:w-120 mt-3"
      clearable
    />

    <v-card
      v-for="(events, idx) in filteredDays"
      :key="idx"
      :id="'card-' + events[0].date"
      class="rounded-2xl p-5 mt-5 ml-auto mr-auto max-w-500 w-full sm:w-120"
      @click="goToDate(events[0].date)"
      style="cursor: pointer;"
    >
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-2">
          <div v-for="day in events" :key="day.date + day.summary" class="flex flex-col gap-2">
            <div class="flex gap-3">
              <div class="bg-green-700 rounded-full flex items-center justify-center shrink-0" style="width: 40px; height: 40px;">
                <v-icon class="text-white" size="small">mdi-calendar-text</v-icon>
              </div>
              <div>
                <div class="font-bold">{{ day.summary }}</div>
                <div class="text-gray-500 text-sm">{{ new Date(day.date).toLocaleDateString() }}</div>
              </div>
            </div>
            <div v-if="day.sermon_text" class="ml-13 text-sm text-gray-600">{{ day.sermon_text }}</div>
          </div>
        </div>
        <v-icon class="text-gray-400">mdi-chevron-right</v-icon>
      </div>
    </v-card>
    <div v-if="!filteredDays.length && liturgicalDays.length" class="text-center mt-10 text-gray-500">
      Keine Ergebnisse für „{{ search }}"
    </div>
    <div v-if="!liturgicalDays.length" class="text-center mt-10 text-gray-500">
      Laden...
    </div>
  </v-container>
  <bottom-navigation></bottom-navigation>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, type Ref } from 'vue'
import type { LiturgicalDay } from '@/api/models'
import { getAllLiturgicalDays } from '@/api/api'
import router from '@/router'
import BottomNavigation from '@/components/BottomNavigation.vue'

const liturgicalDays: Ref<LiturgicalDay[][]> = ref([])
const search = ref('')

const sortedDays = computed(() =>
  [...liturgicalDays.value].sort((a, b) => a[0].date.localeCompare(b[0].date))
)

const filteredDays = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return sortedDays.value
  return sortedDays.value.filter(events =>
    events.some(day =>
      day.summary.toLowerCase().includes(q) ||
      (day.sermon_text && day.sermon_text.toLowerCase().includes(q)) ||
      day.date.includes(q) ||
      (day.weekly_saying && day.weekly_saying.toLowerCase().includes(q)) ||
      (day.liturgical_color && day.liturgical_color.toLowerCase().includes(q))
    )
  )
})

function goToDate (date: string) {
  router.push(`/liturgical-day/${date}`)
}

onMounted(async () => {
  liturgicalDays.value = await getAllLiturgicalDays()
  await nextTick()
  scrollToToday()
})

function scrollToToday () {
  const today = new Date().toISOString().split('T')[0]
  const el = document.getElementById('card-' + today)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<style scoped>
@reference "../styles/tailwind.css";
</style>
