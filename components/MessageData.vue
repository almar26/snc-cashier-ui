<template>
  <div>
    <v-btn @click="sendToParent">Send to Parent</v-btn>
 
  </div>
</template>

<script setup>
const emit = defineEmits(['send-data'])

const sendToParent = () => {
  //emit('send-data', 'Hello from child!')
  emit('send-data', true)
}
</script>

<style>

</style>