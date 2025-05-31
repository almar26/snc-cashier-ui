<template>
  <div>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>


    <v-row>
      <v-col cols="12" md="3">
        <v-row>
          <v-col cols="12">
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
                        {{ studentAccounts.last_name }}, {{ studentAccounts.first_name }} {{ studentAccounts.middle_name
                        }}
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
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card elevation="0" class="card-outlined">
                  <v-toolbar color="transparent" density="compact">
                    <v-toolbar-title class="title-color">Tuition Fee Details</v-toolbar-title>
                  </v-toolbar>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row dense justify="center">
                      <v-col cols="12" md="11">
                        <v-text-field label="Tuition Fee" hide-details prefix="&#x20B1;" readonly
                          :model-value="tuitionFeeFormatted" variant="solo-filled" flat></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense justify="center">
                      <v-col cols="12" md="11">
                        <v-text-field label="Discount" hide-details prefix="&#x20B1;" readonly
                          :model-value="discountFormatted" variant="solo-filled" flat></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense justify="center">
                      <v-col cols="12" md="11">
                        <v-text-field label="Downpayment" hide-details prefix="&#x20B1;" readonly
                          :model-value="downpaymentFormatted" variant="solo-filled" flat></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense justify="center">
                      <v-col cols="12" md="11">
                        <v-text-field label="Remaining Balance" prefix="&#x20B1;" readonly
                          :model-value="balanceFormatted" variant="solo-filled" flat></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>

                </v-card>
              </v-col>
            </v-row>

          </v-col>
        </v-row>



      </v-col>
      <v-col cols="12" md="9">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-card elevation="0" class="card-outlined">
                  <v-toolbar color="transparent" density="compact">
                    <v-toolbar-title class="title-color"><v-icon start>mdi-clipboard-text-clock</v-icon> Tuition Fee
                      Summary</v-toolbar-title>
                  </v-toolbar>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-divider></v-divider>
                    <v-data-table :headers="tuitionFeeHeaders" :items="tuitionFeeSummary" density="compact"
                      hide-default-footer>
                      <template v-slot:[`item.payment_amount`]="{ item }">
                        {{ formatCurrency(item.payment_amount) }}
                      </template>
                      <template v-slot:[`item.due_date`]="{ item }">
                        <div v-if="item.due_date != null">
                          {{ item.due_date }} <v-btn icon="mdi-pencil" size="x-small" variant="text"
                            color="warning"></v-btn>
                        </div>
                        <div v-else-if="item.payment_name == 'Downpayment'">
                        </div>
                        <div v-else>
                          <v-btn color="blue" variant="text" size="x-small" icon="mdi-calendar"></v-btn>
                        </div>
                      </template>
                      <template v-slot:[`item.amount_paid`]="{ item }">
                        {{ formatCurrency(item.amount_paid) }}
                      </template>
                      <template v-slot:[`item.balance`]="{ item }">
                        {{ formatCurrency(item.balance) }}
                      </template>
                      <template v-slot:[`item.or_number`]="{ item }">
                        <div v-if="item.or_number == ''">
                          <v-btn icon="mdi-receipt-text-plus" size="x-small" variant="text" color="blue"></v-btn>
                        </div>
                        <div v-else>
                          {{ item.or_number }} <v-btn color="warning" variant="text" size="x-small"
                            icon="mdi-receipt-text-edit"></v-btn>
                        </div>
                      </template>
                      <template v-slot:[`item.status`]="{ item }">
                        <v-chip label size="small" color="warning" v-if="item.payment_status == 'partial'">
                          Partial
                        </v-chip>
                        <v-chip label size="small" color="green" v-else-if="item.payment_status == 'paid'">
                          Paid
                        </v-chip>
                        <v-chip label size="small" color="grey" v-else>
                          Unpaid
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
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-card elevation="0" class="card-outlined">
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field label="Previous Due" prefix="&#x20B1;" variant="solo-filled" readonly
                          :model-value="previousDue" flat></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field label="Current Amount Due" prefix="&#x20B1;" readonly
                          :model-value="currentAmountDue" variant="solo-filled" flat></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field label="Total Amount Due" prefix="&#x20B1;" readonly :model-value="totalAmountDue"
                          variant="solo-filled" flat></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card elevation="0" class="card-outlined">
              <v-tabs v-model="tab" align-tabs="right">
                <v-tab :value="1" class="tab-title text-capitalize">
                  <v-icon start>mdi-clipboard-text-clock</v-icon> Other Fees
                </v-tab>
                <v-tab :value="2" class="tab-title text-capitalize">
                  <v-icon start>mdi-clipboard-text-clock</v-icon> Old Accounts
                </v-tab>
              </v-tabs>
              <v-divider></v-divider>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item :value="1">
                  <v-row dense>
                    <v-col>
                      <v-card elevation="0">
                        <v-card-text>
                          <v-data-table :headers="tuitionFeeHeaders" :items="tuitionFeeSummary" density="compact"
                            hide-default-footer>
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
                              <v-chip label size="small" color="green" v-else-if="item.payment_status == 'paid'">
                                Paid
                              </v-chip>
                              <v-chip label size="small" color="grey" v-else>
                                Unpaid
                              </v-chip>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                              <v-btn size="small" variant="tonal" color="purple"><v-icon>mdi-calculator</v-icon></v-btn>
                            </template>
                          </v-data-table>
                          <v-divider></v-divider>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="12">
                      <v-card elevation="0" class="card-outlined">
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" md="4">

                            </v-col>
                            <v-col cols="12" md="4">

                            </v-col>
                            <v-col cols="12" md="4">
                              <v-text-field label="Other Fees Total Amount" prefix="&#x20B1;" readonly
                                :model-value="totalAmountDue" variant="solo-filled" flat></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-tabs-window-item>
                <v-tabs-window-item :value="2">
                  <v-card>
                    <v-card-text>Other Fees Content</v-card-text>
                  </v-card>
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>


    <!-- DIALOG BOX -->
    <!-- Payment Method 1 -->
    <v-dialog v-model="paymentDialog" width="1300">
      <v-card>
        <v-toolbar color="transparent" density="compact">
          <v-toolbar-title class="title-color">
            <v-icon start>mdi-cash-multiple</v-icon> Select Payment
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" @click="paymentDialog = false"></v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <!-- <v-row>
            <v-col cols="87">
              <v-card variant="outlined" class="payment-card-outlined">
                <v-card-text>
                 
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="5">
              <v-card variant="outlined" class="payment-card-outlined">
                <v-card-text>
                  <v-text-field variant="solo-filled" label="Total Amount" class="custom-outlined" flat></v-text-field>
                  <v-text-field variant="solo-filled" label="Cash" class="custom-outlined" flat></v-text-field>
                  <v-text-field variant="solo-filled" label="Change" class="custom-outlined" flat></v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn color="primary" variant="flat" block>Pay Now</v-btn>
                </v-card-actions>
              </v-card>

            </v-col>
          </v-row> -->

          <v-row>
            <v-col cols="12" md="7">
              <v-divider></v-divider>
              <v-data-table v-model="selected" :headers="paymentHeaders" :item-selectable="isSelectable"
                hide-default-footer :items="unpaidTuitions" item-value="id" show-select density="compact" return-object
                class="elevation-0">
                <template v-slot:[`item.payment_amount`]="{ item }">
                  {{ formatCurrency(item.payment_amount) }}
                </template>
                <template v-slot:[`item.amount_paid`]="{ item }">
                  {{ formatCurrency(item.amount_paid) }}
                </template>
                <template v-slot:[`item.balance`]="{ item }">
                  {{ formatCurrency(item.balance) }}
                </template>
                <template v-slot:[`item.payment_status`]="{ item }">
                  <v-chip label size="small" color="warning" v-if="item.payment_status == 'partial'">
                    Partial
                  </v-chip>
                  <v-chip label size="small" color="green" v-else-if="item.payment_status == 'paid'">
                    Paid
                  </v-chip>
                  <v-chip label size="small" color="grey" v-else>
                    Unpaid
                  </v-chip>

                </template>
                <!-- <template #bottom>
                  <v-row justify="end" class="pa-4">
                    <v-col cols="auto">
                      <strong>Total Amount:</strong> {{ totalAmount }}
                    </v-col>
                  </v-row>
                </template> -->
              </v-data-table>
              <v-divider></v-divider>

              <!-- <pre>{{ selected }}</pre> -->

            </v-col>

            <v-divider vertical></v-divider>

            <v-col cols="12" md="5">
              <v-card elevation="0">
                <v-card-text>
                  <v-text-field variant="solo-filled" v-model="selectedTotalAmount"
                    :model-value="formatNumber(selectedTotalAmount)" prefix="&#x20B1;" readonly label="Total Amount"
                    class="custom-outlined" flat></v-text-field>
                  <v-text-field variant="solo-filled" label="Change" v-model="change"
                    :model-value="formatNumber(change)" class="custom-outlined" readonly prefix="&#x20B1;"
                    flat></v-text-field>
                  <v-text-field variant="outlined" type="number" label="Cash" class="custom-outlined"
                    v-model="cashPayment" prefix="&#x20B1;" flat></v-text-field>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="primary" variant="flat" :disabled="cashPayment < selectedTotalAmount" @click="payNow"
                    block>Pay Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Payment Method 2 -->
    <v-dialog v-model="payment2Dialog" width="1200">
      <v-card>
        <v-toolbar color="transparent" density="compact">
          <v-toolbar-title class="title-color">
            <v-icon start>mdi-cash-multiple</v-icon> Select Payment 2
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" @click="payment2Dialog = false"></v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="8">
              <v-divider></v-divider>

              <!-- <v-data-table :headers="paymentHeaders" :items="unpaidTuitions" item-value="id" show-select v-model="selected" return-object>
                <template #item.amount_paid="{ item }">
                  ₱{{ item.amount_paid }}
                </template>
              </v-data-table> -->
              <v-data-table v-model="selected" :headers="paymentHeaders" :item-selectable="isSelectable"
                hide-default-footer :items="unpaidTuitions" item-value="id" show-select density="compact" return-object
                class="elevation-0">
                <template v-slot:[`item.payment_amount`]="{ item }">
                  {{ formatCurrency(item.payment_amount) }}
                </template>
                <template v-slot:[`item.amount_paid`]="{ item }">
                  {{ formatCurrency(item.amount_paid) }}
                </template>
                <template v-slot:[`item.balance`]="{ item }">
                  {{ formatCurrency(item.balance) }}
                </template>
                <template v-slot:[`item.payment_status`]="{ item }">
                  <v-chip label size="small" color="warning" v-if="item.payment_status == 'partial'">
                    Partial
                  </v-chip>
                  <v-chip label size="small" color="green" v-else-if="item.payment_status == 'paid'">
                    Paid
                  </v-chip>
                  <v-chip label size="small" color="grey" v-else>
                    Unpaid
                  </v-chip>

                </template>

              </v-data-table>
              <v-divider></v-divider>

              <!-- <pre>{{ selected }}</pre> -->

            </v-col>

            <v-divider vertical></v-divider>

            <v-col cols="12" md="4">
              <v-card elevation="0">
                <v-card-title>Selected Payment</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <!-- <pre>{{ selected }}</pre> -->
                  <!-- <div v-for="(item, index) in selected" :key="item.id">
                      {{ item.payment_name }}
                      </div> -->

                  <!-- <div v-for="(item, index) in selected" :key="item.id">
                    <v-list density="compact">
                      <v-list-item>
                        <v-list-item-title>{{ item.payment_name }}</v-list-item-title>
                        <template v-slot:append>
                          <span> {{ formatCurrency(item.balance) }}</span>
                        </template>
                      </v-list-item>
                      <v-divider></v-divider>

                    </v-list>
                  </div> -->
                  <div v-if="selected.length !== 0">
                    <v-row dense v-for="(item, i) in selected" :key="i">
                      <v-col cols="7">{{ item.payment_name }}</v-col>
                      <v-col cols="5" class="text-right">{{ formatCurrency(item.balance) }}</v-col>
                    </v-row>
                  </div>
                  <div v-else>
                    <p class="text-center">No selected payment</p>
                  </div>



                  <v-row class="mt-5">
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-col cols="7" class="font-weight-bold">Total Amount</v-col>
                    <v-col cols="5" class="text-right font-weight-bold total-amount-style">{{
                      formatCurrency(selectedTotalAmount) }}</v-col>
                  </v-row>

                  <!-- <v-text-field variant="solo-filled" v-model="selectedTotalAmount"
                    :model-value="formatNumber(selectedTotalAmount)" prefix="&#x20B1;" readonly label="Total Amount"
                    class="custom-outlined mt-5" flat></v-text-field> -->

                  <!-- <v-text-field variant="solo-filled" label="Change" v-model="change"
                    :model-value="formatNumber(change)" class="custom-outlined" readonly prefix="&#x20B1;"
                    flat></v-text-field>
                  <v-text-field variant="outlined" type="number" label="New Amount Paid" class="custom-outlined"
                    v-model.number="newAmount" prefix="&#x20B1;" flat></v-text-field> -->
                </v-card-text>

                <v-card-actions>
                  <!-- <v-btn color="primary" variant="flat" @click="updateAmountPaid" block>Update Selected</v-btn> -->
                  <v-btn color="primary" variant="flat" block :disabled="selected.length === 0" @click="openDialog">
                    Edit Amount Paid ({{ selected.length }})
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>


        <v-toolbar density="compact">
          <v-toolbar-title><v-icon size="25" start>mdi-pencil</v-icon> Edit Amount Paid</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
        </v-toolbar>
        <v-divider></v-divider>

        <v-card-text>
          <h3 class="mb-4">Total Amount: {{ formatCurrency(selectedTotalAmount) }}</h3>
          <!-- <div v-for="(item, index) in editItems" :key="item.id" class="mb-4">

            <div class="text-sm mb-1 font-medium">{{ item.payment_name }}</div>
            <div class="text-sm mb-1 font-medium">Amount Balance: {{ formatCurrency(item.balance) }}</div>
            <div>Payment Type:
              <span v-if="editItems[index].amount_paid >= item.balance">Paid</span>
              <span
                v-else-if="editItems[index].amount_paid < item.balance && editItems[index].amount_paid > 0">Partial</span>
              <span v-else>Unpaid</span>
            </div>
            <v-row class="mt-3">
              <v-col cols="3"><v-text-field label="Status" v-model="editItems[index].payment_status" variant="solo-filled" flat></v-text-field></v-col>
              <v-col>  <v-text-field v-model.number="editItems[index].amount_paid" type="number" label="Amount Paid"
              variant="outlined" flat prefix="₱" /></v-col>
            </v-row>
            <v-divider></v-divider>
    
          </div> -->
          <v-divider></v-divider>
          <v-table> 
            <thead>
              <tr>
                <th class="text-left">
                  Payment Name
                </th>
                <th class="text-left">
                  Balance
                </th>
                <th class="text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in editItems" :key="item.id">
                <td>{{ item.payment_name }}</td>
                <td>{{ formatCurrency(item.balance) }}</td>
                <td class="py-3">
                  <v-text-field v-model.number="editItems[index].amount_paid" density="compact" type="number"
                    label="Enter Amount" variant="outlined" hide-details="auto" flat prefix="₱" />
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-divider class="mt-8"></v-divider>
          <div class="text-right font-bold mt-2">
            <!-- Total Updated Amount Paid: ₱{{ totalAmountPaid }} -->
            <v-row justify="end" no-gutters>
              <!-- <v-col cols="4">Total Amount</v-col> -->
              <v-col cols="6">
                <!-- <v-text-field :model-value="totalAmountPaid" variant="solo-filled" flat readonly></v-text-field> -->
                  <v-text-field label="Total Amount" prefix="&#x20B1;" readonly
                          :model-value="totalAmountPaid" variant="solo-filled" flat></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <!-- <v-btn text @click="dialog = false">Cancel</v-btn> -->
          <v-btn color="primary" variant="flat" width="260"  @click="applyChanges">Save</v-btn>.
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>




    <StudentSearchStudent v-model="searchDialog" />

    <v-bottom-navigation bg-color="#181a1b" v-model="bott_nav" grow app height="70" class="floating-nav">
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
      <v-tooltip text="Pay" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" value="pay" @click="payment2Dialog = true" icon>
            <v-icon>mdi-cash-multiple</v-icon>
            Pay
          </v-btn>
        </template>
      </v-tooltip>
    </v-bottom-navigation>

  </div>
