<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="flex-direction: column; align-items: stretch">
      <div style="margin-bottom: 103px; font-size: 49px; padding: 11px 48px; justify-content: space-between">
        <FakeImg class="coinbase" :path="'/coinbase/images/1.png'" />
        <div class="text1" style="font-weight: 500">{{ getConstant('t1' + payload.query.direction) }}</div>
        <div style="width: 36px"></div>
      </div>
      <div style="font-size: 50px" class="text2">{{ formatRawSum }} {{ payload.currency.name }}</div>
      <div style="font-size: 82px; padding-bottom: 96px; line-height: 75px" class="text1">{{ formatApproxSum }}</div>
      <div style="flex-direction: column; align-items: stretch; padding: 44px 64px 0px; border-bottom: 3px solid; border-top: 3px solid">
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div style="align-self: flex-start">{{ getConstant('t2') }}</div>
          <div style="overflow-wrap: anywhere; text-align: end; max-width: 670px; line-height: 65px">{{ payload.query.address }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t3') }}</div>
          <div>$1.00</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t4') }}</div>
          <div>
            <FakeImg style="margin-right: 20px" :path="'/coinbase/images/2.png'" />
            <div>{{ getConstant('t5') }}</div>
          </div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t6') }}</div>
          <div>{{ feeFormatter() }} {{ payload.currency.name }}</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t7') }}</div>
          <div>{{ formatConf() }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t8') }}</div>
          <div>{{ lengthFormatter(payload.query.txid, 12) }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t9') }}</div>
          <div>{{ formatDate }}</div>
        </div>
      </div>
      <div style="font-size: 49px; padding: 71px 65px; justify-content: space-between" class="text1">
        <div style="margin-left: 140px">
          <div style="position: relative">
            <FakeImg class="coinbase2" :style="'position: absolute; left: -109px; transform: scale(0.7) ' + (payload.query.direction == 'in' ? 'rotate(270deg);' : 'rotate(90deg);')" :path="'/coinbase/images/1.png'" />
            <FakeImg style="position: absolute; left: -81px; bottom: -54px" :path="'/coinbase/images/2.png'" />
          </div>
          <div>
            {{ getConstant('t10') }}
          </div>
        </div>
        <div>{{ getConstant('t11') }}</div>
      </div>
      <div style="padding: 36px 0px; font-size: 52px; margin: 0 60px; font-weight: 500; border-radius: 99px" class="text1 block">{{ getConstant('t12') }}</div>
      <div class="footer" style="padding: 22px 24px; margin-top: auto; font-size: 30px; border-top: 2px solid; justify-content: space-around">
        <div>
          <FakeImg :path="'/coinbase/images/4.png'" />
          <div style="color: #0151fe">{{ getConstant('t13') }}</div>
        </div>
        <div>
          <FakeImg class="coinbase" :path="'/coinbase/images/5.png'" />
          <div>{{ getConstant('t14') }}</div>
        </div>
        <div>
          <FakeImg class="coinbase" :path="'/coinbase/images/6.png'" />
          <div>{{ getConstant('t15') }}</div>
        </div>
        <div>
          <FakeImg class="coinbase" :path="'/coinbase/images/7.png'" />
          <div>{{ getConstant('t16') }}</div>
        </div>
        <div>
          <FakeImg class="coinbase" :path="'/coinbase/images/8.png'" />
          <div>{{ getConstant('t17') }}</div>
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
  name: 'CoinbaseMobile.',
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
    formatRawSum() {
      const sum = this.fixed(this.payload.query.sum, 8, true, this.payload.query.language == 'en' ? {} : { useGrouping: false });
      return `${this.payload.query.direction == 'in' ? '' : '-'}${sum}`;
    },
    formatApproxSum() {
      const options = {
        style: 'currency',
        currency: 'USD',
        localeMatcher: 'lookup',
        minimumFractionDigits: 2,
        ...(this.payload.query.language == 'en' ? {} : { useGrouping: false }),
      };
      const sum = this.fixed(this.payload.query.eqv || this.formatSum(0.01, 0.05), 2, true, options);
      return `${this.payload.query.direction == 'in' ? '' : '-'}${sum}`;
    },
    formatDate() {
      const dayjs = this.$dayjs(this.payload.query.date).locale(this.payload.query.language);
      const dateFormat = this.payload.query.language == 'es' ? dayjs.format(`DD MMM YYYY`) : dayjs.format(`ll`);
      return dayjs.format(`LT [-] [${dateFormat}]`);
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: 'Coinbase Sans';
  src: url('../coinbase/CoinbaseSans-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Coinbase Text';
  src: url('../coinbase/CoinbaseText-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Coinbase Sans';
  src: url('../coinbase/CoinbaseSans-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Coinbase Display';
  src: url('../coinbase/CoinbaseDisplay-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Coinbase Display';
  src: url('../coinbase/CoinbaseDisplay-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
#main {
  font-family: 'Coinbase Display', Roboto;
}
.data-item {
  font-size: 46px;
  padding: 39px 0;
}
.data-item:last-child {
  border-bottom: none;
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
.footer > div {
  flex-direction: column;
}
.footer > div > div:nth-child(1) {
  margin-bottom: 5px;
  height: 51px;
}
/*colors*/

.mobile-dark {
  background-color: black;
  color: #252628;
}
.mobile-light {
  background-color: #ffffff;
  color: #dedfe2;
}
.mobile-dark .text1,
.mobile-dark .data-item > div:nth-child(1) {
  color: white;
}
.mobile-light .text1,
.mobile-light .data-item > div:nth-child(1) {
  color: black;
}
.mobile-dark .text2,
.mobile-dark .footer > div > div:nth-child(2),
.mobile-dark .data-item > div:nth-child(2) {
  color: #89919c;
}
.mobile-light .text2,
.mobile-light .footer > div > div:nth-child(2),
.mobile-light .data-item > div:nth-child(2) {
  color: #5d626d;
}

.mobile-light .block {
  background-color: #eff0f3;
}
.mobile-dark .block {
  background-color: #32353e;
}
.mobile-light .coinbase {
  filter: brightness(0) saturate(100%) invert(14%) sepia(6%) saturate(146%) hue-rotate(131deg) brightness(103%) contrast(84%);
}
.mobile-dark .coinbase {
  filter: brightness(0) saturate(100%) invert(91%) sepia(15%) saturate(192%) hue-rotate(181deg) brightness(97%) contrast(91%);
}
.coinbase2 {
  filter: brightness(0) saturate(100%) invert(55%) sepia(81%) saturate(330%) hue-rotate(103deg) brightness(86%) contrast(91%);
}
</style>
