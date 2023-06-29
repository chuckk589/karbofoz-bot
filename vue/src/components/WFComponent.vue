<template>
  <div>
    <div v-if="name == 'xiaomi_btr'" style="position: relative">
      <div style="justify-content: start; width: 73%; height: 57%; position: absolute; margin-top: 1px; left: 6px">
        <div class="xiaomi_bar_fill" :style="'background-color:white;width:' + value + '%; height: 100%;border-radius: 3px;margin-left: 3px;'"></div>
        <div style="position: absolute; width: 100%; height: 100%">
          <div class="xiaomi" style="position: absolute; font-size: 20px; font-family: 'Roboto'">{{ value }}</div>
        </div>
      </div>
      <FakeImg class="xiaomi" :path="'/devices/xiaomi/3.png'" style="margin-left: 2px"></FakeImg>
    </div>
    <div v-else-if="name == 'xiaomi_bar'" style="align-items: end; position: relative">
      <div v-if="meta" style="width: 17px">
        <FakeImg class="xiaomi" :path="'/devices/xiaomi/wifi0.png'" style="position: absolute; right: 46px; bottom: 2px"></FakeImg>
        <div class="xiaomi" style="font-family: Roboto; position: absolute; font-size: 18px; right: 28px; bottom: 14px; letter-spacing: 1px">4G+</div>
      </div>
      <FakeImg v-for="(part, index) in xiaomi_bar" :key="index" :style="'background-image: url(' + part.path + ');' + part.style" :path="part.path" :class="part.class || '' + xiaomiFillStyle(index < value)"> </FakeImg>
    </div>
    <div v-else-if="name == 'xiaomi_wf'" style="flex-direction: column-reverse; position: relative">
      <FakeImg v-for="(part, index) in xiaomi_wf" :key="index" :style="'background-image: url(' + part.path + ');' + part.style" :path="part.path" :class="part.class || '' + xiaomiFillStyle(index - 1 < value)" />
    </div>
    <div v-else-if="name == 'xiaomi_wf2'" style="flex-direction: column-reverse; position: relative">
      <FakeImg v-for="(part, index) in xiaomi_wf2" :key="index" :style="'background-image: url(' + part.path + ');' + part.style" :path="part.path" :class="part.class || '' + xiaomiFillStyle(index - 1 < value)">
      </FakeImg>
    </div>
    <div v-else-if="name == 'iphone_btr'" style="position: relative">
      <div style="justify-content: start; width: 70%; height: 54%; position: absolute; margin-bottom: 2px; left: 11px">
        <div :class="iphoneBtrClass" :style="'background-color:white;width:' + value + '%; height: 100%;border-radius: 4px;margin-left: 3px;'"></div>
      </div>
      <FakeImg class="iphone" :path="'/devices/iphone/2.png'" style="margin-left: 2px"></FakeImg>
    </div>
    <div v-else-if="name == 'iphone_wf'" style="flex-direction: column-reverse; position: relative">
      <FakeImg v-for="(part, index) in iphone_wf" :key="index" :style="'background-image: url(' + part.path + ');' + part.style" :path="part.path" :class="part.class || '' + iphoneFillStyle(index < value)" />
    </div>
    <div v-else-if="name == 'iphone_bar'" style="align-items: end; position: relative">
      <FakeImg
        v-for="(part, index) in iphone_bar"
        :key="index"
        :style="'background-image: url(' + part.path + meta + (index + 1) + '.png);' + part.style"
        :path="part.path + meta + (index + 1) + '.png'"
        :class="part.class || '' + iphoneFillStyle(index < value)"
      />
    </div>
    <div v-else-if="name == 'samsung_btr'" style="position: relative; flex-direction: column-reverse; justify-content: flex-end">
      <FakeImg class="samsung" :path="'/devices/samsung/5.png'" />
      <div class="samsung_bar_fill" :style="'background-image: url(/devices/samsung/5.png); width: 100%; position: absolute; height: ' + (100 - value) + '%;'"></div>
    </div>
    <div v-else-if="name == 'samsung_bar'" style="align-items: end; position: relative">
      <FakeImg v-for="(part, index) in samsung_bar" :key="index" :style="'background-image: url(' + part.path + ');' + part.style" :path="part.path" :class="part.class || '' + samsungFillStyle(index < value)"> </FakeImg>
    </div>
    <div v-else-if="name == 'samsung_wf'" style="flex-direction: column-reverse; position: relative">
      <FakeImg v-for="(part, index) in samsung_wf" :key="index" :style="'background-image: url(' + part.path + ');' + part.style" :path="part.path" :class="part.class || '' + samsungFillStyle(index - 1 < value)">
      </FakeImg>
    </div>
    <div v-else-if="name == 'realme_btr'" style="position: relative">
      <div style="justify-content: start; width: 89%; height: 95%; position: absolute; left: 1px">
        <div class="realme_bar_fill" :style="'background-color:white;width:' + value + '%;height: 100%;border-radius: 5px;margin-left: 3px;'"></div>
        <div class="realme" style="position: absolute; width: 100%; font-size: 20px; font-family: 'Roboto'">{{ value }}</div>
      </div>
      <FakeImg class="realme" :path="'/devices/realme/6.png'"></FakeImg>
    </div>
    <div v-else-if="name == 'realme_bar'" style="align-items: end; position: relative">
      <div v-if="meta" style="font-weight: 600; width: 17px">
        <div class="realme" style="right: 3px; position: relative; transform: scale(0.65); -webkit-text-stroke: 1px; font-size: 18px; top: -23px">
          <div style="position: absolute; transform: rotate(90deg); top: -20px">&lt;</div>
          <div style="position: absolute; transform: rotate(270deg); top: -8px; left: -8px">&lt;</div>
        </div>
        <div class="realme" style="transform: scale(1, 1.2); font-size: 18px; right: 21px; bottom: 10px; letter-spacing: 1px; position: absolute; font-weight: 600">4G</div>
      </div>
      <FakeImg v-for="(part, index) in realme_bar" :key="index" :style="'background-image: url(' + part.path + ');' + part.style" :path="part.path" :class="part.class || '' + realmeFillStyle(index < value)"> </FakeImg>
    </div>
    <div v-else-if="name == 'realme_wf'">
      <div>
        <div style="flex-direction: column-reverse; position: relative">
          <FakeImg v-for="(part, index) in realme_wf" :key="index" :style="'background-image: url(' + part.path + ');' + part.style" :path="part.path" :class="part.class || '' + realmeFillStyle(index < value)" />
        </div>
        <div class="realme" style="right: 6px; position: relative; transform: scale(0.65); font-size: 18px; width: 10px; -webkit-text-stroke: 1px; bottom: -9px">
          <div style="position: absolute; transform: rotate(90deg); top: -20px">&lt;</div>
          <div style="position: absolute; transform: rotate(270deg); top: -7px; left: -4px">&lt;</div>
        </div>
      </div>
    </div>
    <div v-else-if="name == 'samsung_4g'" style="align-items: end; position: relative">
      <div style="width: 29px">
        <div class="samsung" style="position: absolute; font-size: 19px; font-weight: 500; letter-spacing: 1px; font-family: 'ROBOTO'; bottom: -7px">4G</div>
        <FakeImg class="samsung_bar_fill" :path="'/devices/samsung/10.png'" style="position: absolute; bottom: -18px"></FakeImg>
      </div>
    </div>
  </div>
