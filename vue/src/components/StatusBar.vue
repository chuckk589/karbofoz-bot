<template>
  <div v-if="query._device == 'xiaomi'" class="s-bar" style="height: 213px; margin-top: 24px; margin-left: 35px" :class="theme + '-bar'">
    <div>
      <div class="xiaomi" style="font-size: 35px; font-family: 'Roboto'; letter-spacing: 1px">{{ query['_time'] }}</div>
      <FakeImg class="xiaomi" v-if="!!+query._moon" :path="'/devices/xiaomi/12.png'" style="margin-left: 10px" />
      <FakeImg class="xiaomi" v-if="!!+query._vibro" :path="'/devices/xiaomi/11.png'" style="margin-left: 13px" />
      <FakeImg class="xiaomi" v-if="!!+query._alarm" :path="'/devices/xiaomi/10.png'" style="margin-left: 13px" />
      <FakeImg class="xiaomi" v-if="!!+query._nfc" :path="'/devices/xiaomi/9.png'" style="margin-left: 15px" />
      <FakeImg class="xiaomi" v-if="!!+query._vpn" :path="'/devices/xiaomi/8.png'" style="margin-left: 17px" />
      <FakeImg class="xiaomi" v-if="!!+query._cog" :path="'/devices/xiaomi/7.png'" style="margin-left: 18px" />
      <v-spacer></v-spacer>
      <FakeImg class="xiaomi" v-if="!!+query._bluetooth" :path="'/devices/xiaomi/6.png'" style="margin-right: 14px" />
      <FakeImg class="xiaomi" v-if="!!+query._vpn" :path="'/devices/xiaomi/5.png'" style="margin-right: 14px" />
      <FakeImg class="xiaomi" v-if="!!+query._volte" :path="'/devices/xiaomi/4.png'" style="margin-right: 3px" />
      <WFComponent :meta="!+query._wifiAP" :value="+query['_4g']" name="xiaomi_bar" style="margin-right: 14px" />
      <WFComponent name="xiaomi_wf2" :value="+query['_wifiS']" style="margin-right: 16px" />
      <WFComponent v-if="!!+query._wifiAP" :value="+query['_wifiAPS']" name="xiaomi_wf" style="margin-right: 11px" />
      <WFComponent :value="query['_charge']" name="xiaomi_btr" style="margin-right: 41px" />
    </div>
    <FakeImg class="xiaomi" :path="'/devices/xiaomi/2.png'" style="margin: 48px 34px 0px auto" />
  </div>
  <div v-else-if="query._device == 'iphone'" style="height: 147px; align-items: stretch" :class="theme + '-bar'">
    <div style="flex: 1 1; margin-left: 128px; margin-top: -9px">
      <div class="iphone" style="font-size: 45px; font-family: 'iphone'; letter-spacing: 1px">{{ query['_time'] }}</div>
      <FakeImg class="iphone" v-if="!!+query._geoloc" :path="'/devices/iphone/1.png'" style="margin-left: 18px" />
      <v-spacer></v-spacer>
      <WFComponent :value="+query['_4g']" name="iphone_bar" :meta="query['_simnum']" style="margin-right: 21px" />
      <WFComponent v-if="query._network == 'wifi'" :value="+query['_wifiS']" name="iphone_wf" style="margin-right: 12px" />
      <FakeImg class="iphone" v-if="query._network == 'lte'" :path="'/devices/iphone/3.png'" style="margin-right: 10px" />
      <WFComponent :value="query['_charge']" name="iphone_btr" style="margin-right: 77px; margin-top: 5px" />
    </div>
  </div>
  <div v-else-if="query._device == 'samsung'" style="height: 149px; align-items: stretch" :class="theme + '-bar'">
    <div style="flex: 1 1; margin-top: -35px; margin-left: 75px">
      <div class="samsung" style="font-size: 35px; font-family: 'Roboto'; letter-spacing: 1px">{{ query['_time'] }}</div>
      <FakeImg class="samsung" v-if="!!+query._geoloc" :path="'/devices/samsung/1.png'" style="margin-left: 19px; margin-top: 6px" />
      <v-spacer></v-spacer>
      <FakeImg class="samsung" v-if="!!+query._vpn" :path="'/devices/samsung/6.png'" style="margin-left: 15px" />

      <FakeImg class="samsung" v-if="query._sound == 'nosound'" :path="'/devices/samsung/2.png'" style="margin-left: 15px" />
      <FakeImg class="samsung" v-if="query._sound == 'novibro'" :path="'/devices/samsung/9.png'" style="margin-left: 15px" />

      <FakeImg class="samsung" v-if="!!+query._geoloc2" :path="'/devices/samsung/3.png'" style="margin-left: 15px" />

      <FakeImg class="samsung" v-if="query._wifiShare == 'out'" :path="'/devices/samsung/7.png'" style="margin-left: 15px" />
      <WFComponent v-if="query._wifiShare == 'in'" :value="query['_wifiS']" name="samsung_wf" style="margin-right: 5px; margin-top: -3px; margin-left: 16px" />

      <FakeImg class="samsung" v-if="query._wifiMode == 'volte' || !!+query._volte" :path="'/devices/samsung/4.png'" style="margin-left: 15px" />
      <FakeImg class="samsung" v-if="query._wifiMode == 'h'" :path="'/devices/samsung/8.png'" style="margin-left: 15px" />

      <WFComponent :value="query['_wifiS1']" name="samsung_bar" style="margin-left: 10px" />
      <WFComponent v-if="query._simnum == 'sim2'" :value="query['_wifiS2']" name="samsung_bar" style="margin-left: 14px" />

      <div class="samsung" style="font-size: 35px; font-family: 'Roboto'; letter-spacing: 1px; margin-top: 2px; margin-left: 17px">{{ query['_charge'] }}%</div>
      <WFComponent :value="query['_charge']" name="samsung_btr" style="margin-right: 71px; margin-left: 9px; margin-top: 5px" />
    </div>
  </div>
</template>

<script>
import FakeImg from './FakeImg.vue';
import WFComponent from './WFComponent.vue';
export default {
  name: 'StatusBar',
  components: {
    FakeImg,
    WFComponent,
  },
  props: {
    query: {
      type: Object,
    },
    theme: {
      type: String,
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: 'iphone';
  src: url('../devices/iphone/sfui.otf');
}
.s-bar {
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
}
</style>
<style>
.mobile-dark-bar .xiaomi,
.mobile-dark-bar .iphone,
.mobile-dark-bar .samsung {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}
.mobile-light-bar .xiaomi,
.mobile-light-bar .iphone,
.mobile-light-bar .samsung {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
}
</style>
