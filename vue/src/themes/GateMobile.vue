<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; margin: 0 42px">
      <div class="gate" style="height: 113px; margin-bottom: 54px; justify-content: space-between">
        <FakeImg :path="'/gate/images/1.png'" style="margin-left: 16px" />
        <div style="font-size: 47px; font-weight: 900">{{ getConstant('t1' + payload.query.direction) }}</div>
        <FakeImg :path="'/gate/images/2.png'" />
      </div>
      <div style="height: 55px; margin-bottom: 35px; font-size: 39px" class="gray">{{ getConstant('t2') }}</div>
      <div style="height: 89px; margin-bottom: 42px">
        <div class="gate" style="font-size: 90px">{{ formatSum }}</div>
        <div class="gray" style="align-self: end; font-size: 38px; margin-left: 25px">
          {{ this.payload.currency.name }}
        </div>
      </div>
      <div style="height: 55px; margin-bottom: 105px; font-size: 40px; color: #11ae79">
        <FakeImg :path="'/gate/images/3.png'" style="margin-right: 20px" />
        <div>{{ getConstant('t3') }}</div>
      </div>
      <div style="flex-direction: column; align-items: stretch; font-size: 40px; padding: 42px 42px; border-radius: 20px">
        <div class="data-item">
          <div>{{ getConstant('t4' + payload.query.direction) }}</div>
          <div>{{ getConstant('t5' + payload.query.direction) }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t6') }}</div>
          <div>{{ dateFormatter(payload.query.date) }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t7') }}</div>
          <div>{{ payload.query.direction == 'in' ? '-' : payload.network.name }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t8') }}</div>
          <div>{{ formatOrder }}</div>
          <FakeImg :path="'/gate/images/4.png'" />
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t11') }}</div>
          <div>{{ getConstant('cs_com') }} {{ payload.currency.name }}</div>
        </div>
        <div class="data-item" style="flex-wrap: wrap">
          <div>{{ getConstant('t9' + payload.query.direction) }}</div>
          <div>
            <div>{{ payload.query.direction == 'in' ? '-' : formatLength(payload.query.address) }}</div>
            <FakeImg class="gray" v-if="payload.query.direction == 'out'" :path="'/gate/images/4.png'" style="margin-left: auto" />
          </div>
        </div>
        <div class="data-item" style="flex-wrap: wrap">
          <div style="min-width: 100%">{{ getConstant('t10') }}</div>
          <div style="overflow-wrap: anywhere">
            <div>{{ payload.query.txid }}</div>
            <FakeImg class="gray" :path="'/gate/images/4.png'" style="margin-left: auto" />
          </div>
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
  name: 'GateMobile',
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
    formatSum() {
      return `${this.payload.query.sum > 0 ? '+' : ''} ${this.fixed(this.payload.query.sum, 4)} `;
    },
    formatOrder() {
      const iterations = Math.round(this.$dayjs().diff(this.$dayjs(this.payload.query.date), 'minute') / 5);
      return this.payload.query.order || this.payload.query.direction == 'in' ? 140861850 + iterations : 34264669 + iterations;
    },
  },
  methods: {
    formatLength(value) {
      return value.substr(0, 35) + '...';
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: 'font';
  src: url('../gate/gate.ttf');
}
#main {
  font-family: 'font';
}
.data-item {
  margin-bottom: 40px;
}
.data-item > div {
  flex-grow: 1;
}
.data-item div:nth-child(1) {
  justify-content: flex-start !important;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
}
.data-item div:nth-child(3) {
  flex-grow: 0 !important;
  margin-left: 20px;
}
.mobile-dark {
  background-color: #151925;
}
.mobile-dark > div > div:last-child {
  background-color: #1e2432;
}
.mobile-light {
  background-color: white;
}
.mobile-light > div > div:last-child {
  background-color: #f9fafe;
}
.mobile-dark .gate,
.mobile-dark .data-item div:nth-child(2):not(:has(img)),
.mobile-dark .data-item div > div:first-child {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}

.mobile-light .gate,
.mobile-light .data-item div:nth-child(2):not(:has(img)),
.mobile-light .data-item div > div:first-child {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
}
.gray,
.data-item > div:nth-child(1) {
  filter: brightness(0) saturate(100%) invert(59%) sepia(7%) saturate(618%) hue-rotate(185deg) brightness(96%) contrast(93%);
}
</style>