</template>

<script setup>
import hotkeys from 'hotkeys-js';
// definePageMeta({
//   layout: "account",
// });

const items = ref([
  { id: 1, name: 'Item A', amount: 10 },
  { id: 2, name: 'Item B', amount: 20 },
  { id: 3, name: 'Item C', amount: 15 },
])

const paymentHeaders = [
  { title: 'Name', key: 'payment_name', sortable: false },
  { title: 'Amount Due', key: 'payment_amount', sortable: false },
  { title: 'Amount Paid', key: 'amount_paid', sortable: false },
  { title: 'Balance', key: 'balance', sortable: false },
  { title: 'Payment Status', align: "center", key: 'payment_status', sortable: false },
]

const unpaidTuitions = ref([])

const selected = ref([])
const selectedItems = ref([])
const settingsSelection = ref([])

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
    sortable: false,
    key: "payment_name",
  },
  { title: "Amount Due", key: "payment_amount", align: "center", sortable: false },
  { title: "Due Date", key: "due_date", align: "center", sortable: false },
  { title: "Amount Paid", key: "amount_paid", align: "center", sortable: false },
  { title: "Date Paid", key: "date_paid", sortable: false },
  { title: "Balance", key: "balance", align: "center", sortable: false },
  { title: "O.R. Number", key: "or_number", align: "center", sortable: false },
  { title: "Status", key: "status", align: "center", sortable: false },
  { title: "", key: "actions", align: "center", sortable: false },
])

