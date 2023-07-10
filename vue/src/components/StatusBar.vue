<template>
  <div v-if="query._device == 'xiaomi'" class="s-bar" style="height: 213px; margin-left: 35px" :class="theme + '-bar'">
    <div>
      <div class="xiaomi" style="font-size: 35px; font-family: 'Roboto'; letter-spacing: 1px">{{ time }}</div>
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
      <WFComponent v-if="!!+query._wifi" name="xiaomi_wf" :value="+query['_wifiS']" style="margin-right: 16px" />
      <WFComponent v-if="!!+query._wifiAP" :value="+query['_wifiAPS']" name="xiaomi_wf2" style="margin-right: 11px" />
      <WFComponent :value="query['_charge']" name="xiaomi_btr" style="margin-right: 41px" />
    </div>
    <FakeImg class="xiaomi" :path="'/devices/xiaomi/2.png'" style="margin: 48px 34px 0px auto" />
  </div>
  <div v-else-if="query._device == 'iphone'" style="height: 147px; align-items: stretch" :class="theme + '-bar'">
    <div style="flex: 1 1; margin-left: 128px; margin-top: -9px">
      <div class="iphone" style="font-size: 45px; font-family: 'iphone'; letter-spacing: 1px">{{ time }}</div>
      <FakeImg class="iphone" v-if="!!+query._geoloc" :path="'/devices/iphone/1.png'" style="margin-left: 18px" />
      <v-spacer></v-spacer>
      <WFComponent :value="+query['_4g']" name="iphone_bar" :meta="query['_simnum']" style="margin-right: 21px" />
      <WFComponent v-if="query._connection == 'wifi'" :value="+query['_wifiS']" name="iphone_wf" style="margin-right: 12px" />
      <FakeImg class="iphone" v-if="query._connection == 'lte'" :path="'/devices/iphone/3.png'" style="margin-right: 10px" />
      <WFComponent :value="query['_charge']" name="iphone_btr" style="margin-right: 77px; margin-top: 5px" />
    </div>
  </div>
  <div v-else-if="query._device == 'samsung'" style="height: 100px; align-items: stretch" :class="theme + '-bar'">
    <div style="flex: 1 1; margin-left: 75px">
      <div class="samsung" style="font-size: 35px; font-family: 'Roboto'; letter-spacing: 1px">{{ time }}</div>
      <FakeImg class="samsung" v-if="!!+query._geoloc" :path="'/devices/samsung/1.png'" style="margin-left: 19px; margin-top: 6px" />
      <v-spacer></v-spacer>
      <FakeImg class="samsung" v-if="!!+query._vpn" :path="'/devices/samsung/6.png'" style="margin-left: 15px" />

      <FakeImg class="samsung" v-if="query._sound == 'nosound'" :path="'/devices/samsung/2.png'" style="margin-left: 15px" />
      <FakeImg class="samsung" v-if="query._sound == 'novibro'" :path="'/devices/samsung/9.png'" style="margin-left: 15px" />

      <FakeImg class="samsung" v-if="!!+query._geoloc2" :path="'/devices/samsung/3.png'" style="margin-left: 15px" />

      <FakeImg class="samsung" v-if="query._wifiMode == 'out'" :path="'/devices/samsung/7.png'" style="margin-left: 15px" />
      <WFComponent v-if="query._wifiMode == 'in'" :value="query['_wifiS']" name="samsung_wf" style="margin-right: 5px; margin-top: -3px; margin-left: 16px" />

      <FakeImg class="samsung" v-if="!!+query._volte" :path="'/devices/samsung/4.png'" style="margin-left: 15px" />
      <FakeImg class="samsung" v-if="query._connection == 'h'" :path="'/devices/samsung/8.png'" style="margin-left: 15px" />
      <WFComponent v-if="query._connection == '4g'" name="samsung_4g" style="margin-left: 15px" />

      <WFComponent :value="query['_wifiS1']" name="samsung_bar" style="margin-left: 10px" />
      <WFComponent v-if="query._simnum == 'sim2'" :value="query['_wifiS2']" name="samsung_bar" style="margin-left: 14px" />

      <div class="samsung" style="font-size: 35px; font-family: 'Roboto'; letter-spacing: 1px; margin-top: 2px; margin-left: 17px">{{ query['_charge'] }}%</div>
      <WFComponent :value="query['_charge']" name="samsung_btr" style="margin-right: 71px; margin-left: 9px" />
    </div>
  </div>
  <div v-else-if="query._device == 'realme'" style="height: 155px; align-items: stretch" :class="theme + '-bar'">
    <div style="flex: 1 1">
      <div class="realme" style="font-size: 38px; font-family: realme; margin-left: 158px">{{ time }}</div>
      <v-spacer></v-spacer>
      <FakeImg class="realme" v-if="!!+query._nfc" :path="'/devices/realme/3.png'" style="margin-left: 13px" />

      <FakeImg class="realme" v-if="!!+query._alarm" :path="'/devices/realme/4.png'" style="margin-left: 18px" />

      <FakeImg class="realme" v-if="!!+query._bluetooth" :path="'/devices/realme/5.png'" style="margin-left: 18px" />

      <div class="realme" style="margin-left: 10px; font-family: Realme; letter-spacing: 1px; font-weight: 600; flex-direction: column; line-height: 16px">
        <div style="transform: scale(0.9, 1)">{{ speed }}</div>
        <div>KB/S</div>
      </div>

      <WFComponent v-if="!!+query._wifi" name="realme_wf" :value="query._wifiS" style="margin-left: 14px" />

      <div v-if="!!+query._volte" style="align-items: flex-start; margin-left: 8px">
        <div class="realme" style="flex-direction: column; font-family: 'realme'; margin-top: 2px; letter-spacing: 1px; font-size: 15px; -webkit-text-stroke: 2px; transform: scale(0.9, 1.1); line-height: 15px">
          <span>Vo</span>
          <span>LTE</span>
        </div>
        <div style="flex-direction: column">
          <FakeImg class="realme" :path="'/devices/realme/sim1.png'" style="margin-bottom: 2px" />
          <FakeImg class="realme" v-if="query._simnum == 'sim2'" :path="'/devices/realme/sim2.png'" />
        </div>
      </div>

      <WFComponent :meta="!+query._wifi" :value="query['_bar1']" name="realme_bar" style="margin-left: 14px" />
      <WFComponent v-if="query._simnum == 'sim2'" :value="query['_bar2']" name="realme_bar" style="margin-left: 14px" />

      <WFComponent :value="query['_charge']" name="realme_btr" style="margin-left: 18px; margin-right: 69px" />
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
  computed: {
    speed() {
      const num = this.query._speed.includes('.') ? parseFloat(this.query._speed) : parseInt(this.query._speed);
      const len = 3 - Math.floor(num).toString().length;
      return num.toFixed(len);
    },
    time() {
      return this.query.language == 'es' ? (this.query._time[0] == '0' ? this.query._time.slice(1) : this.query._time) : this.query._time;
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: 'iphone';
  src: url('../devices/iphone/sfui.otf');
}

@font-face {
  font-family: 'realme';
  src: url('../devices/realme/gilroy.ttf');
}

.s-bar {
  flex-direction: column !important;
  align-items: stretch !important;
}
</style>
<style>
.mobile-dark-bar .xiaomi,
.mobile-dark-bar .iphone,
.mobile-dark-bar .samsung,
.mobile-dark-bar .realme {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}

.mobile-light-bar .xiaomi,
.mobile-light-bar .iphone,
.mobile-light-bar .samsung,
.mobile-light-bar .realme {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
}
</style>
