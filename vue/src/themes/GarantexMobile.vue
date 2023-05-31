<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="flex-direction: column; align-items: stretch; margin: 0 40px">
      <div
        v-if="payload.query.direction == 'out'"
        class="text1"
        style="font-weight: 600; font-size: 60px; padding: 25px 36px 32px; justify-content: flex-start; border-bottom: 5px solid rgb(244, 244, 244); letter-spacing: 1px"
      >
        {{ getConstant('t1') }}
      </div>
      <div class="data-item" style="margin-top: 14px; line-height: 78px">
        <div style="font-weight: 600; font-size: 57px; letter-spacing: 2px">{{ formatDate }}</div>
        <div>
          <FakeImg style="margin-right: 20px" :path="'/garantex/images/2.png'" />
          <div class="text2">{{ formatTime }}</div>
        </div>
      </div>
      <div class="data-item">
        <div>{{ lengthFormatter(payload.query.txid, 28, 'end') }}</div>
        <FakeImg class="garantex" style="flex-grow: 0; margin-left: auto" :path="'/garantex/images/3.png'" />
      </div>
      <div class="footer">
        <div>
          <div>{{ getConstant('t2') }}</div>
          <div style="max-height: 75px">
            <FakeImg style="transform: scale(0.55); margin-left: -27px; margin-right: -14px" :path="'safepal/images/coins/' + payload.currency.alias + '.png'" />
            <div>{{ payload.currency.name }}</div>
          </div>
        </div>
        <div>
          <div>{{ getConstant('t3') }}</div>
          <div>{{ fixed(payload.query.sum, 6, true) }}</div>
        </div>
        <div>
          <div>{{ getConstant('t4') }}</div>
          <div>{{ payload.query.com || getConstant('cs_com' + payload.query.direction) }}</div>
        </div>
        <div>
          <div>{{ getConstant('t5') }}</div>
          <div>
            <FakeImg style="margin-right: 20px" :path="'/garantex/images/1.png'" />
            <div style="color: #28af62">{{ getConstant('t6' + payload.query.direction) }}</div>
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
  name: 'GarantexMobile',
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
      return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('DD.MM.YYYY');
    },
    formatTime() {
      return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('HH:mm');
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: 'Gilroy-Regular';
  src: url('../garantex/Gilroy-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Gilroy-Bold';
  src: url('../garantex/Gilroy-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'Gilroy-Regular';
}
.data-item {
  font-size: 53px;
  padding: 16px 37px;
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
.footer {
  justify-content: flex-start !important;
  padding: 0 37px;
  margin-bottom: 30px;
}
.footer > div {
  align-items: flex-start !important;
  flex-direction: column;
  margin-right: 26px;
}
.footer > div > div:nth-child(1) {
  padding: 4px 0;
  font-size: 37px;
}

.footer > div > div:nth-child(2) {
  font-size: 50px;
  margin-top: -6px;
}

.mobile-light .text1,
.mobile-light .data-item > div:nth-child(1),
.mobile-light .footer > div > div:nth-child(2) {
  color: black;
}
.mobile-light {
  background-color: #f2f2f2;
}
.mobile-light #wobar {
  background-color: white;
}
.mobile-light .text2,
.mobile-light .footer > div > div:nth-child(1) {
  color: #a4a4a4;
}
/*colors*/
.garantex {
  filter: brightness(0) saturate(100%) invert(77%) sepia(0%) saturate(506%) hue-rotate(174deg) brightness(85%) contrast(96%);
}
</style>
