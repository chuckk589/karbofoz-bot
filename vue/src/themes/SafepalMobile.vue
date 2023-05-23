<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <!-- <div style="height: 98px; background-color: red"></div> -->
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
        <div :class="'block-' + theme" style="height: 168px; margin-bottom: 40px; justify-content: flex-start; border-radius: 29px">
          <div style="font-size: 64px; font-weight: 500">
            <div :style="'background-image: url(safepal/images/coins/' + payload.currency.name + '.png); width: 108px; height: 108px; background-size: cover; margin-left: 41px'">
              <div :style="'background-image: url(safepal/images/coins/' + payload.network.alias + '.png); width: 40px; position: absolute; height: 40px; background-size: cover; margin: 65px 0 0 65px'"></div>
            </div>
          </div>
          <div style="flex-direction: column; margin-left: 27px; font-weight: 600; letter-spacing: 1px; line-height: 45px; align-items: flex-start">
            <div :class="'text-' + theme" style="font-size: 40px">{{ sumFormatter }} {{ payload.currency.name }}</div>
            <div style="font-size: 35px; color: #9e9dac">{{ payload.network.alias.toUpperCase() }} {{ lengthFormatter(payload.query.txid, 10) }}</div>
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 39px; align-items: stretch; border-radius: 29px; padding: 25px 43px">
          <div :class="'data-item text-' + theme">
            <div>{{ getConstant('t2') }}</div>
            <div style="color: #31c786">{{ getConstant('t8') }}</div>
          </div>
          <div :class="'data-item text-' + theme" v-if="payload.query.direction == 'in'">
            <div>{{ getConstant('t3') }}</div>
            <div>{{ spFeeFormatter() }}</div>
          </div>
          <div :class="'data-item text-' + theme">
            <div>{{ getConstant('t4') }}</div>
            <div>{{ dateFormatter(payload.query.date) }}</div>
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 39px; align-items: stretch; border-radius: 29px; padding: 25px 43px">
          <div :class="'data-item text-' + theme">
            <div>{{ getConstant('t5') }}</div>
            <div>{{ lengthFormatter(payload.query.from) }}</div>
            <FakeImg :path="'/safepal/images/5.png'" />
          </div>
          <div :class="'data-item text-' + theme">
            <div>{{ getConstant('t6') }}</div>
            <div>{{ lengthFormatter(payload.query.to) }}</div>
            <FakeImg :path="'/safepal/images/5.png'" />
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 34px; align-items: stretch; border-radius: 29px; padding: 25px 43px">
          <div :class="'data-item text-' + theme" v-if="payload.query.thash">
            <div>{{ getConstant('t7') }}</div>
            <div>{{ lengthFormatter(payload.query.thash) }}</div>
            <FakeImg :path="'/safepal/images/5.png'" />
          </div>
          <div :class="'data-item text-' + theme">
            <div>{{ getConstant('t10') }}</div>
            <div>{{ getConstant('cs_nonce' + payload.query.direction) }}</div>
          </div>
          <div :class="'data-item text-' + theme">
            <div>{{ getConstant('t12') }}</div>
            <div>{{ heightFormatter }}</div>
          </div>
          <div :class="'data-item text-' + theme" v-if="payload.query.txid">
            <div>{{ getConstant('t11') }}</div>
            <div>{{ lengthFormatter(payload.query.txid) }}</div>
            <FakeImg :path="'/safepal/images/5.png'" />
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; align-items: stretch; border-radius: 29px; padding: 25px 43px">
          <div :class="'data-item text-' + theme">
            <div style="letter-spacing: -2px">{{ getConstant('t13') }}</div>
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
      return `${parseFloat(this.payload.query.sum) > 0 ? '+' : ''}${this.fixed(this.payload.query.sum, 4)}`;
    },
    heightFormatter() {
      const start = this.getConstant('cs_height');
      const minutes = this.$dayjs(this.payload.query.date).diff('2023-04-05 21:00:00', 'minutes');
      return +start + minutes;
    },
  },
  methods: {
    spFeeFormatter() {
      const value = this.feeFormatter() || this.feeFormatter('cs_com' + this.payload.query.direction);
      if (!value) return '';
      return `${value.toFixed(8)} ${this.payload.network.coin}`;
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
  font-size: 38px;
  font-weight: 500;
  justify-content: space-between !important;
  letter-spacing: -1px;
  height: 93px;
}
.data-item div:nth-of-type(1) {
  margin-right: auto;
}
.data-item div:nth-of-type(3) {
  height: 40px;
  width: 40px;
  filter: rotate(180deg);
  margin-left: 20px;
  background-size: cover;
  transform: scaleX(-1);
  background-image: url(safepal/images/5.png);
  filter: invert(53%) sepia(7%) saturate(2775%) hue-rotate(203deg) brightness(85%) contrast(94%);
}
</style>
