<template>
  <div :class="theme" id="main" style="position: relative; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; padding: 0px 53px">
      <div class="overlay"></div>
      <div style="height: 90px; margin-bottom: 120px; margin-top: 33px; justify-content: space-between">
        <FakeImg style="margin-left: 6px" class="cian-shade" :path="'/metamask/images/1.png'" />
        <div style="margin-left: 18px; flex-direction: column">
          <div style="font-size: 50px; line-height: 50px" class="text">{{ payload.currency.name }}</div>
          <div style="font-size: 32px">
            <div style="width: 13px; height: 13px; border-radius: 50%; margin-right: 14px; background-color: #17c54c"></div>
            <div class="text">{{ getConstant('cs_net') }}</div>
          </div>
        </div>
        <FakeImg style="margin-right: 17px" class="cian-shade" :path="'/metamask/images/3.png'" />
      </div>
      <div style="height: 123px; margin-bottom: auto">
        <FakeImg class="brd-currency" style="border: 8px solid; border-radius: 50%" :path="'safepal/images/coins/' + payload.currency.name.toLowerCase() + '.png'" />
      </div>
      <div class="popup" style="flex-direction: column; align-items: stretch; letter-spacing: 1px; border-radius: 31px; position: absolute; top: 507px; width: 974px">
        <div class="brd" style="font-size: 50px; padding: 28px 42px; font-weight: 700; justify-content: space-between; border-bottom: 1px solid">
          <div style="width: 37px"></div>
          <div class="text">{{ getConstant('t1' + payload.query.direction) }} {{ payload.currency.name }}</div>
          <FakeImg class="cross" :path="'/metamask/images/4.png'" />
        </div>
        <div class="data-item brd" style="border-bottom: 3px solid">
          <div class="data-item-col">
            <div class="header">{{ getConstant('t2') }}</div>
            <div style="font-weight: 600; color: #2ca647">{{ getConstant('t12') }}</div>
          </div>
          <div class="data-item-col">
            <div class="header">{{ getConstant('t3') }}</div>
            <div class="text">{{ formatDate }}</div>
          </div>
        </div>
        <div class="data-item" style="border: none">
          <div class="data-item-col">
            <div class="header">{{ getConstant('t4') }}</div>
            <div class="text">{{ lengthFormatter(payload.query.address, 10) }}</div>
          </div>
          <div class="data-item-col">
            <div class="header">{{ getConstant('t5') }}</div>
            <div class="text">{{ lengthFormatter(payload.query.address2, 10) }}</div>
          </div>
        </div>
        <div class="header" style="padding: 32px 39px; font-size: 28px; justify-content: space-between; margin-bottom: 62px">{{ getConstant('t6') }}</div>
        <div class="checkout text brd">
          <div class="brd" style="flex-direction: column; align-items: stretch; border-bottom: 3px solid; margin-bottom: 25px; padding-bottom: 10px" v-if="payload.query.direction == 'out'">
            <div class="data-item">
              <div>{{ getConstant('t7') }}</div>
              <div>{{ fixed(payload.query.sum, 5) }} {{ payload.currency.name }}</div>
            </div>
            <div class="data-item">
              <div>{{ getConstant('t8') }}</div>
              <div>{{ feeFixed }} {{ payload.network.name }}</div>
            </div>
          </div>
          <div class="data-item" style="font-weight: 600" v-if="payload.query.direction == 'out'">
            <div>{{ getConstant('t9') }}</div>
            <div>{{ fixed(payload.query.sum, 5) }} {{ payload.currency.name }} / {{ feeFixed }} {{ payload.network.name }}</div>
          </div>
          <div class="data-item" style="font-weight: 600" v-else>
            <div>{{ getConstant('t7') }}</div>
            <div>{{ fixed(payload.query.sum, 5) }} {{ payload.currency.name }}</div>
          </div>
          <div style="font-size: 33px; justify-content: flex-end">${{ payload.query.eqv || fixed(formatSum(0.5, 0.1), 2) }}</div>
        </div>
        <div class="cian" style="margin-bottom: 58px; font-size: 45px">{{ getConstant('t10' + payload.network.alias) }}</div>
      </div>
      <div class="cian-shade" style="margin-bottom: 300px; font-size: 47px">{{ getConstant('t11' + payload.network.alias) }}</div>
    </div>
    <!-- <div class="brd" style="padding: 40px 48px; border-top: 3px solid; justify-content: space-around">
      <FakeImg class="cian-shade" :path="'/metamask/images/5.png'" />
      <FakeImg class="cian-shade" :path="'/metamask/images/6.png'" />
      <FakeImg :path="'/metamask/images/7.png'" />
    </div> -->
    <FakeImg style="position: absolute; bottom: 0" :path="'/metamask/images/f' + theme + '.png'" />
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
export default {
  name: 'MetamaskMobile',
  mixins: [themeMixin],
  components: {
    StatusBar,
    FakeImg,
  },
  data() {
    return {
      theme: '',
      feeFixed: 0,
    };
  },
  mounted() {
    this.feeFixed = this.fixed(this.feeFormatter(), 5);
  },
  computed: {
    formatDate() {
      const dayjs = this.$dayjs(this.payload.query.date);
      const date = dayjs.locale(this.payload.query.language).format(`MMM D [${this.getConstant('t13')} ]`);
      const time = dayjs.format(`LT`);
      return date[0].toUpperCase() + date.slice(1) + time.toLowerCase();
    },
    formatFee() {
      return this.payload.query.fee + ' ' + this.payload.currency.name;
    },
  },
  methods: {},
};
</script>
.sumFormatter
<style scoped>
@font-face {
  font-family: 'Euclid Circular B';
  src: url('../metamask/EuclidCircularB-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Euclid Circular B';
  src: url('../metamask/EuclidCircularB-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'Euclid Circular B';
}
.data-item {
  font-size: 28px;
  padding: 50px 0;
  margin: 0 36px;
}
.data-item-col {
  flex-direction: column;
}
.data-item > div {
  flex-grow: 1;
}
.data-item-col > div:nth-child(1) {
  margin-bottom: 20px;
}
.data-item-col > div:nth-child(2) {
  font-size: 34px;
}
.data-item-col:nth-child(1) {
  align-items: flex-start !important;
}
.data-item-col:nth-child(2) {
  align-items: flex-end !important;
}
.overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.checkout {
  flex-direction: column;
  align-items: stretch !important;
  border: 3px solid #d6d8db;
  margin: 0px 40px;
  border-radius: 20px;
  padding: 53px 45px;
  margin-bottom: 86px;
}
.checkout .data-item {
  padding: 0;
  border: 0;
  font-size: 33px;
  margin: 0 0 20px 0;
}
.checkout .data-item > div:nth-child(1) {
  justify-content: flex-start !important;
}
.checkout .data-item > div:nth-child(2) {
  justify-content: flex-end !important;
}

/*colors*/

.mobile-dark {
  background-color: #23272a;
}
.mobile-light {
  /* background-color: #f5f5f5; */
  background-color: white;
}
.mobile-dark .brd {
  border-color: #3c3f46 !important;
}
.mobile-light .brd {
  border-color: #d6d9da !important;
}
.mobile-dark .brd-currency {
  border-color: black !important;
}
.mobile-light .brd-currency {
  border-color: #d6d8db4d !important;
}
.cian {
  filter: brightness(0) saturate(100%) invert(30%) sepia(68%) saturate(4041%) hue-rotate(190deg) brightness(89%) contrast(84%);
}
.cian-shade {
  filter: brightness(0) saturate(100%) invert(13%) sepia(19%) saturate(6335%) hue-rotate(183deg) brightness(98%) contrast(101%);
}
.mobile-dark .cross {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}
.mobile-light .cross {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
}
.mobile-dark .bar,
.mobile-dark .popup {
  background-color: #23272a;
}
.mobile-light .bar,
.mobile-light .popup {
  background-color: #ffffff;
}
.mobile-light .header {
  color: #555a5e;
}
.mobile-dark .header {
  color: #d5d9dc;
}
.mobile-dark .text {
  color: white;
}
.mobile-light .text {
  color: black;
}

/* .mobile-dark {
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
} */
</style>
