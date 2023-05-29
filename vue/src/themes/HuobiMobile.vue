<template>
  <div :class="theme" id="main" style="width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; padding: 0 38px">
      <div style="margin-top: 30px; margin-bottom: 47px; justify-content: space-between" class="huobi">
        <FakeImg :path="'/huobi/images/1.png'" />
        <div></div>
      </div>
      <div class="huobi-color" style="font-family: Roboto-Regular; letter-spacing: 2.2px; padding: 19px 0px; font-size: 70px; font-weight: 600; justify-content: flex-start">
        {{ formatSum }}{{ this.payload.currency.name }}
      </div>
      <div style="flex-direction: column; align-items: stretch">
        <div class="data-item">
          <div>{{ getConstant('t1') }}</div>
          <div class="data-item-col">
            <div class="huobi">--</div>
            <div style="margin-top: 10px" class="dep-type">
              {{ getConstant('t2' + payload.query.direction) }}
            </div>
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t3') }}</div>
          <div class="huobi">{{ getConstant('t4') }}</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t7') }}</div>
          <div class="data-item-col">
            <div class="huobi" style="line-height: 40px">{{ payload.query.address }}</div>
            <div class="huobi-color huobi-copy">
              <FakeImg :path="'/huobi/images/2.png'" />
              <div>{{ getConstant('t5') }}</div>
            </div>
          </div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t8') }}</div>
          <div class="huobi">{{ payload.network.alias.toUpperCase() }}</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t9') }}</div>
          <div class="huobi">{{ huobiFee }} {{ payload.currency.name }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t10') }}</div>
          <div class="data-item-col">
            <div class="huobi" style="line-height: 40px">{{ payload.query.txid }}</div>
            <div class="huobi-color huobi-copy">
              <FakeImg :path="'/huobi/images/2.png'" />
              <div>{{ getConstant('t5') }}</div>
            </div>
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t6') }}</div>
          <div class="huobi">{{ formatTime }}</div>
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
  name: 'HuobiMobile',
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
    formatTime() {
      return this.$dayjs(this.payload.query.date).format('HH:mm DD/MM');
    },
    formatSum() {
      return `${this.payload.query.direction == 'in' ? '+' : '-'} ${this.fixed(this.payload.query.sum, 8)}`;
    },
    huobiFee() {
      return this.payload.query.com || this.feeFormatter();
    },
  },
  methods: {},
};
</script>
<style scoped>
@font-face {
  font-family: 'Roboto-Regular';
  src: url('../huobi/Roboto-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'Roboto';
}
.data-item {
  font-size: 37px;
  align-items: start !important;
  padding: 46px 0px;
  line-height: 30px;
}
.data-item > div {
  flex-grow: 1;
}
.data-item-col {
  flex-direction: column;
  align-items: flex-end !important;
  text-align: end;
  max-width: 500px;
  overflow-wrap: anywhere;
}
.huobi-copy {
  font-size: 32px;
  margin-top: 20px;
}
.huobi-copy > div:first-child {
  margin-right: 17px;
}
.mobile-dark {
  background-color: #1a202e;
}
.mobile-light {
  background-color: #ffffff;
}
.mobile-dark .bar {
  background-color: #10131c;
}
.mobile-light .bar {
  background-color: #999999;
}
.mobile-light .data-item {
  border-bottom: #e8e9e9 1px solid;
}
.mobile-dark .data-item {
  border-bottom: #2d3342 1px solid;
}
.mobile-light .data-item:first-child {
  border-top: #e8e9e9 1px solid;
}
.mobile-dark .data-item:first-child {
  border-top: #2d3342 1px solid;
}
.mobile-dark .data-item div:nth-child(1) {
  justify-content: flex-start !important;
  color: #737d94;
}
.mobile-light .data-item div:nth-child(1) {
  justify-content: flex-start !important;
  color: #62696f;
}
.mobile-light .dep-type {
  color: #99a0aa;
}
.mobile-dark .dep-type {
  color: #485366;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
  font-family: 'Roboto-Regular';
}
.mobile-light .huobi {
  filter: brightness(0) saturate(100%) invert(8%) sepia(14%) saturate(412%) hue-rotate(214deg) brightness(96%) contrast(94%);
}
.mobile-dark .huobi {
  filter: brightness(0) saturate(100%) invert(91%) sepia(15%) saturate(192%) hue-rotate(181deg) brightness(97%) contrast(91%);
}

.mobile-dark .huobi-color {
  filter: brightness(0) saturate(100%) invert(48%) sepia(69%) saturate(3059%) hue-rotate(182deg) brightness(95%) contrast(107%);
}
.mobile-light .huobi-color {
  /* color: #0372e4; */
  /* text-shadow: 1px 0px 4px #d1fdff; */
  filter: brightness(0) saturate(100%) invert(27%) sepia(74%) saturate(4228%) hue-rotate(198deg) brightness(99%) contrast(98%);
}
</style>
