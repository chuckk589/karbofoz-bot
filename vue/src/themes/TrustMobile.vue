<template>
  <div id="wbar" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <div :style="'left:0px; top:0px; width:1080px; height:104px; background-image: url(' + payload.path + '/bar.jpg)'"></div>
    <div id="wobar">
      <div :style="'left:0px; top:104px; width:159px; height:202px; background-image: url(' + payload.path + '/02.jpg)'"></div>
      <div :style="'left:159px; top:104px; width:921px; height:142px; background-image: url(' + payload.path + '/text1.jpg)'">{{ getText('text1') }}</div>
      <div :style="'left:159px; top:246px; width:921px; height:60px; background-image: url(' + payload.path + '/04.jpg)'"></div>
      <div :style="'left:0px; top:306px; width:1080px; height:114px; background-image: url(' + payload.path + '/input1.jpg)'">{{ getText('input1') }}</div>
      <div :style="'left:0px; top:420px; width:1080px; height:61px; background-image: url(' + payload.path + '/06.jpg)'"></div>
      <div :style="'left:0px; top:481px; width:1080px; height:77px; background-image: url(' + payload.path + '/07.jpg)'"></div>
      <div :style="'left:0px; top:558px; width:83px; height:868px; background-image: url(' + payload.path + '/08.jpg)'"></div>
      <div :style="'left:83px; top:558px; width:457px; height:142px; background-image: url(' + payload.path + '/text2.jpg)'">{{ getText('text2') }}</div>
      <div :style="'left:540px; top:558px; width:457px; height:142px; background-image: url(' + payload.path + '/input2.jpg)'">{{ getText('input2') }}</div>
      <div :style="'left:997px; top:558px; width:83px; height:868px; background-image: url(' + payload.path + '/11.jpg)'"></div>
      <div :style="'left:83px; top:700px; width:457px; height:141px; background-image: url(' + payload.path + '/text3.jpg)'">{{ getText('text3') }}</div>
      <div :style="'left:540px; top:700px; width:457px; height:141px; background-image: url(' + payload.path + '/input3.jpg)'">{{ getText('input3') }}</div>
      <div :style="'left:83px; top:841px; width:356px; height:144px; background-image: url(' + payload.path + '/text4.jpg)'">{{ getText('text4') }}</div>
      <div :style="'left:439px; top:841px; width:558px; height:144px; background-image: url(' + payload.path + '/input4.jpg)'">{{ getText('input4') }}</div>
      <div :style="'left:83px; top:985px; width:914px; height:83px; background-image: url(' + payload.path + '/16.jpg)'"></div>
      <div :style="'left:83px; top:1068px; width:356px; height:139px; background-image: url(' + payload.path + '/text5.jpg)'">{{ getText('text5') }}</div>
      <div :style="'left:439px; top:1068px; width:558px; height:139px; background-image: url(' + payload.path + '/input5.jpg)'">{{ getText('input5') }}</div>
      <div :style="'left:83px; top:1207px; width:457px; height:144px; background-image: url(' + payload.path + '/text6.jpg)'">{{ getText('text6') }}</div>
      <div :style="'left:540px; top:1207px; width:457px; height:144px; background-image: url(' + payload.path + '/input6.jpg)'">{{ getText('input6') }}</div>
      <div :style="'left:83px; top:1351px; width:914px; height:75px; background-image: url(' + payload.path + '/21.jpg)'"></div>
      <div :style="'left:0px; top:1426px; width:1080px; height:88px; background-image: url(' + payload.path + '/text7.jpg)'">{{ getText('text7') }}</div>
      <div :style="'left:0px; top:1514px; width:1080px; height:760px; background-image: url(' + payload.path + '/23.jpg)'"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BinanceMobile',
  props: {
    payload: {
      path: String,
      query: Object,
      theme: {
        type: Object,
        inputs: {
          type: Array,
          default: () => [],
        },
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    getText(fieldName, decoration) {
      const chunks = fieldName.split(/(\d.*)/);
      let raw = '';
      if (chunks[0] === 'input') {
        raw = this.payload.query[fieldName];
      } else if (chunks[0] === 'text') {
        raw = this.payload.theme.inputs.find((input) => input.alias === fieldName)?.values || 'No data';
      }
      return this.applyDecoration(raw, decoration);
    },
    applyDecoration(text, decoration) {
      if (!text) return '';
      if (decoration && decoration.length) {
        decoration.forEach((deco) => {
          if (deco === 'date') {
            text = text.replace('T', ' ');
          }
        });
      }
      return text;
    },
  },
  computed: {
    themeClass() {
      return this.payload.path.split('/').pop();
    },
  },
};
</script>
<style>
@font-face {
  font-family: 'binance';
  src: url('../binance/DINPro.ttf');
}

body {
  font-family: 'binance';
}

div {
  position: absolute;
}

.text {
  display: flex;
  font-weight: 900;
  justify-content: center;
  align-items: center;
}

.text-left {
  font-weight: 500;
  display: flex;
  align-items: center;
  color: #88929c;
  font-size: 37px;
}
.mobile-dark {
  color: #e6ebf1;
}
.mobile-light {
  color: #202630;
}
.text-right {
  font-weight: 500;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  font-size: 37px;
}
</style>
