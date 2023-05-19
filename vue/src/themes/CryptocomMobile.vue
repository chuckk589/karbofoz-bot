<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch">
      <div style="padding: 0px 38px 110px; flex-direction: column; align-items: flex-start; justify-content: flex-start">
        <div style="height: 69px; margin-bottom: 53px; margin-top: 40px; padding: 0 14px; justify-content: space-between">
          <FakeImg :path="'/cryptocom/images/1.png'" />
          <div style="width: 41px"></div>
        </div>
        <div style="height: 63px; margin-bottom: 50px; font-size: 59px; justify-content: flex-start">
          {{ getConstant('t1' + payload.query.direction) }} {{ payload.currency.name }} ({{ payload.network.alias.toUpperCase() }})
        </div>
        <div style="height: 48px; margin-bottom: 30px; font-size: 43px; justify-content: flex-start; color: #33b2a7">{{ getConstant('t2') }}</div>
        <div style="height: 49px; justify-content: flex-start; font-size: 45px">{{ formatDate }}</div>
      </div>
      <div style="flex-direction: column; height: 100%; padding: 130px 38px 0; color: black; align-items: flex-start">
        <div style="height: 113px; margin-bottom: 36px; margin-left: 15px; font-size: 134px">
          {{ fixed(payload.query.sum, 2) }} &nbsp;<span style="font-size: 70px; color: #646870">{{ payload.currency.name }}</span>
        </div>
        <div style="height: 85px; margin-bottom: auto; font-size: 45px; padding: 10px 40px; border: 3px solid #e1e2e3; border-radius: 25px">{{ usdFormatter }}</div>
        <div style="height: 48px; font-size: 40px; color: #646870">{{ getConstant('t3' + payload.query.direction) }}</div>
        <div style="flex-direction: column; align-items: stretch; margin-top: 25px; border-top: 3px solid #e1e2e3; place-self: stretch">
          <div class="data-item" v-if="payload.query.direction == 'out'">
            <div>{{ getConstant('t4') }}</div>
            <div>{{ sumFormatter }}</div>
          </div>
          <div class="data-item" style="align-items: flex-start">
            <div>{{ getConstant('t5' + payload.query.direction) }}</div>
            <div style="overflow-wrap: anywhere; color: #2a95da; max-width: 725px; text-align: end">{{ payload.query.address }}</div>
          </div>
          <div class="data-item">
            <div>{{ getConstant('t6') }}</div>
            <div>{{ payload.network.alias.toUpperCase() }}</div>
          </div>
          <div class="data-item" v-if="payload.query.direction == 'out'">
            <div>{{ getConstant('t7') }}</div>
            <div>{{ fixed(getConstant('cs_com'), 2) }} {{ payload.currency.name }}</div>
          </div>
          <div class="data-item" v-if="payload.query.direction == 'out'">
            <div>{{ getConstant('t8') }}</div>
            <div>{{ fixed(payload.query.sum, 2) }} {{ payload.currency.name }}</div>
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
  name: 'CryptocomMobile',
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
    formatDate() {
      return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('lll');
    },
    usdFormatter() {
      const sum = this.payload.query.sum - this.getConstant('cs_com');
      return '$' + (sum - (Math.random() * (0.005 - 0.001) + 0.001) * sum).toFixed(2) + ' USD';
    },
    sumFormatter() {
      return this.fixed(this.payload.query.sum - this.getConstant('cs_com'), 2) + ' ' + this.payload.currency.name;
    },
  },
  methods: {},
};
</script>
.sumFormatter
<style scoped>
#main {
  font-family: 'Roboto';
}
.bar {
  background-color: #071e3d !important;
}
#wobar > div:nth-child(1) {
  background-color: #162f58;
}
#wobar > div:nth-child(2) {
  background-color: white;
}
.data-item {
  font-size: 45px;
  padding: 25px 0px;
}
.data-item > div {
  flex-grow: 1;
}
.data-item {
  color: #091323;
}
.data-item div:nth-child(1) {
  justify-content: flex-start !important;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
}
/*colors*/
</style>
