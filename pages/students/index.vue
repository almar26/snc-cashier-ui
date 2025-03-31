<template>
  <div>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <!-- <v-btn @click="addStudentDialog = true">Add Student</v-btn> -->


    <v-card elevation="0">
      <v-card-title class="d-flex align-center">
        <v-btn class="my-2 text-capitalize" prepend-icon="mdi-plus" color="primary" to="/students/create">Add
          Student</v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
          variant="solo-filled" flat hide-details single-line></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table density="compact" :items="studentList" :search="search" :headers="headers" :loading="loading">
        <template v-slot:loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon="mdi-pencil" variant="text" size="medium" color="primary"></v-btn>
        </template>
      </v-data-table>
    </v-card>


    <v-dialog max-width="900" v-model="addStudentDialog" scrollable persistent>
      <v-card elevation="0">
        <v-toolbar color="primary" density="compact">
          <v-icon class="ml-4">mdi-account-group</v-icon>
          <v-toolbar-title> List of Students</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addStudentDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-title class="d-flex align-center pe-2">
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" density="compact" label="Search" clearable prepend-inner-icon="mdi-magnify"
            variant="outlined" flat hide-details single-line></v-text-field>
        </v-card-title>

        <v-divider></v-divider>
        <v-card-text>
          <v-data-table density="compact" :search="search" :items="studentList" :headers="studentHeaders"
            :loading="loading2">
            <template v-slot:loading2>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip text="Add Student" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn size="small" @click="addStudent(item)" class="mr-1" variant="flat" v-bind="props"
                    prepend-icon="mdi-plus" color="green">
                    Add
                  </v-btn>
                </template>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const sisStudentList = ref([])
const studentList = ref([]);
const search = ref(null);
const addStudentDialog = ref(false);
const loading = ref(true)
const page = ref({
  title: "List of Students",
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
const headers = ref([
  {
    title: "Student #",
    sortable: true,
    key: "student_no",
  },
  { title: "Lastname", key: "last_name", sortable: false },
  { title: "Firstname", key: "first_name", sortable: false },
  { title: "Middlename", key: "middle_name", sortable: false },
  { title: "Course", key: "course", sortable: false },
  { title: "Major", key: "major", sortable: false },
  { title: "Section", key: "section", sortable: false },
  { title: "Gender", key: "gender", sortable: false },
  { title: "School Year", key: "school_year", sortable: false },
  { title: "Semester", key: "semester", sortable: false },
  { title: "", key: "actions", align: "end", sortable: false },
]);

const studentHeaders = ref([
  {
    title: "Student No",
    sortable: true,
    key: "student_no",
  },
  { title: "Lastname", key: "last_name", sortable: false },
  { title: "Firstname", key: "first_name", sortable: false },
  { title: "Middlename", key: "middle_name", sortable: false },
  // { title: "Course", key: "course", sortable: false },
  { title: "Course", key: "course_code", sortable: false },
  // { title: "Major", key: "major", sortable: false },
  { title: "", key: "actions", align: "end", sortable: false },
]);
async function initialize() {
  try {
    let result = await $fetch(`/api/student/list`);
    if (result) {
      studentList.value = result;
      loading.value = false
      console.log(result);
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    loading.value = false;
    throw err;
  }
}

onMounted(async () => {
  await initialize();
})
</script>

<style scoped>
:deep() .v-table .v-table__wrapper>table>thead>tr>th {
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-bottom: thick solid rgba(var(--v-border-color), var(--v-border-opacity));
  font-weight: bold;
  /* background-color: #04aa6d;
  color: white; */
}

:deep() .v-table .v-table__wrapper>table>tbody>tr>td:not(:last-child),
.v-table .v-table__wrapper>table>tbody>tr>th:not(:last-child) {
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

:deep() .v-table .v-table__wrapper>table>tbody>tr:nth-child(even) {
  background-color: #f2f2f2;
}

:deep() .v-table .v-table__wrapper>table>tbody>tr:hover {
  background-color: #f2f2f2;
}
</style>