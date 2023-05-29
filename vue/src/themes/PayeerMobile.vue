<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar">
      <div style="display: flex; flex-direction: column; align-items: stretch; padding: 0px 44px; margin-bottom: auto; height: 100%">
        <div style="margin-bottom: 28px; margin-top: 7px; justify-content: space-between">
          <div class="block2" style="width: 120px; height: 120px; border-radius: 50%">
            <FakeImg class="payeer" :path="'/payeer/images/1.png'" />
          </div>
          <div style="width: 49px"></div>
        </div>
        <div style="margin-bottom: 42px; align-items: stretch">
          <FakeImg :path="'safepal/images/coins/' + payload.currency.name.toLowerCase() + '.png'" style="margin-right: 20px" />
          <div class="text" style="line-height: 50px; padding-top: 20px">
            <div style="font-size: 140px">{{ fixed(payload.query.sum, 0) }}</div>
            <div style="font-size: 65px; align-self: flex-start">.{{ fixed(payload.query.sum, 2).split('.').pop() }}</div>
          </div>
        </div>
        <div style="margin-bottom: auto; flex-direction: column; border-radius: 25px" class="block">
          <div class="text" style="font-size: 54px; padding: 56px 0px; font-weight: 600">{{ getConstant('t1') }}</div>
          <div style="flex-direction: column; width: 100%; align-items: stretch; letter-spacing: 1px; padding: 0 62px; font-weight: 600">
            <div class="data-item">
              <div>{{ getConstant('t2') }}</div>
              <div style="flex-direction: column; align-items: flex-start">
                <div style="margin-bottom: 15px">{{ formatOp }}</div>
                <div class="button" style="padding: 10px 31px; font-weight: bold; border-radius: 25px">
                  {{ getConstant('t7') }}
                </div>
              </div>
            </div>
            <div class="data-item">
              <div>{{ getConstant('t3') }}</div>
              <div>{{ getConstant('cs_sys') }}</div>
            </div>
            <div class="data-item">
              <div>{{ getConstant('t4') }}</div>
              <div style="color: #4eab65">{{ getConstant('t8') }}</div>
            </div>
            <div class="data-item" v-if="payload.query.direction == 'out'">
              <div>{{ getConstant('t5') }}</div>
              <div style="color: #e49986">{{ formatCom }}</div>
            </div>
            <div class="data-item" v-if="payload.query.direction == 'out'">
              <div>{{ getConstant('cs_sys2') }}</div>
              <div style="overflow-wrap: anywhere; line-height: 40px">{{ payload.query.address }}</div>
            </div>
            <div class="data-item" v-if="payload.query.direction == 'out'">
              <div>{{ getConstant('t6') }}</div>
              <div style="overflow-wrap: anywhere; line-height: 40px">{{ payload.query.txid }}</div>
            </div>
            <div class="data-item" v-if="payload.query.direction == 'in'">
              <div>{{ getConstant('t15') }}</div>
              <div>{{ getConstant('cs_appr') }}</div>
            </div>
          </div>
        </div>
        <div
          class="block2"
          style="margin-bottom: 40px; justify-content: space-between; padding: 78px 50px; font-size: 33px; letter-spacing: 6px; border-radius: 29px; font-weight: 900"
          v-if="payload.query.direction == 'out'"
        >
          <div style="width: 23px"></div>
          <div class="text">{{ getConstant('t9') }}</div>
          <FakeImg class="payeer2" :path="'/payeer/images/7.png'" />
        </div>
      </div>
      <div class="block2 footer" style="justify-content: space-around; padding-top: 25px">
        <div class="payeer">
          <FakeImg :path="'/payeer/images/2.png'" />
          <div>{{ getConstant('t10') }}</div>
        </div>
        <div class="payeer">
          <FakeImg :path="'/payeer/images/3.png'" />
          <div>{{ getConstant('t11') }}</div>
        </div>
        <div class="payeer">
          <FakeImg :path="'/payeer/images/4.png'" />
          <div>{{ getConstant('t12') }}</div>
        </div>
        <div class="payeer">
          <FakeImg :path="'/payeer/images/5.png'" />
          <div>{{ getConstant('t13') }}</div>
        </div>
        <div style="color: #119ee1">
          <FakeImg :path="'/payeer/images/6.png'" />
          <div>{{ getConstant('t14') }}</div>
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
  name: 'PayeerMobile',
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
    formatOp() {
      const step = this.getConstant('cs_step' + this.payload.query.direction)?.split(' ');
      const iterations = Math.round(this.$dayjs(step[1]).diff(this.$dayjs(this.payload.query.date), 'minute') / step[2]);
      return `#${+step[0] + iterations}`;
    },
    formatCom() {
      return `Ŧ${(+this.payload.query.sum + +this.getConstant('cs_com')).toFixed(2)}`;
    },
  },
  methods: {},
};
</script>
.sumFormatter
<style scoped>
@font-face {
  font-family: 'font';
  src: url('../payeer/payeer.ttf');
}

#main {
  font-family: 'font';
}
.data-item {
  font-size: 39px;
  padding: 7px 0;
  margin-bottom: 35px;
  align-items: flex-start !important;
}
.data-item > div {
  flex-grow: 1;
}
.data-item > div:nth-child(1),
.data-item > div:nth-child(2) {
  justify-content: flex-start !important;
}
.data-item > div:nth-child(1) {
  max-width: 435px;
  color: #7b8aa7;
  min-width: 435px;
}
.footer > div {
  flex-direction: column;
  font-size: 35px;
}
.footer > div > div:nth-child(1) {
  margin-bottom: 5px;
  height: 51px;
}
/*colors*/

.mobile-dark {
  background-color: #272b34;
}
.mobile-dark .data-item > div:nth-child(2) {
  color: white;
}
.mobile-dark .block {
  background-color: #373f4c;
}
.mobile-dark .block2 {
  background-color: #2e3440;
}
.mobile-dark .payeer {
  filter: brightness(0) saturate(100%) invert(54%) sepia(44%) saturate(202%) hue-rotate(180deg) brightness(92%) contrast(93%);
}
.mobile-dark .payeer2 {
  filter: brightness(0) saturate(100%) invert(99%) sepia(56%) saturate(853%) hue-rotate(177deg) brightness(105%) contrast(105%);
}
.mobile-dark .button {
  background-color: #474955;
}
.mobile-dark .text {
  color: white;
}

.mobile-light {
  background-color: #f4f4f4;
}
.mobile-light .data-item > div:nth-child(2) {
  color: black;
}
.mobile-light .text {
  color: black;
}
.mobile-light .block {
  background-color: #ffffff;
}
.mobile-light .block2 {
  background-color: #ffffff;
}
.mobile-light .payeer {
  filter: brightness(0) saturate(100%) invert(12%) sepia(19%) saturate(618%) hue-rotate(183deg) brightness(97%) contrast(89%);
}
.mobile-light .payeer2 {
  filter: brightness(0) saturate(100%) invert(12%) sepia(19%) saturate(618%) hue-rotate(183deg) brightness(97%) contrast(89%);
}
.mobile-light .button {
  background-color: #f1f4f3;
}
</style>
