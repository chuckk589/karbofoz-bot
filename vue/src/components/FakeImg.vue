<template>
  <div :style="'background-image: url(' + path + ');'">
    <img style="visibility: hidden" :src="path" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FakeImg',
  props: {
    path: {
      type: String,
      default: '',
    },
  },
};
</script>
