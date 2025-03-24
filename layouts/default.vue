<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" elevation="0" :rail="rail" rail-width="110" id="main-sidebar">
      <div class="image-container">
        <v-img
          src="/SNC-Logo.png"
          alt="Centered Image"
          class="rounded-image"
        ></v-img>
      </div>

      <v-divider></v-divider>
      <v-list nav>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            active-class="border"
            class="logout-border"
            :to="item.route"
          >
            <v-list-item-content>
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-app-bar class="elevation-0">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" class="d-none d-lg-block"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" class="d-lg-none"></v-app-bar-nav-icon>
    </v-app-bar> -->
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

   
    <v-bottom-navigation theme="dark" v-model="value" :elevation="5" class="border-bottom d-lg-none">
      <v-btn :to="item.route" v-for="(item, i) in items" :key="i">
        <v-icon>{{ item.icon }}</v-icon>
        
      </v-btn>
    </v-bottom-navigation>
 

  </v-app>

</template>

<script lang="ts" setup>
const drawer = ref(true);
const rail = ref(true);
const value = ref(0)
const items = ref([
  { title: "Dashboard", route: "/", icon: "mdi-view-dashboard" },
  { title: "Accounts", route: "/payment", icon: "mdi-network-pos" },
  { title: "Students", route: "/student", icon: "mdi-account" },
  { title: "Courses", route: "/", icon: "mdi-book" },
  { title: "Reports", route: "/", icon: "mdi-notebook-multiple" },
  // { title: "Curriculum", route: "/curriculum", icon: "mdi-card-text" },
]);

// const color = computed(() => {
//   switch (value.value)  {
//     case 0: return 'blue-grey'
//     case 1: return 'teal'
//     case 2: return 'brown'
//     case 3: return 'indigo'
//     default: return 'blue-grey'
//   }
// })


</script>

<style scoped lang="scss">

#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);

  .v-navigation-drawer__border {
    display: none;
  }
}

.image-container {
  width: 50%;
  margin: 15px auto;
}

.border-app {
  border-bottom: 3px solid #04c87a !important;
}

.border-bottom {
  border-top: 3px solid #04c87a !important;
}

.border {
  margin: 5px 8px 5px 8px;
  border-radius: 10px;
  //border-bottom: 2px solid #4caf50 !important;
  text-decoration: none;
  color: #4CAF50 ;
}
.logout-border {
  margin: 10px 5px 5px 5px;
  border-radius: 10px;
  text-decoration: none;
}
</style>