<template>
  <div>
    <v-text-field type="number" :rules="rules" :label="label" v-model="value" density="compact"></v-text-field>
    <v-slider :min="range[0]" :max="range[1]" v-model="value" step="1"></v-slider>
  </div>
</template>
<script>
export default {
  name: 'SliderSelect',
  // emits: ['update:modelValue'],
  props: {
    label: {
      type: String,
      default: '',
    },
    range: {
      type: Array,
      default: () => [],
    },
    hint: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: [Object, String],
      default: null,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
