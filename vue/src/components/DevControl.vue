<template>
  <div style="min-width: 500px">
    <v-text-field v-for="(value, key) in payload.query" :label="key" v-model="form[key]" :key="value"> </v-text-field>
    <v-text-field label="currency" v-model="form.currency"> </v-text-field>
    <v-text-field label="network" v-model="form.network"> </v-text-field>

    <v-btn @click="reload">Update</v-btn>
  </div>
</template>

<script>
export default {
  name: 'DevControl',
  props: {
    payload: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {},
    };
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.payload.query));
    this.form.currency = this.payload.currency.alias;
    this.form.network = this.payload.network.alias;
  },
  methods: {
    reload() {
      this.$emit('update:query', this.form);
    },
  },
};
</script>
