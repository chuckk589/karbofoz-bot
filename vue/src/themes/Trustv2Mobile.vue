<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <!-- <div style="height: 109px; background-color: red"></div> -->
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar">
      <div2 style="margin: 20px 42px 0px 42px">
        <div :class="'text2-' + theme" style="margin-bottom: 67px; margin-top: 5px">
          <div style="background-image: url(/trustv2/images/3.png); width: 43px; height: 43px; margin-left: 10px; margin-bottom: 7px" class="trustv2"></div>
          <div style="margin: auto; font-size: 52px; font-weight: 500">{{ getConstant('t1') }}</div>
          <div style="background-image: url(/trustv2/images/2.png); width: 49px; height: 53px; margin-bottom: 8px; margin-right: 7px" class="trustv2"></div>
        </div>
        <div style="font-size: 77px; margin-bottom: -7px; letter-spacing: 2px; font-family: 'KUCOIN Sans'; font-weight: 600" :class="'text2-' + theme">{{ sumFormatter() }}</div>
        <div :class="'text-' + theme" style="font-size: 44px; margin-bottom: 53px; font-weight: 500; font-family: 'KUCOIN Sans'; letter-spacing: 2px">
          {{ sumApproxFormatter() }}
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; align-items: stretch; margin-bottom: 78px; border-radius: 20px">
          <div style="flex-direction: column; align-items: stretch; margin: 0 41px 0 41px">
            <div class="data-item">
              <div>{{ getConstant('t2') }}</div>
              <div>{{ dateFormatter(payload.query.date) }}</div>
            </div>
            <div class="data-item">
              <div>{{ getConstant('t3') }}</div>
              <!-- <FakeImg class="trustv2" :path="'/trustv2/images/1.png'" style="margin: 1px auto 0 27px; height: 33px; width: 33px" /> -->
              <div>{{ getConstant('t7') }}</div>
            </div>
            <div class="data-item">
              <div>{{ getConstant('t8' + payload.query.direction) }}</div>
              <div>{{ lengthFormatter(payload.query.address) }}</div>
            </div>
          </div>
        </div>
        <div :class="'block2 block-' + theme" style="flex-direction: column; align-items: stretch; margin-bottom: 82px; border-radius: 20px">
          <div style="flex-direction: column; align-items: stretch; margin: 0 41px 0 41px">
            <div class="data-item">
              <div>{{ getConstant('t4') }}</div>
              <FakeImg class="trustv2" :path="'/trustv2/images/1.png'" style="margin: -6px auto 0px 13px" />
              <div style="line-height: 55px">{{ feeTrustFormatter() }}</div>
            </div>
            <div class="data-item" v-if="payload.query.nonce">
              <div>{{ getConstant('t6') }}</div>
              <div>{{ payload.query.nonce }}</div>
            </div>
          </div>
        </div>
        <div :class="'block2 block-' + theme" style="flex-direction: column; align-items: stretch; border-radius: 20px">
          <div style="flex-direction: column; align-items: stretch; margin: 0 41px 0 41px">
            <div class="data-item">
              <div :class="'text2-' + theme">{{ getConstant('t5') }}</div>
              <FakeImg class="trustv2" :path="'/trustv2/images/4.png'" style="margin-right: 10px" />
            </div>
          </div>
        </div>
        <!-- <div :style="'color: ' + botColor + '; font-size: 40px; font-weight: 500'">{{ getConstant('t5') }}</div> -->
      </div2>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import 'dayjs/locale/es';
export default {
  name: 'Trustv2Mobile',
  mixins: [themeMixin],
  components: {
    FakeImg,
    StatusBar,
  },
  data() {
    return {
      theme: '',
    };
  },
  methods: {
    // formatWhen() {
    //   const date = this.$dayjs(this.payload.query.date).locale(this.payload.query.language);
    //   return this.$dayjs().diff(date, 'day') < 2 ? `${date.calendar(null).toUpperCase()}` : '';
    // },
    sumFormatter() {
      return `${this.payload.query.direction == 'in' ? '+' : '-'}${this.fixed(this.payload.query.sum, 8, true)} ${this.payload.currency.name}`;
    },
    sumApproxFormatter() {
      // return `≈ ${new Intl.NumberFormat(this.payload.query.language, { style: 'currency', currency: 'USD' }).format(123.15)}`;
      return `≈ ${this.fixed(this.formatSum(0.1, 0.5), 2, true, { style: 'currency', currency: 'USD' })}`;
    },
    dateFormatter() {
      const date = this.$dayjs(this.payload.query.date).locale(this.payload.query.language);
      if (date.isToday()) {
        return `${date.calendar(this.payload.query.date)}, ${date.format('LT')}`;
      }
      return (
        date
          .format('ll')
          .split(/ \d{4}/)[0]
          .replace(',', '') + date.format(', LT')
      );
    },
    feeTrustFormatter() {
      const value = this.feeFormatter();
      return `${value} ${this.payload.network.coin}`;
    },
  },
  computed: {
    // sumColor() {
    //   return this.payload.query.direction == 'in' ? '#4aa397ff' : '#ce4a3e';
    // },
    // botColor() {
    //   return this.theme === 'mobile-dark' ? '#aac9f0ff' : '#3574b6';
    // },
    // colorStyle() {
    //   return this.theme === 'mobile-dark' ? 'filter: invert(1)' : '';
    // },
    // borderColor() {
    //   return this.theme === 'mobile-dark' ? '#1b1c1e' : '#dbdbdd';
    // },
  },
};
</script>
<style scoped>
@font-face {
  font-family: ' ';
  src: url('../trustv2/KUCOINSans-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'KUCOIN Sans';
  src: url('../trustv2/KUCOINSans-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

#main {
  font-family: 'Roboto', sans-serif;
}

.mobile-dark {
  background-color: #1b1c1e;
  color: #1b1c1e;
}

.mobile-light {
  background-color: white;
  color: #dbdbdd;
}

.block-mobile-dark {
  background-color: #242426;
  /* box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.1); */
}

.trustv2 {
  filter: brightness(0) saturate(100%) invert(51%) sepia(34%) saturate(119%) hue-rotate(186deg) brightness(91%) contrast(80%);
}

.block-mobile-light {
  background-color: #f4f4f6;
  /* box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.1); */
}

.data-item {
  font-size: 39px;
  justify-content: space-between !important;
  padding: 32px 0px;
}

.data-item > div:last-child {
  text-align: end;
  font-weight: 500;
}

.data-item > div:first-child {
  text-align: start;
  white-space: nowrap;
}

.mobile-light .data-item > div:nth-child(1),
.text-mobile-light {
  color: #636363;
}

.mobile-light .data-item > div:last-child,
.text2-mobile-light {
  color: black !important;
}

.mobile-dark .data-item > div:nth-child(1),
.text-mobile-dark {
  color: #858e9c;
}

.mobile-dark .data-item > div:last-child,
.text2-mobile-dark {
  color: #edeef1ff !important;
}
</style>
