<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar">
      <div style="justify-content: space-between; border-width: 2px; padding: 27px 48px 35px; font-size: 43px; margin-bottom: 25px">
        <FakeImg class="bitget" :path="'/bitget/images/1.png'" />
        <div class="text">{{ getConstant('t1') }}</div>
        <div style="width: 24px"></div>
      </div>
      <div style="flex-direction: column; align-items: stretch; padding: 0px 37px">
        <div style="margin-bottom: -9px; justify-content: flex-start">
          <FakeImg :path="'safepal/images/coins/' + payload.currency.name.toLowerCase() + '.png'" style="margin-right: -17px; margin-left: -25px; transform: scale(0.5)" />
          <div style="font-size: 40px" class="text">{{ payload.currency.name }}</div>
        </div>
        <div class="text" style="font-size: 57px; margin-bottom: 21px; justify-content: flex-start; margin-left: 7px">{{ sumFormatter }}&nbsp;&nbsp;{{ payload.currency.name }}</div>
        <div style="flex-direction: column; align-items: stretch">
          <div class="data-item">
            <div>{{ getConstant('t2') }}</div>
            <div>{{ getConstant('t3' + payload.query.direction) }}</div>
          </div>
          <div class="data-item">
            <div>{{ getConstant('t4') }}</div>
            <div>{{ formatCom }} {{ payload.currency.name }}</div>
          </div>
          <div class="data-item">
            <div>{{ getConstant('t5') }}</div>
            <div>{{ fixed(payload.query.balance, 8, false, { minimumFractionDigits: 8 }) }} {{ payload.currency.name }}</div>
          </div>
          <div class="data-item">
            <div>{{ getConstant('t6') }}</div>
            <div>{{ dateFormatter(payload.query.date) }}</div>
          </div>
        </div>
      </div>
      <div class="block" style="height: 100%"></div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
export default {
  name: 'BitgetMobile',
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
  computed: {
    sumFormatter() {
      return `${this.payload.query.direction == 'in' ? '+' : '-'} ${this.fixed(this.payload.query.sum, 8, false, { minimumFractionDigits: 8 })}`;
    },
    formatCom() {
      if (this.payload.query.direction == 'in') {
        return '0.00000000';
      } else if (this.payload.query.com) {
        return `-${this.fixed(this.payload.query.com, 8, false, { minimumFractionDigits: 8 })}`;
      } else {
        return `-${this.fixed(this.feeFormatter('cs_comout'), 8, false, { minimumFractionDigits: 8 })}`;
      }
    },
  },
  methods: {},
};
</script>
.sumFormatter
<style scoped>
@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../bitget/HarmonyOS_Sans.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../bitget/HarmonyOS_Sans_Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../bitget/HarmonyOS_Sans_Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../bitget/HarmonyOS_Sans_Black.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../bitget/HarmonyOS_Sans_Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'HarmonyOS Sans';
  src: url('../bitget/HarmonyOS_Sans_Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'HarmonyOS Sans';
}
.data-item {
  font-size: 35px;
  padding: 40px 0;
  margin-bottom: 25px;
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

/*colors*/

.mobile-light .bitget {
  filter: brightness(0) saturate(100%) invert(14%) sepia(6%) saturate(146%) hue-rotate(131deg) brightness(103%) contrast(84%);
}
.mobile-dark .bitget {
  filter: brightness(0) saturate(100%) invert(91%) sepia(15%) saturate(192%) hue-rotate(181deg) brightness(97%) contrast(91%);
}
.mobile-light .text,
.mobile-light .data-item > div:nth-child(1) {
  color: black;
}
.mobile-dark .text,
.mobile-dark .data-item > div:nth-child(1) {
  color: white;
}
.mobile-light .data-item > div:nth-child(2) {
  color: #252726;
}
.mobile-dark .data-item > div:nth-child(2) {
  color: #b9bcbd;
}
.mobile-dark .data-item:not(:last-child),
.mobile-dark #wobar > div:nth-child(1) {
  border-bottom: 1px solid #303030;
}
.mobile-light .data-item:not(:last-child),
.mobile-light #wobar > div:nth-child(1) {
  border-bottom: 1px solid #eaebeb;
}
.mobile-light .block {
  background-color: #f6fafb;
}
.mobile-dark .block {
  background-color: black;
}
.mobile-dark {
  background-color: #111111;
}
.mobile-light {
  background-color: white;
}
</style>
