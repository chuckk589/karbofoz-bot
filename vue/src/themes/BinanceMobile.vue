<template>
  <div :class="theme" id="main" style="width: 1080px; height: 2184px">
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar">
      <div
        :class="'text-' + theme"
        style="height: 120px; margin-bottom: 75px; font-size: 48px; justify-content: space-between; margin-top: 111px; font-weight: 500; padding: 0px 40px; letter-spacing: -0.5px; padding: 0 40px"
      >
        <FakeImg class="text-gray" path="/binance/images/3.png" style="margin-right: 79px" />
        <div v-if="payload.query.direction == 'in'" style="width: 41px"></div>
        <div style="margin: 0 auto">{{ getConstant('t1' + payload.query.direction) }}</div>
        <FakeImg class="text-gray" v-if="payload.query.direction == 'in'" path="/binance/images/2.png" />
        <FakeImg class="text-gray" :style="'margin-left: 79px;' + (payload.query.direction == 'out' ? 'margin-right:14px' : '')" path="/binance/images/1.png" />
      </div>
      <div class="text-gray" style="font-size: 37px; margin-bottom: 15px; font-weight: 500">{{ getConstant('t2') }}</div>
      <div :class="'text-' + theme" style="margin-bottom: 4px">
        <div style="font-size: 75px; font-weight: bold; letter-spacing: -1px; margin-left: 3px; margin-top: -4px">{{ fixed(payload.query.sum, 8) }}</div>
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
        <div class="text-y" v-if="payload.query.direction == 'out'" style="margin-top: 6px; font-weight: 500; font-size: 32px">{{ getConstant('t15') }}</div>
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
      <div class="data-item" style="">
        <div class="text-gray" style="margin-right: auto; margin-top: 20px">{{ getConstant('t8') }}</div>
        <div style="flex-direction: column; text-align: end; align-items: end">
          <div>
            <div :class="'text-' + theme" style="max-width: 540px; word-break: break-word">{{ payload.query.address }}</div>
            <FakeImg class="text-gray" style="margin: -13px 7px 0 28px" :path="'/binance/images/5.png'" />
          </div>
          <div class="text-y" style="font-weight: 500; margin: 15px 73px 0 0; min-height: 10px">{{ payload.query.direction == 'out' ? getConstant('t16') : '' }}</div>
        </div>
      </div>
      <div class="data-item" style="align-items: center !important; margin-bottom: 30px">
        <div class="text-gray" style="margin-right: auto">{{ getConstant('t9') }}</div>
        <div :class="'text-' + theme" style="max-width: 520px; word-break: break-word; align-content: stretch; text-align: end; text-decoration: underline">{{ payload.query.txid }}</div>
        <FakeImg class="text-gray" style="margin: -13px 7px 0 28px" :path="'/binance/images/5.png'" />
      </div>
      <div class="data-item" v-if="payload.query.direction == 'out'">
        <div class="text-gray">{{ getConstant('t17') }}</div>
        <div :class="'text-' + theme">{{ feeBinanceFormatter() }}</div>
      </div>
      <div class="data-item" style="margin-bottom: 85px">
        <div class="text-gray">{{ getConstant('t10') }}</div>
        <div :class="'text-' + theme">{{ dateFormatter(payload.query.date) }}</div>
      </div>
      <div class="text-y" style="margin-bottom: 40px; font-weight: 500; flex-direction: column; font-size: 37px" v-if="payload.query.direction == 'out'">
        <div>{{ getConstant('t18') }}</div>
        <div style="margin-top: 50px">{{ getConstant('t19') }}</div>
      </div>
      <div v-else :class="'block-' + theme" style="height: 360px; border-radius: 20px; margin: -35px 40px 0px; position: relative; padding: 0 52px; align-items: stretch; justify-content: flex-start">
        <div style="flex-direction: column; align-items: flex-start; justify-content: flex-start">
          <div class="text-gray" style="font-weight: 500; font-size: 32px; margin-top: 69px">{{ getConstant('t11') }}</div>
          <div :class="'text-' + theme" style="font-size: 47px; font-weight: 900; margin-top: -1px">
            {{ getConstant('t12').slice(0, -5) }}&nbsp; <span style="color: #2cb682ff">{{ getConstant('t12').slice(-5) }}</span>
          </div>
          <div class="text-y" style="font-size: 37px; font-weight: 500; margin-top: 80px">{{ getConstant('t13') }}</div>
        </div>
        <FakeImg style="position: absolute; right: 29px; top: 80px" :path="'/binance/images/' + theme + '.png'" />
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
  src: url('../binance/BinancePlex-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Binance PLEX';
  src: url('../binance/BinancePlex-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Binance PLEX';
  src: url('../binance/BinancePlexRegular.ttf') format('truetype');
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
.mobile-light .text-y {
  text-shadow: yellow 0.2px 0 2px;
  color: #c59f31;
}
.mobile-dark .text-y {
  color: #dfb93b;
}
.mobile-light .text-gray {
  filter: brightness(0) saturate(100%) invert(48%) sepia(11%) saturate(550%) hue-rotate(181deg) brightness(96%) contrast(86%);
}
.mobile-dark .text-gray {
  filter: brightness(0) saturate(100%) invert(60%) sepia(3%) saturate(1648%) hue-rotate(178deg) brightness(92%) contrast(82%);
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
</style>
