<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar class="bar" :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; padding: 0px 39px">
      <div style="height: 120px; margin-bottom: 78px; font-size: 36px; justify-content: space-between">
        <FakeImg :path="'/ledger/images/1.png'" />
        <div style="flex-direction: column">
          <div class="gray" style="font-weight: 600">{{ getConstant('t1') }}</div>
          <div class="text" style="font-weight: 600">{{ getConstant('t2' + payload.query.direction) }}</div>
        </div>
        <div style="width: 41px"></div>
      </div>
      <div style="height: 149px; margin-bottom: 59px">
        <div class="header" style="width: 150px; height: 150px; border: 2px solid; border-radius: 25px">
          <FakeImg class="ledger" :path="'/ledger/images/2.png'" :style="payload.query.direction == 'in' ? '' : 'transform: rotate(180deg);'" />
        </div>
      </div>
      <div class="header" style="height: 45px; font-size: 48px; letter-spacing: 1px; font-weight: 600; margin-bottom: 40px">
        {{ sumFormatter }} {{ this.payload.network.alias == 'bep20' ? formatPair : this.payload.currency.name }}
      </div>
      <div class="header" style="height: 45px; margin-bottom: 56px">
        <div style="font-size: 39px; margin-right: 21px">{{ formatSum2 }}</div>
        <FakeImg :path="'/ledger/images/3.png'" />
      </div>
      <div style="height: 45px; margin-bottom: 113px">
        <FakeImg :path="'/ledger/images/4.png'" />
        <div style="color: #68bf55; font-size: 39px; letter-spacing: 2px; margin-left: 20px; font-weight: 600">{{ getConstant('t3') }} {{ formatHeight }}</div>
      </div>
      <div style="flex-direction: column; align-items: stretch; letter-spacing: 1px">
        <div class="data-item">
          <div>{{ getConstant('t4') }}</div>
          <div>{{ getConstant('cs_acc') }} {{ this.payload.network.alias == 'bep20' ? formatPair : this.payload.currency.name }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t5') }}</div>
          <div>{{ formatDate }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t6') }}</div>
          <div style="letter-spacing: 2px">
            {{ formatCom }}&nbsp;&nbsp;≈&nbsp;&nbsp;<span class="gray">{{ formatApprox }}</span>
          </div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t9') }}</div>
          <div style="line-height: 45px; overflow-wrap: anywhere">{{ payload.query.txid }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t8') }}</div>
          <div style="line-height: 45px; overflow-wrap: anywhere">{{ payload.query.address }}</div>
        </div>
        <div class="data-item">
          <div>{{ getConstant('t7') }}</div>
          <div style="line-height: 45px; overflow-wrap: anywhere"></div>
        </div>
      </div>
      <div class="text" style="border: 3px solid; border-radius: 70px; padding: 30px 0; font-size: 39px">
        {{ getConstant('t10') }}
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
export default {
  name: 'LedgerMobile',
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
      return this.$dayjs(this.payload.query.date).locale(this.payload.query.language).format('l');
    },
    formatFee() {
      return this.payload.query.fee + ' ' + this.payload.currency.name;
    },
    sumFormatter() {
      return `${this.payload.query.sum > 0 ? '+' : ''} ${this.fixed(this.payload.query.sum, 8)} `;
    },
    formatPair() {
      return this.payload.network.name + '-' + this.payload.currency.name.substr(0, 3);
    },
    formatCom() {
      const coinfee = this.feeFormatter('cs_com' + this.payload.query.direction);
      return `${coinfee} ${this.payload.network.coin}`;
    },
    formatApprox() {
      const coinfee = this.feeFormatter('cs_com' + this.payload.query.direction);
      return `$${(coinfee * this.payload.network.course).toFixed(3)}`;
    },
    formatSum2() {
      const sum = this.formatSum(0.1, 0.5);
      return `${sum > 0 ? '+' : ''}$${sum.toFixed(2)}`;
    },
    formatHeight() {
      const step = this.getConstant('cs_step')?.split(' ');
      console.log(step);
      if (!step) return '';
      const iterations = Math.round(this.$dayjs().diff(this.$dayjs(this.payload.query.date), 'minute') / step[1]);
      return `(${+step[0] + iterations})`;
    },
  },
  methods: {},
};
</script>
.sumFormatter
<style scoped>
@font-face {
  font-family: 'font';
  src: url('../ledger/ledger.ttf');
}
#main {
  font-family: 'font';
}
.data-item {
  font-size: 36px;
  flex-direction: column;
  align-items: self-start !important;
  margin-bottom: 82px;
}
.data-item > div {
  flex-grow: 1;
}

.data-item > div:nth-child(1) {
  justify-content: flex-start !important;
  color: #aaaaaa;
  margin-bottom: 23px;
}
.data-item div:nth-child(2) {
  justify-content: flex-end !important;
  font-weight: 600;
}
/*colors*/
.mobile-dark {
  background-color: #121214;
}
.mobile-light {
  background-color: #ffffff;
}
.gray {
  color: #aaaaaa;
}
.mobile-dark .header {
  color: #aaaaaa;
}
.mobile-light .header {
  color: #666666;
}
.mobile-dark .text,
.mobile-dark .data-item div:nth-child(2) {
  color: white;
}
.mobile-light .text,
.mobile-light .data-item div:nth-child(2) {
  color: black;
}
.mobile-dark .ledger {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}

.mobile-light .ledger {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
}
/* .mobile-dark .gray,
.mobile-dark .data-item > div:nth-child(1) {
  color: #b3b3b3;
}

.mobile-light .gray,
.mobile-light .data-item > div:nth-child(1) {
  color: #666666;
}
.mobile-dark .black,
.mobile-dark .data-item > div:nth-child(2) {
  color: #ffffff;
}

.mobile-light .black,
.mobile-light .data-item > div:nth-child(2) {
  color: #000000;
}
.mobile-dark {
  background-color: #000000;
}
.mobile-light {
  background-color: #ffffff;
}
.mobile-dark .ledger {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}

.mobile-light .ledger {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
} */
</style>
