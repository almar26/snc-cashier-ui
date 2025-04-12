<template>
  <v-bottom-navigation v-model="value" grow app height="70" class="floating-nav" style="">
    <v-btn value="home" icon>
      <v-icon>mdi-home</v-icon>
      Home
    </v-btn>

    <v-btn value="search" icon>
      <v-icon>mdi-magnify</v-icon>
      Search [F4]
    </v-btn>
    <v-btn value="add" icon>
      <v-icon>mdi-plus</v-icon>
      New
    </v-btn>

    <v-btn value="profile" icon>
      <v-icon>mdi-account</v-icon>
      Account
    </v-btn>
  </v-bottom-navigation>


  <!-- <v-bottom-navigation
    app
    grow
    height="64"
    style="position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%); width: 300; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);"
  >
    <v-btn icon="mdi-home" />
    <v-btn icon="mdi-magnify" />
    <v-btn icon="mdi-plus" />
    <v-btn icon="mdi-account" />
  </v-bottom-navigation> -->
</template>

<script setup>
import { ref } from 'vue'
const value = ref(null)
</script>

<style scoped>
.floating-nav {
  left: 50% !important;
  transform: translateX(-50%) !important;
  bottom: 16px !important;
  width: 400px !important;
  border-radius: 32px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>