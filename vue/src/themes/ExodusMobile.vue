<template>
  <div id="main" style="left: 0px; top: 0px; width: 1080px; height: 2279px; background-image: url(exodus/images/4.png)">
    <div style="display: flex; flex-direction: column; align-items: stretch">
      <div style="height: 103px; background-color: red; margin-bottom: 15px"></div>
      <div style="font-size: 37px; margin-bottom: 80px">
        <div style="background-image: url(exodus/images/1.png); width: 55px; height: 39px; margin-left: 64px"></div>
        <div style="color: #9ca6c8; font-size: 37px; margin: auto">TRANSACTION DETAILS</div>
        <div style="background-image: url(exodus/images/2.png); width: 46px; height: 65px; margin-right: 71px"></div>
      </div>
      <div v-for="(block, index) in block1" :key="index" class="data-item">
        <div>{{ block.text }}</div>
        <div :style="block.style">{{ block.value }}</div>
      </div>
      <div class="data-item" style="height: 488px; justify-content: space-evenly">
        <kek style="background-image: url(exodus/images/3.png); width: 91px; height: 92px; margin-top: 36px"></kek>
        <div style="font-size: 42px">Need help?</div>
        <div style="margin-bottom: 36px; font-size: 53px; background: #907df0; background: linear-gradient(to left, #907df0 0%, #604ebf 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent">Contact Support</div>
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
export default {
  name: 'ExodusMobile',
  mixins: [themeMixin],

  data() {
    return {
      theme: '',
      block1: [
        {
          text: 'Received',
          value: '+1,234.0568 USDT',
          style: 'color:#5fa697',
        },
        {
          text: 'Personal Note',
          value: 'Add Note',
          style: 'color:#6c5dc3',
        },
        {
          text: 'Created',
          value: 'A few seconds ago...',
        },
        {
          text: 'Transaction ID',
          value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          style: 'line-height: 47px;font-size: 40px;margin-top: 17px;color: #3f099f;background: #907DF0;background: linear-gradient(to left, #907DF0 0%, #604EBF 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;',
        },
        {
          text: 'Now',
          value: '$1,234.94',
        },
      ],
    };
  },
  mounted() {
    this.theme = this.payload.path.split('/').pop();
  },
};
</script>
<style scoped>
body {
  font-family: 'Roboto';
}

#main div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-item {
  flex-direction: column;
  height: 265px;
  background: linear-gradient(180deg, rgba(46, 50, 79, 0.938813025210084) 0%, rgba(45, 49, 78, 0.8911939775910365) 50%, rgba(43, 47, 76, 0.908000700280112) 100%);
  border-radius: 31px;
  margin: 0 53px 24px 53px;
  word-break: break-word;
  text-align: center;
  padding: 0 40px;
}
.data-item div:nth-of-type(1) {
  font-size: 38px;
  color: #c8cad6;
}
.data-item div:nth-of-type(2) {
  font-size: 42px;
  color: #fdfeff;
}
</style>
