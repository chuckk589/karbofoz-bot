<template>
  <div class="random-btn align-end">
    <v-btn style="transform: rotate(90deg); margin-right: -10px" color="grey-lighten-1" icon="mdi-upload" variant="text" @click="loadPreset"></v-btn>
    <span>Загрузить</span>
  </div>
</template>

<script>
export default {
  name: 'PresetCell',
  methods: {
    loadPreset() {
      this.$emitter.emit('load-preset', {
        id: this.params.data.value,
      });
    },
  },
};
</script>
