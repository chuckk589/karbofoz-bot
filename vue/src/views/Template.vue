<template>
  <Page></Page>
</template>

<script>
import Page from './Page.vue';
export default {
  name: 'TemplateView',
  components: {
    Page,
  },
  data() {
    return {
      img: '',
    };
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/theme/${this.$route.query.theme}?exchange=${this.$route.query.exchange}` }).then((e) => {
      this.img = e.data.imgPath;
      console.log(e.data);
      const { exchange, theme, ...queryParams } = this.$route.query;
      e.data.inputs.forEach((input) => {
        const text = document.createElement('p');
        text.style = `position: absolute; color:white; ${input.style}`;
        text.innerText = queryParams[input.alias] || input.default;
        document.body.appendChild(text);
      });
    });
  },
  methods: {},
};
</script>
