<template>
  <div>
    <v-navigation-drawer v-model="drawer" permanent color="white" location="right" width="350">
      <v-list subheader two-line class="mt-1">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>I'am a Cashiers</v-list-item-subtitle>
            <v-list-item-title>Jelly Grande</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-badge bordered overlap color="red" dot>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <div class="mx-3">
        <v-text-field variant="solo-filled" density="compact" append-inner-icon="mdi-magnify" hideDetails flat></v-text-field>
      </div>
    </v-navigation-drawer>
    <v-app-bar elevation="0" color="transparent">
      <v-app-bar-title>Student Accounts</v-app-bar-title>
      <v-spacer></v-spacer>
      <!-- <v-text-field hideDetails density="compact" variant="solo-filled" prepend-inner-icon="mdi-magnify"
        flat></v-text-field> -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-row>
      <v-col cols="6">
        <v-card elevation="0" class="border-box">
          <v-card-text>
            asdasd
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card elevation="0" class="border-box" style="height: 90vh;">
          <v-card-text>
            asdasd
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>


    <!-- <v-navigation-drawer location="right" width="400" id="main-sidebar">
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          :title="`Item ${ n }`"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <!-- <v-app-bar class="elevation-0">
    <v-btn icon="mdi-arrow-left" color="primary" to="/"></v-btn>
    <v-toolbar-title>SNC Cashier System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" class="d-none d-lg-block"></v-app-bar-nav-icon>
    </v-app-bar> -->


  </div>
</template>

<script setup>
// definePageMeta({
//   layout: "payment",
// });
const drawer = ref(true)
</script>

<style lang="scss" scoped>
.border-box {
  border: 1px solid rgba(0, 0, 0, 0.116);
}
</style>