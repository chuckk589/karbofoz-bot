<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <div style="height: 98px; background-color: red"></div>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch">
      <div2 style="margin: 25px 42px 0 42px">
        <div style="font-size: 48px; margin-bottom: 78px">
          <div style="background-image: url(safepal/images/1.png); width: 30px; height: 51px; margin-left: 18px; transform: rotate(180deg) scale(0.8); margin-bottom: 7px"></div>
          <div :class="'text-' + theme" style="margin: 0 auto 0 auto; font-weight: 500">{{ getText('text1') }}</div>
          <div style="width: 30px; height: 51px; margin-right: 18px"></div>
        </div>
        <div style="font-size: 64px; font-weight: 500; margin-bottom: 53px">
          <div :style="'background-image: url(safepal/images/3.png); width: 65px; height: 65px; background-size: cover; margin-right: 15px;' + rotateStyle"></div>
          <div :class="'text-' + theme" style="position: relative">
            <div style="background-image: url(safepal/images/2.png); width: 26px; position: absolute; height: 26px; background-size: cover; top: 55px; left: -40px"></div>
            {{ getText('direction') }}
          </div>
        </div>
        <div :class="'block-' + theme" style="height: 168px; margin-bottom: 40px; justify-content: flex-start; border-radius: 29px">
          <div style="font-size: 64px; font-weight: 500">
            <div :style="'background-image: url(safepal/images/coins/' + payload.query.currency + '.png); width: 108px; height: 108px; background-size: cover; margin-left: 41px'">
              <div :style="'background-image: url(safepal/images/coins/' + payload.query.network + '.png); width: 40px; position: absolute; height: 40px; background-size: cover; margin: 65px 0 0 65px'"></div>
            </div>
          </div>
          <div style="flex-direction: column; margin-left: 27px; font-weight: 600; letter-spacing: 1px; line-height: 45px; align-items: flex-start">
            <div :class="'text-' + theme" style="font-size: 40px">{{ sumFormatter(getText('input1')) }} {{ getCurrency(getText('currency')).label }}</div>
            <div style="font-size: 35px; color: #9e9dac">{{ getNetwork(getText('network')).label }} {{ lengthFormatter(getText('txid'), 10) }}</div>
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 39px; align-items: stretch; border-radius: 29px; padding: 25px 43px">
          <div v-for="(block, index) in getBlocks('block1')" :key="index" :class="'data-item text-' + theme">
            <div>{{ block.text }}</div>
            <div :style="block.style">{{ block.value }}</div>
            <div v-if="block.icon"></div>
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 41px; align-items: stretch; border-radius: 29px; padding: 25px 43px">
          <div v-for="(block, index) in getBlocks('block2')" :key="index" :class="'data-item text-' + theme">
            <div>{{ block.text }}</div>
            <div>{{ block.value }}</div>
            <div v-if="block.icon"></div>
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 34px; align-items: stretch; border-radius: 29px; padding: 25px 43px">
          <div v-for="(block, index) in getBlocks('block3')" :key="index" :class="'data-item text-' + theme">
            <div>{{ block.text }}</div>
            <div>{{ block.value }}</div>
            <div v-if="block.icon"></div>
          </div>
        </div>
        <div :class="'block-' + theme" style="flex-direction: column; align-items: stretch; border-radius: 29px; padding: 25px 43px">
          <div :class="'data-item text-' + theme">
            <div style="letter-spacing: -2px">{{ getText('text13') }}</div>
            <div style="background-image: url(safepal/images/1.png); width: 30px; height: 51px; transform: scale(0.6); margin-right: 10px"></div>
          </div>
        </div>
      </div2>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
export default {
  name: 'SafepalMobile',
  mixins: [themeMixin],

  data() {
    return {
      theme: '',
      block1: [
        {
          text: 'text2',
          value: 'text8',
          style: 'color: #31c786;',
        },
        {
          text: 'text3',
          value: 'input2',
          formatter: 'coinFormatter',
        },
        {
          text: 'text4',
          value: 'date',
          formatter: 'dateFormatter',
        },
      ],
      block2: [
        {
          text: 'text5',
          value: 'input3',
          icon: '5.png',
          formatter: 'lengthFormatter',
        },
        {
          text: 'text6',
          value: 'input4',
          icon: '5.png',
          formatter: 'lengthFormatter',
        },
      ],
      block3: [
        {
          text: 'text7',
          value: 'input5',
          icon: '5.png',
          formatter: 'lengthFormatter',
        },
        {
          text: 'text9',
          value: 'input7',
        },
        {
          text: 'text10',
          value: 'input8',
        },
        {
          text: 'text11',
          value: 'txid',
          formatter: 'lengthFormatter',
          icon: '5.png',
        },
        {
          text: 'text12',
          value: 'input6',
        },
      ],
    };
  },
  computed: {
    rotateStyle() {
      return this.payload.query.direction == 'in' ? '' : 'transform: rotate(227deg);';
    },
  },
  methods: {
    sumFormatter(value) {
      return `${parseFloat(value) > 0 ? '+' : ''}${value}`;
    },
  },
};
</script>
<style scoped>
body {
  font-family: 'AlibabaPuHuiTi-2', 'Alibaba Sans', sans-serif;
}

.text-mobile-dark {
  color: white;
}
.text-mobile-light {
  color: black;
}
.mobile-dark {
  background-color: #000000;
}

.mobile-light {
  background-color: #ffffff;
}
.block-mobile-dark {
  background-color: #1c1d1f;
}

.block-mobile-light {
  background-color: #f7f6fe;
}
.data-item {
  font-size: 38px;
  font-weight: 500;
  justify-content: space-between !important;
  letter-spacing: -1px;
  height: 93px;
}
.data-item div:nth-of-type(1) {
  margin-right: auto;
}
.data-item div:nth-of-type(3) {
  height: 40px;
  width: 40px;
  filter: rotate(180deg);
  margin-left: 20px;
  background-size: cover;
  transform: scaleX(-1);
  background-image: url(safepal/images/5.png);
  filter: invert(53%) sepia(7%) saturate(2775%) hue-rotate(203deg) brightness(85%) contrast(94%);
}
</style>
