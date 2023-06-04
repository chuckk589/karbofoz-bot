<template>
  <div :class="theme" id="main" style="width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; padding: 0px 40px">
      <div style="height: 91px; justify-content: space-between">
        <FakeImg style="margin-left: 23px" class="bybit" :path="'/bybit/images/1.png'" />
        <div style="width: 19px"></div>
      </div>
      <div class="bybit" style="height: 121px; font-size: 74px; font-weight: 500; justify-content: flex-start">
        {{ payload.currency.name }}
      </div>
      <div style="flex-direction: column; align-items: stretch; margin-top: 49px">
        <div class="data-item">
          <div>{{ getConstant('t1') }}</div>
          <div>{{ getConstant('t2' + payload.query.direction) }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t3') }}</div>
          <div>{{ fixed(payload.query.sum, 4, false, { useGrouping: true }, 'en') }}</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t10') }}</div>
          <div>{{ feeFormatter() }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t4') }}</div>
          <div>{{ formatChain }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t5') }}</div>
          <div>
            <div style="width: 10px; height: 10px; background-color: #0bbc48; border-radius: 50%; margin-right: 12px" v-if="payload.query.direction == 'in'"></div>
            <div>{{ getConstant('t6' + payload.query.direction) }}</div>
          </div>
        </div>
        <div class="data-item" style="align-items: flex-start">
          <div>{{ getConstant('t7') }}</div>
          <div style="overflow-wrap: anywhere; text-align: end; max-width: 45%; align-items: flex-start">
            <div style="line-height: 49px; margin-right: 11px">{{ payload.query.txid }}</div>
            <FakeImg class="bybit" style="margin: 9px 5px" :path="'/bybit/images/2.png'" />
          </div>
        </div>
        <div class="data-item" style="align-items: flex-start">
          <div>{{ getConstant('t8' + payload.query.direction) }}</div>
          <div style="overflow-wrap: anywhere; text-align: end; max-width: 45%; align-items: flex-start">
            <div style="line-height: 49px; margin-right: 11px">{{ payload.query.address }}</div>
            <FakeImg class="bybit" style="margin: 9px 5px" :path="'/bybit/images/2.png'" />
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t9') }}</div>
          <div>{{ dateFormatter(payload.query.date) }}</div>
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
  name: 'BybitMobile',
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
    formatChain() {
      return this.payload.network.alias == 'bep20' ? `${this.payload.network.name} (${this.payload.network.alias.toUpperCase()})` : this.payload.network.alias.toUpperCase();
    },
    // formatDate() {
    //   return this.$dayjs(this.payload.query.date)
    //     .locale(this.payload.query.language)
    //     .format(this.payload.query.language == 'es' ? 'DD MMM YYYY' : 'll');
    // },
    // formatTime() {
    //   return this.$dayjs(this.payload.query.date)
    //     .locale(this.payload.query.language)
    //     .format(this.payload.query.language == 'es' ? 'h:mm' : 'HH:mm');
    // },
    // sumFormatter() {
    //   return `${this.payload.query.direction == 'in' ? '+' : '-'} ${this.fixed(this.payload.query.sum, 7, true)} `;
    // },
    // formatCom() {
    //   return `${this.payload.network.alias == 'trc20' ? '-' : ''}${this.feeFormatter()}`;
    // },
  },
  methods: {},
};
</script>
.sumFormatter
<style scoped>
@font-face {
  font-family: 'IBM Plex Sans';
  src: url('../bybit/IBMPlexSans-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Sans';
  src: url('../bybit/IBMPlexSans.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Sans';
  src: url('../bybit/IBMPlexSans-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Sans';
  src: url('../bybit/IBMPlexSans-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'IBM Plex Sans';
}
.data-item {
  font-size: 37px;
  padding: 22px 0;
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
  background-color: #100f13;
}
.mobile-light {
  background-color: #fdfdfd;
}
.mobile-light .bybit {
  filter: brightness(0) saturate(100%) invert(16%) sepia(0%) saturate(37%) hue-rotate(198deg) brightness(99%) contrast(88%);
}
.mobile-dark .bybit {
  filter: brightness(0) saturate(100%) invert(100%) sepia(11%) saturate(1236%) hue-rotate(189deg) brightness(108%) contrast(72%);
}
.mobile-dark .data-item > div:nth-child(1) {
  color: #adadaf;
}
.mobile-dark .data-item > div:nth-child(2) {
  color: #fff;
}
.mobile-light .data-item > div:nth-child(1) {
  color: #666666;
}
.mobile-light .data-item > div:nth-child(2) {
  color: #000;
}
</style>
