<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="flex-direction: column; align-items: stretch; margin: 0 50px">
      <div style="flex-direction: column; border-top: 5px solid; padding: 45px 0px 101px; margin: 75px 218px 0px">
        <div class="text1" style="font-size: 40px; font-weight: 500; letter-spacing: 1px">{{ formatSum }}</div>
        <div style="color: #939da8; font-size: 25px">{{ formatApproxSum }}</div>
        <div style="margin-top: 32px; font-size: 29px; font-weight: 500; letter-spacing: 1px">
          <FakeImg :style="'margin-right: 25px; transform:' + (payload.query.direction == 'out' ? 'rotate(180deg);' : '')" :class="payload.query.direction" :path="'/bitpapa/images/1.png'" />
          <div class="text1" style="letter-spacing: 1.2px">{{ getConstant('t1' + payload.query.direction) }}</div>
        </div>
        <div style="font-size: 30px; margin-top: 28px">
          <div class="text2">{{ formatDate }}</div>
          <div style="margin-left: 15px; color: #939da8" v-if="formatWhen">{{ formatWhen }}</div>
        </div>
        <div class="text2" style="font-size: 30px">{{ formatTime }}</div>
      </div>
      <div style="flex-direction: column; align-items: flex-start; padding: 0 43px">
        <div style="padding: 0; border-top: 3px solid; width: 100%; height: 20px"></div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t2') }}</div>
          <div style="overflow-wrap: anywhere; line-height: 40px">{{ payload.query.txid }}</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t3') }}</div>
          <div class="text1">{{ payload.query.com || getConstant('cs_com') }}</div>
        </div>
        <div class="data-item" v-if="payload.query.direction == 'out'">
          <div>{{ getConstant('t4') }}</div>
          <div style="overflow-wrap: anywhere; line-height: 40px">{{ payload.query.address }}</div>
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
  name: 'BitpapaMobile.',
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
      return `${this.payload.query.direction == 'in' ? '+' : ''}${this.fixed(this.payload.query.sum, 8)}`;
    },
    formatApproxSum() {
      return `$ ${this.fixed(this.payload.query.sum, 0, false, { useGrouping: true }, 'ru')}`;
    },
    formatDate() {
      return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('D MMMM').toUpperCase();
    },
    formatWhen() {
      const date = this.$dayjs(this.payload.query.date).locale(this.payload.query.language);
      return this.$dayjs().diff(date, 'day') < 2 ? `(${date.calendar(null).toUpperCase()})` : '';
    },
    formatTime() {
      return this.$dayjs(this.payload.query.date)
        .locale(this.payload.query.language)
        .format(`[${this.getConstant('t5')}] HH:mm`);
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: 'Montserrat';
  src: url('../bitpapa/Montserrat-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: 'Montserrat';
  src: url('../bitpapa/Montserrat-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: 'Montserrat';
  src: url('../bitpapa/Montserrat-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: 'Montserrat';
  src: url('../bitpapa/Montserrat-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: block;
}

#main {
  font-family: 'Montserrat', sans-serif;
}
.data-item {
  font-size: 31px;
  padding: 20px 0;
  align-items: flex-start !important;
  justify-content: start !important;
}

.data-item > div:nth-child(1) {
  justify-content: flex-start !important;
  max-width: 423px;
  min-width: 423px;
}

.data-item > div:nth-child(2) {
  justify-content: flex-end !important;
  font-weight: 500;
}

.footer > div {
  flex-direction: column;
}
.footer > div > div:nth-child(1) {
  margin-bottom: 5px;
  height: 51px;
}
/*colors*/
.mobile-dark {
  color: #212c3a;
  background-color: #0d151f;
}
.mobile-light {
  color: #ebebeb;
  background-color: #f6f7fb;
}
.mobile-dark #wobar {
  background-color: #121a27;
}
.mobile-light #wobar {
  background-color: white;
}
.mobile-dark .text1,
.mobile-dark .data-item > div:nth-child(1) {
  color: #abbed3 !important;
}
.mobile-light .text1,
.mobile-light .data-item > div:nth-child(1) {
  color: black !important;
  -webkit-text-stroke: unset;
}

.mobile-dark .text2,
.mobile-dark .data-item > div:nth-child(2) {
  color: #4162b9;
}
.mobile-light .text2,
.mobile-light .data-item > div:nth-child(2) {
  color: #2b4788;
  -webkit-text-stroke: 0.4px #dcf5ff;
}

.out {
  filter: brightness(0) saturate(100%) invert(39%) sepia(21%) saturate(1754%) hue-rotate(186deg) brightness(91%) contrast(91%);
}
.in {
  filter: brightness(0) saturate(100%) invert(54%) sepia(73%) saturate(597%) hue-rotate(350deg) brightness(98%) contrast(90%);
}
</style>
