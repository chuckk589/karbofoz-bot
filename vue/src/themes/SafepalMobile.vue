<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <div style="height: 98px; background-color: red; margin-bottom: 25px"></div>
    <div style="margin: 0 42px; display: flex; flex-direction: column; align-items: stretch">
      <div style="font-size: 48px; margin-bottom: 78px">
        <div style="background-image: url(safepal/images/1.png); width: 30px; height: 51px; margin-left: 18px; transform: rotate(180deg) scale(0.8); margin-bottom: 7px"></div>
        <div :class="'text-' + theme" style="margin: 0 auto 0 auto; font-weight: 500">Детали транзакции</div>
        <div style="width: 30px; height: 51px; margin-right: 18px"></div>
      </div>
      <div style="font-size: 64px; font-weight: 500; margin-bottom: 53px">
        <div style="background-image: url(safepal/images/3.png); width: 65px; height: 65px; background-size: cover; margin-right: 15px"><div style="background-image: url(safepal/images/2.png); width: 26px; position: absolute; height: 26px; background-size: cover; margin: 40px 0 0 40px"></div></div>
        <div :class="'text-' + theme">Получить</div>
      </div>
      <div :class="'block-' + theme" style="height: 168px; margin-bottom: 40px; justify-content: flex-start; border-radius: 29px">
        <div style="font-size: 64px; font-weight: 500">
          <div style="background-image: url(safepal/images/coins/usdt.png); width: 108px; height: 108px; background-size: cover; margin-left: 41px"><div style="background-image: url(safepal/images/coins/bnb_smart_chain.png); width: 40px; position: absolute; height: 40px; background-size: cover; margin: 65px 0 0 65px"></div></div>
        </div>
        <div style="flex-direction: column; margin-left: 27px; font-weight: 600; letter-spacing: 1px; line-height: 45px; align-items: flex-start">
          <div :class="'text-' + theme" style="font-size: 40px">+2986.7131988 USDT</div>
          <div style="font-size: 35px; color: #9e9dac">BEP20 0x55d...97955</div>
        </div>
      </div>
      <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 39px; align-items: stretch; border-radius: 29px; padding: 25px 43px">
        <div v-for="(block, index) in block1" :key="index" :class="'data-item text-' + theme">
          <div>{{ block.text }}</div>
          <div :style="block.style">{{ block.value }}</div>
          <div v-if="block.icon"></div>
        </div>
      </div>
      <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 41px; align-items: stretch; border-radius: 29px; padding: 25px 43px">
        <div v-for="(block, index) in block2" :key="index" :class="'data-item text-' + theme">
          <div>{{ block.text }}</div>
          <div>{{ block.value }}</div>
          <div v-if="block.icon"></div>
        </div>
      </div>
      <div :class="'block-' + theme" style="flex-direction: column; margin-bottom: 34px; align-items: stretch; border-radius: 29px; padding: 25px 43px">
        <div v-for="(block, index) in block3" :key="index" :class="'data-item text-' + theme">
          <div>{{ block.text }}</div>
          <div>{{ block.value }}</div>
          <div v-if="block.icon"></div>
        </div>
      </div>
      <div :class="'block-' + theme" style="flex-direction: column; align-items: stretch; border-radius: 29px; padding: 25px 43px">
        <div :class="'data-item text-' + theme">
          <div style="letter-spacing: -2px">Посмотреть в обозревателе блокчейна</div>
          <div style="background-image: url(safepal/images/1.png); width: 30px; height: 51px; transform: scale(0.6); margin-right: 10px"></div>
        </div>
      </div>
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
          text: 'Статус',
          value: 'Успех',
          style: 'color: #31c786;',
        },
        {
          text: 'Комиссия сети',
          value: '0.00072254 BNB',
        },
        {
          text: 'Время',
          value: '2021-05-20 12:00:00',
        },
      ],
      block2: [
        {
          text: 'От',
          value: '0x1234...0abcdef',
          icon: '5.png',
        },
        {
          text: 'На',
          value: '0x1234...0abcdef',
          icon: '5.png',
        },
      ],
      block3: [
        {
          text: 'Transaction Hash',
          value: '00x1234...0abcdef',
          icon: '5.png',
        },
        {
          text: 'Block',
          value: '12345678',
        },
        {
          text: 'Nonce',
          value: '12345678',
        },
        {
          text: 'TxID',
          value: '0x1234...0abcdef',
        },
        {
          text: 'Высота',
          value: '12345678',
        },
      ],
    };
  },
  mounted() {
    this.theme = this.payload.path.split('/').pop();
  },
  computed: {
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
  font-family: 'AlibabaPuHuiTi-2', 'Alibaba Sans', sans-serif;
}

#main div,
#main div div {
  display: flex;
  justify-content: center;
  align-items: center;
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