</template>
<script>
import FakeImg from './FakeImg.vue';

export default {
  name: 'WFComponent',
  props: {
    name: {
      type: String,
    },
    meta: {
      type: String,
    },
    value: {
      type: Number,
    },
    theme: {
      type: String,
    },
  },

  data() {
    return {
      realme_wf: [
        { path: '/devices/realme/wifi1.png', style: 'margin-top: 1px' },
        { path: '/devices/realme/wifi2.png', style: '' },
        { path: '/devices/realme/wifi3.png', style: 'margin-top: -3px;' },
        { path: '/devices/realme/wifi4.png', style: '' },
      ],
      realme_bar: [
        { path: '/devices/realme/bar1.png', style: '' },
        { path: '/devices/realme/bar2.png', style: 'margin-left: 7px;' },
        { path: '/devices/realme/bar3.png', style: 'margin-left: 7px;' },
        { path: '/devices/realme/bar4.png', style: 'margin-left: 7px;' },
      ],
      samsung_wf: [
        { path: '/devices/samsung/wifi0.png', style: 'position: absolute;    right: -7px;bottom: -5px;', class: 'samsung' },
        { path: '/devices/samsung/wifi1.png', style: 'margin-top: 1px' },
        { path: '/devices/samsung/wifi2.png', style: '' },
        { path: '/devices/samsung/wifi3.png', style: 'margin-top: -3px;' },
        { path: '/devices/samsung/wifi4.png', style: '' },
      ],
      samsung_bar: [
        { path: '/devices/samsung/bar1.png', style: '' },
        { path: '/devices/samsung/bar2.png', style: 'margin-left: 4px;' },
        { path: '/devices/samsung/bar3.png', style: 'margin-left: 4px;' },
        { path: '/devices/samsung/bar4.png', style: 'margin-left: 4px;' },
      ],
      iphone_bar: [
        { path: '/devices/iphone/', style: '' },
        { path: '/devices/iphone/', style: 'margin-left: 4px;' },
        { path: '/devices/iphone/', style: 'margin-left: 4px;' },
        { path: '/devices/iphone/', style: 'margin-left: 4px;' },
      ],
      iphone_wf: [
        { path: '/devices/iphone/wifi1.png', style: 'margin-top: -1px' },
        { path: '/devices/iphone/wifi2.png', style: 'margin-top: -3px;' },
        { path: '/devices/iphone/wifi3.png', style: 'margin-top: -6px;' },
      ],
      xiaomi_wf: [
        { path: '/devices/xiaomi/wifi0.png', style: 'position: absolute;transform: scale(0.8);right: -1px;bottom: -2px;', class: 'xiaomi' },
        { path: '/devices/xiaomi/wifi1.png', style: 'margin-top: -1px' },
        { path: '/devices/xiaomi/wifi2.png', style: 'margin-top: -3px;' },
        { path: '/devices/xiaomi/wifi3.png', style: 'margin-top: -6px;' },
        { path: '/devices/xiaomi/wifi4.png', style: '' },
      ],
      xiaomi_wf2: [
        { path: '/devices/xiaomi/1.png', style: 'position: absolute;right: -3px;bottom: -1px;', class: 'xiaomi' },
        { path: '/devices/xiaomi/wifi1.png', style: 'margin-top: -1px' },
        { path: '/devices/xiaomi/wifi2.png', style: 'margin-top: -3px;' },
        { path: '/devices/xiaomi/wifi3.png', style: 'margin-top: -6px;' },
        { path: '/devices/xiaomi/wifi4.png', style: '' },
      ],
      xiaomi_bar: [
        { path: '/devices/xiaomi/bar1.png', style: '' },
        { path: '/devices/xiaomi/bar2.png', style: 'margin-left: 2px;' },
        { path: '/devices/xiaomi/bar3.png', style: 'margin-left: 2px;' },
        { path: '/devices/xiaomi/bar4.png', style: 'margin-left: 3px;' },
        { path: '/devices/xiaomi/bar5.png', style: 'margin-left: 2px;' },
      ],
    };
  },
  methods: {
    xiaomiFillStyle(state) {
      return state ? 'xiaomi' : 'xiaomi_bar_fill';
    },
    iphoneFillStyle(state) {
      return state ? 'iphone' : 'iphone_bar_fill';
    },
    samsungFillStyle(state) {
      return state ? 'samsung' : 'samsung_bar_fill';
    },
    realmeFillStyle(state) {
      return state ? 'realme' : 'realme_bar_fill';
    },
  },
  computed: {
    iphoneBtrClass() {
      return this.value == 100 ? 'iphone_btr_full' : 'iphone';
    },
  },
  components: { FakeImg },
};
</script>
<style scoped>
.mobile-dark-bar .xiaomi_bar_fill {
  filter: brightness(0) saturate(100%) invert(26%) sepia(5%) saturate(4%) hue-rotate(326deg) brightness(81%) contrast(90%);
}
.mobile-light-bar .xiaomi_bar_fill {
  filter: brightness(0) saturate(100%) invert(100%) sepia(9%) saturate(1080%) hue-rotate(293deg) brightness(108%) contrast(76%);
}

.mobile-dark-bar .iphone_bar_fill {
  filter: brightness(0) saturate(100%) invert(56%) sepia(0%) saturate(0%) hue-rotate(225deg) brightness(93%) contrast(86%);
}
.mobile-light-bar .iphone_bar_fill {
  filter: brightness(0) saturate(100%) invert(80%) sepia(9%) saturate(68%) hue-rotate(201deg) brightness(94%) contrast(96%);
}
.iphone_btr_full {
  filter: brightness(0) saturate(100%) invert(82%) sepia(74%) saturate(4457%) hue-rotate(347deg) brightness(101%) contrast(99%);
}

.samsung_bar_fill {
  filter: brightness(0) saturate(100%) invert(92%) sepia(0%) saturate(1%) hue-rotate(184deg) brightness(82%) contrast(92%);
}

.mobile-light-bar .realme_bar_fill {
  filter: brightness(0) saturate(100%) invert(99%) sepia(3%) saturate(265%) hue-rotate(334deg) brightness(118%) contrast(77%);
}

.mobile-dark-bar .realme_bar_fill {
  filter: brightness(0) saturate(100%) invert(18%) sepia(0%) saturate(2%) hue-rotate(64deg) brightness(101%) contrast(94%);
}
</style>
