<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" elevation="0" :rail="rail" rail-width="110" id="main-sidebar">
      <div class="image-container">
        <v-img src="/SNC-Logo.png" alt="Centered Image" class="rounded-image"></v-img>
      </div>

      
      <!-- <v-list nav>
        <v-list-item-group>
          <v-list-item v-for="(item, i) in items" :key="i" active-class="border" class="logout-border" :to="item.route">
            <v-list-item-content>
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list> -->
      <v-list>
        <v-list-item-group>
          <v-list-item active-class="border" class="logout-border" to="/">
            <v-list-item-content>
              <!-- <v-icon class="mb-1">mdi-view-dashboard</v-icon> -->
              <Icon name="ic:round-dashboard" size="28"/>
              <v-list-item-subtitle>Dashboard</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item active-class="border" class="logout-border" to="/student-accounts" :active="$route.path.startsWith('/student-accounts')">
            <v-list-item-content>
              <v-icon>mdi-wallet</v-icon>
              <!-- <Icon name="ic:baseline-account-balance-wallet" size="28"/> -->
              <v-list-item-subtitle>Accounts</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item active-class="border" class="logout-border" to="/students" :active="$route.path.startsWith('/students')">
            <v-list-item-content>
              <!-- <v-icon>mdi-account</v-icon> -->
              <Icon name="ic:sharp-supervisor-account" size="28"/>
              <v-list-item-subtitle>Students</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item active-class="border" class="logout-border" to="/shs" :active="$route.path.startsWith('/shs')">
            <v-list-item-content>
              <!-- <v-icon>mdi-account</v-icon> -->
              <Icon name="ic:sharp-supervisor-account" size="28"/>
              <v-list-item-subtitle>SHS</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <div v-if="userData.user_role == 'head-cashier' || userData.user_role == 'administrator'">
            <v-list-item active-class="border" class="logout-border" to="/other-fees" :active="$route.path.startsWith('/other-fees')">
            <v-list-item-content>
              <!-- <v-icon>mdi-notebook-multiple</v-icon> -->
              <Icon name="ic:baseline-dynamic-feed" size="28"/>
              <v-list-item-subtitle>Other Fees</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item active-class="border" class="logout-border" to="/reports" :active="$route.path.startsWith('/reports')">
            <v-list-item-content>
              <!-- <v-icon>mdi-notebook-multiple</v-icon> -->
              <Icon name="ic:round-library-books" size="28"/>
              <v-list-item-subtitle>Reports</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>.
        <v-menu min-width="200px">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" variant="flat" class="my-5">
              <v-avatar color="primary" size="large">
                <span>{{ userInitial }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar color="primary">
                  <span >{{ userInitial }}</span>
                </v-avatar>
                <h4 class="text-uppercase mt-3">{{ userData.first_name }} {{ userData.last_name }}</h4>
                <div class="text-overline">
                  {{ userData.position }}
                </div>
                <v-divider class="my-3"></v-divider>
                <v-btn variant="text" rounded>
                  Edit Account
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn variant="text" rounded @click="logout()">
                  Disconnect
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </template>
    </v-navigation-drawer>

    <v-app-bar class="elevation-0" v-if="!hideAppBarPages.includes(route.path)">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" ></v-app-bar-nav-icon>
      <v-app-bar-title>SNC Cashier System</v-app-bar-title>
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" class="d-lg-none"></v-app-bar-nav-icon> -->
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>


    <!-- <v-bottom-navigation theme="dark" v-model="value" :elevation="5" class="border-bottom d-lg-none">
      <v-btn :to="item.route" v-for="(item, i) in items" :key="i">
        <v-icon>{{ item.icon }}</v-icon>

      </v-btn>
    </v-bottom-navigation> -->


  </v-app>

</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMyAuthStore } from "~/stores/auth";

const router = useRouter();
const route = useRoute();
const { logUserOut } = useMyAuthStore();
const { authenticated } = storeToRefs(useMyAuthStore());
const { userInfo } = storeToRefs(useMyAuthStore());

const userData = ref(userInfo?.value.user);
const drawer = ref(true);
const rail = ref(true);
const value = ref(0)
const fnameInitial = ref("")
const lnameInitial = ref("");
const userInitial = ref(userData.value.first_name.substring(0, 1)+userData.value.last_name.substring(0, 1))
const hideAppBarPages = ['/student-accounts', '/payment']
const items = ref([
  { title: "Dashboard", route: "/", icon: "mdi-view-dashboard" },
  { title: "Accounts", route: "/student-acounts", icon: "mdi-network-pos" },
  { title: "Students", route: "/student", icon: "mdi-account" },
  { title: "Courses", route: "/", icon: "mdi-book" },
  { title: "Reports", route: "/", icon: "mdi-notebook-multiple" },
  // { title: "Curriculum", route: "/curriculum", icon: "mdi-card-text" },
]);

const logout = () => {
  logUserOut();
  router.push("/auth/signin");
};

onMounted(() => {
  const fnameInitial = userData.value.first_name;
  const lnameInitial = userData.value.last_name;
  console.log(userData.value.first_name)
  console.log(fnameInitial.substring(0, 1)+lnameInitial.substring(0,1));
  console.log("User Initial: ", userInitial.value)
})

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

  border: none;
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
  // margin: 5px 8px 5px 8px;
  border-radius: 10px;
  //border-bottom: 2px solid #4caf50 !important;
  text-decoration: none;
  color: #4CAF50;
}

.logout-border {
  // margin: 10px 5px 5px 5px;
  border-radius: 10px;
  text-decoration: none;
  padding: 10px 0 !important;
  border: none !important;

}

.v-list-item-subtitle {
  font-size: 13px !important;
}
</style>