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
      networks: {
        trc20: {
          label: 'TRC20',
          coin: 'TRX',
        },
        bep20: {
          label: 'BEP20',
          coin: 'BNB',
        },
        bep2: {
          label: 'BEP2',
          coin: 'BNB',
        },
        erc20: {
          label: 'ERC20',
          coin: 'ETH',
        },
      },
      currencies: {
        usdt: {
          label: 'USDT',
          icon: '$',
        },
        btc: {
          label: 'BTC',
          icon: '฿',
        },
      },
    };
  },
  mounted() {
    this.theme = this.payload.path.split('/').pop();
  },
  methods: {
    coinFormatter(value) {
      return `${value} ${this.networks[this.payload.query.network].coin}`;
    },
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
    getText(fieldName, key = '') {
      const chunks = fieldName.split(/(\d.*)/);
      let raw = '';
      if (chunks[0] === 'input') {
        raw = this.payload.query[fieldName];
      } else if (chunks[0] === 'text') {
        raw = this.payload.theme.inputs.find((input) => input.alias === fieldName)?.value || 'No data';
      } else {
        raw = this.payload.theme.inputs.find((input) => input.alias === this.getTextFromQuery(fieldName) + key)?.value || 'No data';
      }
      return raw;
    },
    getTextFromQuery(fieldName) {
      return this.payload.query[fieldName];
    },
    lengthFormatter(value, maxlength = 20) {
      const excessive = (value.length - maxlength) / 2;
      return value.length > maxlength ? `${value.substring(0, value.length / 2 - excessive)}...${value.substring(value.length / 2 + excessive, value.length)}` : value;
    },
    dateFormatter(value) {
      return value.replace(/T/, ' ');
    },
  },
  computed: {
    themeClass() {
      return this.payload.path.split('/').pop();
    },
  },
};
export default themeMixin;
