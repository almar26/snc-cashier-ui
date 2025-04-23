<template>
  <div>
    <v-dialog v-model="internalModel" width="700">
      <v-card :loading="searchLoading">
        <template v-slot:loader="{ isActive }">
          <v-progress-linear :active="isActive" color="red" height="4" indeterminate></v-progress-linear>
        </template>
        <v-toolbar color="primary">
          <v-toolbar-title>Search Record</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" @click="closeDialog"></v-btn>
        </v-toolbar>
        <div class="mt-10 mb-5 mx-10">
          <v-form ref="searchForm" v-model="search" @submit.prevent="searchStudent">
            <v-text-field :autofocus="true" variant="solo-filled" clearable v-model="searchRecord"
              placeholder="Search.." hint="Search by Student No, Lastname or Firstname" append-inner-icon="mdi-magnify"
              @click:append-inner="searchStudent" rounded single-line flat></v-text-field>
          </v-form>
        </div>
        <v-card-text v-if="searchResult">
          <v-row>
            <v-divider></v-divider>
            <v-data-table density="compact" :items="searchResultData" :headers="studentHeaders" :loading="loading">
              <template v-slot:loading>
                <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip text="Add Student" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn size="small" @click="openStudentAccount(item.documentId)" class="mr-1" variant="flat"
                      v-bind="props" prepend-icon="mdi-open-in-new" color="green">
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
  </div>
</template>

<script setup>
const props = defineProps(
  {
    modelValue: Boolean
  }
);
const emit = defineEmits(['update:modelValue'])
const search = ref(null)
const loading = ref(false)
const searchLoading = ref(false)
const searchRecord = ref("")
const searchResult = ref(false)
const searchResultData = ref([])
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

const internalModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function closeDialog() {
  internalModel.value = false;
}

async function openStudentAccount(item) {
  console.log(item)
  internalModel.value = false
  //  navigateTo(`/student-accounts/${item}`)
  await navigateTo(`/student-accounts/${item}`)
}


async function searchStudent() {
  console.log("Searching...")
  searchLoading.value = true;

  if (searchRecord.value == "") {
    console.log("Search bar empty");
    searchResultData.value = []
    searchLoading.value = false;
  } else {
    let result = await $fetch(`/api/student/search?searchid=${searchRecord.value}`);
    if (result.length == 0) {
      console.log("No record found")
      searchResultData.value = []
      searchLoading.value = false;
    }
    else {
      console.log("Result: ", result);
      searchResultData.value = result
      searchResult.value = true;
      searchLoading.value = false;
    }
  }





}

</script>

<style></style>