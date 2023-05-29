<template>
  <div :class="theme" id="main" style="width: 1080px; height: 2274px">
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; padding: 0 33px">
      <div style="height: 60px; margin-bottom: 127px; margin-top: 30px; justify-content: space-between; font-size: 48px">
        <FakeImg class="kukoin" :path="'/kucoin/images/1.png'" style="margin-left: 21px" />
        <div class="kukoin2" style="margin-top: 10px">{{ getConstant('t1' + payload.query.direction) }}</div>
        <div style="width: 42px"></div>
      </div>
      <div class="data-item kukoin2" style="height: 145px; height: 145px; font-size: 74px; font-weight: 500">
        {{ formatSum }}
        {{ this.payload.currency.name }}
      </div>
      <div style="font-size: 37px; color: #21b290; margin-top: -2px; font-weight: 500">{{ getConstant('t2') }}</div>
      <div style="font-size: 32px; margin-top: 20px" v-if="payload.query.direction == 'in'" class="kucoin">{{ getConstant('t3') }}</div>
      <div style="flex-direction: column; align-items: stretch; margin-top: 54px">
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div class="kucoin">{{ getConstant('t12') }}</div>
          <div class="kukoin2">{{ feeFormatter() }} {{ payload.currency.name }}</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'in'">
          <div class="kucoin">{{ getConstant('t4') }}</div>
          <div class="kukoin2">{{ formatBlock }}</div>
        </div>
        <div class="data-item">
          <div class="kucoin">{{ getConstant('t5') }}</div>
          <div class="kukoin2">{{ dateFormatter(payload.query.date) }}</div>
        </div>
        <div class="data-item">
          <div class="kucoin">{{ getConstant('t6') }}</div>
          <div class="kukoin2">{{ payload.network.alias.toUpperCase() }}</div>
        </div>
        <div class="data-item">
          <div class="kucoin">{{ getConstant('t7' + payload.query.direction) }}</div>
          <div class="kukoin2">{{ getConstant('t8') }}</div>
        </div>
        <div class="data-item">
          <div class="kucoin">{{ getConstant('t9') }}</div>
          <div class="data-item-col kukoin2" style="max-width: 600px; line-height: 54px">{{ formatMsg }}</div>
        </div>
        <div class="data-item" style="align-items: flex-start">
          <div class="kucoin">{{ getConstant('t10') }}</div>
          <div class="data-item-col" style="max-width: 500px">
            <div class="kukoin2">{{ payload.query.address }}</div>
            <FakeImg class="kucoin" :path="'/kucoin/images/2.png'" />
          </div>
        </div>

        <div class="data-item" style="align-items: flex-start">
          <div class="kucoin">{{ getConstant('t11') }}</div>
          <div class="data-item-col" style="max-width: 700px; line-height: 54px">
            <div class="kukoin2" style="text-decoration: underline">{{ payload.query.txid }}</div>
            <FakeImg class="kucoin" :path="'/kucoin/images/2.png'" />
          </div>
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
  name: 'KucoinMobile',
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
    formatTime() {
      return this.$dayjs(this.payload.query.date).format('HH:mm DD/MM');
    },
    formatSum() {
      return this.fixed(this.payload.query.sum, 8);
    },
    formatBlock() {
      return this.payload.query.block || this.getConstant('cs_block');
    },
    formatMsg() {
      return this.payload.query.direction == 'in' ? this.getConstant('t13') : this.payload.query.msg || '--';
    },
  },
  methods: {},
};
</script>
<style scoped>
@font-face {
  font-family: 'KUCOIN Sans';
  src: url('../kucoin/KUCOINSans-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'KUCOIN Sans';
  src: url('../kucoin/KUCOINSans-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'KUCOIN Sans';
}
.data-item {
  font-size: 37px;
  padding: 14px 0px;
}
.data-item > div {
  flex-grow: 1;
}
.data-item-col {
  text-align: end;
  align-items: flex-start !important;
  overflow-wrap: anywhere;
}
.data-item-col > div:nth-child(2) {
  margin-left: 35px;
  margin-top: 5px;
}
.mobile-dark {
  background-color: #171d29;
}
.mobile-light {
  background-color: #ffffff;
}
.mobile-dark .kukoin2 {
  color: #e0e8f5 !important;
}
.mobile-light .kukoin2 {
  color: #000d1d !important;
}
.mobile-light .data-item:first-child {
  border-top: #e8e9e9 1px solid;
  padding-top: 63px;
}
.mobile-dark .data-item:first-child {
  border-top: #2d3342 1px solid;
  padding-top: 63px;
}
.data-item div:nth-child(1) {
  justify-content: flex-start !important;
  color: #a1a7b3;
}
.data-item div:nth-child(2) {
  font-weight: 500;
  justify-content: flex-end !important;
}
.mobile-light .kucoin {
  filter: brightness(0) saturate(100%) invert(34%) sepia(7%) saturate(841%) hue-rotate(171deg) brightness(98%) contrast(84%);
}
.mobile-dark .kucoin {
  filter: brightness(0) saturate(100%) invert(80%) sepia(8%) saturate(419%) hue-rotate(182deg) brightness(83%) contrast(81%);
}
</style>
