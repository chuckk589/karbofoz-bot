<template>
  <div :class="theme" id="main" style="margin-top: 96px; width: 1080px; height: 2274px">
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; margin: 0 42px">
      <div class="gate" style="height: 113px; margin-bottom: 54px; justify-content: space-between">
        <FakeImg :path="'/gate/images/1.png'" style="margin-left: 16px" />
        <div style="font-size: 45px; font-weight: 600">{{ getConstant('t1' + payload.query.direction) }}</div>
        <FakeImg :path="'/gate/images/2.png'" />
      </div>
      <div style="height: 55px; margin-bottom: 35px; font-size: 40px" class="gray3">{{ getConstant('t2') }}</div>
      <div style="height: 89px; margin-bottom: 42px">
        <div class="gate" style="font-size: 92px">{{ formatSum }}</div>
        <div class="gray1" style="align-self: end; font-size: 37px; line-height: 44px; margin-left: 25px">
          {{ this.payload.currency.name }}
        </div>
      </div>
      <div style="height: 55px; margin-bottom: 105px; font-size: 40px; color: #11ae79">
        <FakeImg :path="'/gate/images/3.png'" style="margin-right: 20px" />
        <div>{{ getConstant('t3') }}</div>
      </div>
      <div style="flex-direction: column; align-items: stretch; font-size: 40px; padding: 42px 42px; border-radius: 20px">
        <div class="data-item">
          <div>{{ getConstant('t4' + payload.query.direction) }}</div>
          <div>{{ getConstant('t5' + payload.query.direction) }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t6') }}</div>
          <div>{{ dateFormatter(payload.query.date) }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t7') }}</div>
          <div>{{ payload.query.direction == 'in' ? '-' : payload.network.name }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t8') }}</div>
          <div>{{ formatOrder }}</div>
          <FakeImg class="gray2" :path="'/gate/images/4.png'" />
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t11') }}</div>
          <div>{{ getConstant('cs_com') }} {{ payload.currency.name }}</div>
        </div>
        <div class="data-item" style="flex-wrap: wrap">
          <div style="margin-bottom: 32px">{{ getConstant('t9' + payload.query.direction) }}</div>
          <div>
            <div style="line-height: 52px; max-width: 93%">{{ payload.query.direction == 'in' ? '-' : formatLength(payload.query.address) }}</div>
            <FakeImg class="gray2" v-if="payload.query.direction == 'out'" :path="'/gate/images/4.png'" style="margin-left: auto" />
          </div>
        </div>
        <div class="data-item" style="flex-wrap: wrap">
          <div style="min-width: 100%; margin-bottom: 32px">{{ getConstant('t10') }}</div>
          <div style="overflow-wrap: anywhere">
            <div style="line-height: 52px; max-width: 93%">{{ payload.query.txid }}</div>
            <FakeImg class="gray2" :path="'/gate/images/4.png'" style="margin-left: auto" />
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
  name: 'GateMobile',
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
    formatSum() {
      return `${this.payload.direction == 'in' ? '+' : '-'}${this.fixed(this.payload.query.sum, 6)} `;
    },
    formatOrder() {
      if (this.payload.query.order) {
        return this.payload.query.order;
      }
      return this.formatConf('cs_step' + this.payload.query.direction);
      // const iterations = Math.round(this.$dayjs().diff(this.$dayjs(this.payload.query.date), 'minute') / 5);
      // return this.payload.query.order || this.payload.query.direction == 'in' ? 140861850 + iterations : 34264669 + iterations;
    },
  },
  methods: {
    formatLength(value) {
      return value.substr(0, 35) + '...';
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: 'Gate Product Sans';
  src: url('../gate/GateProductSans-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Gate Product Sans';
  src: url('../gate/GateProductSans-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'Gate Product Sans';
}
.data-item {
  margin-bottom: 41px;
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
.data-item div:nth-child(3) {
  flex-grow: 0 !important;
  margin-left: 20px;
}
.mobile-dark {
  background-color: #151925;
}
.mobile-dark > div > div:last-child {
  background-color: #1e2432;
}
.mobile-light {
  background-color: white;
}
.mobile-light > div > div:last-child {
  background-color: #f9fafe;
}
.mobile-dark .gate,
.mobile-dark .data-item div:nth-child(2):not(:has(img)),
.mobile-dark .data-item div > div:first-child {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}

.mobile-light .gate,
.mobile-light .data-item div:nth-child(2):not(:has(img)),
.mobile-light .data-item div > div:first-child {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
}
.mobile-dark .gray2 {
  filter: brightness(0) saturate(100%) invert(38%) sepia(21%) saturate(396%) hue-rotate(184deg) brightness(101%) contrast(92%);
}
.mobile-light .gray2 {
  filter: brightness(0) saturate(100%) invert(38%) sepia(21%) saturate(396%) hue-rotate(184deg) brightness(101%) contrast(92%);
}
.mobile-light .data-item > div:nth-child(1) {
  color: #8e92a3;
}
.mobile-dark .data-item > div:nth-child(1) {
  color: #5f6880;
}
.mobile-dark .gray1 {
  color: #989fb0;
}
.mobile-light .gray1 {
  color: #585d6d;
}

.mobile-dark .gray3 {
  color: #494e63;
}
.mobile-light .gray3 {
  color: #b8bec6;
}
</style>
