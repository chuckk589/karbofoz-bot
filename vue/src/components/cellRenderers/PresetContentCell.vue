<template>
  <div style="line-height: initial">
    <div>{{ params.data.title }}</div>
    <div :style="wrapStyle" v-html="presetFieldData(params.data)"></div>
  </div>
</template>

<script>
export default {
  name: 'PresetContentCell',
  data() {
    return {};
  },
  methods: {
    presetFieldData(field) {
      const exchange = this.params.context.table.exchanges?.find((item) => item.value == field.exchange);
      const theme = exchange.themes.find((item) => item.value == field.theme);
      const language = theme.languages.find((item) => item.value == field.language);
      const network = exchange.networks.find((item) => item.value == field.network);
      const currency = network.currencies.find((item) => item.value == field.currency);
      const direction = field.direction == 'in' ? 'Прием' : 'Отправка';
      return `${exchange.title}\n${theme.title}\n${language.title}\n${network.title}/${currency.title}\n${direction}`;
    },
  },
  computed: {
    wrapStyle() {
      return this.$vuetify.display.mobile ? 'white-space:pre' : '';
    },
  },
};
</script>
