<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; padding: 0px 39px">
      <div style="height: 120px; margin-bottom: 78px; justify-content: space-between">
        <FakeImg :path="'/ledger/images/1.png'" />
        <div style="font-weight: 600; flex-direction: column">
          <div class="gray" style="font-size: 35px; line-height: 59px">{{ getConstant('t1') }}</div>
          <div class="text" style="font-size: 37px; line-height: 42px">{{ getConstant('t2' + payload.query.direction) }}</div>
        </div>
        <div style="width: 41px"></div>
      </div>
      <div style="height: 149px; margin-bottom: 59px">
        <div class="header-box" style="width: 150px; height: 150px; border: 3px solid; border-radius: 25px">
          <FakeImg class="ledger" :path="'/ledger/images/2.png'" :style="payload.query.direction == 'in' ? '' : 'transform: rotate(180deg);'" />
        </div>
      </div>
      <div :class="sumClass" style="height: 45px; font-size: 53px; font-weight: 600; margin-bottom: 40px">{{ sumFormatter }} {{ this.payload.network.alias == 'bep20' ? formatPair : this.payload.currency.name }}</div>
      <div class="header" style="height: 45px; margin-bottom: 58px">
        <div style="font-size: 38px; margin-right: 21px">{{ formatSum2 }}</div>
        <FakeImg :path="'/ledger/images/3.png'" />
      </div>
      <div style="height: 45px; margin-bottom: 113px">
        <FakeImg :path="'/ledger/images/4.png'" />
        <div style="color: #68bf55; font-size: 39px; letter-spacing: 2px; margin-left: 20px; font-weight: 600">{{ getConstant('t3') }} {{ formatHeight }}</div>
      </div>
      <div style="flex-direction: column; align-items: stretch; letter-spacing: 1px">
        <div class="data-item">
          <div>{{ getConstant('t4') }}</div>
          <div>{{ getConstant('cs_acc') }} {{ this.payload.network.alias == 'bep20' ? formatPair : this.payload.currency.name }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t5') }}</div>
          <div>{{ formatDate }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t6') }}</div>
          <div style="letter-spacing: 2px">
            {{ formatCom }}&nbsp;&nbsp;≈&nbsp;&nbsp;<span class="gray">{{ formatApprox }}</span>
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t9') }}</div>
          <div style="line-height: 45px; overflow-wrap: anywhere">{{ payload.query.txid }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t8') }}</div>
          <div style="line-height: 45px; overflow-wrap: anywhere">{{ payload.query.address }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t7') }}</div>
          <div style="line-height: 45px; overflow-wrap: anywhere"></div>
        </div>
      </div>
      <div class="text" style="border: 3px solid; border-radius: 70px; padding: 30px 0; font-size: 39px">
        {{ getConstant('t10') }}
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
export default {
  name: 'LedgerMobile',
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
      return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('l');
    },
    sumFormatter() {
      return `${this.payload.query.direction == 'in' ? '+' : '-'}${this.fixed(this.payload.query.sum, 8, true)} `;
    },
    formatPair() {
      return this.payload.network.name + '-' + this.payload.currency.name.substr(0, 3);
    },
    formatCom() {
      const coinfee = this.feeFormatter('cs_com' + this.payload.query.direction);
      return `${coinfee} ${this.payload.network.coin}`;
    },
    formatApprox() {
      const coinfee = this.feeFormatter('cs_com' + this.payload.query.direction);
      return `$${(coinfee * this.payload.network.course).toFixed(3)}`;
    },
    formatSum2() {
      const sum = this.payload.query.eqv || this.formatSum(0.1, 0.5);
      return `${this.payload.query.direction == 'in' ? '+' : '-'}${this.fixed(sum, 2, true, { style: 'currency', currency: 'USD' })}`;
    },
    formatHeight() {
      return `(${this.formatConf()})`;
    },
    sumClass() {
      return this.payload.query.direction == 'in' ? 'sum' : 'header';
    },
  },
  methods: {},
};
</script>
<style scoped>
@font-face {
  font-family: 'Inter';
  src: url('../ledger/Inter-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('../ledger/Inter-ExtraBold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('../ledger/Inter-Black.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('../ledger/Inter-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('../ledger/Inter-Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('../ledger/Inter-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('../ledger/Inter-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('../ledger/Inter-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('../ledger/Inter-ExtraLight.ttf') format('truetype');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'Inter';
}
.data-item {
  font-size: 36px;
  flex-direction: column;
  align-items: self-start !important;
  margin-bottom: 82px;
}
.data-item > div {
  flex-grow: 1;
}
.sum {
  color: #68bf55;
}
.data-item > div:nth-child(1) {
  justify-content: flex-start !important;
  color: #aaaaaa;
  margin-bottom: 23px;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
  font-weight: 600;
  font-size: 34px;
}
/*colors*/
.mobile-dark {
  background-color: #121214;
}
.mobile-light {
  background-color: #ffffff;
}
.gray {
  color: #aaaaaa;
}
.mobile-dark .header {
  color: #aaaaaa;
}
.mobile-light .header {
  color: #666666;
}
.mobile-dark .text,
.mobile-dark .data-item div:nth-child(2) {
  color: white;
}
.mobile-light .text,
.mobile-light .data-item div:nth-child(2) {
  color: black;
}
.mobile-dark .ledger {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}

.mobile-light .ledger {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
}
.mobile-dark .header-box {
  color: #3a3a3b;
}
.mobile-light .header-box {
  color: #e8e8e8;
}
</style>
