<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; padding: 0px 38px">
      <div style="margin-bottom: 45px; margin-top: 10px; justify-content: space-between">
        <FakeImg class="mexc" :path="'/mexc/images/1.png'" />
        <div style="font-size: 45px; font-family: 'font1'" class="text1">
          {{ getConstant('t1' + payload.query.direction) }}
        </div>
        <div style="width: 51px"></div>
      </div>
      <div style="margin-bottom: 48px; flex-direction: column">
        <div>
          <div style="font-size: 77px; font-family: 'font2'" class="text2">{{ fixed(payload.query.sum, 8) }}</div>
          <div style="font-size: 50px; align-self: flex-end; margin-left: 30px" class="text1">{{ formatCurName }}</div>
        </div>
        <div style="font-size: 38px; margin-top: 9px" class="gray">{{ getConstant('t2') }}</div>
      </div>
      <div class="gray2" style="align-items: stretch; flex-direction: column; padding: 0px 33px 39px 33px; font-size: 31px; letter-spacing: 1px">
        <div style="border-bottom: 1px solid; padding: 30px 0px; margin-top: 20ox; margin-top: 7px; justify-content: flex-start">
          <FakeImg style="margin-right: 20px" class="mexc2" :path="'/mexc/images/2.png'" />
          <div class="mexc2" style="font-size: 42px; font-weight: 600">{{ getConstant('t3') }}</div>
        </div>
        <div style="margin-top: 25px" class="gray">
          {{ getConstant('t4' + payload.query.direction) }}
        </div>
        <div style="justify-content: flex-start; margin-top: 14px" class="mexc2" v-if="payload.query.direction == 'out'">{{ getConstant('t16') }}</div>
      </div>
      <div class="gray2" style="margin-bottom: 80px; margin-top: 25px; flex-direction: column; align-items: stretch">
        <div class="data-item">
          <div>{{ getConstant('t5') }}</div>
          <div>{{ formatNetwork }}</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'in'">
          <div>{{ getConstant('t14') }}</div>
          <div>{{ getConstant('t15') }}</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t6') }}</div>
          <div>
            <div style="overflow-wrap: anywhere; text-align: end; line-height: 40px; max-width: 696px; margin-right: 35px">{{ payload.query.address }}</div>
            <FakeImg class="mexc3" :path="'/mexc/images/3.png'" />
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t7') }}</div>
          <div>
            <div style="overflow-wrap: anywhere; text-align: end; line-height: 40px; max-width: 696px; margin-right: 35px">{{ payload.query.txid }}{{ getConstant('cs_tx') }}</div>
            <FakeImg class="mexc3" :path="'/mexc/images/3.png'" />
          </div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t8') }}</div>
          <div>{{ getConstant('cs_com') }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t9') }}</div>
          <div>{{ dateFormatter(payload.query.date) }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t10') }}</div>
          <div class="mexc2">{{ getConstant('t11') }}</div>
        </div>
      </div>
      <div class="mexc2" style="font-size: 33px; margin-top: 29px" v-if="payload.query.direction == 'out'">{{ getConstant('t12') }}</div>
      <div class="button" style="height: 121px; margin-top: auto; font-size: 42px; font-family: 'font1'; margin-bottom: 77px" v-if="payload.query.direction == 'out'">{{ getConstant('t13') }}</div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
export default {
  name: 'MexcMobile',
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
    formatCurName() {
      return this.payload.direction == 'out' ? this.payload.currency.name : `${this.payload.currency.name}-${this.payload.network.coin}`;
    },
    formatNetwork() {
      return this.payload.direction == 'out' ? this.payload.network.alias.toUpperCase() : `${this.payload.currency.name}-${this.payload.network.coin}`;
    },
  },
  methods: {},
};
</script>
.sumFormatter
<style scoped>
@font-face {
  font-family: 'font1';
  src: url('../mexc/mxc1.ttf');
}
@font-face {
  font-family: 'font2';
  src: url('../mexc/mxc2.ttf');
}
#main {
  font-family: 'font1';
}
.data-item {
  font-size: 36px;
  padding: 27px 0;
  margin: 0 34px;
}
.data-item > div {
  flex-grow: 1;
}
.data-item > div:nth-child(1) {
  justify-content: flex-start !important;
}
.data-item > div:nth-child(2) {
  justify-content: flex-end !important;
  font-family: 'font1';
}
/*colors*/

.mobile-dark {
  background-color: #181c1f;
}
.mobile-light {
  background-color: white;
}
.mobile-dark .brd {
  border-color: #3c3f46 !important;
}
.mobile-light .brd {
  border-color: #d6d9da !important;
}
.mobile-dark .mexc {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}
.mobile-light .mexc {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
}
.mobile-dark .mexc2 {
  filter: brightness(0) saturate(100%) invert(51%) sepia(46%) saturate(3496%) hue-rotate(201deg) brightness(101%) contrast(98%);
}
.mobile-light .mexc2 {
  filter: brightness(0) saturate(100%) invert(26%) sepia(93%) saturate(2948%) hue-rotate(216deg) brightness(101%) contrast(99%);
}
.mobile-dark .mexc3 {
  filter: brightness(0) saturate(100%) invert(52%) sepia(6%) saturate(791%) hue-rotate(171deg) brightness(93%) contrast(89%);
}
.mobile-light .mexc3 {
  filter: brightness(0) saturate(100%) invert(55%) sepia(95%) saturate(32%) hue-rotate(172deg) brightness(92%) contrast(89%);
}
.mobile-dark .button {
  background-color: #508cfe;
}
.mobile-light .button {
  background-color: #1665fe;
}
.mobile-dark .text1 {
  color: #ffffff;
}
.mobile-light .text1 {
  color: black;
}
.mobile-dark .gray2 {
  background-color: #24272c;
  color: #212429;
}
.mobile-light .gray2 {
  color: #f2f3f4;
  background-color: #f7f7f7;
}
.mobile-dark .text2,
.mobile-dark .data-item > div:nth-child(2) {
  color: #c8cbd2;
}
.mobile-light .text2,
.mobile-light .data-item > div:nth-child(2) {
  color: #3d444c;
}
.mobile-dark .gray,
.mobile-dark .data-item > div:nth-child(1) {
  color: #717b85;
}
.mobile-light .gray,
.mobile-light .data-item > div:nth-child(1) {
  color: #949ba4;
}
/*colors*/
</style>
