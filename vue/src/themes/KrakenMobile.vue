<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar">
      <div style="flex-direction: column; align-items: stretch; padding: 0px 165px">
        <div style="justify-content: space-between; padding: 55px 0px; margin-bottom: 35px; margin-right: -59px">
          <div style="width: 36px"></div>
          <FakeImg :path="'/kraken/images/2.png'" />
        </div>
        <div style="margin-bottom: 58px; position: relative">
          <FakeImg :path="'safepal/images/coins/' + payload.currency.name.toLowerCase() + '.png'" style="transform: scale(0.9)" />
          <div :style="'width: 104px;  position: absolute; flex-direction: column;' + (payload.query.direction == 'out' ? 'top:-8px;' : 'bottom: -8px;transform: rotate(180deg);')">
            <div :class="theme" style="height: 20px; width: 100%"></div>
            <div class="kraken-bd" style="width: 100%; border-radius: 7px; height: 7px"></div>
          </div>
        </div>
        <div class="text1" style="justify-content: flex-start; padding: 22px 0px">
          <FakeImg class="kraken2" :path="'/kraken/images/1.png'" />
        </div>
        <div class="data-item text1" style="border-top: 4px solid">
          <div>{{ getConstant('t1' + payload.query.direction) }}</div>
          <div>{{ getConstant('t2') }}</div>
        </div>
        <div class="data-item text2" v-if="payload.query.direction == 'in'">
          <div>{{ payload.currency.name }}</div>
          <div>{{ +(+payload.query.sum).toFixed(8) }}</div>
        </div>
        <div class="data-item text2" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t4') }}</div>
          <div>{{ payload.currency.name }} {{ +(+payload.query.sum).toFixed(8) }}</div>
        </div>
        <div class="data-item text2">
          <div>{{ getConstant('t3') }}</div>
          <div>{{ payload.currency.name }} {{ (+getConstant('cs_com' + payload.query.direction)).toFixed(2) }}</div>
        </div>
        <div class="data-item text1" v-if="payload.query.direction == 'out'" style="border-top: 3px solid">
          <div>{{ getConstant('t5') }}</div>
          <div>{{ payload.currency.name }} {{ +(+payload.query.sum).toFixed(8) - (+getConstant('cs_com' + payload.query.direction)).toFixed(2) }}</div>
        </div>
        <div class="data-item text2" style="margin-top: 132px; font-size: 30px; padding: 15px 0px; border-bottom: 4px solid; border-top: 0">
          <div>{{ getConstant('t6') }}</div>
          <div>{{ formatDate }}</div>
        </div>
        <div style="font-size: 35px; justify-content: flex-end; margin-top: 17px; font-family: 'font'">
          <div class="text2">{{ getConstant('t7') }}&nbsp;</div>
          <div style="color: #9b7fe5">{{ genID }}</div>
        </div>
      </div>
      <div class="text2 block" style="margin-top: auto; height: 350px; font-size: 37px; padding-top: 90px">
        {{ getConstant('t8') }}
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
export default {
  name: 'KrakenMobile.',
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
      return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('ll HH:mm');
    },
    genID() {
      return `${this.randomStr(6)}-${this.randomStr(5)}-${this.randomStr(6)}`;
    },
  },
  methods: {
    randomStr(length) {
      return Math.random().toString(36).substr(2, length).toUpperCase();
    },
  },
};
</script>
.sumFormatter
<style scoped>
@font-face {
  font-family: 'font';
  src: url('../kraken/kraken.ttf');
}

.data-item {
  font-size: 42px;
  letter-spacing: 1px;
  padding: 14px 0;
  border-top: 2px solid;
}
.data-item:last-child {
  border-bottom: none;
}
.data-item > div {
  flex-grow: 1;
}
.data-item > div:nth-child(1) {
  justify-content: flex-start !important;
}
.data-item > div:nth-child(2) {
  justify-content: flex-end !important;
}
.mobile-dark {
  background-color: #121212;
}
/*colors*/

.mobile-light {
  background-color: #ffffff;
}
.mobile-dark .kraken2 {
  filter: brightness(0) saturate(100%) invert(89%) sepia(6%) saturate(25%) hue-rotate(326deg) brightness(102%) contrast(88%);
}
.mobile-light .kraken2 {
  filter: brightness(0) saturate(100%) invert(9%) sepia(1%) saturate(987%) hue-rotate(314deg) brightness(104%) contrast(86%);
}
.mobile-dark .kraken-bd {
  backdrop-filter: brightness(0) saturate(100%) invert(89%) sepia(6%) saturate(25%) hue-rotate(326deg) brightness(102%) contrast(88%);
}
.mobile-light .kraken-bd {
  filter: brightness(0) saturate(100%) invert(9%) sepia(1%) saturate(987%) hue-rotate(314deg) brightness(104%) contrast(86%);
}

.mobile-light .text1 {
  color: #434343;
}
.mobile-dark .text1 {
  color: white;
}
.mobile-light .text2 {
  color: #707070;
}
.mobile-dark .text2 {
  color: #979797;
}
.mobile-light .block {
  background-color: #ebebeb;
}
.mobile-dark .block {
  background-color: #000000;
}
</style>
