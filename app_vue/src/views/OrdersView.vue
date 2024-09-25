<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <h1>Narudžbine</h1>
          <b-table striped hover :items="orders" :fields="fields">
            <template #cell(sadrzaj)="data">
              <ul>
                <li v-for="item in data.item.sadrzaj.split(', ')" :key="item">{{ item }}</li>
              </ul>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { BContainer, BRow, BCol, BTable } from 'bootstrap-vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "OrdersView",
  components: {
    BContainer, BRow, BCol, BTable
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'zakazano_vreme', label: 'Zakazano Vreme' },
        { key: 'status', label: 'Status' },
        { key: 'cena', label: 'Cena' },
        { key: 'adresa', label: 'Adresa' },
        { key: 'sadrzaj', label: 'Sadržaj' }
      ]
    };
  },
  computed: {
    ...mapGetters(['getOrders']),
    orders() {
      return this.getOrders;
    }
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    ...mapActions(['fetchOrders'])
  }
};
</script>