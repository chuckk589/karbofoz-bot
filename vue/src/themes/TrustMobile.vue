<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <!-- <div style="height: 109px; background-color: red"></div> -->
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar">
      <div2 style="margin: 20px 42px 0px 42px">
        <div :class="'text-' + theme" style="margin-bottom: 70px">
          <div :style="'background-image: url(/trust/images/3.png); width: 43px; height: 43px; margin-left: 10px; margin-bottom: 7px; margin-right: 60px;' + colorStyle"></div>
          <div style="margin-right: auto; font-size: 65px">{{ getText('text1') }}</div>
          <div :style="'background-image: url(/trust/images/2.png); width: 49px; height: 53px; margin-bottom: 8px; ' + colorStyle"></div>
        </div>
        <div :style="'font-size: 90px; margin-bottom: -14px; letter-spacing: -1px;color: ' + sumColor">{{ sumFormatter(getText('input1')) }}</div>
        <div :class="'text2-' + theme" style="font-size: 44px; margin-bottom: 77px">{{ sumApproxFormatter(getText('input1')) }}</div>
        <div :class="'block-' + theme" :style="'flex-direction: column; align-items: stretch; margin-bottom: 84px; border-radius: 30px;border:1px solid ' + borderColor">
          <div style="flex-direction: column; align-items: stretch; margin: 0 41px 0 41px">
            <div v-for="(block, index) in getBlocks('block1')" :key="index" class="data-item" :style="'border-bottom: 1px solid ' + borderColor">
              <div :class="'text-' + theme">{{ block.text }}</div>
              <div v-if="block.icon" :style="'margin: 1px auto 0 27px;height: 33px;width: 33px;background-image: url(/trust/images/' + block.icon + ')'"></div>
              <div :class="'text2-' + theme">{{ block.value }}</div>
            </div>
          </div>
        </div>
        <div :class="'block-' + theme" :style="'flex-direction: column; align-items: stretch; margin-bottom: 84px; border-radius: 30px;border:1px solid ' + borderColor">
          <div style="flex-direction: column; align-items: stretch; margin: 0 41px 0 41px">
            <div v-for="(block, index) in getBlocks('block2')" :key="index" class="data-item" :style="'border-bottom: 1px solid ' + borderColor">
              <div :class="'text-' + theme">{{ block.text }}</div>
              <div v-if="block.icon" :style="'margin: 1px auto 0 27px;height: 33px;width: 33px;background-image: url(/trust/images/' + block.icon + ')'"></div>
              <div :style="block.style" :class="'text2-' + theme">{{ block.value }}</div>
            </div>
          </div>
        </div>
        <div :style="'color: ' + botColor + '; font-size: 40px; font-weight: 500'">{{ getText('text5') }}</div>
      </div2>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
export default {
  name: 'TrustMobile',
  mixins: [themeMixin],
  components: {
    StatusBar,
  },
  data() {
    return {
      theme: '',
      block1: [
        {
          text: 'text2',
          value: 'date',
          formatter: 'dateFormatter',
        },
        {
          text: 'text3',
          value: 'text7',
          icon: '1.png',
        },
        {
          value: 'address',
          alias: 'direction',
          formatter: 'lengthFormatter',
        },
      ],
      block2: [
        {
          text: 'text4',
          value: '',
          icon: '1.png',
          formatter: 'feeTrustFormatter',
          style: 'text-align: end; flex: 1 1 0%;justify-content: end;',
        },
        {
          text: 'text6',
          value: 'input2',
        },
      ],
    };
  },
  methods: {
    sumFormatter(value) {
      return `${+parseFloat(value) > 0 ? '+' : ''}${this.fixedFormatter('input1', 8)} ${this.payload.currency.name}`;
    },
    sumApproxFormatter(value) {
      return `≈ ${Math.abs(Math.round(parseFloat(value) * 100) / 100)} $`;
    },
    dateFormatter(value) {
      const date = new Date(value);
      const today = new Date();
      if (today.toDateString() === date.toDateString()) {
        return (
          `${this.getText('text8')}, ` +
          new Date(value).toLocaleString(this.payload.query.language, {
            hour: 'numeric',
            minute: 'numeric',
          })
        );
      } else {
        return new Date(value).toLocaleString(this.payload.query.language, {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric',
        });
      }
    },
    feeTrustFormatter() {
      const value = this.feeFormatter();
      return `${value} ${this.payload.network.coin} ${value ? `($${(value * this.payload.course).toFixed(2)})` : ''}`;
    },
  },
  computed: {
    sumColor() {
      return parseFloat(this.getText('input1')) > 0 ? '#4aa397ff' : '#ce4a3e';
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
body {
  font-family: 'Roboto';
}

.text-mobile-dark {
  color: #edeef1ff;
}
.text-mobile-light {
  color: black;
}
.text2-mobile-light {
  color: #7f7f7f;
}
.text2-mobile-dark {
  color: #97a9bd;
}

.mobile-dark {
  background-color: #1b1c1e;
}

.mobile-light {
  background-color: white;
}

.block-mobile-dark {
  background-color: #252a30;
}

.block-mobile-light {
  background-color: white;
}

.data-item {
  font-size: 44px;
  justify-content: space-between !important;
  letter-spacing: -1px;
  height: 141px;
}
</style>
