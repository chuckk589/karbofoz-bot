<template>
  <div id="main" style="left: 0px; overflow: hidden; top: 0px; width: 1080px; height: 2274px; background-image: url(exodus/images/4.png)">
    <!-- <div style="height: 103px; background-color: red"></div> -->
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch">
      <div style="font-size: 37px; margin-bottom: 80px; margin-top: 25px">
        <div style="background-image: url(exodus/images/1.png); width: 55px; height: 39px; margin-left: 64px"></div>
        <div style="color: #9ca6c8; font-size: 37px; margin: auto">{{ getConstant('t1') }}</div>
        <div style="background-image: url(exodus/images/2.png); width: 46px; height: 65px; margin-right: 71px"></div>
      </div>

      <div class="data-item">
        <div>{{ getConstant('t11' + payload.query.direction) }}</div>
        <div :style="payload.query.direction === 'in' ? 'color:#5fa697' : 'color:#9599a5'">{{ sumFormatter() }}</div>
      </div>
      <div class="data-item" v-if="payload.query.direction === 'out'">
        <div>{{ getConstant('t9') }}</div>
        <div style="color: #9599a5">{{ feeFormatter() }} {{ payload.network.coin }}</div>
      </div>
      <div class="data-item">
        <div>{{ getConstant('t2') }}</div>
        <div style="color: #6c5dc3">{{ getConstant('t3') }}</div>
      </div>
      <div class="data-item">
        <div>{{ timeStampHeader() }}</div>
        <div>{{ timeStampValue() }}</div>
      </div>
      <div class="data-item" v-if="payload.query.address">
        <div>{{ getConstant('t10' + payload.query.direction) }}</div>
        <div
          style="
            line-height: 47px;
            font-size: 40px;
            margin-top: 17px;
            color: #3f099f;
            background: #907df0;
            background: linear-gradient(to left, #907df0 0%, #604ebf 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
        >
          {{ payload.query.address }}
        </div>
      </div>
      <div class="data-item">
        <div>{{ getConstant('t6') }}</div>
        <div
          style="
            line-height: 47px;
            font-size: 40px;
            margin-top: 17px;
            color: #3f099f;
            background: #907df0;
            background: linear-gradient(to left, #907df0 0%, #604ebf 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
        >
          {{ payload.query.txid }}
        </div>
      </div>
      <div class="data-item">
        <div>{{ getConstant('t7') }}</div>
        <div>{{ usdFormatter() }}</div>
      </div>
      <div class="data-item" style="height: 488px; justify-content: space-evenly">
        <kek style="background-image: url(exodus/images/3.png); width: 91px; height: 92px; margin-top: 36px"></kek>
        <div style="font-size: 42px">{{ getConstant('t8') }}</div>
        <div style="margin-bottom: 36px; font-size: 53px; background: #907df0; background: linear-gradient(to left, #907df0 0%, #604ebf 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent">
          {{ getConstant('t12') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
export default {
  name: 'ExodusMobile',
  mixins: [themeMixin],
  components: {
    StatusBar,
  },
  data() {
    return {
      theme: '',
    };
  },
  methods: {
    timeStampHeader() {
      return this.$dayjs(this.payload.query.date).isToday() ? this.getConstant('t4') : this.getConstant('t5');
    },
    timeStampValue() {
      if (this.$dayjs().diff(this.payload.query.date, 'day')) {
        return this.$dayjs().locale(this.payload.query.language).format('DD MMM YYYY, LT');
      }
      return this.$dayjs().locale(this.payload.query.language).to(this.$dayjs(this.payload.query.date)) + '...';
    },
    usdFormatter() {
      return this.fixed(this.payload.query.sum, 2, true, { style: 'currency', currency: 'USD' });
    },
    sumFormatter() {
      return `${this.payload.query.direction === 'in' ? '+' : ''}${this.fixed(this.payload.query.sum, 4, true)} ${this.payload.currency.name}`;
    },
  },
};
</script>
<style scoped>
body {
  font-family: 'Roboto';
}

.data-item {
  flex-direction: column;
  height: 265px;
  background: linear-gradient(180deg, rgba(46, 50, 79, 0.938813025210084) 0%, rgba(45, 49, 78, 0.8911939775910365) 50%, rgba(43, 47, 76, 0.908000700280112) 100%);
  border-radius: 31px;
  margin: 0 53px 24px 53px;
  word-break: break-word;
  text-align: center;
  padding: 0 40px;
}
.data-item div:nth-of-type(1) {
  font-size: 38px;
  color: #c8cad6;
}
.data-item div:nth-of-type(2) {
  font-size: 42px;
  color: #fdfeff;
}
</style>