const paymentDialog = ref(false);
const payment2Dialog = ref(false);
const searchDialog = ref(false)
const tab = ref(null)
const dialog = ref(false);
const bott_nav = ref(null)
const studentAccounts = ref({});
const tuitionFee = ref({});
const tuitionFeeSummary = ref([])
const tuitionFeeFormatted = ref(null);
const discountFormatted = ref(null);
const downpaymentFormatted = ref(null);
const balanceFormatted = ref(null);
const semester = ref("1st Semester");
const sy = ref("2024-2025");
const previousDue = ref(0);
const currentAmountDue = ref(0);
const totalAmountDue = ref(0);
//const change = ref(0);
const cashPayment = ref(0)
const newAmount = ref(0);
const editItems = ref([])
const now = new Date();
const formattedDate = now.toISOString().split('T')[0];


async function initialize() {
  try {
    let result = await $fetch(`/api/tuition-fee/account/${route.params.id}`);

    if (result) {
      //console.log(result)
      //studentDetails.value = result.data;

      if (result.length == 0) {
        console.log("No record found");
      } else {
        //console.log("Record found")
        studentAccounts.value = result.data;
        tuitionFee.value = result.data.tuition_fee
        tuitionFeeFormatted.value = formatNumber(result.data.tuition_fee.tuition_fee)
        discountFormatted.value = formatNumber(result.data.tuition_fee.discount)
        downpaymentFormatted.value = formatNumber(result.data.tuition_fee.downpayment)
        balanceFormatted.value = formatNumber(result.data.tuition_fee.balance)
      }
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

// const totalAmount = computed(() =>
//   selected.value.reduce((sum, id) => {
//     const item = items.value.find(i => i.id === id)
//     return item ? sum + item.amount : sum
//   }, 0)
// )

// Disable selection if item.status === "paid"
const isSelectable = (item) => item.payment_status === 'unpaid';

// const paymentTotalAmount = computed(() =>
//   selected.value.reduce((sum, item) => sum + item.balance, 0)
// )
const selectedTotalAmount = computed(() => {
  return selected.value.reduce((sum, item) => {
    return sum + item.balance
  }, 0)
})

// Computed change
const change = computed(() => {
  const diff = cashPayment.value - selectedTotalAmount.value
  return diff >= 0 ? diff : 0
})

async function getTuitionFeeSummary() {
  try {
    //console.log("Tuition Fee ID: ", tuitionFee.value?.documentId)
    //const tuition_id = tuitionFee.value?.documentId;
    // let result = await $fetch(`/api/payment/list/${route.params.id}`);
    let result = await $fetch(`/api/payment/tuition_fee/summary?student_id=${route.params.id}&semester=${semester.value}&sy=${sy.value}`);

    if (result) {
      //console.log(result);
      if (result.length == 0) {
        console.log("No Tuition Fee Summary record found");
      } else {
        console.log("Tuition Fee Summary Found", result.summary);
        tuitionFeeSummary.value = result.summary;
        previousDue.value = formatNumber(result.previousDue);
        currentAmountDue.value = formatNumber(result.currentDue);
        totalAmountDue.value = formatNumber(result.totalAmountDue);
        unpaidTuitions.value = result.summary
      }
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

async function getPaymentDues() {
  try {
    let result = await $fetch(`/api/payment/dues?student_id=${route.params.id}&semester=${semester.value}&sy=${sy.value}`);

    if (result) {
      //console.log("Payment Due: ", result);
      // previousDue.value = formatNumber(result.previousDue);
      // currentAmountDue.value = formatNumber(result.currentDue);
      // totalAmountDue.value = formatNumber(result.totalAmountDue);
      // unpaidTuitions.value = result.invoices

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

function formatNumber(value) {
  return new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)
}

async function payNow() {

  let paymentStatus = "";

  if (selectedTotalAmount.value <= cashPayment.value) {
    console.log("Payment status: Paid")
    paymentStatus = "paid"
  }
  const simplified = selected.value.map(item => ({
    id: item.id,
    payment_name: item.payment_name,
    amount_paid: item.amount_paid,
    date_paid: formattedDate,
    payment_status: paymentStatus
  }))

  let payload = {
    selected_total_amount: selectedTotalAmount.value,
    change: parseFloat(change.value?.toFixed(2)),
    cash_payment: parseFloat(cashPayment.value),
    list_payment: simplified
  }

  console.log("Selected", payload)
  //console.log("Selected: ", simplified)
}

async function updateAmountPaid() {
  selected.value.forEach(selectedItem => {
    // Find and update the original item in the itemlist
    const item = items.value.find(i => i.id === selectedItem.id)
    if (item) {
      item.amount_paid = newAmount.value;
    }
  })

  console.log('Updated items: ', selected.value)
}

const totalAmountPaid = computed(() => {
  return editItems.value.reduce((sum, item) => sum + Number(item.amount_paid || 0), 0)
})

function openDialog() {
  // Clone selected items to edit locally
  editItems.value = selected.value.map(item => ({ ...item }))
  dialog.value = true
}

function getPaymentStatus(item) {
  console.log("get Payment: ", item)
  if (item.amount_paid >= item.balance) return 'Paid'
  if (item.amount_paid > 0) return 'Partial'
  return 'Unpaid'
}

function applyChanges() {
  // Update original items with new values
  editItems.value.forEach(edited => {
    const original = items.value.find(i => i.id === edited.id)
    if (original) {
      original.amount_paid = edited.amount_paid
      original.payment_status = getPaymentStatus(edited)
    }
    console.log("Original: ", edited)
  })

  // Log updated selected items
  const updatedSelected = editItems.value.map(({ id, payment_name, amount_paid, balance }) => ({
    id,
    payment_name,
    date_paid: formattedDate,
    amount_paid,
    payment_status: getPaymentStatus({ ...items.value.find(i => i.id === id), amount_paid, balance })
  }))
  selected.value = []

  console.log('Updated selected items:', updatedSelected)

  dialog.value = false

}




onMounted(async () => {
  await initialize();
  await getTuitionFeeSummary();
  await getPaymentDues();
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
  border-radius: 33px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-outlined {
  /* border: 1px solid rgba(128, 128, 128, 0.274); */
  border-radius: 15px;
}

.tab-title {
  color: #424242;
  font-size: 17px;
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

.payment-card-outlined {
  border: 1px solid #d6d6d6;
}

.total-amount-style {
  font-size: 16px;
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
