<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; padding: 0px 65px">
      <div style="height: 115px"></div>
      <div style="height: 96px; margin-bottom: 116px; justify-content: space-between; font-size: 44px; font-weight: 600">
        <FakeImg :path="'/okx/images/1.png'" />
        <div>{{ getConstant('t1') }}</div>
        <div style="width: 46px"></div>
      </div>
      <div style="height: 43px; margin-bottom: 83px; font-size: 38px">{{ payload.currency.name }} {{ getConstant('t2' + payload.query.direction) }}</div>
      <div style="height: 123px; margin-bottom: 65px; justify-content: flex-start">
        <FakeImg style="transform: scale(0.65); margin-bottom: 29px; margin-left: -16px" :path="'/safepal/images/coins/' + payload.currency.alias + '.png'" />
        <div style="flex-direction: column; font-size: 41px; margin-left: 16px; align-items: flex-start; width: 100%">
          <div style="width: 100%">
            <div>{{ payload.currency.name }}</div>
            <div>{{ sumFormatter }}</div>
          </div>
          <div>Tether</div>
        </div>
      </div>
      <div style="flex-direction: column; align-items: stretch; border-top: 3px solid rgb(225, 226, 227); padding-top: 30px">
        <div class="data-item">
          <div>{{ getConstant('t3') }}</div>
          <div>{{ getConstant('t4') }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t5') }}</div>
          <div style="flex-direction: column; align-items: flex-end">
            <div>{{ formatDate }}</div>
            <span>{{ formatTime }}</span>
          </div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'in'">
          <div>{{ getConstant('t6') }}</div>
          <div>{{ getConstant('t11') }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t7') }}</div>
          <div style="text-align: end; overflow-wrap: anywhere; max-width: 630px">{{ payload.query.address }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t8') }}</div>
          <div>{{ payload.network.alias.toUpperCase() }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t9') }}</div>
          <div style="text-align: end; overflow-wrap: anywhere; max-width: 630px">{{ payload.query.txid }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
export default {
  name: 'OkxMobile',
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
  computed: {
    formatDate() {
      return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('ll');
    },
    formatTime() {
      return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('HH:mm');
    },
    sumFormatter() {
      return this.fixed(this.payload.query.sum - this.getConstant('cs_com'), 2) + ' ' + this.payload.currency.name;
    },
  },
  methods: {},
};
</script>
.sumFormatter
<style scoped>
@font-face {
  font-family: 'font';
  src: url('../okx/okx.ttf');
}
#main {
  font-family: 'font';
}
.data-item {
  font-size: 35px;
  padding: 25px 0px;
}
.data-item > div {
  flex-grow: 1;
}

.data-item div:nth-child(1) {
  justify-content: flex-start !important;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
}
/*colors*/
</style>
