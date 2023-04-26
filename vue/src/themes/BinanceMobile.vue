<template>
  <div id="wobar" style="left: 0px; top: 0px; width: 1080px; height: 2184px">
    <div :style="'left:0px; top:0px; width:237px; height:119px; background-image: url(' + payload.path + '/01.jpg)'"></div>
    <div :class="'text ' + themeClass" :style="' font-size:49px; left:237px; top:0px; width:606px; height:119px; background-image: url(' + payload.path + '/text1.jpg)'">
      {{ getText('text1') }}
    </div>
    <div :style="'left:843px; top:0px; width:237px; height:119px; background-image: url(' + payload.path + '/03.jpg)'"></div>
    <div :style="'left:0px; top:119px; width:1080px; height:69px; background-image: url(' + payload.path + '/04.jpg)'"></div>
    <div :style="'left:0px; top:188px; width:39px; height:1996px; background-image: url(' + payload.path + '/05.jpg)'"></div>
    <div class="text" :style="'color: #86909A; font-size: 38px; left:39px; top:188px; width:1002px; height:75px; background-image: url(' + payload.path + '/text2.jpg)'">
      {{ getText('text2') }}
    </div>
    <div :style="'left:1041px; top:188px; width:39px; height:1996px; background-image: url(' + payload.path + '/07.jpg)'"></div>
    <div :class="'text ' + themeClass" :style="'font-size: 79px; left:39px; top:263px; width:1002px; height:112px; background-image: url(' + payload.path + '/input1.jpg)'">
      {{ getText('input1') }}
    </div>
    <div class="text" :style="'left:39px; top:375px; width:1002px; height:74px; background-image: url(' + payload.path + '/input1.jpg)'">
      <div :style="'position: initial; width:71px; height:74px; background-image: url(' + payload.path + '/10.jpg)'"></div>
      <div style="position: initial; font-size: 44px; color: #2ebc82">
        {{ getText('text3') }}
      </div>
    </div>
    <div class="text" :style="'color: #88929C;font-size: 32px;text-align: center;font-weight: 500;line-height: 45px;left:39px; top:449px; width:1002px; height:116px; background-image: url(' + payload.path + '/text4.jpg)'">
      {{ getText('text4') }}
    </div>
    <div :style="'left:39px; top:565px; width:1002px; height:66px; background-image: url(' + payload.path + '/13.jpg)'"></div>
    <div :style="'left:39px; top:631px; width:1002px; height:56px; background-image: url(' + payload.path + '/14.jpg)'"></div>
    <div class="text-left" :style="'left:39px; top:687px; width:501px; height:92px; background-image: url(' + payload.path + '/text5.jpg)'">{{ getText('text5') }}</div>
    <div :class="'text-right ' + themeClass" :style="'left:540px; top:687px; width:501px; height:92px; background-image: url(' + payload.path + '/input2.jpg)'">
      {{ getText('input2') }}
    </div>
    <div class="text-left" :style="'left:39px; top:779px; width:501px; height:94px; background-image: url(' + payload.path + '/text6.jpg)'">{{ getText('text6') }}</div>
    <div :class="'text-right ' + themeClass" :style="'left:540px; top:779px; width:501px; height:94px; background-image: url(' + payload.path + '/input3.jpg)'">
      {{ getText('input3') }}
    </div>
    <div class="text-left" :style="'left:39px; top:873px; width:501px; height:100px; background-image: url(' + payload.path + '/text7.jpg)'">{{ getText('text7') }}</div>
    <div :class="'text-right ' + themeClass" :style="'left:540px; top:873px; width:501px; height:100px; background-image: url(' + payload.path + '/input4.jpg)'">
      {{ getText('input4') }}
    </div>
    <div class="text-left" :style="'left:39px; top:973px; width:399px; height:132px; background-image: url(' + payload.path + '/text8.jpg)'">{{ getText('text8') }}</div>
    <div :class="'text-right ' + themeClass" :style="'overflow-wrap:anywhere;padding-right: 22px;left:438px; top:973px; width:552px; height:132px; background-image: url(' + payload.path + '/input5.jpg)'">
      {{ getText('input5') }}
    </div>
    <div :style="'left:990px; top:973px; width:51px; height:362px; background-image: url(' + payload.path + '/23.jpg)'"></div>
    <div class="text-left" :style="' left:39px; top:1105px; width:399px; height:230px; background-image: url(' + payload.path + '/text9.jpg)'">
      {{ getText('text9') }}
    </div>
    <div :class="'text-right ' + themeClass" :style="'text-decoration: underline;overflow-wrap:anywhere;padding-right: 22px;left:438px; top:1105px; width:552px; height:230px; background-image: url(' + payload.path + '/input6.jpg)'">
      {{ getText('input6') }}
    </div>
    <div class="text-left" :style="' left:39px; top:1335px; width:501px; height:97px; background-image: url(' + payload.path + '/text10.jpg)'">
      {{ getText('text10') }}
    </div>
    <div :class="'text-right ' + themeClass" :style="'left:540px; top:1335px; width:501px; height:97px; background-image: url(' + payload.path + '/27.jpg)'">
      {{ getText('input7', ['date']) }}
    </div>
    <div :style="'left:39px; top:1432px; width:1002px; height:39px; background-image: url(' + payload.path + '/28.jpg)'"></div>
    <div :style="'left:39px; top:1471px; width:53px; height:361px; background-image: url(' + payload.path + '/29.jpg)'"></div>
    <div class="text-left" :style="'align-items: flex-end;font-weight: 700;line-height: 60px;font-size: 33px; left:92px; top:1471px; width:668px; height:120px; background-image: url(' + payload.path + '/text11.jpg)'">
      {{ getText('text11') }}
    </div>
    <div :style="'left:760px; top:1471px; width:281px; height:361px; background-image: url(' + payload.path + '/31.jpg)'"></div>
    <div :class="'text-left ' + themeClass" :style="'font-size: 49px;font-weight: 600;left:92px; top:1591px; width:668px; height:66px; background-image: url(' + payload.path + '/text12.jpg)'">
      {{ getText('text12') }}
    </div>
    <div class="text-left" :style="'color: #DAB540;font-weight: 700;font-size: 40px;padding-top: 30px;left:92px; top:1657px; width:668px; height:175px; background-image: url(' + payload.path + '/text13.jpg)'">
      {{ getText('text13') }}
    </div>
    <div :style="'left:39px; top:1832px; width:1002px; height:352px; background-image: url(' + payload.path + '/34.jpg)'"></div>
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
