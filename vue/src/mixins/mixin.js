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
  data() {
    return {
      theme: '',
    };
  },
  mounted() {
    this.theme = this.payload.path.split('/').pop();
  },
  methods: {
    /* @deprecated */
    fixedFormatter(key, fixed) {
      return +parseFloat(this.getText(key)).toFixed(fixed);
    },
    /* @deprecated */
    getBlocks(block) {
      return this[block]
        .map((item) => {
          return {
            text: item.text ? this.getText(item.text) : this.getText(item.alias, item.key),
            value: item.formatter ? this[item.formatter](this.getText(item.value)) : this.getText(item.value),
            icon: item.icon,
            style: item.style,
          };
        })
        .filter((item) => item.value);
    },
    /* @deprecated */
    getText(fieldName, key = '') {
      const chunks = fieldName.split(/(\d.*)/);
      let raw = '';
      if (chunks[0] === 'input') {
        raw = this.payload.query[fieldName];
      } else if (chunks[0] === 'text') {
        raw = this.payload.theme.inputs.find((input) => input.alias === fieldName)?.value || 'No data';
      } else {
        raw = this.payload.theme.inputs.find((input) => input.alias === this.getTextFromQuery(fieldName) + key)?.value || this.getTextFromQuery(fieldName);
      }
      return raw;
    },
    /* @deprecated */
    getTextFromQuery(fieldName) {
      return this.payload.query[fieldName];
    },

    //////
    getConstant(fieldName) {
      return this.payload.theme.inputs.find((input) => input.alias === fieldName)?.value;
    },
    fixed(value, fixed, cutExc = false) {
      return cutExc ? +(+value).toFixed(fixed) : (+value).toFixed(fixed);
    },
    lengthFormatter(value, maxlength = 20, where = 'mid') {
      if (where == 'mid') {
        const excessive = (value.length - maxlength) / 2;
        return value.length > maxlength ? `${value.substring(0, value.length / 2 - excessive)}...${value.substring(value.length / 2 + excessive, value.length)}` : value;
      } else if (where == 'end') {
        return value.length > maxlength ? `${value.substring(0, maxlength)}...` : value;
      }
    },
    dateFormatter(value) {
      return value.replace(/T/, ' ');
    },
    feeFormatter(key = 'cs_com') {
      let data = this.getConstant(key)?.split(' ');
      if (!data) return undefined;
      if (data.length == 1) return data[0];
      data = data.map((item) => +item);
      return +(Math.random() * (data[1] - data[0]) + data[0]).toFixed(data[2]);
    },

    formatSum(max, min = 0) {
      const sum = +this.payload.query.sum;
      const withfee = sum + (sum * (Math.random() * (max - min) + min)) / 100;
      return withfee;
    },
    formatConf(key = 'cs_step') {
      const step = this.getConstant(key)?.split(' ');
      if (!step) return '';
      const iterations = Math.round(this.$dayjs().diff(this.$dayjs(this.payload.query.date), 'minute') / step[1]);
      return `${+step[0] + iterations}`;
    },
  },
  computed: {
    themeClass() {
      return this.theme;
    },
  },
};
export default themeMixin;
