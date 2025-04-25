<template>
  <div>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <v-row>
      <v-col cols="12">
        <v-card elevation="0" class="card-outlined">
          <v-toolbar color="transparent">
            <v-toolbar-title class="title-color">Account Information</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-card elevation="0" >
          <v-toolbar color="transparent" density="compact">
            <v-toolbar-title class="title-color">Payment History</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="0">
          <v-toolbar color="transparent" density="compact">
            <v-toolbar-title class="title-color">Tuition Fee Details</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-row no-gutters justify="center">
                <v-col cols="12" md="4">
                  <!-- <v-list-subheader class="d-none d-md-block">Tuition Fee</v-list-subheader> -->
                  <v-sheet class="mr-8 label-color">Tuition Fee </v-sheet>
                </v-col>
                <v-col cols="12" md="7">
                  <v-text-field density="compact" disabled v-model="facultyno"
                    variant="outlined"></v-text-field></v-col>
              </v-row>
              <v-row no-gutters justify="center">
                <v-col cols="12" md="4">
                  <!-- <v-list-subheader class="d-none d-md-block">Tuition Fee</v-list-subheader> -->
                  <v-sheet class="mr-8 label-color">Discount </v-sheet>
                </v-col>
                <v-col cols="12" md="7">
                  <!-- <v-text-field density="compact" disabled v-model="facultyno"
                    variant="outlined"></v-text-field> -->
                    <v-text-field density="compact" disabled  v-model="student_no" variant="solo-filled"
                    flat></v-text-field>
                  </v-col>
              </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>



    <StudentSearchStudent v-model="searchDialog" />

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
// definePageMeta({
//   layout: "account",
// });


const route = useRoute();
const router = useRouter();
const page = ref({
  title: "Student Account",
});
const breadcrumbs = ref([
  {
    title: "Students",
    disabled: false,
    to: "/students",
  },

  {
    title: "List",
    disabled: true,
  },
]);

const searchDialog = ref(false)

const dialog = ref(false);
const bott_nav = ref(null)

async function initialize() {
  try {
    let result = await $fetch(`/api/tuition-fee/account/${route.params.id}`);

    if (result) {
      console.log(result)
      //studentDetails.value = result.data;
      if (result.length == 0) {
        console.log("No record found");
      } else {
        console.log("Record found")
      }
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}


onMounted(async () => {
  await initialize();
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

.card-outlined {
  border: 1px solid rgba(128, 128, 128, 0.274);
  border-radius: 15px;
}

.title-color {
  color: #424242;
  font-size: 18px;
}

.label-color {
  color: #757575;
}
</style>