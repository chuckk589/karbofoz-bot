<template>
  <div :class="theme" id="main" style="width: 1080px; height: 2274px">
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch">
      <div2 style="margin: 25px 42px 0 42px">
        <div style="font-size: 48px; margin-bottom: 78px">
          <div style="background-image: url(safepal/images/1.png); width: 30px; height: 51px; margin-left: 18px; transform: rotate(180deg) scale(0.8); margin-bottom: 7px"></div>
          <div :class="'text-' + theme" style="margin: 0 auto 0 auto; font-weight: 500">{{ getConstant('t1') }}</div>
          <div style="width: 30px; height: 51px; margin-right: 18px"></div>
        </div>
        <div style="font-size: 64px; font-weight: 500; margin-bottom: 53px">
          <div :style="'background-image: url(safepal/images/3.png); width: 65px; height: 65px; background-size: cover; margin-right: 15px;' + rotateStyle"></div>
          <div :class="'text-' + theme" style="position: relative">
            <div style="background-image: url(safepal/images/2.png); width: 26px; position: absolute; height: 26px; background-size: cover; top: 55px; left: -40px"></div>
            {{ getConstant('t9' + payload.query.direction) }}
          </div>
        </div>
        <div :class="'block-' + theme" style="height: 168px; margin-bottom: 40px; justify-content: flex-start; border-radius: 20px; padding: 27px 0px; align-items: flex-start">
          <div style="font-size: 64px; font-weight: 500">
            <div :style="'background-image: url(safepal/images/coins/' + payload.currency.name + '.png); width: 108px; height: 108px; background-size: cover; margin-left: 41px'">
              <div :style="'background-image: url(safepal/images/coins/' + payload.network.name + '.png); width: 40px; position: absolute; height: 40px; background-size: cover; margin: 65px 0 0 65px'"></div>
            </div>
          </div>
          <div style="flex-direction: column; margin-left: 27px; letter-spacing: 1px; font-weight: 500; align-items: flex-start">
            <div :class="'text-' + theme" style="font-size: 41px; line-height: 58px; font-weight: 500">{{ sumFormatter }} {{ payload.currency.name }}</div>
            <div style="font-size: 36px; line-height: 36px; color: #9e9dac">{{ payload.network.alias.toUpperCase() }}&nbsp; {{ lengthFormatter(payload.query.txid, 10) }}</div>
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 39px; align-items: stretch; border-radius: 20px; padding: 25px 43px">
          <div :class="'data-item text-' + theme">
            <div>{{ getConstant('t2') }}</div>
            <div style="color: #31c786">{{ getConstant('t8') }}</div>
          </div>
          <div :class="'data-item text-' + theme" v-if="['bep20', 'erc20'].includes(payload.network.alias)">
            <div>{{ getConstant('t3') }}</div>
            <div>{{ spFeeFormatter() }}</div>
          </div>
          <div :class="'data-item text-' + theme">
            <div>{{ getConstant('t4') }}</div>
            <div>{{ dateFormatter(payload.query.date) }}</div>
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 39px; align-items: stretch; border-radius: 20px; padding: 25px 43px">
          <div :class="'data-item text-' + theme">
            <div>{{ getConstant('t5') }}</div>
            <div>{{ lengthFormatter(payload.query.address) }}</div>
            <FakeImg :path="'/safepal/images/5.png'" />
          </div>
          <div :class="'data-item text-' + theme">
            <div>{{ getConstant('t6') }}</div>
            <div>{{ lengthFormatter(payload.query.address2) }}</div>
            <FakeImg :path="'/safepal/images/5.png'" />
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 34px; align-items: stretch; border-radius: 20px; padding: 25px 43px">
          <div :class="'data-item text-' + theme">
            <div>{{ payload.network.alias == 'trc20' ? getConstant('t11') : getConstant('t7') }}</div>
            <div>{{ lengthFormatter(payload.query.txid) }}</div>
            <FakeImg :path="'/safepal/images/5.png'" />
          </div>
          <div :class="'data-item text-' + theme">
            <div>{{ payload.network.alias == 'trc20' ? getConstant('t12') : getConstant('t14') }}</div>
            <div>{{ formatConf() }}</div>
          </div>
          <div :class="'data-item text-' + theme" v-if="['bep20', 'erc20'].includes(payload.network.alias)">
            <div>{{ getConstant('t10') }}</div>
            <div>{{ getConstant('cs_nonce' + payload.query.direction) }}</div>
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; align-items: stretch; border-radius: 20px; padding: 25px 43px">
          <div :class="'data-item text-' + theme">
            <div style="">{{ getConstant('t13') }}</div>
            <div style="background-image: url(safepal/images/1.png); width: 30px; height: 51px; transform: scale(0.6); margin-right: 10px"></div>
          </div>
        </div>
      </div2>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '../components/FakeImg.vue';
export default {
  name: 'SafepalMobile',
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
    rotateStyle() {
      return this.payload.query.direction == 'in' ? '' : 'transform: rotate(227deg);';
    },
    sumFormatter() {
      return `${this.payload.query.direction == 'in' ? '+' : '-'}${this.fixed(this.payload.query.sum, 8)}`;
    },
    // heightFormatter() {
    //   const start = this.getConstant('cs_height');
    //   const minutes = this.$dayjs(this.payload.query.date).diff('2023-04-05 21:00:00', 'minutes');
    //   return +start + minutes;
    // },
  },
  methods: {
    spFeeFormatter() {
      const value = this.feeFormatter() || this.feeFormatter('cs_com' + this.payload.query.direction);
      if (!value) return '';
      return `${this.fixed(value, 8)} ${this.payload.network.coin}`;
    },
  },
};
</script>
<style scoped>
body {
  font-family: 'AlibabaPuHuiTi-2', 'Alibaba Sans', sans-serif;
}

.text-mobile-dark {
  color: white;
}
.text-mobile-light {
  color: black;
}
.mobile-dark {
  background-color: #000000;
}

.mobile-light {
  background-color: #ffffff;
}
.block-mobile-dark {
  background-color: #1c1d1f;
}

.block-mobile-light {
  background-color: #f7f6fe;
}
.data-item {
  font-size: 37px;
  font-weight: 500;
  justify-content: space-between !important;
  letter-spacing: -1px;
  height: 93px;
}
.data-item div:nth-of-type(1) {
  margin-right: auto;
}
.data-item div:nth-of-type(3) {
  margin-left: 20px;
}
.mobile-light .data-item div:nth-of-type(3) {
  filter: brightness(0) saturate(100%) invert(22%) sepia(40%) saturate(2230%) hue-rotate(229deg) brightness(101%) contrast(105%);
}
.mobile-dark .data-item div:nth-of-type(3) {
  filter: brightness(0) saturate(100%) invert(46%) sepia(26%) saturate(961%) hue-rotate(203deg) brightness(93%) contrast(94%);
}
</style>
