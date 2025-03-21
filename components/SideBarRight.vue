<template>
  <v-navigation-drawer app color="white" location="right" width="350">
    <v-list subheader two-line class="mt-1">
      <v-list-item>
        
        <v-list-item-content>
          <v-list-item-subtitle>I'am a Cashier</v-list-item-subtitle>
          <v-list-item-title>Jelly Grande</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-badge bordered overlap color="red" dot>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-list-item-action>
      </v-list-item>
    </v-list>    
    <v-toolbar color="rgba(0,0,0,0)" flat>
      <strong>Subtotal</strong><v-spacer></v-spacer><strong>₱{{ (total - tax).toFixed(2) }}</strong>
    </v-toolbar>
    <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n6">
      <span>Tax(10%)</span><v-spacer></v-spacer><span>₱{{ tax.toFixed(2) }}</span>
    </v-toolbar>
    <v-divider class="mx-4"></v-divider>
    <v-toolbar color="rgba(0,0,0,0)" flat>
      <strong>Total</strong><v-spacer></v-spacer><strong>₱{{ total.toFixed(2) }}</strong>
    </v-toolbar>
    <div style="position: absolute; bottom: 20px; margin-left: auto; margin-right: auto; left: 0; right: 0; text-align: center;">
      <strong class="ml-5">Payment Method</strong>
      <v-item-group mandatory class="mt-n1">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-item v-slot="{ active, toggle }">
                <v-card
                  color="#F6EFEF"
                  :class="active ? 'borderme' : ''"
                  class="d-flex align-center rounded-lg"
                  dark
                  height="70"
                  @click="toggle"
                  flat
                >
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-list-item three-line class="text-center mt-1">
                        <v-list-item-content>
                          <div>
                            <v-icon :color="active ? '#704232' : 'black'"
                              >mdi-cash</v-icon
                            >
                          </div>
                          <v-list-item-subtitle
                            :class="active ? 'brown--text' : 'black--text'"
                            class="mt-n2 caption"
                          >
                           [F5] Cash
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-item>
            </v-col>
            <v-col cols="12" md="4">
              <v-item v-slot="{ active, toggle }">
                <v-card
                  color="#F6EFEF"
                  :class="active ? 'borderme' : ''"
                  class="d-flex align-center rounded-lg"
                  dark
                  height="70"
                  @click="toggle"
                  flat
                >
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-list-item three-line class="text-center mt-1">
                        <v-list-item-content>
                          <div>
                            <v-icon :color="active ? '#704232' : 'black'"
                              >mdi-credit-card</v-icon
                            >
                          </div>
                          <v-list-item-subtitle
                            :class="active ? 'brown--text' : 'black--text'"
                            class="mt-n2 caption"
                          >
                            Debit Card
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-item>
            </v-col>
            <v-col cols="12" md="4">
              <v-item v-slot="{ active, toggle }">
                <v-card
                  color="#F6EFEF"
                  :class="active ? 'borderme' : ''"
                  class="d-flex align-center rounded-lg"
                  dark
                  height="70"
                  @click="toggle"
                  flat
                >
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-list-item three-line class="text-center mt-1">
                        <v-list-item-content>
                          <div>
                            <v-icon :color="active ? '#704232' : 'black'"
                              >mdi-qrcode</v-icon
                            >
                          </div>
                          <v-list-item-subtitle
                            :class="active ? 'brown--text' : 'black--text'"
                            class="mt-n2 caption"
                          >
                            E-Wallet
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>

      <div class="mx-3 mt-2">
        <v-btn color="#704232" block dark class="widthoutuppercase" @click="clearTransaction"
          >Print Bills</v-btn
        >
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      transactions: [],
    };
  },

  methods: {
      clearTransaction() {
      console.log("Child Transactions!")
      this.$emit('clearTransaction')
      // this.$axios
      //   .$post("http://localhost:1337/api/sale/truncate")
      //   .then((response) => {
      //     this.getCurrentTransaction();
      //     this.search = "";
      //     console.log(response);
      //     // alert("Submit");
      //   });
    },
    getCurrentTransaction() {
      this.$axios.get("http://localhost:1337/api/sales").then((response) => {
        console.log(response.data.data);
        this.transactions = response.data.data;
      });
    },
  }
};
</script>
<style>
.v-card.borderme {
  border: 2px solid #704232 !important;
}
.col-12 {
  padding: 5px !important;
}
.v-btn.withoutupercase {
  text-decoration: none !important;
}
</style>
