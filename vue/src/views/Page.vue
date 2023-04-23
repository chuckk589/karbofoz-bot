<template>
  <div style="position: absolute; left: 0px; top: 0px; width: 1080px; height: 2184px">
    <div style="position: absolute; left: 0px; top: 0px; width: 237px; height: 119px; background-image: url(binance/mobile-dark/01.jpg)"></div>
    <div class="text" style="font: 900 49px; color: #ebecee; position: absolute; left: 237px; top: 0px; width: 606px; height: 119px; background-image: url(binance/mobile-dark/02.jpg)">
      {{ $route.query.text1 }}
    </div>
    <div style="position: absolute; left: 843px; top: 0px; width: 237px; height: 119px; background-image: url(binance/mobile-dark/03.jpg)"></div>
    <div style="position: absolute; left: 0px; top: 119px; width: 1080px; height: 69px; background-image: url(binance/mobile-dark/04.jpg)"></div>
    <div style="position: absolute; left: 0px; top: 188px; width: 39px; height: 1996px; background-image: url(binance/mobile-dark/05.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 188px; width: 1002px; height: 75px; background-image: url(binance/mobile-dark/06.jpg)"></div>
    <div style="position: absolute; left: 1041px; top: 188px; width: 39px; height: 1996px; background-image: url(binance/mobile-dark/07.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 263px; width: 1002px; height: 112px; background-image: url(binance/mobile-dark/08.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 375px; width: 1002px; height: 74px; background-image: url(binance/mobile-dark/08.jpg)">
      <div style="width: 71px; height: 74px; background-image: url(binance/mobile-dark/10.jpg)"></div>
    </div>
    <div style="position: absolute; left: 39px; top: 449px; width: 1002px; height: 116px; background-image: url(binance/mobile-dark/12.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 565px; width: 1002px; height: 66px; background-image: url(binance/mobile-dark/13.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 631px; width: 1002px; height: 56px; background-image: url(binance/mobile-dark/14.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 687px; width: 1002px; height: 92px; background-image: url(binance/mobile-dark/15.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 779px; width: 1002px; height: 94px; background-image: url(binance/mobile-dark/16.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 873px; width: 1002px; height: 100px; background-image: url(binance/mobile-dark/17.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 973px; width: 951px; height: 132px; background-color: #ffffff; background-image: url(binance/mobile-dark/mobile_19.jpg)"></div>
    <div style="position: absolute; left: 990px; top: 973px; width: 51px; height: 362px; background-image: url(binance/mobile-dark/19.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 1105px; width: 951px; height: 230px; background-image: url(binance/mobile-dark/20.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 1335px; width: 1002px; height: 97px; background-image: url(binance/mobile-dark/21.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 1432px; width: 1002px; height: 39px; background-image: url(binance/mobile-dark/22.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 1471px; width: 721px; height: 120px; background-image: url(binance/mobile-dark/23.jpg)"></div>
    <div style="position: absolute; left: 760px; top: 1471px; width: 281px; height: 361px; background-image: url(binance/mobile-dark/24.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 1591px; width: 721px; height: 66px; background-image: url(binance/mobile-dark/25.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 1657px; width: 721px; height: 175px; background-image: url(binance/mobile-dark/26.jpg)"></div>
    <div style="position: absolute; left: 39px; top: 1832px; width: 1002px; height: 352px; background-image: url(binance/mobile-dark/27.jpg)"></div>
  </div>
</template>
<script>
export default {
  name: 'PageVue',
  props: {
    query: {},
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
<style>
@font-face {
  font-family: 'binance';
  src: url('binance/DINPro.ttf');
}
.text {
  font-family: 'binance';
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
