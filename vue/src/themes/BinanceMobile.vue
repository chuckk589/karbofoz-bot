<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2184px">
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar">
      <div :class="'text-' + theme" style="height: 120px; margin-bottom: 75px; font-size: 49px">
        <div style="background-image: url('/binance/images/3.png'); width: 51px; height: 40px; margin-right: auto; margin: 0 auto 0 32px"></div>
        <div style="margin-right: auto; font-weight: 900; padding-left: 120px">{{ getConstant('t1' + payload.query.direction) }}</div>
        <div style="background-image: url('/binance/images/2.png'); width: 43px; height: 52px; margin: 0 79px 0 0"></div>
        <div style="background-image: url('/binance/images/1.png'); width: 41px; height: 52px; margin: 0 38px 0 0"></div>
      </div>
      <div class="text-gray" style="font-size: 37px; margin-bottom: 18px; font-weight: 600">{{ getConstant('t2') }}</div>
      <div :class="'text-' + theme" style="margin-bottom: 4px">
        <div style="font-size: 70px; font-weight: 1000; letter-spacing: 3px">{{ fixed(payload.query.sum, 8, true) }}</div>
        <div style="font-size: 42px; font-weight: 800; padding: 26px 0 0 0; margin-left: 15px">{{ payload.currency.name }}</div>
      </div>
      <div style="margin-bottom: 28px">
        <div style="background-image: url('/binance/images/4.png'); width: 32px; height: 32px; margin-right: 20px"></div>
        <div style="color: #2cb682ff; font-weight: 700; font-size: 42px; letter-spacing: 1px">{{ getConstant('t3') }}</div>
      </div>

      <div :class="'line-' + theme" style="flex-direction: column; font-size: 33px; text-align: center; line-height: 39px; font-weight: 500">
        <div class="text-gray">
          {{ getConstant('t4' + payload.query.direction) }}
        </div>
        <div v-if="payload.query.direction == 'out'" style="margin-top: 15px; color: #dfb83d; font-weight: 600">{{ getConstant('t15') }}</div>
        <div style="margin-bottom: 76px"></div>
      </div>
      <div class="data-item" style="margin-bottom: 40px; margin-top: 78px">
        <div class="text-gray">{{ getConstant('t5') }}</div>
        <div :class="'text-' + theme">{{ getConstant('cs_confirm') }}</div>
      </div>
      <div class="data-item" style="margin-bottom: 40px">
        <div class="text-gray">{{ getConstant('t6') }}</div>
        <div :class="'text-' + theme">{{ payload.network.name }}</div>
      </div>
      <div class="data-item" style="margin-bottom: 31px">
        <div class="text-gray">{{ getConstant('t7' + payload.query.direction) }}</div>
        <div :class="'text-' + theme">{{ getConstant('t14') }}</div>
      </div>
      <div class="data-item" style="margin-bottom: 70px">
        <div class="text-gray" style="margin-right: auto">{{ getConstant('t8') }}</div>
        <div style="flex-direction: column; text-align: end; align-items: end">
          <div>
            <div :class="'text-' + theme" style="margin-right: 25px; max-width: 560px; word-break: break-word">{{ payload.query.address }}</div>
            <div style="background-image: url('/binance/images/5.png'); width: 37px; height: 41px; margin-right: 10px"></div>
          </div>
          <div style="margin-right: 74px; color: #dfb83d; font-weight: 600" v-if="payload.query.direction == 'out'">{{ getConstant('t16') }}</div>
        </div>
      </div>
      <div class="data-item" style="margin-bottom: 81px">
        <div class="text-gray" style="margin-right: auto">{{ getConstant('t9') }}</div>
        <div :class="'text-' + theme" style="margin-right: 25px; max-width: 560px; word-break: break-word; align-content: stretch; text-align: end; text-decoration: underline">{{ payload.query.txid }}</div>
        <div style="background-image: url('/binance/images/5.png'); width: 37px; height: 41px; margin-right: 10px"></div>
      </div>
      <div class="data-item" v-if="payload.query.direction == 'out'" style="margin-bottom: 40px">
        <div class="text-gray">{{ getConstant('t17') }}</div>
        <div :class="'text-' + theme">{{ feeBinanceFormatter() }}</div>
      </div>
      <div class="data-item" style="margin-bottom: 97px">
        <div class="text-gray">{{ getConstant('t10') }}</div>
        <div :class="'text-' + theme">{{ dateFormatter(payload.query.date) }}</div>
      </div>
      <div style="margin-bottom: 40px; color: #dfb83d; font-weight: 600; flex-direction: column; font-size: 38px" v-if="payload.query.direction == 'out'">
        <div>{{ getConstant('t18') }}</div>
        <div style="margin-top: 46px">{{ getConstant('t19') }}</div>
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
export default {
  name: 'BinanceMobile',
  mixins: [themeMixin],
  components: {
    StatusBar,
  },
  data() {
    return {
      theme: '',
    };
  },
  methods: {
    feeBinanceFormatter() {
      const value = this.feeFormatter();
      return `${value.toFixed(8)} ${this.payload.currency.name}`;
    },
  },
};
</script>
<style scoped>
/* @font-face {
  font-family: 'font';
  src: url('../binance/fonts/DINPro.ttf');
} */

#main {
  font-family: 'Roboto';
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
  font-weight: 500;
  justify-content: space-between !important;
  padding: 0 36px;
}
</style>
