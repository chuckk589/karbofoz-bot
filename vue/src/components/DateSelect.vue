<template>
  <div>
    <v-combobox :hint="hint" :rules="rules" v-model="value" :items="items" density="compact" label="Дата транзакции" append-inner-icon="mdi-calendar">
      <template #label>
        <slot name="label"></slot>
      </template>
    </v-combobox>
    <input hidden ref="date" type="datetime-local" @change="(evt) => $emit('update:modelValue', evt.target.value)" step="1" />
  </div>
</template>

<script>
export default {
  name: 'DateSelect',
  emits: ['update:modelValue'],
  props: {
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
  mounted() {
    document.querySelector('div[type="datetime-local"] i').addEventListener('mousedown', (evt) => {
      this.$refs.date.showPicker();
      evt.stopPropagation();
    });
  },
};
</script>
<style module>
i:hover {
  cursor: pointer !important;
}
</style>
