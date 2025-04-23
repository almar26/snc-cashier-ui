<template>
  <div>
    <h1>Student Records</h1>


    <StudentSearchStudent v-model="searchDialog"/>

    <v-bottom-navigation v-model="bott_nav" grow app height="70" class="floating-nav">
      <v-btn value="home" to="/" icon>
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>
      <v-tooltip text="Search" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" value="search" @click="searchDialog = true" icon>
            <v-icon>mdi-magnify</v-icon>
            [F4]
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="New" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" value="add" icon>
            <v-icon>mdi-plus</v-icon>
            New
          </v-btn>
        </template>
      </v-tooltip>
      <v-btn value="profile" icon>
        <v-icon>mdi-account</v-icon>
        Account
      </v-btn>
    </v-bottom-navigation>

  </div>
</template>

<script setup>
import hotkeys from 'hotkeys-js';
definePageMeta({
  layout: "account",
});

const searchDialog = ref(false)

const dialog = ref(false);
const bott_nav = ref(null)


onMounted(() => {
  hotkeys('f1, ctrl+a, f4', (event, handler) => {
    switch (handler.key) {
      case 'f1':
        event.preventDefault()
        router.push("/");
        break;
      case 'ctrl+a':
        event.preventDefault()
        alert('you pressed ctrl+a')
        break;
      case 'f4':
        event.preventDefault()
        //alert("you pressed f4")
        searchDialog.value = true;
        break;
      default: alert(event);
    }
  })
})
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