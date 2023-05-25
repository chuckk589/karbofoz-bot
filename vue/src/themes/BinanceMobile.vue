<template>
  <div :class="theme" id="main" style="margin-top: 90px; width: 1080px; height: 2184px">
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar">
      <div :class="'text-' + theme" style="height: 120px; margin-bottom: 75px; font-size: 48px; justify-content: space-between; font-weight: 600; padding: 0px 40px; letter-spacing: -0.5px; padding: 0 40px">
        <div style="background-image: url('/binance/images/3.png'); width: 51px; height: 40px"></div>
        <div>{{ getConstant('t1' + payload.query.direction) }}</div>
        <div style="background-image: url('/binance/images/2.png'); width: 43px; height: 52px" v-if="payload.query.direction == 'in'"></div>
        <div style="background-image: url('/binance/images/1.png'); width: 41px; height: 52px; margin-right: 11px"></div>
      </div>
      <div class="text-gray" style="font-size: 37px; margin-bottom: 15px; font-weight: 600">{{ getConstant('t2') }}</div>
      <div :class="'text-' + theme" style="margin-bottom: 4px">
        <div style="font-size: 75px; font-weight: bold; letter-spacing: -1px; margin-left: 3px; margin-top: -4px">{{ fixed(payload.query.sum, 8, true) }}</div>
        <div style="font-size: 42px; font-weight: 500; padding: 19px 0px 0px; margin-left: 12px">{{ payload.currency.name }}</div>
      </div>
      <div style="margin-bottom: 28px">
        <div style="background-image: url('/binance/images/4.png'); width: 55px; height: 35px"></div>
        <div style="color: #2cb682ff; font-weight: 500; font-size: 43px; letter-spacing: -0.5px">{{ getConstant('t3') }}</div>
      </div>

      <div :class="'line-' + theme" style="flex-direction: column">
        <div class="text-gray" style="font-size: 32px; text-align: center; line-height: 41px; padding: 0px 40px; letter-spacing: 0.1px; margin-top: -3px">
          {{ getConstant('t4' + payload.query.direction) }}
        </div>
        <div v-if="payload.query.direction == 'out'" style="margin-top: 6px; color: rgb(223, 184, 61); font-weight: 500; font-size: 32px">{{ getConstant('t15') }}</div>
        <div style="margin-bottom: 76px"></div>
      </div>
      <div class="data-item" style="margin-top: 63px">
        <div class="text-gray">{{ getConstant('t5') }}</div>
        <div :class="'text-' + theme">{{ getConstant('cs_confirm') }}</div>
      </div>
      <div class="data-item" style="">
        <div class="text-gray">{{ getConstant('t6') }}</div>
        <div :class="'text-' + theme">{{ payload.network.name }}</div>
      </div>
      <div class="data-item" style="">
        <div class="text-gray">{{ getConstant('t7' + payload.query.direction) }}</div>
        <div :class="'text-' + theme">{{ getConstant('t14') }}</div>
      </div>
      <div class="data-item" style="margin-top: -48px">
        <div class="text-gray" style="margin-right: auto; margin-top: 20px">{{ getConstant('t8') }}</div>
        <div style="flex-direction: column; text-align: end; align-items: end">
          <div>
            <div :class="'text-' + theme" style="max-width: 540px; word-break: break-word">{{ payload.query.address }}</div>
            <FakeImg style="margin: -13px 7px 0 28px" :path="'/binance/images/5.png'" />
          </div>
          <div style="font-weight: 500; margin: 15px 73px 0 0; color: #dfb83d" v-if="payload.query.direction == 'out'">{{ getConstant('t16') }}</div>
        </div>
      </div>
      <div class="data-item" style="align-items: center !important; margin-bottom: 30px">
        <div class="text-gray" style="margin-right: auto">{{ getConstant('t9') }}</div>
        <div :class="'text-' + theme" style="max-width: 520px; word-break: break-word; align-content: stretch; text-align: end; text-decoration: underline">{{ payload.query.txid }}</div>
        <FakeImg style="margin: -13px 7px 0 28px" :path="'/binance/images/5.png'" />
      </div>
      <div class="data-item" v-if="payload.query.direction == 'out'">
        <div class="text-gray">{{ getConstant('t17') }}</div>
        <div :class="'text-' + theme">{{ feeBinanceFormatter() }}</div>
      </div>
      <div class="data-item" style="margin-bottom: 87px">
        <div class="text-gray">{{ getConstant('t10') }}</div>
        <div :class="'text-' + theme">{{ dateFormatter(payload.query.date) }}</div>
      </div>
      <div style="margin-bottom: 40px; color: rgb(223, 184, 61); font-weight: 500; flex-direction: column; font-size: 37px" v-if="payload.query.direction == 'out'">
        <div>{{ getConstant('t18') }}</div>
        <div style="margin-top: 50px">{{ getConstant('t19') }}</div>
      </div>
      <div v-else :class="'block-' + theme" style="height: 360px; border-radius: 20px; margin: 0 40px; flex: -; align-items: stretch">
        <div style="flex-direction: column; flex: 1; align-items: flex-start; justify-content: flex-start; margin: 64px 0 0 50px">
          <div class="text-gray" style="font-weight: 700; font-size: 33px">{{ getConstant('t11') }}</div>
          <div :class="'text-' + theme" style="font-size: 50px; font-weight: 900; margin-bottom: 70px">{{ getConstant('t12') }}</div>
          <div style="color: #e9ba22ff; font-size: 38px; font-weight: 800">{{ getConstant('t13') }}</div>
        </div>
        <div style="flex-direction: column; padding-right: 32px; justify-content: flex-start">
          <div style="background-image: url('/binance/images/6.png'); width: 127px; height: 135px; margin-top: 112px"></div>
          <div style="background-image: url('/binance/images/7.png'); width: 189px; height: 13px; margin-top: 47px; margin-right: 10px"></div>
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
  name: 'BinanceMobile',
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
  methods: {
    feeBinanceFormatter() {
      const value = this.feeFormatter();
      return `${value} ${this.payload.currency.name}`;
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: 'Binance PLEX';
  src: url('binance/BinancePlex-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Binance PLEX';
  src: url('binance/BinancePlex-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Binance PLEX';
  src: url('binance/BinancePlexRegular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'Binance PLEX';
}

.mobile-dark {
  background-color: #1f2630;
}
.mobile-light {
  background-color: white;
}
.text-mobile-dark {
  color: #edeef1ff;
}
.block-mobile-dark {
  background-color: #29313c;
}
.block-mobile-light {
  background-color: #fafafa;
}
.line-mobile-dark {
  border-bottom: 1px solid #353c46;
}
.line-mobile-light {
  border-bottom: 1px solid #ececed;
}
.text-mobile-light {
  color: black;
}

.text-gray {
  color: #717a8bff;
}
.data-item {
  font-size: 37px;
  line-height: 48px;
  font-weight: 400;
  margin-bottom: 16px;
  justify-content: space-between !important;
  align-items: flex-start !important;
  padding: 15px 40px;
}
.txid {
  align-items: center !important;
}
.data-item > div:nth-child(1) {
  max-width: 300px;
}
</style>
