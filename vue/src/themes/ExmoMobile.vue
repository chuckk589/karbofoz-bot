<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="flex-direction: row">
      <div style="flex-direction: column; align-items: stretch; margin-left: 40px">
        <div style="font-size: 47px; padding: 20px 0 0 0; justify-content: space-between">
          <div>
            <FakeImg style="margin-right: 8px" :path="'/exmo/images/1.png'" />
            <div class="text1">{{ payload.currency.name }}</div>
          </div>
          <div style="margin-right: 15px" class="text1">{{ fixed(payload.query.sum, 0, true).toLocaleString('en') }}</div>
        </div>
        <div class="data-item">
          <div>{{ formatDate }}</div>
          <div :class="payload.query.direction">
            <FakeImg :style="'margin-right: 10px; transform: ' + (payload.query.direction == 'in' ? '' : 'rotate(180deg)')" :path="'/exmo/images/3.png'" />
            <div>{{ getConstant('t1' + payload.query.direction) }}</div>
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t3') }}</div>
          <div style="font-size: 38px">{{ getConstant('t4' + payload.query.direction) }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t5') }}</div>
          <div style="font-size: 38px">{{ payload.currency.name }} ({{ payload.network.alias.toUpperCase() }})</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t7') }}</div>
          <div class="text2" style="text-decoration: underline; text-align: end; overflow-wrap: anywhere; line-height: 40px">{{ formatAd }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t2') }}</div>
          <div class="text2" style="text-decoration: underline; text-align: end; overflow-wrap: anywhere; line-height: 40px">{{ payload.query.txid }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t6') }}</div>
          <div style="font-size: 38px">{{ formatConf('cs_step' + payload.query.direction) }}</div>
        </div>
      </div>
      <div style="width: 166px; align-items: flex-start; margin-top: 77px">
        <FakeImg :path="'/exmo/images/2.png'" />
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
export default {
  name: 'ExmoMobile',
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
    formatDate() {
      return this.$dayjs(this.payload.query.date).format('DD.MM.YY HH:mm');
    },
    formatAd() {
      return `${this.payload.currency.name}${this.payload.network.alias.toUpperCase()}: ${this.payload.query.address}`;
    },
  },
};
</script>
<style scoped>
#main {
  font-family: 'Roboto', sans-serif;
}
.data-item {
  font-size: 33px;
  padding: 8px 0;
  margin-bottom: 25px;
  align-items: flex-start !important;
}

.data-item > div {
  flex-grow: 1;
}
.data-item > div:nth-child(1) {
  min-width: 337px;
  justify-content: flex-start !important;
}

.data-item > div:nth-child(2) {
  justify-content: flex-end !important;
  margin-right: 15px;
}

.footer > div {
  flex-direction: column;
}
.footer > div > div:nth-child(1) {
  margin-bottom: 5px;
  height: 51px;
}
/*colors*/
.out {
  filter: brightness(0) saturate(100%) invert(54%) sepia(9%) saturate(3639%) hue-rotate(314deg) brightness(92%) contrast(93%);
}
.in {
  filter: brightness(0) saturate(100%) invert(66%) sepia(56%) saturate(369%) hue-rotate(72deg) brightness(89%) contrast(89%);
}
.mobile-dark {
  background-color: #202336;
}
.mobile-light {
  background-color: #fff8f5;
}
.mobile-dark .text1,
.mobile-dark .data-item > div:nth-child(2) {
  color: white;
}
.mobile-light .text1,
.mobile-light .data-item > div:nth-child(2) {
  color: black;
}
.mobile-dark .text2,
.mobile-dark .data-item > div:nth-child(1) {
  color: #8995a1 !important;
}
.mobile-light .text2,
.mobile-light .data-item > div:nth-child(1) {
  color: #8a969b !important;
}

/*
.mobile-dark #wobar {
  background-color: #121a27;
}
.mobile-light #wobar {
  background-color: white;
}
.mobile-dark .text1,
.mobile-dark .data-item > div:nth-child(1) {
  color: #abbed3 !important;
}
.mobile-light .text1,
.mobile-light .data-item > div:nth-child(1) {
  color: black;
}

.mobile-dark .text2,
.mobile-dark .data-item > div:nth-child(2) {
  color: #3861d7;
}
.mobile-light .text2,
.mobile-light .data-item > div:nth-child(2) {
  color: #1b46b4;
}
.out {
  filter: brightness(0) saturate(100%) invert(18%) sepia(67%) saturate(2431%) hue-rotate(215deg) brightness(105%) contrast(100%);
}
.in {
  filter: brightness(0) saturate(100%) invert(54%) sepia(73%) saturate(597%) hue-rotate(350deg) brightness(98%) contrast(90%);
} */
</style>
