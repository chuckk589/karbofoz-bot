<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="flex-direction: column; align-items: stretch; margin: 0px 50px">
      <div style="justify-content: flex-start; padding: 14px 0 0 11px">
        <FakeImg style="margin-right: 20px" :path="'/cexio/images/' + (payload.query.direction == 'out' ? '1.png' : '2.png')" />
        <div style="flex-direction: column; align-items: flex-start; width: 100%">
          <div style="font-size: 40px; width: 100%; justify-content: space-between">
            <div style="letter-spacing: 3px; font-weight: 600">{{ getConstant('t1' + payload.query.direction) }}</div>
            <div>{{ fixed(payload.query.sum, 6, true) }}</div>
          </div>
          <div style="width: 100%; justify-content: space-between; font-size: 30px; color: #7f93ab">
            <div>{{ getConstant('t2') }}</div>
            <div>{{ $dayjs(payload.query.date).format('DD MMM YY HH:mm:ss') }}</div>
          </div>
        </div>
      </div>
      <div class="data-item">
        <div>{{ getConstant('t3') }}</div>
        <div>{{ fixed(payload.query.balance, 6) }}</div>
      </div>
      <div class="data-item" style="align-items: flex-start">
        <div>{{ getConstant('t4') }}</div>
        <div style="overflow-wrap: anywhere; text-align: end; text-decoration: underline; max-width: 75%; line-height: 40px">{{ payload.query.txid }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
export default {
  name: 'CexioMobile',
  mixins: [themeMixin],
  components: {
    StatusBar,
    FakeImg,
  },
  data() {
    return {
      theme: '',
    };
  },
  mounted() {},
  computed: {},
};
</script>
<style scoped>
#main {
  font-family: 'Open Sans', sans-serif;
}
.data-item {
  font-size: 30px;
  padding: 12px 0;
  margin-bottom: 10px;
}

.data-item > div {
  flex-grow: 1;
}
.data-item > div:nth-child(1) {
  justify-content: flex-start !important;
}

.data-item > div:nth-child(2) {
  justify-content: flex-end !important;
}
.mobile-dark {
  background-color: #10141f;
}
</style>
