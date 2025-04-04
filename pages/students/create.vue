<template>
  <div>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" md="8">
        <v-card elevation="0">
          <v-toolbar color="transparent">
            <v-toolbar-title><v-icon start>mdi-account</v-icon> Student Information</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn color="red" variant="tonal" prepend-icon="mdi-close" class="text-capitalize mr-4"
              @click="clearForm()">Clear</v-btn> -->
            <v-btn color="blue" variant="tonal" prepend-icon="mdi-import" class="text-capitalize mr-4"
              @click="showImportDialogBox()">Import Student</v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="studentInfoForm">
              <v-row dense>
                <v-col cols="12" md="3">
                  <v-text-field label="Student No" :rules="[rules.required]" v-model="student_no" variant="solo-filled"
                    flat></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" md="3">
                  <v-select label="Semester" :rules="[rules.required]"
                    :items="['1st Semester', '2nd Semester', 'Summer']" v-model="semester" variant="solo-filled"
                    flat></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field label="School Year" :rules="[rules.required]" v-model="school_year"
                    variant="solo-filled" flat></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" md="4">
                  <v-text-field label="Last name" :rules="[rules.required]" v-model="last_name" variant="solo-filled"
                    flat></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="First name" :rules="[rules.required]" v-model="first_name" variant="solo-filled"
                    flat></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="Middle name" :rules="[rules.required]" v-model="middle_name"
                    variant="solo-filled" flat></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field label="Course" :rules="[rules.required]" v-model="course" variant="solo-filled"
                    flat></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="Major" v-model="major" variant="solo-filled" flat></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field label="Section" :rules="[rules.required]" v-model="section" variant="solo-filled"
                    flat></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" md="4">
                  <!-- <v-combobox label="Gender" :items="['Male', 'Female']" v-model="gender" variant="solo-filled"
                    flat></v-combobox> -->
                  <v-select label="Gender" :rules="[rules.required]" :items="['MALE', 'FEMALE']" v-model="gender"
                    variant="solo-filled" flat></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="Contact Number" :rules="[rules.required]" v-model="contact_number"
                    variant="solo-filled" flat></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <!-- <v-combobox label="Student Type" :items="['College', 'SHS']" v-model="student_type"
                    variant="solo-filled" flat></v-combobox> -->
                  <v-select label="Course Type" :rules="[rules.required]" :items="['Regular', 'Diploma']"
                    v-model="course_type" variant="solo-filled" flat></v-select>
                </v-col>

              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12">
            <v-card elevation="0">
              <v-toolbar color="transparent">
                <v-toolbar-title>
                  Tuition Fee Details
                </v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <v-form ref="studentTuitionForm">
                  <v-text-field prefix="&#x20B1;" variant="solo-filled" type="number" v-model="tuition_fee"
                    :rules="[rules.required]" flat label="Tuition Fee"></v-text-field>
                  <v-text-field prefix="&#x20B1;" label="Discount" type="number" :rules="[rules.required]"
                    v-model="discount" variant="solo-filled" flat></v-text-field>
                  <v-text-field prefix="&#x20B1;" label="Downpayment" type="number" :rules="[rules.required]"
                    v-model="downpayment" variant="solo-filled" flat></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card elevation="0">
              <v-card-text>
                <v-btn color="primary" @click="submitForms()" prepend-icon="mdi-content-save" variant="flat"
                  block>Save</v-btn>
                <v-btn color="red" @click="clearForm()" prepend-icon="mdi-close" variant="outlined" class="mt-2"
                  block>Clear</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- DIALOG BOX -->
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
          :loading="loading">
          <template v-slot:loading>
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
const loading = ref(false)
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
const course_type = ref(null)
const student_type = ref(null)
const tuition_fee = ref("")
const discount = ref("")
const downpayment = ref("")
const studentInfoForm = ref(null);
const studentTuitionForm = ref(null);
const rules = {
  required: v => !!v || 'Field is required',
}
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


async function loadStudentList() {
  try {
    loading.value = true;
    let result = await $fetch(`/api/student/student-list`);
    if (result) {
      sisStudentList.value = result;
      //console.log(result);
      loading.value = false;
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}


async function showImportDialogBox() {
  addStudentDialog.value = true
  //loading.value = true
  //loadStudentList()
}

async function clearForm() {
  console.log("Clear Data")
  studentInfoForm.value?.reset();
  studentTuitionForm.value?.reset();
}

const submitForms = async () => {
  const isValid1 = await studentInfoForm.value.validate();
  const isValid2 = await studentTuitionForm.value.validate();

  if (isValid1.valid && isValid2.valid) {

    const total_payment = parseFloat(downpayment.value) + parseFloat(discount.value);
    const balance = parseFloat(tuition_fee.value) - total_payment
    const monthly_payment = balance / 6;
    console.log("Total payment: ", total_payment)
    console.log("Balance: ", balance)
    console.log("Monthly Payment: ", monthly_payment)

    const payload = {
      student_id: student_id.value,
      student_no: student_no.value,
      semester: semester.value,
      school_year: school_year.value,
      last_name: last_name.value,
      first_name: first_name.value,
      middle_name: middle_name.value,
      course: course.value,
      course_code: course_code.value,
      major: major.value,
      section: section.value,
      gender: gender.value,
      contact_number: contact_number.value,
      course_type: course_type.value,
      tuition_fee: parseFloat(tuition_fee.value),
      discount: parseFloat(discount.value),
      downpayment: parseFloat(downpayment.value)
    }

    console.log("Submitted data: ", payload);
    await $fetch('/api/student/create', {
      method: "POST",
      body: payload
    })
      .then(response => {
        if (response.status == "fail") {
          alert(response.message)
        } else {
          console.log("Response: ", response);
          studentInfoForm.value?.reset();
          studentTuitionForm.value?.reset();
          alert('Both forms submitted successfully!');
        }
      })


  }
  else {
    alert('Please correct the errors before submitting.');
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
  addStudentDialog.value = false;

}

onMounted(async () => {
  await loadStudentList();
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
