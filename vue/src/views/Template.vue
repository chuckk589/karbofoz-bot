<template>
  <component :is="theme" :payload="payload" v-if="loaded"></component>
</template>

<script>
import * as themes from '../themes';
export default {
  name: 'TemplateView',
  components: {
    ...themes,
  },
  data() {
    return {
      theme: 'BinanceMobile',
      payload: {},
      loaded: false,
    };
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/theme/${this.$route.query.theme}?language=${this.$route.query.language}&currency=${this.$route.query.currency}&network=${this.$route.query.network}` }).then((e) => {
      this.theme = e.data.path
        .replace(/-.*/, '')
        .split('/')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join('');
      console.log(this.theme);
      this.payload = e.data;
      const { currency, network, ...rest } = this.$route.query;
      this.payload.query = rest;
      console.log(this.payload);
      this.loaded = true;
    });
  },
  methods: {},
};
</script>
