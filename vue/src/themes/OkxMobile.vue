<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; padding: 0px 65px">
      <div style="height: 96px; margin-bottom: 116px; justify-content: space-between; font-size: 44px; font-weight: 600">
        <FakeImg class="okx" :path="'/okx/images/1.png'" />
        <div class="black">{{ getConstant('t1') }}</div>
        <div style="width: 46px"></div>
      </div>
      <div class="gray" style="height: 43px; margin-bottom: 83px; font-size: 38px">{{ payload.currency.name }} {{ getConstant('t2' + payload.query.direction) }}</div>
      <div style="height: 123px; margin-bottom: 10px; justify-content: flex-start">
        <FakeImg style="transform: scale(0.65); margin-bottom: 29px; margin-left: -16px" :path="'/safepal/images/coins/' + payload.currency.alias + '.png'" />
        <div style="flex-direction: column; font-size: 41px; margin-left: 16px; align-items: flex-start; width: 100%">
          <div class="black" style="width: 100%">
            <div style="margin-right: auto">{{ payload.currency.name }}</div>
            <div style="font-size: 43px; font-weight: 700; color: #4a992e">{{ sumFormatter }} {{ payload.currency.name }}</div>
          </div>
          <div class="gray">Tether</div>
        </div>
      </div>
      <div class="data-item" v-if="payload.query.direction == 'out'" style="padding-bottom: 0">
        <div>{{ getConstant('t10') }}</div>
        <div style="font-weight: 700; font-size: 43px">{{ formatCom }} {{ payload.currency.name }}</div>
      </div>
      <div style="flex-direction: column; align-items: stretch; border-top: 3px solid #333333; padding-top: 30px; margin-top: 70px">
        <div class="data-item">
          <div>{{ getConstant('t3') }}</div>
          <div>
            <div style="padding: 5px 42px; border-radius: 35px; background-color: #4a992e; font-weight: 100; color: white">{{ getConstant('t4') }}</div>
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t5') }}</div>
          <div style="flex-direction: column; align-items: flex-end">
            <div>{{ formatDate }}</div>
            <span class="gray">{{ formatTime }}</span>
          </div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'in'">
          <div>{{ getConstant('t6') }}</div>
          <div>{{ getConstant('t11') }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t7') }}</div>
          <div style="text-align: end; overflow-wrap: anywhere; max-width: 630px">{{ payload.query.address }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t8') }}</div>
          <div>{{ payload.network.alias.toUpperCase() }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t9') }}</div>
          <div style="text-align: end; overflow-wrap: anywhere; max-width: 630px">{{ payload.query.txid }}</div>
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
  name: 'OkxMobile',
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
      return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('ll');
    },
    formatTime() {
      return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('HH:mm');
    },
    sumFormatter() {
      return `${this.payload.query.sum > 0 ? '+' : ''} ${this.fixed(this.payload.query.sum, 7)} `;
    },
    formatCom() {
      return '- ' + this.feeFormatter();
    },
  },
  methods: {},
};
</script>
.sumFormatter
<style scoped>
@font-face {
  font-family: 'font';
  src: url('../okx/okx.ttf');
}
#main {
  font-family: 'font';
}
.data-item {
  font-size: 36px;
  padding: 30px 0px;
  align-items: self-start !important;
}
.data-item > div {
  flex-grow: 1;
}

.data-item > div:nth-child(1) {
  justify-content: flex-start !important;
  color: #b3b3b3;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
  font-weight: 700;
}
/*colors*/
.mobile-dark .gray,
.mobile-dark .data-item > div:nth-child(1) {
  color: #b3b3b3;
}

.mobile-light .gray,
.mobile-light .data-item > div:nth-child(1) {
  color: #666666;
}
.mobile-dark .black,
.mobile-dark .data-item > div:nth-child(2) {
  color: #ffffff;
}

.mobile-light .black,
.mobile-light .data-item > div:nth-child(2) {
  color: #000000;
}
.mobile-dark {
  background-color: #000000;
}
.mobile-light {
  background-color: #ffffff;
}
.mobile-dark .okx {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}

.mobile-light .okx {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
}
</style>
