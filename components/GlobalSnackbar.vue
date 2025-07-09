<template>
  <v-snackbar v-model="snackbar" location="top" :timeout="3000" :color="color">
    {{ message }}
    <template #actions>
      <v-btn color="white" density="compact" text @click="snackbar = false" icon="mdi-close"></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useSnackbar } from '@/composables/useSnackbar'

const { snackbar, message, color } = useSnackbar()
</script>
