<template>
  <div style="line-height: initial">
    <div>{{ params.data.title }}</div>
    <div v-if="params.data.preffered">{{ params.data.type == 'trx' ? 'По умолчанию для TRX сетей' : 'По умолчанию для ETH/BSC сетей' }}</div>
  </div>
</template>

<script>
export default {
  name: 'WalletContentCell',
};
</script>
