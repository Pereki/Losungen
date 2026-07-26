<template>
  <v-app>
    <v-main class="d-flex flex-column">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>

<style>
  .v-main > .v-layout {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }
</style>
