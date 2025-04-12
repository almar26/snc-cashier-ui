<template>
  <div>
    <h1>Student Records</h1>

    <v-dialog v-model="dialog" width="700">
      <v-card :loading="searchLoading">
        <template v-slot:loader="{ isActive }">
          <v-progress-linear :active="isActive" color="red" height="4" indeterminate></v-progress-linear>
        </template>
        <v-toolbar color="primary">
          <v-toolbar-title>Search Record</v-toolbar-title>
        </v-toolbar>
        <div class="mt-10 mb-5 mx-10">
          <v-form ref="searchForm" v-model="search" @submit.prevent="searchStudent">
            <v-text-field autofocus="true" variant="solo-filled" clearable v-model="searchRecord" placeholder="Search.."
              hint="Search by Student No, Lastname or Firstname" append-inner-icon="mdi-magnify"
              @click:append-inner="searchStudent" rounded single-line flat></v-text-field>
          </v-form>
        </div>
        <v-card-text v-if="searchResult">
          <v-row>
            <v-divider></v-divider>
            <v-data-table density="compact" :search="search" :items="searchResultData" :headers="studentHeaders"
              :loading="loading">
              <template v-slot:loading>
                <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip text="Add Student" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn size="small" :to="`/student-accounts/${item.id}`" class="mr-1" variant="flat" v-bind="props"
                      prepend-icon="mdi-open-in-new" color="green">
                      open
                    </v-btn>
                  </template>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>


    <v-bottom-navigation v-model="value" grow app height="70" class="floating-nav" style="">
      <v-btn value="home" icon>
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>
      <v-btn value="search" @click="dialog = true" icon>
        <v-icon>mdi-magnify</v-icon>
        Search [F4]
      </v-btn>
      <v-btn value="add" icon>
        <v-icon>mdi-plus</v-icon>
        New
      </v-btn>
      <v-btn value="profile" icon>
        <v-icon>mdi-account</v-icon>
        Account
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script setup>
import hotkeys from 'hotkeys-js';
const searchRecord = ref("")
const searchResult = ref(false)
const searchLoading = ref(false)
const search = ref(null)
const dialog = ref(false);
const value = ref(null)
const loading = ref(false)
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
  { title: "Course", key: "course", sortable: false },
  // { title: "Major", key: "major", sortable: false },
  { title: "", key: "actions", align: "end", sortable: false },
]);

const searchResultData = ref([
  {
    id: 3,
    student_no: "06-1132",
    last_name: "Gomez",
    first_name: "Almar",
    middle_name: "Santos",
    course: "BSIT"
  }
])

async function searchStudent() {
  console.log("Searching...")
  searchLoading.value = true;

setTimeout(() => {
  searchResult.value = true;
  searchLoading.value = false;
}, 3000)
}


onMounted(() => {
  hotkeys('ctrl+s, ctrl+a, f4', (event, handler) => {
    switch (handler.key) {
      case 'ctrl+s':
        event.preventDefault()
        alert('you pressed ctrl+s')
        break;
      case 'ctrl+a':
        event.preventDefault()
        alert('you pressed ctrl+a')
        break;
      case 'f4':
        event.preventDefault()
        //alert("you pressed f4")
        dialog.value = true;
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