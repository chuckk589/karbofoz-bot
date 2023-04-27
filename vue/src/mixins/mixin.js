const themeMixin = {
  props: {
    payload: {
      path: String,
      query: Object,
      theme: {
        type: Object,
        inputs: {
          type: Array,
          default: () => [],
        },
      },
    },
  },
  methods: {
    getText(fieldName, decoration) {
      const chunks = fieldName.split(/(\d.*)/);
      let raw = '';
      if (chunks[0] === 'input') {
        raw = this.payload.query[fieldName];
      } else if (chunks[0] === 'text') {
        raw = this.payload.theme.inputs.find((input) => input.alias === fieldName)?.value || 'No data';
      } else {
        raw = this.payload.theme.inputs.find((input) => input.alias === this.payload.query[fieldName])?.value || 'No data';
      }
      return this.applyDecoration(raw, decoration);
    },
    applyDecoration(text, decoration) {
      if (!text) return '';
      if (decoration && decoration.length) {
        decoration.forEach((deco) => {
          if (deco === 'date') {
            text = text.replace('T', ' ');
          }
        });
      }
      return text;
    },
  },
  computed: {
    themeClass() {
      return this.payload.path.split('/').pop();
    },
  },
};
export default themeMixin;
