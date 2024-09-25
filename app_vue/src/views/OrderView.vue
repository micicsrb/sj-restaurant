<template>
  <div>
    <b-container>
      <b-row class="mb-3">
        <b-col>
          <h1>Naruči jela</h1>
          <b-table striped hover :items="jela" :fields="fields" @row-clicked="addToCart">
          </b-table>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col>
          <b-form @submit.prevent="submitCart">
            <b-form-group label="Zakazano Vreme" label-for="zakazanoVremeInput" class="mb-3">
              <b-form-datepicker
                  v-model="zakazano_vreme"
                  id="zakazanoVremeInput"
                  name="zakazano_vreme"
                  :state="zakazano_vremeState"
                  required
              ></b-form-datepicker>
              <b-form-invalid-feedback v-if="!zakazano_vremeState">
                Zakazano vreme is required.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Ime i Prezime" label-for="imePrezimeInput" class="mb-3">
              <b-form-input
                  v-model="ime_prezime"
                  id="imePrezimeInput"
                  name="ime_prezime"
                  type="text"
                  placeholder="Ime i Prezime"
                  :state="ime_prezimeState"
                  required
              ></b-form-input>
              <b-form-invalid-feedback v-if="!ime_prezimeState">
                Ime i Prezime is required.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Adresa" label-for="adresaInput" class="mb-3">
              <b-form-input
                  v-model="adresa"
                  id="adresaInput"
                  name="adresa"
                  type="text"
                  placeholder="Adresa"
                  :state="adresaState"
                  required
              ></b-form-input>
              <b-form-invalid-feedback v-if="!adresaState">
                Adresa is required.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Telefon" label-for="telefonInput" class="mb-3">
              <b-form-input
                  v-model="telefon"
                  id="telefonInput"
                  name="telefon"
                  type="text"
                  placeholder="Telefon"
                  :state="telefonState"
                  required
              ></b-form-input>
              <b-form-invalid-feedback v-if="!telefonState">
                Telefon is required.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" variant="success" class="mb-3">Pošalji</b-button>
          </b-form>
        </b-col>
        <b-col style="margin-left: 100px;">
          <b-list-group>
            <b-list-group-item v-for="item in cart" :key="item.id">
              {{ item.naziv }} x{{ item.komada }}
            </b-list-group-item>
            <b-list-group-item>
              <strong>Total Cena: {{ totalCena }} RSD</strong>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { BContainer, BRow, BCol, BTable, BButton, BListGroup, BListGroupItem, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BFormDatepicker } from 'bootstrap-vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "OrderView",
  components: {
    BContainer, BRow, BCol, BTable, BButton, BListGroup, BListGroupItem, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BFormDatepicker
  },
  data() {
    return {
      zakazano_vreme: '',
      ime_prezime: '',
      adresa: '',
      telefon: '',
      cart: [],
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'naziv', label: 'Naziv' },
        { key: 'opis', label: 'Opis' },
        { key: 'cena', label: 'Cena' }
      ]
    };
  },
  computed: {
    ...mapGetters(['getJela']),
    jela() {
      return this.getJela;
    },
    zakazano_vremeState() {
      return this.zakazano_vreme !== '';
    },
    ime_prezimeState() {
      return this.ime_prezime !== '';
    },
    adresaState() {
      return this.adresa !== '';
    },
    telefonState() {
      return this.telefon !== '' && /^\d{1,11}$/.test(this.telefon);
    },
    totalCena() {
      return this.cart.reduce((total, item) => total + (item.cena * item.komada), 0);
    }
  },
  mounted() {
    this.fetchJela();
  },
  methods: {
    ...mapActions(['fetchJela', 'submitNarudzbina']),
    addToCart(item) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.komada++;
      } else {
        this.cart.push({ ...item, komada: 1 });
      }
    },
    submitCart() {
      if (this.zakazano_vremeState && this.ime_prezimeState && this.adresaState && this.telefonState) {
        const narudzbina = {
          zakazano_vreme: this.zakazano_vreme,
          ime_prezime: this.ime_prezime,
          adresa: this.adresa,
          telefon: this.telefon,
          stavke: this.cart.map(item => ({
            jelo_id: item.id, komada: item.komada, jedinicna_cena: item.cena
          }))
        };
        this.submitNarudzbina(narudzbina);
        this.$router.push({ name: 'OrdersView' });
      }
    }
  }
};
</script>

<style>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>