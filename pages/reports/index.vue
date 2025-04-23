<template>
  <div>
    <h1>Reports Page</h1>

    <MessageData @send-data="handleData" />

    <v-card width="600" v-show="card">
      <h1>Card show</h1>
    </v-card>
  </div>
</template>

<script setup>
const card = ref(false)
const handleData = (data) => {
  console.log('Received from child:', data)
  card.value = data
}
</script>

<style>

</style>