<template>
  <div :class="theme" id="main" style="width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; padding: 0px 65px">
      <div style="height: 96px; margin-bottom: 112px; justify-content: space-between; font-size: 42px; font-weight: 600">
        <FakeImg style="margin-left: -13px; width: 60px" class="okx" :path="'/okx/images/1.png'" />
        <div class="black">{{ getConstant('t1') }}</div>
        <div style="width: 46px"></div>
      </div>
      <div class="gray" style="height: 43px; margin-bottom: 87px; font-size: 37px; font-weight: 500">{{ payload.currency.name }} {{ getConstant('t2' + payload.query.direction) }}</div>
      <div style="height: 123px; margin-bottom: 8px; justify-content: flex-start">
        <FakeImg style="transform: scale(0.65); margin-bottom: 35px; margin-left: -16px" :path="'/safepal/images/coins/' + payload.currency.alias + '.png'" />
        <div style="flex-direction: column; font-size: 41px; margin-left: 14px; align-items: flex-start; width: 100%">
          <div class="black" style="width: 100%; margin-bottom: 6px">
            <div style="margin-right: auto; font-weight: 500">{{ payload.currency.name }}</div>
            <div class="sum-green" style="font-size: 42px; font-weight: 600">{{ sumFormatter }} {{ payload.currency.name }}</div>
          </div>
          <div class="gray" style="font-size: 37px">Tether</div>
        </div>
      </div>
      <div class="data-item" v-if="payload.query.direction == 'out'" style="padding-bottom: 0">
        <div>{{ getConstant('t10') }}</div>
        <div style="font-size: 42px">{{ formatCom }} {{ payload.currency.name }}</div>
      </div>
      <div class="block" style="flex-direction: column; align-items: stretch; border-top: 3px solid; padding-top: 30px; margin-top: 60px">
        <div class="data-item">
          <div style="margin-top: 6px">{{ getConstant('t3') }}</div>
          <div>
            <div style="padding: 4px 41px; border-radius: 39px; background-color: rgb(74, 153, 46); font-weight: 400; color: white">{{ getConstant('t4') }}</div>
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t5') }}</div>
          <div style="flex-direction: column; align-items: flex-end">
            <div>{{ formatDate }}</div>
            <span class="gray" style="margin-top: 5px">{{ formatTime }}</span>
          </div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'in'">
          <div>{{ getConstant('t6') }}</div>
          <div>{{ getConstant('t11') }}</div>
        </div>
        <div class="data-item" style="padding-top: 7px">
          <div>{{ getConstant('t7') }}</div>
          <div style="text-align: end; overflow-wrap: anywhere; max-width: 630px">{{ payload.query.address }}</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'in'">
          <div>{{ getConstant('t8') }}</div>
          <div>{{ payload.network.alias.toUpperCase() }}</div>
        </div>
        <div class="data-item" style="padding-top: 7px">
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
      return this.$dayjs(this.payload.query.date)
        .locale(this.payload.query.language)
        .format(this.payload.query.language == 'es' ? 'DD MMM YYYY' : 'll');
    },
    formatTime() {
      return this.$dayjs(this.payload.query.date)
        .locale(this.payload.query.language)
        .format(this.payload.query.language == 'es' ? 'h:mm' : 'HH:mm');
    },
    sumFormatter() {
      return `${this.payload.query.direction == 'in' ? '+' : '-'} ${this.fixed(this.payload.query.sum, 7, true)} `;
    },
    formatCom() {
      return `${this.payload.network.alias == 'trc20' ? '-' : ''}${this.feeFormatter()}`;
    },
  },
  methods: {},
};
</script>
.sumFormatter
<style scoped>
@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../okx/HarmonyOS_Sans.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../okx/HarmonyOS_Sans_Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../okx/HarmonyOS_Sans_Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../okx/HarmonyOS_Sans_Black.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../okx/HarmonyOS_Sans_Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../okx/HarmonyOS_Sans_Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'HarmonyOS Sans';
}
.data-item {
  font-size: 37px;
  font-weight: 500;
  padding: 30px 0px;
  align-items: self-start !important;
}
.data-item > div {
  flex-grow: 1;
}

.data-item > div:nth-child(1) {
  justify-content: flex-start !important;
  color: #b3b3b3;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
  font-weight: 500;
}
/*colors*/
.mobile-dark .gray,
.mobile-dark .data-item > div:nth-child(1) {
  color: #b3b3b3;
}

.mobile-light .gray,
.mobile-light .data-item > div:nth-child(1) {
  color: #666666;
}
.mobile-dark .black,
.mobile-dark .data-item > div:nth-child(2) {
  color: #f2f2f2;
}

.mobile-light .black,
.mobile-light .data-item > div:nth-child(2) {
  color: #000000;
}
.mobile-dark {
  background-color: #000000;
}
.mobile-light {
  background-color: #ffffff;
}
.mobile-dark .okx {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}

.mobile-light .okx {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
}
.mobile-dark .sum-green {
  color: #7ff05a;
}
.mobile-light .sum-green {
  color: #6dae4a;
}
.mobile-dark .block {
  color: #333333;
}
.mobile-light .block {
  color: #e6e6e6;
}
</style>
