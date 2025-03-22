<template>
  <v-navigation-drawer color="white" location="right" width="350">
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
    },

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
