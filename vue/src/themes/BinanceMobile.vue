<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2184px; display: flex; flex-direction: column">
    <div :class="'text-' + theme" style="height: 120px; margin-bottom: 75px; font-size: 49px">
      <div style="background-image: url('/binance/images/3.png'); width: 51px; height: 40px; margin-right: auto; margin: 0 auto 0 32px"></div>
      <div style="margin-right: auto; font-weight: 900; padding-left: 120px">Deposit Details</div>
      <div style="background-image: url('/binance/images/2.png'); width: 43px; height: 52px; margin: 0 79px 0 0"></div>
      <div style="background-image: url('/binance/images/1.png'); width: 41px; height: 52px; margin: 0 38px 0 0"></div>
    </div>
    <div class="text-gray" style="font-size: 37px; margin-bottom: 18px; font-weight: 600">Amount</div>
    <div :class="'text-' + theme" style="margin-bottom: 4px">
      <div style="font-size: 70px; font-weight: 1000; letter-spacing: 3px">1233.056789</div>
      <div style="font-size: 42px; font-weight: 800; padding: 26px 0 0 0">USDT</div>
    </div>
    <div style="margin-bottom: 28px">
      <div style="background-image: url('/binance/images/4.png'); width: 32px; height: 32px; margin-right: 20px"></div>
      <div style="color: #2cb682ff; font-weight: 700; font-size: 42px; letter-spacing: 1px">Completed</div>
    </div>
    <div :class="'line-' + theme" class="text-gray" style="font-size: 33px; text-align: center; line-height: 39px; font-weight: 500; height: 161px; align-items: flex-start; margin-bottom: 76px">Crypto has arrived in your Binance account. View your spot account balance for more details.</div>
    <div class="data-item" style="margin-bottom: 40px">
      <div class="text-gray">Confirmations</div>
      <div :class="'text-' + theme">50 / 1</div>
    </div>
    <div class="data-item" style="margin-bottom: 40px">
      <div class="text-gray">Network</div>
      <div :class="'text-' + theme">TRX</div>
    </div>
    <div class="data-item" style="margin-bottom: 31px">
      <div class="text-gray">Deposit Wallet</div>
      <div :class="'text-' + theme">Spot Wallet</div>
    </div>
    <div class="data-item" style="margin-bottom: 70px">
      <div class="text-gray" style="margin-right: auto">Address</div>
      <div :class="'text-' + theme" style="margin-right: 25px; max-width: 560px; word-break: break-word; align-content: stretch; text-align: end">23333333333332333333333333dsfdsfdsfdsfdsfdsfdsfdsf</div>
      <div style="background-image: url('/binance/images/5.png'); width: 37px; height: 41px; margin-right: 10px"></div>
    </div>
    <div class="data-item" style="margin-bottom: 81px">
      <div class="text-gray" style="margin-right: auto">Txid</div>
      <div :class="'text-' + theme" style="margin-right: 25px; max-width: 560px; word-break: break-word; align-content: stretch; text-align: end; text-decoration: underline">23333333333332333333333333dsfdsfdsfdsfdsfdsfdsfdsf</div>
      <div style="background-image: url('/binance/images/5.png'); width: 37px; height: 41px; margin-right: 10px"></div>
    </div>
    <div class="data-item" style="margin-bottom: 62px">
      <div class="text-gray">Date</div>
      <div :class="'text-' + theme">2023-04-07 15:42:40</div>
    </div>
    <div :class="'block-' + theme" style="height: 360px; border-radius: 20px; margin: 0 40px; flex: -; /* flex-direction: column; */ align-items: stretch">
      <div style="flex-direction: column; /* flex-grow: 1; */ flex: 1; align-items: flex-start; justify-content: flex-start; margin: 64px 0 0 50px">
        <div class="text-gray" style="font-weight: 700; font-size: 33px">Receive</div>
        <div :class="'text-' + theme" style="font-size: 50px; font-weight: 900; margin-bottom: 70px">Receive Crypto With Zero Fee</div>
        <div style="color: #e9ba22ff; font-size: 38px; font-weight: 800">Discover Now</div>
      </div>
      <div style="flex-direction: column; padding-right: 32px; justify-content: flex-start; /* margin-top: 14px; */">
        <div style="background-image: url('/binance/images/6.png'); width: 127px; height: 135px; /* margin-right: 58px; */ margin-top: 112px"></div>
        <div style="background-image: url('/binance/images/7.png'); width: 189px; height: 13px; margin-top: 47px; margin-right: 10px"></div>
      </div>
    </div>
  </div>
</template>
<script>
import themeMixin from '../mixins/mixin';
export default {
  name: 'BinanceMobile',
  mixins: [themeMixin],

  data() {
    return {
      theme: '',
    };
  },
  mounted() {
    this.theme = this.payload.path.split('/').pop();
  },
};
</script>
<style scoped>
@font-face {
  font-family: 'font';
  src: url('../binance/fonts/DINPro.ttf');
}

#main {
  font-family: 'font';
}

#main div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobile-dark {
  background-color: #1f2630;
}

.text-mobile-dark {
  color: #edeef1ff;
}
.block-mobile-dark {
  background-color: #29313c;
}
.block-mobile-light {
  background-color: #fafafa;
}
.line-mobile-dark {
  border-bottom: 1px solid #353c46;
}
.line-mobile-light {
  border-bottom: 1px solid #ececed;
}
.text-mobile-light {
  color: black;
}

.text-gray {
  color: #717a8bff;
}
.data-item {
  font-size: 37px;
  font-weight: 500;
  justify-content: space-between !important;
  padding: 0 36px;
}
</style>
