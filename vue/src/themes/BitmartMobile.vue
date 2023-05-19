<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; padding: 0 37px">
      <div class="bitmart" style="font-size: 64px; font-weight: 700; margin-top: 25px; justify-content: space-between; margin-left: 10px; margin-bottom: 62px">
        <FakeImg :path="'/bitmart/images/1.png'" />
      </div>
      <div class="text" style="justify-content: flex-start; font-size: 64px; margin-left: 14px; font-family: 'Roboto'; margin-bottom: 116px">{{ getConstant('t1') }}</div>
      <div class="pc-block" style="color: #08aba6; font-weight: 600">
        <div style="left: 143px; position: absolute">
          <FakeImg :path="'/bitmart/images/3.png'" />
          <div>{{ getConstant('t2') }}</div>
        </div>
        <div style="left: 371px; position: absolute">
          <FakeImg :path="'/bitmart/images/3.png'" />
          <div>{{ getConstant('t3') }} {{ getConstant('cs_proc') }}</div>
        </div>
        <div style="left: 737px; position: absolute">
          <FakeImg :path="'/bitmart/images/3.png'" />
          <div>{{ getConstant('t4') }}</div>
        </div>
        <div style="position: absolute; border-bottom: 3px solid #08aba6; width: 272px; top: 24px; left: 211px"></div>
        <div style="position: absolute; border-bottom: 3px solid #08aba6; width: 272px; top: 24px; left: 519px"></div>
      </div>
      <div class="text" style="font-size: 61px; margin-bottom: 30px; font-weight: 900; justify-content: flex-start">{{ formatPair }} {{ fixed(payload.query.sum, 8) }}</div>
      <div class="data-block" style="flex-direction: column; align-items: stretch; margin-bottom: 62px">
        <div class="data-item">
          <div>{{ getConstant('t5') }} ({{ formatPair }})</div>
          <div class="text">{{ fixed(payload.query.sum, 8) }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t6') }} ({{ formatPair }})</div>
          <div class="text">{{ getConstant('cs_com') }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t7') }}</div>
          <div class="text">{{ formatID }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t8') }}</div>
          <div class="text">{{ dateFormatter(payload.query.date) }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t9') }}</div>
          <div class="text">{{ finishedFormat }}</div>
        </div>
        <div class="data-item" style="align-items: flex-start" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t15') }}</div>
          <div class="text" style="max-width: 554px; overflow-wrap: anywhere; text-align: end; line-height: 50px">{{ payload.query.address }}</div>
        </div>
        <div class="data-item" style="align-items: flex-start">
          <div>{{ getConstant('t10') }}</div>
          <div class="text" style="max-width: 554px; overflow-wrap: anywhere; text-align: end; line-height: 50px">{{ payload.query.txid }}</div>
        </div>
      </div>
      <div class="text" style="font-size: 40px; font-weight: 700; height: 116px; align-items: stretch; margin-bottom: 82px">
        <div class="button" style="width: 485px; border-radius: 13px; margin-right: 24px">{{ getConstant('t11') }}</div>
        <div style="width: 485px; border-radius: 13px; background-color: #08aba6; color: white !important">{{ getConstant('t12') }}</div>
      </div>
      <div style="font-size: 32px; line-height: 40px; justify-content: flex-start; color: #9ca0a3">
        <FakeImg :path="'/bitmart/images/2.png'" style="margin-right: 30px" />
        <div style="flex-direction: column; align-items: flex-start">
          <div>{{ getConstant('t13') }}</div>
          <div style="text-decoration: underline">{{ getConstant('t14') }}</div>
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
  name: 'BitmartMobile',
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
    formatID() {
      const start = this.getConstant('cs_id');
      const minutes = Math.round(this.$dayjs(this.payload.query.date).diff('2023-04-7 18:00:00', 'minutes') / 5);
      return +start + minutes;
    },
    finishedFormat() {
      return this.$dayjs(this.payload.query.date)
        .add(Math.random() * 400, 'second')
        .format('YYYY-MM-DD HH:mm:ss');
    },
    formatPair() {
      return this.payload.currency.name + '-' + this.payload.network.name;
    },
  },
  methods: {},
};
</script>
<style scoped>
@font-face {
  font-family: 'font';
  src: url('../bitmart/bitmart.ttf');
}
#main {
  font-family: 'font';
}
.pc-block {
  position: relative;
  font-size: 35px;
  display: block !important;
  height: 236px;
}
.pc-block div {
  flex-direction: column;
}

.pc-block > div > div:nth-child(2) {
  margin-top: 20px;
}
.data-item {
  font-size: 35px;
  padding: 32px 0px;
}
.data-item > div {
  flex-grow: 1;
}
.data-item div:nth-child(1) {
  justify-content: flex-start !important;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
  font-weight: 600;
}
/*colors*/
.mobile-dark {
  background-color: #141720;
}
.mobile-light {
  background-color: #ffffff;
}
.mobile-light .bitmart {
  filter: brightness(0) saturate(100%) invert(14%) sepia(6%) saturate(146%) hue-rotate(131deg) brightness(103%) contrast(84%);
}
.mobile-dark .bitmart {
  filter: brightness(0) saturate(100%) invert(91%) sepia(15%) saturate(192%) hue-rotate(181deg) brightness(97%) contrast(91%);
}
.mobile-dark .button {
  background-color: #202028;
}
.mobile-light .button {
  background-color: #f3f4f8;
}
.mobile-dark .data-item {
  border-bottom: 1px solid #1f202a;
}
.mobile-light .data-item {
  border-bottom: 1px solid #f3f4f5;
}
.data-item > div:nth-child(1) {
  color: #9ca0a3;
}
.mobile-dark .text {
  color: #caced7;
}
.mobile-light .text {
  color: #2b2e36;
}
</style>
