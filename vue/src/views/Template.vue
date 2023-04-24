<template>
  <component :is="theme" :payload="payload" v-if="loaded"></component>
</template>

<script>
import { BinanceMobile } from '../themes';
export default {
  name: 'TemplateView',
  components: {
    BinanceMobile,
  },
  data() {
    return {
      theme: 'BinanceMobile',
      payload: {},
      loaded: false,
    };
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/theme/${this.$route.query.theme}?language=${this.$route.query.language}` }).then((e) => {
      this.theme = e.data.path
        .replace(/-.*/, '')
        .split('/')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join('');
      this.payload = e.data;
      this.payload.query = this.$route.query;
      console.log(this.payload);
      this.loaded = true;
    });
  },
  methods: {},
};
</script>
