<template>
  <div id="wbar" style="position: absolute; left: 0px; top: 0px; width: 1080px; height: 2274px">
    <div id="wobar" class="mobile-dark">
      <div :style="'left:0px; top:0px; width:1080px; height:97px; background-image: url(' + payload.path + '/01.jpg)'"></div>
      <div class="text" :style="'color:#A0A6C6;font-weight: 500;font-size: 37px;left:0px; top:97px; width:1080px; height:112px; background-image: url(' + payload.path + '/text1.jpg)'">{{ getText('text1') }}</div>
      <div :style="'left:0px; top:209px; width:1080px; height:51px; background-image: url(' + payload.path + '/03.jpg)'"></div>
      <div class="text-basic" :style="'white-space: pre;left:0px; top:260px; width:1080px; height:262px; background-image: url(' + payload.path + '/input1.jpg)'">
        <div class="text-headers" style="margin-bottom: 5px; position: initial">
          {{ getTextExodus('input1') }}
        </div>
        <div class="text-values" style="position: initial">
          {{ getText('input1') }}
        </div>
      </div>
      <div :style="'left:0px; top:522px; width:1080px; height:27px; background-image: url(' + payload.path + '/05.jpg)'"></div>
      <div :style="'left:0px; top:549px; width:1080px; height:265px; background-image: url(' + payload.path + '/input2.jpg)'">
        <div class="text-headers" style="margin-bottom: 5px; position: initial">
          {{ getTextExodus('input2') }}
        </div>
        <div class="text-values" style="position: initial">
          {{ getText('input2') }}
        </div>
      </div>
      <div :style="'left:0px; top:814px; width:1080px; height:24px; background-image: url(' + payload.path + '/07.jpg)'"></div>
      <div :style="'left:0px; top:838px; width:1080px; height:265px; background-image: url(' + payload.path + '/input3.jpg)'">{{ getText('input3') }}</div>
      <div :style="'left:0px; top:1103px; width:1080px; height:28px; background-image: url(' + payload.path + '/09.jpg)'"></div>
      <div :style="'left:0px; top:1131px; width:1080px; height:258px; background-image: url(' + payload.path + '/input4.jpg)'">{{ getText('input4') }}</div>
      <div :style="'left:0px; top:1389px; width:1080px; height:30px; background-image: url(' + payload.path + '/11.jpg)'"></div>
      <div :style="'left:0px; top:1419px; width:1080px; height:261px; background-image: url(' + payload.path + '/input5.jpg)'">{{ getText('input5') }}</div>
      <div :style="'left:0px; top:1680px; width:1080px; height:27px; background-image: url(' + payload.path + '/13.jpg)'"></div>
      <div :style="'left:0px; top:1707px; width:1080px; height:262px; background-image: url(' + payload.path + '/input6.jpg)'">{{ getText('input6') }}</div>
      <div :style="'left:0px; top:1969px; width:1080px; height:27px; background-image: url(' + payload.path + '/15.jpg)'"></div>
      <div :style="'left:0px; top:1996px; width:1080px; height:262px; background-image: url(' + payload.path + '/input7.jpg)'">{{ getText('input7') }}</div>
      <div :style="'left:0px; top:2258px; width:1080px; height:16px; background-image: url(' + payload.path + '/17.jpg)'"></div>
    </div>
  </div>
</template>
<script>
import themeMixin from '../mixins/mixin';
export default {
  name: 'ExodusMobile',
  mixins: [themeMixin],

  data() {
    return {};
  },
  computed: {
    // themeClass() {
    //   return this.payload.path.split('/').pop();
    // },
    // themeClass2() {
    //   return this.payload.path.split('/').pop() + '2';
    // },
    // sumColor() {
    //   return this.payload.query.direction == 'in' ? '#4BA395' : '#AA463E';
    // },
  },
  methods: {
    getTextExodus(text) {
      const direction = this.payload.query.direction;
      if (text == 'input1') {
        return this.payload.theme.inputs.find((input) => input.alias == `${direction}f`).value;
      }
    },
    // sumFormatter(sum) {
    //   return `≈${Math.ceil(+sum * 100) / 100}`;
    // },
    // signFormatter(sum) {
    //   return `${this.payload.query.direction == 'in' ? '+' : '-'}${sum}`;
    // },
    // dateFormatter(date) {
    //   return new Date(date)
    //     .toGMTString()
    //     .replace(/ \d{4}/, '')
    //     .replace(/:\d{2} GMT/, '');
    // },
  },
};
</script>
<style>
body {
}

div {
  position: absolute;
}

.text {
  display: flex;
  font-weight: 900;
  justify-content: flex-center;
  align-items: center;
}

.text-basic {
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fefeff;
  font-size: 42px;
}
.text-headers {
  color: #c6c9d8;
}
.text-values {
  color: #9599a4;
}
</style>
