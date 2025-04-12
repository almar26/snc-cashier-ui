<template>
  <v-app>
    <v-main>
      <slot />
    </v-main>
    <FloatingBottomNav />
  </v-app>
</template>

<script setup>

</script>

<style scoped>
/* Make sure nothing breaks layout */
.v-app {
  position: relative;
}
</style>