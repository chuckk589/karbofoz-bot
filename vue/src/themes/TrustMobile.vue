<template>
  <div id="wbar" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <div :style="'left:0px; top:0px; width:1080px; height:104px; background-image: url(' + payload.path + '/bar.jpg)'"></div>
    <div id="wobar" class="mobile-dark">
      <div :style="'left:0px; top:104px; width:159px; height:202px; background-image: url(' + payload.path + '/02.jpg)'"></div>
      <div :class="'text-left ' + themeClass" :style="'font-size: 63px;left:159px; top:104px; width:921px; height:142px; background-image: url(' + payload.path + '/text1.jpg)'">{{ getText('text1') }}</div>
      <div :style="'left:159px; top:246px; width:921px; height:60px; background-image: url(' + payload.path + '/04.jpg)'"></div>
      <div class="text" :style="'color:' + sumColor + ';font-size:93px;left:0px; top:306px; width:1080px; height:114px; background-image: url(' + payload.path + '/input1.jpg)'">{{ signFormatter(getText('input1')) }}</div>
      <div :class="'text ' + themeClass2" :style="'font-size: 42px;left:0px; top:420px; width:1080px; height:61px; background-image: url(' + payload.path + '/06.jpg)'">{{ sumFormatter(getText('input1')) }}</div>
      <div :style="'left:0px; top:481px; width:1080px; height:77px; background-image: url(' + payload.path + '/07.jpg)'"></div>
      <div :style="'left:0px; top:558px; width:83px; height:868px; background-image: url(' + payload.path + '/08.jpg)'"></div>
      <div :class="'text-left ' + themeClass" :style="'left:83px; top:558px; width:457px; height:142px; background-image: url(' + payload.path + '/text2.jpg)'">{{ getText('text2') }}</div>
      <div :class="'text-right ' + themeClass2" :style="'left:540px; top:558px; width:457px; height:142px; background-image: url(' + payload.path + '/input2.jpg)'">{{ dateFormatter(getText('input2')) }}</div>
      <div :style="'left:997px; top:558px; width:83px; height:868px; background-image: url(' + payload.path + '/11.jpg)'"></div>
      <div :class="'text-left ' + themeClass" :style="'left:83px; top:700px; width:457px; height:141px; background-image: url(' + payload.path + '/input3.jpg)'">
        <div style="position: initial">{{ getText('text3') }}</div>
        <div :style="'position: initial; margin-top: 18px; margin-left: 20px; width:71px; height:74px; background-image: url(' + payload.path + '/text3_02.jpg)'"></div>
      </div>
      <div :class="'text-right ' + themeClass2" :style="'left:540px; top:700px; width:457px; height:141px; background-image: url(' + payload.path + '/input3.jpg)'">{{ getText('input3') }}</div>
      <div :class="'text-left ' + themeClass" :style="'left:83px; top:841px; width:356px; height:144px; background-image: url(' + payload.path + '/text4.jpg)'">{{ getText('direction') }}</div>
      <div :class="'text-right ' + themeClass2" :style="'left:439px; top:841px; width:558px; height:144px; background-image: url(' + payload.path + '/input4.jpg)'">{{ getText('input4') }}</div>
      <div :style="'left:83px; top:985px; width:914px; height:83px; background-image: url(' + payload.path + '/20.jpg)'"></div>
      <div :class="'text-left ' + themeClass" :style="'left:83px; top:1068px; width:356px; height:139px; background-image: url(' + payload.path + '/text5.jpg)'">
        <div style="position: initial">{{ getText('text4') }}</div>
        <div :style="'position: initial; margin-top: 18px; margin-left: 20px; width:71px; height:74px; background-image: url(' + payload.path + '/text3_02.jpg)'"></div>
      </div>
      <div :class="'text-right ' + themeClass2" :style="'left:439px; top:1068px; width:558px; height:139px; background-image: url(' + payload.path + '/input5.jpg)'">{{ getText('input5') }}</div>
      <div :class="'text-left ' + themeClass" :style="'left:83px; top:1207px; width:457px; height:144px; background-image: url(' + payload.path + '/text6.jpg)'">{{ getText('text6') }}</div>
      <div :class="'text-right ' + themeClass2" :style="'left:540px; top:1207px; width:457px; height:144px; background-image: url(' + payload.path + '/input6.jpg)'">{{ getText('input6') }}</div>
      <div :style="'left:83px; top:1351px; width:914px; height:75px; background-image: url(' + payload.path + '/25.jpg)'"></div>
      <div :class="'text ' + themeClass2" :style="'font-size: 40px;left:0px; top:1426px; width:1080px; height:88px; background-image: url(' + payload.path + '/text7.jpg)'">{{ getText('text5') }}</div>
      <div :style="'left:0px; top:1514px; width:1080px; height:760px; background-image: url(' + payload.path + '/27.jpg)'"></div>
    </div>
  </div>
</template>
<script>
import themeMixin from '../mixins/mixin';
export default {
  name: 'TrustMobile',
  mixins: [themeMixin],

  data() {
    return {};
  },
  computed: {
    themeClass() {
      return this.payload.path.split('/').pop();
    },
    themeClass2() {
      return this.payload.path.split('/').pop() + '2';
    },
    sumColor() {
      return this.payload.query.direction == 'in' ? '#4BA395' : '#AA463E';
    },
  },
  methods: {
    sumFormatter(sum) {
      return `≈${Math.ceil(+sum * 100) / 100}`;
    },
    signFormatter(sum) {
      return `${this.payload.query.direction == 'in' ? '+' : '-'}${sum}`;
    },

    dateFormatter(date) {
      return new Date(date)
        .toGMTString()
        .replace(/ \d{4}/, '')
        .replace(/:\d{2} GMT/, '');
    },
  },
};
</script>
