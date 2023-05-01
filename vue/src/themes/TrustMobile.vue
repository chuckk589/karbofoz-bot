<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <div style="margin: 0px 42px">
      <div style="height: 109px; margin-bottom: 20px; background-color: red"></div>
      <div :class="'text-' + theme" style="margin-bottom: 70px">
        <div :style="'background-image: url(/trust/images/3.png); width: 43px; height: 43px; margin-left: 10px; margin-bottom: 7px; margin-right: 60px;' + colorStyle"></div>
        <div style="margin-right: auto; font-size: 65px">Перевод</div>
        <div :style="'background-image: url(/trust/images/2.png); width: 49px; height: 53px; margin-bottom: 8px; ' + colorStyle"></div>
      </div>
      <div style="color: #4aa397ff; font-size: 90px; margin-bottom: -14px; letter-spacing: -1px">+123.0456789 USDT</div>
      <div style="color: #97a9bdff; font-size: 44px; margin-bottom: 77px; /* letter-spacing: -1px; */">≈123,15 $</div>
      <div :class="'block-' + theme" :style="'flex-direction: column; align-items: stretch; margin-bottom: 84px; border-radius: 30px;border:1px solid ' + borderColor">
        <div style="flex-direction: column; align-items: stretch; margin: 0 41px 0 41px">
          <div v-for="(block, index) in block1" :key="index" class="data-item" :style="'border-bottom: 1px solid ' + borderColor">
            <div :class="'text-' + theme">{{ block.text }}</div>
            <div v-if="block.icon" :style="'margin: 1px auto 0 27px;height: 33px;width: 33px;background-image: url(/trust/images/' + block.icon + ')'"></div>
            <div style="color: #97a9bdff">{{ block.value }}</div>
          </div>
        </div>
      </div>
      <div :class="'block-' + theme" :style="'flex-direction: column; align-items: stretch; margin-bottom: 84px; border-radius: 30px;border:1px solid ' + borderColor">
        <div style="flex-direction: column; align-items: stretch; margin: 0 41px 0 41px">
          <div v-for="(block, index) in block2" :key="index" class="data-item" :style="'border-bottom: 1px solid ' + borderColor">
            <div :class="'text-' + theme">{{ block.text }}</div>
            <div v-if="block.icon" :style="'margin: 1px auto 0 27px;height: 33px;width: 33px;background-image: url(/trust/images/' + block.icon + ')'"></div>
            <div style="color: #97a9bdff">{{ block.value }}</div>
          </div>
        </div>
      </div>
      <div style="color: #aac9f0ff; font-size: 40px; font-weight: 500">ПОДРОБНЕЕ</div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
export default {
  name: 'TrustMobile',
  mixins: [themeMixin],

  data() {
    return {
      theme: '',
      block1: [
        {
          text: 'Дата',
          value: '29 мар, 17:31',
        },
        {
          text: 'Статус',
          value: 'Завершено',
          icon: '1.png',
        },
        {
          text: 'Отправитель',
          value: '0x1234567890',
        },
      ],
      block2: [
        {
          text: 'Сетевой сбор',
          value: '0,000180635 BNB (0,06 $)',
          icon: '1.png',
        },
        {
          text: 'Nonce',
          value: '23',
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
  font-family: 'Roboto';
}

#main div div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-mobile-dark {
  color: #edeef1ff;
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
