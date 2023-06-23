<template>
  <div style="line-height: initial">
    <div>{{ params.data.title }}</div>
    <div>{{ presetFieldData(params.data) }}</div>
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
      return `${exchange.title} / ${theme.title} / ${language.title} / ${network.title} / ${currency.title} / ${direction} ${field.comment || ''}`;
    },
  },
};
</script>
