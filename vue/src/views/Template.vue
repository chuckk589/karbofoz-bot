<template>
  <div style="display: flex">
    <component :is="theme" :payload="payload" v-if="loaded"></component>
    <!-- <DevControl :payload="payload" v-if="loaded" @update:query="reload"></DevControl> -->
  </div>
</template>

<script>
import * as themes from '../themes';
// import DevControl from '@/components/DevControl.vue';
export default {
  name: 'TemplateView',
  components: {
    ...themes,
    // DevControl,
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
      this.payload = e.data;
      const { currency, network, ...rest } = this.$route.query;
      this.payload.query = rest;
      console.log(this.payload);
      this.loaded = true;
    });
  },
  methods: {
    reload(query) {
      this.loaded = false;
      this.$http({ method: 'GET', url: `/v1/theme/${query.theme}?language=${query.language}&currency=${query.currency}&network=${query.network}` }).then((e) => {
        this.theme = e.data.path
          .replace(/-.*/, '')
          .split('/')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join('');
        this.payload = e.data;
        const { currency, network, ...rest } = query;
        this.payload.query = rest;
        console.log(this.payload);
        this.loaded = true;
      });
    },
  },
};
</script>
