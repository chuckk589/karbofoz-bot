<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; margin: 0 33px">
      <div style="height: 92px; margin-bottom: 43px"></div>
      <div style="height: 60px; margin-bottom: 47px; justify-content: space-between" class="huobi">
        <FakeImg :path="'/huobi/images/1.png'" style="margin-left: 10px" />
        <div></div>
      </div>
      <div class="data-item huobi-color" style="height: 145px; height: 145px; font-size: 75px; font-weight: 500; justify-content: flex-start; border: none">
        {{ formatSum }}
        {{ this.payload.currency.name }}
      </div>
      <div style="flex-direction: column; align-items: stretch">
        <div class="data-item">
          <div>{{ getConstant('t1') }}</div>
          <div class="data-item-col">
            <div class="huobi">╍</div>
            <div style="color: #606976">{{ getConstant('t2' + payload.query.direction) }}</div>
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t3') }}</div>
          <div class="huobi">{{ getConstant('t4') }}</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t7') }}</div>
          <div class="data-item-col">
            <div class="huobi">{{ payload.query.address }}</div>
            <div class="huobi-color">
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
          <div class="huobi">{{ feeFormatter() }} {{ payload.currency.name }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t10') }}</div>
          <div class="data-item-col">
            <div class="huobi">{{ payload.query.txid }}</div>
            <div class="huobi-color">
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
      return `${this.payload.query.sum > 0 ? '+' : ''} ${this.fixed(this.payload.query.sum, 8)} `;
    },
  },
  methods: {},
};
</script>
<style scoped>
.data-item {
  font-size: 37px;
  padding: 30px 0px;
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
.data-item-col > div:nth-child(2) > div {
  margin-right: 10px;
  font-size: 30px;
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
.data-item div:nth-child(1) {
  justify-content: flex-start !important;
  color: #606976;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
}
.mobile-light .huobi {
  filter: brightness(0) saturate(100%) invert(8%) sepia(14%) saturate(412%) hue-rotate(214deg) brightness(96%) contrast(94%);
}
.mobile-dark .huobi {
  filter: brightness(0) saturate(100%) invert(91%) sepia(15%) saturate(192%) hue-rotate(181deg) brightness(97%) contrast(91%);
}

.huobi-color {
  filter: brightness(0) saturate(100%) invert(43%) sepia(21%) saturate(4670%) hue-rotate(181deg) brightness(98%) contrast(100%);
}
</style>
