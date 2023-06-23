<template>
  <v-radio-group :rules="rules" v-model="value" :label="label" inline>
    <v-radio class="mr-2" v-for="index in range[1]" :label="index" :value="index" :key="index"></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: 'RadioSelect',
  emits: ['update:modelValue'],
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
