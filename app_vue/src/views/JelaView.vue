<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <h1>Jela</h1>
          <b-table striped hover :items="jela" :fields="fields">
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
  name: "JelaView", components: {
    BContainer, BRow, BCol, BTable
  }, data() {
    return {
      fields: [{key: 'id', label: 'ID'}, {key: 'naziv', label: 'Naziv'}, {key: 'opis', label: 'Opis'}, {
        key: 'cena',
        label: 'Cena'
      }]
    };
  }, computed: {
    ...mapGetters(['getJela']), jela() {
      return this.getJela;
    }
  }, mounted() {
    this.fetchJela();
  }, methods: {
    ...mapActions(['fetchJela'])
  }
};
</script>