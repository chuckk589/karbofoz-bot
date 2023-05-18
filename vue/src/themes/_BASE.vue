<template>
  <div :class="theme" id="main" style="left: 0px; top: 0px; width: 1080px; height: 2274px">
    <StatusBar :query="payload.query" :theme="theme"></StatusBar>
    <div id="wobar" style="display: flex; flex-direction: column; align-items: stretch; margin: 0 42px">
      <div style="height: 97px"></div>
      <div style="height: 113px; margin-bottom: 60px">
        <FakeImg class="gate" :path="'/gate/1.png'" style="margin-left: 10px" />
        <div></div>
        <FakeImg class="gate" :path="'/gate/2.png'" style="margin-left: 10px" />
      </div>
      <div style="height: 55px; margin-bottom: 35px"></div>
      <div style="height: 89px; margin-bottom: 39px"></div>
      <div style="height: 55px; margin-bottom: 96px"></div>
      <div style="height: 897px"></div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../mixins/mixin';
import StatusBar from '../components/StatusBar.vue';
import FakeImg from '@/components/FakeImg.vue';
export default {
  name: 'GateMobile',
  mixins: [themeMixin],
  components: {
    StatusBar,
    FakeImg,
  },
  data() {
    return {
      theme: '',
    };
  },
  computed: {},
  methods: {},
};
</script>
<style scoped>
.mobile-dark .gate {
  filter: brightness(0) saturate(100%) invert(98%) sepia(27%) saturate(0%) hue-rotate(353deg) brightness(110%) contrast(100%);
}

.mobile-light .gate {
  filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7460%) hue-rotate(81deg) brightness(91%) contrast(108%);
}
</style>
