<template>
  <div :class="theme" id="main" style="width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch">
      <div style="padding: 0px 40px 110px; flex-direction: column; align-items: flex-start; justify-content: flex-start">
        <div style="height: 69px; margin-bottom: 51px; margin-top: 40px; padding: 0 14px; justify-content: space-between">
          <FakeImg :path="'/cryptocom/images/1.png'" />
          <div style="width: 41px"></div>
        </div>
        <div style="height: 63px; margin-bottom: 55px; font-size: 58px; justify-content: flex-start">
          {{ formatHeader }}
        </div>
        <div style="height: 48px; margin-bottom: 30px; font-size: 42px; justify-content: flex-start; color: #33b2a7">{{ getConstant('t2') }}</div>
        <div style="height: 49px; justify-content: flex-start; font-size: 45px">{{ formatDate }}</div>
      </div>
      <div style="flex-direction: column; height: 100%; padding: 130px 38px 0; color: black; align-items: flex-start">
        <div :class="sumClass" style="height: 113px; margin-bottom: 36px; margin-left: 15px">
          <div style="font-size: 70px; margin-left: -11px; margin-right: 21px" v-if="payload.query.direction == 'in'">+</div>
          {{ formatSumCC }}<span style="margin-left: 19px">{{ payload.currency.name }}</span>
        </div>
        <div :style="approxStyle + 'height: 85px; margin-bottom: auto; font-size: 46px; padding: 10px 30px; margin-left: 5px;  border-radius: 25px'">{{ usdFormatter }}</div>
        <div style="height: 48px; font-size: 40px; color: #646870; margin-bottom: 25px">{{ getConstant('t3' + payload.query.direction) }}</div>
        <div style="flex-direction: column; padding-top: 25px; letter-spacing: 1px; align-items: stretch; margin-bottom: 150px; border-top: 3px solid #e1e2e3; place-self: stretch">
          <div class="data-item" v-if="payload.query.direction == 'out'">
            <div>{{ getConstant('t4') }}</div>
            <div>{{ sumFormatter }}</div>
          </div>
          <div class="data-item" style="align-items: flex-start">
            <div>{{ getConstant('t5' + payload.query.direction) }}</div>
            <div style="line-height: 60px; overflow-wrap: anywhere; color: #2a95da; max-width: 725px; text-align: end">{{ payload.query.address }}</div>
          </div>
          <div class="data-item">
            <div>{{ getConstant('t6') }}</div>
            <div>{{ payload.network.alias.toUpperCase() }}</div>
          </div>
          <div class="data-item" v-if="payload.query.direction == 'out'">
            <div>{{ getConstant('t7') }}</div>
            <div>{{ fixed(payload.query.com || getConstant('cs_com'), 2, false, { useGrouping: true }, 'ru') }} {{ payload.currency.name }}</div>
          </div>
          <div class="data-item" v-if="payload.query.direction == 'out'">
            <div>{{ getConstant('t8') }}</div>
            <div>{{ fixed(payload.query.sum, 2, false, { useGrouping: true }, 'ru') }} {{ payload.currency.name }}</div>
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
  name: 'CryptocomMobile',
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
      const date = this.$dayjs(this.payload.query.date);
      if (this.payload.query.language == 'ru') {
        const month = date.format('MMM')[0];
        return date.format(`DD [${month}]MM YYYY LT`);
      } else if (this.payload.query.language == 'es') {
        const month = date.locale(this.payload.query.language).format('MMM');
        return date.format(`DD [${month}], YYYY HH:mm`);
      } else {
        return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('lll');
      }
    },
    usdFormatter() {
      let value = 0;
      if (this.payload.query.eqv) value = this.payload.query.eqv;
      else if (this.payload.query.sum) value = this.formatSum(0.1, 0.5, -1);
      return (this.payload.query.direction == 'in' ? '+' : '') + ' $' + this.fixed(value, 2, false, { useGrouping: true }, 'ru') + ' USD';
    },
    sumFormatter() {
      return this.fixed(this.payload.query.sum - (this.payload.query.com || this.getConstant('cs_com')), 2, false, { useGrouping: true }, 'ru') + ' ' + this.payload.currency.name;
    },
    formatSumCC() {
      return this.fixed(this.payload.query.sum, this.payload.query.direction == 'in' ? 6 : 2, false, { useGrouping: true }, 'ru');
    },
    approxStyle() {
      return this.payload.query.direction == 'in' ? 'border: 3px solid #9ee0d6; color:#34b39f;' : 'border: 3px solid rgb(225, 226, 227);';
    },
    sumClass() {
      return this.payload.query.direction == 'in' ? 'sum-in' : 'sum-out';
    },
    formatHeader() {
      // }} {{ payload.currency.name }} ({{ payload.network.alias.toUpperCase()
      return this.payload.query.direction == 'out'
        ? `${this.getConstant('t1' + this.payload.query.direction)} ${this.payload.currency.name} (${this.payload.network.alias.toUpperCase()})`
        : `${this.payload.currency.name} (${this.payload.network.alias.toUpperCase()}) ${this.getConstant('t1' + this.payload.query.direction)}`;
    },
  },
  methods: {},
};
</script>
<style scoped>
#main {
  font-family: 'Roboto';
}
.bar {
  background-color: #071e3d !important;
}
#wobar > div:nth-child(1) {
  background-color: #162f58;
}
#wobar > div:nth-child(2) {
  background-color: white;
}
.data-item {
  font-size: 45px;
  padding: 18px 0px;
}
.data-item > div {
  flex-grow: 1;
}
.data-item {
  color: #091323;
}
.data-item div:nth-child(1) {
  justify-content: flex-start !important;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
}
.sum-in {
  color: #34b39f;
  font-size: 112px !important;
  margin: -16px 15px 18px !important;
}
.sum-in > span {
  font-size: 70px;
  color: #9ee0d6;
}
.sum-out {
  font-size: 139px;
}
.sum-out > span {
  font-size: 70px;
  color: #646870;
}
/*colors*/
</style>
