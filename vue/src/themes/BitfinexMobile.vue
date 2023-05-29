<template>
  <div :class="theme" id="main" style="width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch">
      <div style="font-size: 59px; font-weight: 600; padding: 6px 25px 29px; justify-content: space-between" class="data-block">
        <FakeImg class="bitfinex" style="margin-left: 20px" :path="'/bitfinex/images/3.png'" />
        <div class="bitfinex" style="transform: scaleX(1.1); margin-left: -13px">{{ formatCurrency }} {{ getConstant('t1' + payload.query.direction) }}</div>
        <FakeImg class="bitfinex" :path="'/bitfinex/images/2.png'" />
      </div>

      <div class="data-block" style="flex-direction: column; align-items: stretch; background: linear-gradient(180deg, rgba(255, 255, 255, 0.06486344537815125) 0%, rgba(255, 255, 255, 0) 1%)">
        <div class="wrng" v-if="payload.query.direction == 'out'" style="font-size: 32px; border-radius: 20px; margin: 20px 20px 0px; padding: 30px 36px; letter-spacing: 1px; font-weight: 500; font-family: 'Roboto'">
          <FakeImg :path="'/bitfinex/images/1.png'" style="margin-right: 31px" />
          <div style="display: inline; line-height: 40px">
            {{ getConstant('t14') }} <span>{{ getConstant('t15') }}</span>
          </div>
        </div>
        <div class="data-item" style="margin-top: 20px">
          <div>{{ getConstant('t2') }}</div>
          <div>{{ formatID }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t3') }}</div>
          <div>{{ getConstant('t4') }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t5') }}</div>
          <div>
            {{ fixed(payload.query.sum, 2) }}
            <span style="font-size: 35px; margin-left: 6px"> {{ formatCurrency }}</span>
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t6') }}</div>
          <div>{{ getConstant('t7') }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t8') }}</div>
          <div>
            {{ formatDate('date') }}&nbsp;
            <span>{{ formatTime('date') }}</span>
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t9') }}</div>
          <div>
            {{ formatDate('dateup') }}&nbsp;
            <span>{{ formatTime('dateup') }}</span>
          </div>
        </div>

        <div class="data-item">
          <div>{{ getConstant('t10') }}</div>
          <div>
            <div>{{ lengthFormatter(payload.query.address, 35) }}</div>
            <FakeImg class="bitfinex" :path="'/bitfinex/images/4.png'" style="margin-left: 35px; margin-right: 14px" />
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t11') }}</div>
          <div style="margin-right: 50px">{{ lengthFormatter(payload.query.txid, 35) }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t12') }}</div>
          <div>{{ getConstant('t13' + payload.query.direction) }}{{ formatID }}</div>
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
  name: 'BitfinexMobile',
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
    formatCurrency() {
      return this.payload.currency.name.slice(0, 3) + this.payload.currency.name[3].toLowerCase();
    },

    formatID() {
      return this.payload.query.id || this.formatConf('cs_step' + this.payload.query.direction);
      // const start = this.getConstant('cs_id' + this.payload.query.direction);
      // const minutes = this.$dayjs(this.payload.query.date).diff('2023-04-23 11:30:00', 'minutes');
      // return +start + minutes;
    },
  },
  methods: {
    formatDate(key) {
      return this.payload.query[key] ? this.$dayjs(this.payload.query[key]).format('YY-MM-DD') : this.$dayjs(this.payload.query.date).format('YY-MM-DD');
    },
    formatTime(key) {
      return this.payload.query[key] ? this.$dayjs(this.payload.query[key]).format('HH:mm:ss') : this.$dayjs(this.payload.query.date).add(5, 'minutes').format('HH:mm:ss');
    },
  },
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
  font-size: 38px;
  padding: 18px 0px;
  border-bottom: 3px solid;
}
.data-item > div {
  flex-grow: 1;
}
.data-item > div:nth-child(1) {
  margin-left: 20px;
  font-weight: 700;
  font-size: 40px;
  letter-spacing: 1px;
}

.data-item > div:nth-child(2) {
  margin-right: 20px;
}
.mobile-dark {
  background-color: #101e2b;
}
.mobile-light {
  background-color: #ffffff;
}
.mobile-dark .wrng {
  background-color: #442d35;
  color: #e44b44;
}
.mobile-light .wrng {
  background-color: #eecaca;
  color: #e44b44;
}
.wrng span {
  color: #1bc19a;
}
.mobile-dark .data-item {
  color: white;
  border-color: #0e1f29;
}
.mobile-light .data-item {
  color: #313434;
  border-color: black;
}
.mobile-dark .data-block {
  background-color: #102331 !important;
}
.mobile-light .data-block {
  background-color: #edf3f3 !important;
}
.mobile-light .data-block {
  border-top: 3px solid black;
}
.data-item span {
  color: #808e98;
}

.data-item div:nth-child(1) {
  justify-content: flex-start !important;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
}
.mobile-light .bitfinex {
  filter: brightness(0) saturate(100%) invert(14%) sepia(6%) saturate(146%) hue-rotate(131deg) brightness(103%) contrast(84%);
}
.mobile-dark .bitfinex {
  filter: brightness(0) saturate(100%) invert(100%) sepia(1%) saturate(665%) hue-rotate(191deg) brightness(106%) contrast(100%);
}

.bitfinex-color {
  filter: brightness(0) saturate(100%) invert(43%) sepia(21%) saturate(4670%) hue-rotate(181deg) brightness(98%) contrast(100%);
}
</style>
