<template>
  <div>
   
    <SideBarRight
      :total="total"
      :tax="tax"
      @clearTransaction="clearTransactions"
    />
    <h1>Payment</h1>
    <v-row>
      <v-col cols="6">
        <v-card elevation="0" class="border-box">
          <v-card-text>
          asdasd
        </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          asdasd
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
</script>

<style lang="scss" scoped>

.border-box {
  border: 1px solid rgba(0, 0, 0, 0.116);
}

</style>