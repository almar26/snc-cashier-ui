<template>
  <div>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <!-- <v-row>
      <v-col cols="12">
        <v-card elevation="0" class="card-outlined">
          <v-toolbar color="transparent" density="compact">
            <v-toolbar-title class="title-color">Account Information</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col cols="12" md="3">
        <v-row dense>
          <v-col cols="12">
            <v-card elevation="0" class="card-outlined">
              <v-toolbar color="transparent" density="compact">
                <v-toolbar-title class="title-color"><v-icon start>mdi-account</v-icon> Account
                  Information</v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text class="text-center">
                <v-avatar size="100" color="#EEEEEE" class="mb-3">
                  <v-icon icon="mdi-account-circle" color="grey" size="95"></v-icon>
                </v-avatar>
                <!-- <p class="student-no mb-2">{{ studentAccounts.student_no }}</p>
                <p class="student-name">{{ studentAccounts.first_name }} {{ studentAccounts.last_name }}</p> -->
                <v-row dense justify="center" class="text-left">
                  <v-col cols="12" md="4">
                    <v-sheet class="mr- label-color">Student No </v-sheet>
                    <!-- <v-list-subheader>Tuition Fee 1</v-list-subheader> -->
                  </v-col>
                  <v-col cols="12" md="7">
                    {{ studentAccounts.student_no }}
                  </v-col>
                </v-row>
                <v-row dense justify="center" class="text-left">
                  <v-col cols="12" md="4">
                    <v-sheet class="mr-5 label-color">Name </v-sheet>
                    <!-- <v-list-subheader>Tuition Fee 1</v-list-subheader> -->
                  </v-col>
                  <v-col cols="12" md="7">
                    {{ studentAccounts.last_name }}, {{ studentAccounts.first_name }} {{ studentAccounts.middle_name }}
                  </v-col>
                </v-row>
                <v-row dense justify="center" class="text-left">
                  <v-col cols="12" md="4">
                    <v-sheet class="mr-5 label-color">Course </v-sheet>
                    <!-- <v-list-subheader>Tuition Fee 1</v-list-subheader> -->
                  </v-col>
                  <v-col cols="12" md="7">
                    {{ studentAccounts.course_code }}-{{ studentAccounts.section }}
                  </v-col>
                </v-row>
                <v-row dense justify="center" class="text-left">
                  <v-col cols="12" md="4">
                    <v-sheet class="mr-5 label-color">Setion </v-sheet>
                    <!-- <v-list-subheader>Tuition Fee 1</v-list-subheader> -->
                  </v-col>
                  <v-col cols="12" md="7">
                    {{ studentAccounts.section }}
                  </v-col>
                </v-row>
                <v-row dense justify="center" class="text-left">
                  <v-col cols="12" md="4">
                    <v-sheet class="mr-5 label-color">Contact # </v-sheet>
                    <!-- <v-list-subheader>Tuition Fee 1</v-list-subheader> -->
                  </v-col>
                  <v-col cols="12" md="7">
                    {{ studentAccounts.contact_number }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card elevation="0" class="card-outlined">
              <v-toolbar color="transparent" density="compact">
                <v-toolbar-title class="title-color">Tuition Fee Details</v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <v-row no-gutters justify="center">
                  <v-col cols="12" md="4">

                    <v-sheet class="mr-8 label-color">Tuition Fee </v-sheet>
                  </v-col>
                  <v-col cols="12" md="7">
                    <v-text-field density="compact" prefix="&#x20B1;" readonly :model-value="tuitionFee.tuition_fee"
                      variant="outlined"></v-text-field></v-col>
                </v-row>
                <v-row no-gutters justify="center">
                  <v-col cols="12" md="4">

                    <v-sheet class="mr-8 label-color">Discount </v-sheet>
                  </v-col>
                  <v-col cols="12" md="7">

                    <v-text-field density="compact" prefix="&#x20B1;" readonly :model-value="tuitionFee.discount"
                      variant="outlined"></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters justify="center">
                  <v-col cols="12" md="4">

                    <v-sheet class="mr-8 label-color">Downpayment </v-sheet>
                  </v-col>
                  <v-col cols="12" md="7">

                    <v-text-field density="compact" prefix="&#x20B1;" readonly :model-value="tuitionFee.downpayment"
                      variant="outlined"></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters justify="center">
                  <v-col cols="12" md="4">

                    <v-sheet class="mr-8 label-color">Balance </v-sheet>
                  </v-col>
                  <v-col cols="12" md="7">

                    <v-text-field density="compact" prefix="&#x20B1;" readonly :model-value="tuitionFee.balance"
                      variant="outlined"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-col>
      <v-col cols="12" md="6">
        <v-card elevation="0" class="card-outlined">
          <v-toolbar color="transparent" density="compact">
            <v-toolbar-title class="title-color"><v-icon start>mdi-clipboard-text-clock</v-icon> Tuition Fee
              Summary</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-divider></v-divider>
          <v-data-table :headers="tuitionFeeHeaders" :items="tuitionFeeSummary" density="compact" hide-default-footer>
            <template v-slot:[`item.payment_amount`]="{ item }">
              {{ formatCurrency(item.payment_amount) }}
            </template>
             <template v-slot:[`item.amount_paid`]="{ item }">
              {{ formatCurrency(item.amount_paid) }}
            </template>
            <template v-slot:[`item.status`]="{ item }">
              <v-chip label size="small" color="warning" v-if="item.payment_status == 'partial'">
                Partial
              </v-chip>
              <v-chip label size="small" color="green" v-if="item.payment_status == 'paid'">
                Paid
              </v-chip>
              <!-- <v-chip label size="small" color="warning" v-if="item.amount_paid < item.payment_amount && item.amount_paid != 0">
               Partial
              </v-chip>
              <v-chip label size="small" color="green" v-if="item.amount_paid == item.payment_amount">
                Paid
              </v-chip> -->
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn size="small" variant="tonal" color="purple"><v-icon>mdi-calculator</v-icon></v-btn>
            </template>
          </v-data-table>
          <v-divider></v-divider>
        </v-card-text>

        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card elevation="0" class="card-outlined">
          <v-toolbar color="transparent" density="compact">
            <v-toolbar-title class="title-color">Tuition Fee Details</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="11">
                <v-text-field  label="Previous Charges" prefix="&#x20B1;" readonly
                  :model-value="tuitionFee.tuition_fee" variant="outlined"></v-text-field></v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="11">
                <v-text-field  label="Current Amoun Due" prefix="&#x20B1;" readonly
                  :model-value="tuitionFee.discount" variant="outlined"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="11">
                <v-text-field  label="Total Amount Due" prefix="&#x20B1;" readonly
                  :model-value="tuitionFee.downpayment" variant="outlined"></v-text-field>
              </v-col>
            </v-row>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="ma-2">
            <v-btn variant="flat" color="primary" block>Pay</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <!-- <v-col cols="12" md="12">
        <v-card elevation="0">
          <v-toolbar color="transparent" density="compact">
            <v-toolbar-title class="title-color">Tuition Fee Details</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">

                <v-sheet class="mr-8 label-color">Tuition Fee </v-sheet>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field density="compact" disabled v-model="facultyno" variant="outlined"></v-text-field></v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">

                <v-sheet class="mr-8 label-color">Discount </v-sheet>
              </v-col>
              <v-col cols="12" md="7">

                <v-text-field density="compact" disabled v-model="facultyno" variant="outlined"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">

                <v-sheet class="mr-8 label-color">Downpayment </v-sheet>
              </v-col>
              <v-col cols="12" md="7">

                <v-text-field density="compact" disabled v-model="facultyno" variant="outlined"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">

                <v-sheet class="mr-8 label-color">Balance </v-sheet>
              </v-col>
              <v-col cols="12" md="7">

                <v-text-field density="compact" disabled v-model="facultyno" variant="outlined"></v-text-field>
              </v-col>
            </v-row>


            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">
                <v-sheet class="mr-8 label-color">Tuition Fee </v-sheet>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field prefix="&#x20B1;" density="compact" variant="solo-filled" type="number"
                  v-model="tuition_fee" flat></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">
                <v-sheet class="mr-8 label-color">Discount </v-sheet>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field prefix="&#x20B1;" density="compact" variant="solo-filled" type="number"
                  v-model="tuition_fee" flat></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">
                <v-sheet class="mr-8 label-color">Downpayment </v-sheet>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field prefix="&#x20B1;" density="compact" variant="solo-filled" type="number"
                  v-model="tuition_fee" flat></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">
                <v-sheet class="mr-8 label-color" >Balance </v-sheet>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field prefix="&#x20B1;" density="compact" variant="solo-filled" type="number"
                  v-model="tuition_fee" model-value="500" flat></v-text-field>
              </v-col>
            </v-row>


            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">
                <v-sheet class="mr-8 label-color">Tuition Fee </v-sheet>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field prefix="&#x20B1;"  variant="solo-filled" type="number" v-model="tuition_fee" :model-value="18500" flat
                 ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">
                <v-sheet class="mr-8 label-color">Discount </v-sheet>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field prefix="&#x20B1;" variant="solo-filled" type="number"
                  v-model="tuition_fee" flat></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">
                <v-sheet class="mr-8 label-color">Downpayment </v-sheet>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field prefix="&#x20B1;" variant="solo-filled" type="number"
                  v-model="tuition_fee" flat></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" md="4">
                <v-sheet class="mr-8 label-color" >Balance </v-sheet>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field prefix="&#x20B1;" variant="solo-filled" type="number"
                  v-model="tuition_fee" model-value="500" flat></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col> -->
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

const tuitionFeeHeaders = ref([
  {
    title: "Description",
    sortable: true,
    key: "payment_name",
  },
  { title: "Amount", key: "payment_amount", align: "center", sortable: false },
  { title: "Due Date", key: "due_date", align: "center", sortable: false },
  { title: "Amount Paid", key: "amount_paid", align: "center", sortable: false },
  { title: "Date Paid", key: "date_paid", sortable: false },
  { title: "O.R. Number", key: "or_number", sortable: false },
  { title: "Status", key: "status", align: "center", sortable: false },
  { title: "", key: "actions", align: "center", sortable: false },
])

const searchDialog = ref(false)

const dialog = ref(false);
const bott_nav = ref(null)
const studentAccounts = ref({});
const tuitionFee = ref({});
const tuitionFeeSummary = ref([])

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
        studentAccounts.value = result.data;
        tuitionFee.value = result.data.tuition_fee
      }
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

async function getTuitionFeeSummary() {
  try {
    console.log("Tuition Fee ID: ", tuitionFee.value?.documentId)
    //const tuition_id = tuitionFee.value?.documentId;
    let result = await $fetch(`/api/payment/list/${route.params.id}`);

    if (result) {
      console.log(result);
      if (result.length == 0) {
        console.log("No Tuition Fee Summary record found");
      } else {
        console.log("Tuition Fee Summary Found");
        tuitionFeeSummary.value = result;
      }
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(value)
}


onMounted(async () => {
  await initialize();
  await getTuitionFeeSummary();
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
  /* border: 1px solid rgba(128, 128, 128, 0.274); */
  border-radius: 15px;
}

.title-color {
  color: #424242;
  font-size: 18px;
}

.label-color {
  color: #757575;
}

.label-header {
  font-size: 15px !important;
  font-weight: bold;
  margin-bottom: 15px;
}

.student-no {
  font-size: 16px;
  font-weight: bold;
}

.student-name {
  color: green;
  font-size: 18px;
  font-weight: bold;
}

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