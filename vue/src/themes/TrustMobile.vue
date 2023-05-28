<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px; margin-top: 109px">
    <!-- <div style="height: 109px; background-color: red"></div> -->
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar">
      <div2 style="margin: 20px 42px 0px 42px">
        <div :class="'text-' + theme" style="margin-bottom: 70px">
          <div :style="'background-image: url(/trust/images/3.png); width: 43px; height: 43px; margin-left: 10px; margin-bottom: 7px; margin-right: 60px;' + colorStyle"></div>
          <div style="margin-right: auto; font-size: 65px">{{ getConstant('t1') }}</div>
          <div :style="'background-image: url(/trust/images/2.png); width: 49px; height: 53px; margin-bottom: 8px; ' + colorStyle"></div>
        </div>
        <div :style="'font-size: 90px; margin-bottom: -14px; letter-spacing: -1px;color: ' + sumColor">{{ sumFormatter() }}</div>
        <div :class="'text2-' + theme" style="font-size: 44px; margin-bottom: 77px">{{ sumApproxFormatter() }}</div>
        <div :class="'block-' + theme" :style="'flex-direction: column; align-items: stretch; margin-bottom: 84px; border-radius: 30px;border:1px solid ' + borderColor">
          <div style="flex-direction: column; align-items: stretch; margin: 0 41px 0 41px">
            <div class="data-item">
              <div>{{ getConstant('t2') }}</div>
              <div>{{ dateFormatter(payload.query.date) }}</div>
            </div>
            <div class="data-item">
              <div>{{ getConstant('t3') }}</div>
              <FakeImg class="trust" :path="'/trust/images/1.png'" style="margin: 1px auto 0 27px; height: 33px; width: 33px" />
              <div>{{ getConstant('t7') }}</div>
            </div>
            <div class="data-item">
              <div>{{ getConstant('t8' + payload.query.direction) }}</div>
              <div>{{ lengthFormatter(payload.query.address) }}</div>
            </div>
          </div>
        </div>
        <div :class="'block2 block-' + theme" :style="'flex-direction: column; align-items: stretch; margin-bottom: 82px; border-radius: 30px;border:1px solid ' + borderColor">
          <div style="flex-direction: column; align-items: stretch; margin: 0 41px 0 41px">
            <div class="data-item">
              <div>{{ getConstant('t4') }}</div>
              <FakeImg class="trust" :path="'/trust/images/1.png'" style="margin: 1px auto 0 27px; height: 33px; width: 33px" />
              <div style="line-height: 55px">{{ feeTrustFormatter() }}</div>
            </div>
            <div class="data-item">
              <div>{{ getConstant('t6') }}</div>
              <div>{{ payload.query.nonce }}</div>
            </div>
          </div>
        </div>
        <div :style="'color: ' + botColor + '; font-size: 40px; font-weight: 500'">{{ getConstant('t5') }}</div>
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
  name: 'TrustMobile',
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
      return `${value} ${this.payload.network.coin} ${value ? `($${(value * this.payload.network.course).toFixed(2)})` : ''}`;
    },
  },
  computed: {
    sumColor() {
      return this.payload.query.direction == 'in' ? '#4aa397ff' : '#ce4a3e';
    },
    botColor() {
      return this.theme === 'mobile-dark' ? '#aac9f0ff' : '#3574b6';
    },
    colorStyle() {
      return this.theme === 'mobile-dark' ? 'filter: invert(1)' : '';
    },
    borderColor() {
      return this.theme === 'mobile-dark' ? '#1b1c1e' : '#dbdbdd';
    },
  },
};
</script>
<style scoped>
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
  background-color: #252a30;
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.1);
}
.block-mobile-light .trust {
  filter: brightness(0) saturate(100%) invert(77%) sepia(71%) saturate(0%) hue-rotate(203deg) brightness(80%) contrast(80%);
}
.block-mobile-light {
  background-color: white;
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.1);
}

.data-item {
  font-size: 42px;
  justify-content: space-between !important;
  padding: 39px 0px;
}
.data-item:not(:last-child) {
  border-bottom: 1px solid;
}
.data-item > div:last-child {
  text-align: end;
}
.data-item > div:first-child {
  text-align: start;
  white-space: nowrap;
}
.mobile-light .data-item > div:nth-child(1),
.text-mobile-light {
  color: black;
}
.mobile-light .data-item > div:last-child,
.text2-mobile-light {
  color: #7f7f7f;
}
.mobile-dark .data-item > div:nth-child(1),
.text-mobile-dark {
  color: #edeef1ff;
}
.mobile-dark .data-item > div:last-child,
.text2-mobile-dark {
  color: #97a9bd;
}
</style>
