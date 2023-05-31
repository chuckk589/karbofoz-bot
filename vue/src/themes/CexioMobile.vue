<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="flex-direction: column; align-items: stretch; padding: 0px 50px">
      <div style="justify-content: flex-start; padding: 14px 0 10px 11px">
        <FakeImg style="margin-right: 26px" :path="'/cexio/images/' + (payload.query.direction == 'out' ? '1.png' : '2.png')" />
        <div style="flex-direction: column; align-items: flex-start; width: 100%">
          <div style="font-family: Noto Sans Medium; font-size: 39px; width: 100%; justify-content: space-between">
            <div style="letter-spacing: 1.8px; font-weight: 600">{{ getConstant('t1' + payload.query.direction) }}</div>
            <div style="font-family: Noto Sans Regular; font-size: 40px">{{ formatSum }}</div>
          </div>
          <div style="width: 100%; justify-content: space-between; line-height: 34px; font-size: 29px; color: rgb(127, 147, 171); font-family: 'Noto Sans Regular'">
            <div>{{ getConstant('t2') }}</div>
            <div>{{ $dayjs(payload.query.date).format('DD MMM YY HH:mm:ss') }}</div>
          </div>
        </div>
      </div>
      <div class="data-item">
        <div>{{ getConstant('t3') }}</div>
        <div>{{ fixed(payload.query.balance, 6) }}</div>
      </div>
      <div class="data-item" style="align-items: flex-start">
        <div>{{ getConstant('t4') }}</div>
        <div style="overflow-wrap: anywhere; text-align: end; text-decoration: underline; max-width: 75%; line-height: 40px">{{ payload.query.txid }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
export default {
  name: 'CexioMobile',
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
    formatSum() {
      return `${this.payload.query.direction == 'out' ? '-' : ''}${this.fixed(this.payload.query.sum, 8)}`;
    },
  },
};
</script>
<style scoped>
/* @font-face {
  font-family: 'Open Sans';
  src: url('OpenSans.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Open Sans';
  src: url('OpenSans-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'Open Sans', sans-serif;
} */

@font-face {
  font-family: 'Noto Sans';
  src: url('../mexc/NotoSans-Black.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Noto Sans';
  src: url('../mexc/NotoSans-ExtraBold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Noto Sans';
  src: url('../mexc/NotoSans-Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Noto Sans Medium';
  src: url('../mexc/NotoSans-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Noto Sans';
  src: url('../mexc/NotoSans-ExtraLight.ttf') format('truetype');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Noto Sans Regular';
  src: url('../mexc/NotoSans-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Hacker Argot';
  src: url('../mexc/HackerArgot.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'Noto Sans Regular', sans-serif;
}
.data-item {
  font-size: 29px;
  padding: 12px 0;
  margin-bottom: 11px;
}

.data-item > div {
  flex-grow: 1;
}
.data-item > div:nth-child(1) {
  justify-content: flex-start !important;
}

.data-item > div:nth-child(2) {
  justify-content: flex-end !important;
  font-family: Noto Sans;
  font-weight: 600;
}
.mobile-dark {
  background-color: #10141f;
}
</style>
