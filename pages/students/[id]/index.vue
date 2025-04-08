<template>
  <div>

    <div class="d-flex align-center justify-center" style="height: 60vh" v-if="isEmpty">
      <v-card class="elevation-0 text-center py-16" color="transparent">
        <p class="errorStatus">404</p>
        <div class="service-notif">Oops! Something is missing</div>
        <v-btn color="primary" class="mt-3" width="150" variant="outlined" to="/students" rounded>Go Back</v-btn>
      </v-card>
    </div>
    <div v-else>
      <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
      <v-row>
        <v-col cols="12" md="2">
          <StudentSideBar :studentDetails="studentDetails" :loading3="loading3" />
        </v-col>
        <v-col cols="12" md="10">
          <div class="d-flex align-center justify-center" style="height: 60vh" v-if="loader">
            <v-card class="elevation-0 text-center py-16" color="transparent">
              <v-progress-circular :size="70" :width="7" indeterminate></v-progress-circular>
              <div class="service-notif mt-5">Loading....</div>
            </v-card>
          </div>
          <v-card class="elevation-0" v-else>
            asd
            </v-card>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script setup>
const route = useRoute();
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
    title: "Account",
    disabled: true,
  },
]);
const isEmpty = ref(false);
const studentDetails = ref({});
const loading3 = ref(true);
const loader = ref(true);
async function initialize() {
  try {
    let result = await $fetch(`/api/student/${route.params.id}`);

    if (result) {
      console.log(result)
      studentDetails.value = result.data;
      loading3.value = false;
      if (result.length == 0) {
        isEmpty.value = true;
      } else {
        isEmpty.value = false;
        loader.value = false;
      }
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

onMounted(async () => {
  await initialize();
})
</script>

<style scoped>
.errorStatus {
  color: #424242;
  font-size: 150px;
  font-weight: bold;
}

.service-notif {
  font-size: 22px;
  color: #616161;
  font-weight: bold;
}
</style>