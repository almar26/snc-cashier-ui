<template>
  <div>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" md="8">
        <v-card elevation="0">
          <v-toolbar color="transparent">
            <v-toolbar-title><v-icon start>mdi-account</v-icon> Student Information</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="blue" variant="tonal" prepend-icon="mdi-import" class="text-capitalize mr-4"
              @click="addStudentDialog = true">Import Student</v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form>
              <v-row dense>
                <v-col cols="12" md="3">
                  <v-text-field label="Student No" v-model="student_no" variant="solo-filled" flat></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" md="3">
                  <!-- <v-text-field label="Semester" v-model="semester" class="custom-text-field" variant="solo-filled"
                    flat></v-text-field> -->
                    <v-select label="Semester" :items="['1st Semester', '2nd Semester', 'Summer']" v-model="semester"
                    variant="solo-filled" flat></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field label="School Year" v-model="school_year" variant="solo-filled" flat></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" md="4">
                  <v-text-field label="Last name" v-model="last_name" variant="solo-filled" flat></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="First name" v-model="first_name" variant="solo-filled" flat></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="Middle name" v-model="middle_name" variant="solo-filled" flat></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>

                <v-col cols="12" md="6">
                  <v-text-field label="Course" v-model="course" variant="solo-filled" flat></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="Major" v-model="major" variant="solo-filled" flat></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field label="Section" v-model="section" variant="solo-filled" flat></v-text-field>
                </v-col>
              </v-row>

              <v-row dense>

                <v-col cols="12" md="4">
                  <!-- <v-text-field label="Gender" v-model="gender" variant="solo-filled" flat></v-text-field> -->
                  <!-- <v-combobox label="Gender" :items="['Male', 'Female']" v-model="gender" variant="solo-filled"
                    flat></v-combobox> -->

                    <v-select label="Gender" :items="['College', 'SHS']" v-model="gender"
                    variant="solo-filled" flat></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="Contact Number" v-model="contact_number" variant="solo-filled"
                    flat></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <!-- <v-text-field label="Gender" v-model="gender" variant="solo-filled" flat></v-text-field> -->
                  <!-- <v-combobox label="Student Type" :items="['College', 'SHS']" v-model="student_type"
                    variant="solo-filled" flat></v-combobox> -->
                  <v-select label="Student Type" :items="['College', 'SHS']" v-model="student_type"
                    variant="solo-filled" flat></v-select>
                </v-col>

              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="0">
          <v-toolbar color="transparent">
            <v-toolbar-title>
              Tuition Fee Details
            </v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form>
              <v-text-field variant="solo-filled" v-model="tuition_fee" flat label="Tuition Fee"></v-text-field>
              <v-text-field label="Discount" v-model="discount" variant="solo-filled" flat></v-text-field>
              <v-text-field label="Payment" v-model="payment" variant="solo-filled" flat></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="px-5 my-2">
            <v-btn color="primary" variant="flat" block>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
        <!-- <v-divider></v-divider> -->

        <v-divider></v-divider>
        <v-data-table density="compact" :search="search" :items="sisStudentList" :headers="studentHeaders"
          :loading="loading2">
          <template v-slot:loading2>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip text="Add Student" location="top">
              <template v-slot:activator="{ props }">
                <v-btn size="small" @click="importStudent(item)" class="mr-1" variant="flat" v-bind="props"
                  prepend-icon="mdi-import" color="green">
                  Import
                </v-btn>
              </template>
            </v-tooltip>
          </template>
        </v-data-table>

      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const sisStudentList = ref([])
const studentList = ref([]);
const search = ref(null);
const addStudentDialog = ref(false);
const student_id = ref("");
const semester = ref(null);
const school_year = ref("")
const student_no = ref("")
const course = ref("");
const course_code = ref("");
const major = ref("");
const section = ref("")
const last_name = ref("")
const first_name = ref("")
const middle_name = ref("")
const gender = ref(null)
const contact_number = ref("")
const student_type = ref(null)
const tuition_fee = ref("")
const discount = ref("")
const payment = ref("")
const page = ref({
  title: "Create Student",
});
const breadcrumbs = ref([
  {
    title: "Students",
    disabled: false,
    to: "/students",
  },

  {
    title: "Create",
    disabled: true,
  },
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
    let result = await $fetch(`/api/student/student-list`);
    if (result) {
      sisStudentList.value = result;
      console.log(result);
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

async function importStudent(item) {
  console.log("Imported Student: ", item)
  if (item.major == null) {
    console.log("No Major")
  } else {
    console.log("Major")
  }

  student_id.value = item.documentId
  semester.value = item.semester;
  school_year.value = item.school_year;
  student_no.value = item.student_no;
  course.value = item.course;
  course_code.value = item.course_code;
  major.value = item.major
  section.value = item.section;
  last_name.value = item.last_name;
  first_name.value = item.first_name;
  middle_name.value = item.middle_name;
  gender.value = item.gender;

  let payload = {
    student_id: item.documentId,
    semester: item.semester,
    school_year: item.school_year,
    student_no: item.student_no,
    course: item.course,
    course_code: item.course_code,
    major: item.major,
    section: item.section,
    last_name: item.last_name,
    first_name: item.first_name,
    middle_name: item.middle_name,
    gender: item.gender,
    contact_number: contact_number.value
  };

  console.log(payload)

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

/* :deep(.custom-text-field .v-field__overlay) {
  background-color: red !important; 
} */
</style>