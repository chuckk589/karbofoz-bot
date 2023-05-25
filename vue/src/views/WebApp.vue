<template>
  <v-app style="background-color: #d3d3d326" class="h-auto">
    <v-container class="ma-auto">
      <v-card>
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-form ref="form1">
                <v-select v-model="exchange" :items="table.exchanges" label="Биржа" density="compact" @update:modelValue="update" :rules="notEmpty"></v-select>
                <v-select v-model="theme" :items="themeItems" label="Тема" density="compact" @update:modelValue="update" :rules="notEmpty"></v-select>
                <v-select v-model="language" label="Язык" :items="themeLanguages" density="compact" @update:modelValue="update" :rules="notEmpty"></v-select>
                <!-- <v-combobox v-model="network" :items="themeNetworks" label="Сеть" density="compact" @update:modelValue="update" :rules="notEmpty"></v-combobox>
                <v-combobox v-model="currency" :items="themeCurrencies" label="Валюта" density="compact" :rules="notEmpty"></v-combobox> -->
                <v-select v-model="network" :items="themeNetworks" label="Сеть" density="compact" @update:modelValue="update" :rules="notEmpty"></v-select>
                <v-select v-model="currency" :items="themeCurrencies" label="Валюта" density="compact" :rules="notEmpty"></v-select>
              </v-form>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-form ref="form2" v-if="step == 2">
                <component
                  v-for="(field, index) in themeFields"
                  :is="getComponentName(field)"
                  :key="index"
                  :items="fieldItems(field)"
                  :type="field.type"
                  density="compact"
                  :hint="field.hint"
                  :rules="!field.optional ? notEmpty : []"
                  v-model="form[field.alias]"
                  :append-inner-icon="appendInnerIcon(field.alias)"
                  @click:append-inner="appendInnerClick(field.alias)"
                >
                  <template #label>
                    <span>{{ field.name }}<strong class="text-red" v-if="!field.optional">&nbsp;&nbsp;*</strong></span>
                  </template>
                </component>
                <div class="d-flex align-center justify-space-between">
                  <div class="text-grey">Статус бар</div>
                  <v-checkbox-btn style="flex: 0" v-model="statusbar.show"></v-checkbox-btn>
                </div>
                <v-expand-transition>
                  <div v-show="statusbar.show">
                    <v-select v-model="statusbar.device" :items="table.devices" label="Тип" density="compact"></v-select>
                    <component
                      v-for="(field, index) in deviceFields"
                      :is="getComponentDeviceName(field)"
                      :type="field.type"
                      :key="index"
                      v-show="field.dependsOn ? (field.dependsValue ? statusbar[field.dependsOn] == field.dependsValue : statusbar[field.dependsOn]) : true"
                      :label="field.name"
                      :items="fieldItems(field)"
                      density="compact"
                      v-model="statusbar[field.alias]"
                    />
                  </div>
                </v-expand-transition>
              </v-form>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <a download="preview.png" target="_blank" :href="preview"><v-img class="mb-5" :aspect-ratio="1" :src="preview" /></a>
          </v-window-item>
          <v-window-item :value="4">
            <v-card-text>
              <v-checkbox v-for="field in themeFields" :key="field.value" :label="field.name" density="compact" v-model="fields[field.alias]"></v-checkbox>
              <v-form ref="form3">
                <v-select :items="presetItems" density="compact" v-model="preset.current" :rules="notEmpty"></v-select>
                <v-expand-transition>
                  <div v-show="preset.current == '0'">
                    <v-text-field v-model="preset.name" label="Название" density="compact"></v-text-field>
                    <v-textarea v-model="preset.comment" label="Комментарий" density="compact"></v-textarea>
                  </div>
                </v-expand-transition>
              </v-form>
            </v-card-text>
          </v-window-item>
          <v-card-text v-if="errorMessage">
            <span class="d-block text-red mb-2">{{ errorMessage }}</span>
          </v-card-text>
        </v-window>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn v-if="step == 1" variant="text" @click="openDialog"> Настройки </v-btn>
          <v-btn v-if="step > 1" variant="text" @click="back"> Назад </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step == 1" color="primary" @click="next"> Далее </v-btn>
          <v-btn v-if="step == 2 || step == 4" color="primary" @click="submit" :loading="loading"> Готово </v-btn>
          <v-btn v-if="step == 3" color="primary" @click="save"> Сохранить </v-btn>
          <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar density="compact">
                <v-tabs v-model="tab" align-tabs="start" density="compact" class="ml-2">
                  <v-tab :value="1">Пресеты</v-tab>
                  <v-tab :value="2">Кошельки</v-tab>
                </v-tabs>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-window v-model="tab">
                <v-window-item :value="1">
                  <v-card-text style="padding: 0; height: calc(100vh - 100px); overflow-y: scroll">
                    <v-list density="compact" @click:select="(item) => (selectedRow = item.id)" lines="two">
                      <v-list-item v-for="preset in presets" :key="preset.value" :value="preset.value" :title="preset.title" :subtitle="preset.comment">
                        <template v-slot:append>
                          <v-btn color="grey-lighten-1" icon="mdi-delete" variant="text" @click="deletePreset(preset.value)"></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-btn class="ma-auto" color="primary" @click="loadPreset"> Загрузить </v-btn>
                  </v-card-actions>
                </v-window-item>
                <v-window-item :value="2" style="height: calc(100vh - 48px)" class="d-flex flex-column">
                  <v-card-text :style="'padding: 0; transition: height .2s linear; overflow-y: scroll;flex: initial;' + walletStyle">
                    <v-list density="compact" lines="two">
                      <v-list-item v-for="wallet in wallets" :key="wallet.id" :value="wallet.id" :title="wallet.title" :subtitle="wallet.comment">
                        <template v-slot:append>
                          <v-btn color="grey-lighten-1" icon="mdi-delete" variant="text" @click="deleteWallet(wallet.id)"></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions class="flex-column flex-grow-1 align-stretch">
                    <v-expand-transition>
                      <v-card-text v-show="walletAction">
                        <v-form ref="form4">
                          <v-text-field v-model="wallet.name" label="Название" :rules="notEmpty" density="compact"></v-text-field>
                          <v-checkbox v-model="wallet.trx" label="TRX" density="compact"></v-checkbox>
                          <v-text-field v-model="wallet.address" label="Адрес" :rules="notEmpty" append-inner-icon="mdi-dice-multiple" @click:append-inner="genAddress()" density="compact"></v-text-field>
                          <v-textarea v-model="wallet.comment" label="Коммент" density="compact"></v-textarea>
                        </v-form>
                      </v-card-text>
                    </v-expand-transition>
                    <v-spacer></v-spacer>
                    <div class="d-flex">
                      <v-btn class="ma-auto" color="primary" @click="handleWallet"> {{ walletAction ? 'Готово' : 'Добавить' }} </v-btn>
                      <v-btn v-if="walletAction" class="ma-auto" color="primary" @click="walletAction = false"> Отмена </v-btn>
                    </div>
                  </v-card-actions>
                </v-window-item>
              </v-window>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { VTextField } from 'vuetify/components/VTextField';
import { VSelect } from 'vuetify/components/VSelect';
import { VCombobox } from 'vuetify/components/VCombobox';
import { VCheckbox } from 'vuetify/components/VCheckbox';
import { VTextarea } from 'vuetify/components/VTextarea';
import sha256 from 'crypto-js/sha256';
import DateSelect from '../components/DateSelect.vue';
export default {
  components: {
    VTextField,
    VSelect,
    DateSelect,
    VCombobox,
    VCheckbox,
    VTextarea,
  },
  name: 'WebApp',
  data() {
    return {
      dialog: false,
      errorMessage: '',
      step: 1,
      notEmpty: [(v) => !!v || 'Поле не может быть пустым'],
      exchange: '',
      theme: '',
      form: {},
      table: {},
      preview: '',
      loading: false,
      language: '',
      currency: null,
      network: null,
      statusbar: { show: false },
      presets: [],
      preset: {},
      fields: {},
      selectedRow: null,
      wallets: [],
      wallet: { trx: false },
      tab: null,
      walletAction: false,
    };
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/config/` }).then((e) => {
      this.table = e.data;
      console.log(e.data);

      // this.step = 2;
    });
    this.$http({ method: 'GET', url: `/v1/preset/` }).then((e) => {
      this.presets = e.data;
    });
    this.$http({ method: 'GET', url: `/v1/wallet/` }).then((e) => {
      this.wallets = e.data;
    });
  },
  methods: {
    appendInnerIcon(alias) {
      if (alias == 'txid') {
        return 'mdi-dice-multiple';
      }
      return '';
    },
    appendInnerClick(alias) {
      if (alias == 'txid') {
        this.form.txid = `${this.network == 'trc20' ? '' : '0x'}${sha256((Math.random() + 1).toString(36).substring(7))}`;
      }
    },

    next() {
      this.errorMessage = '';
      this.$refs.form1.validate().then((res) => {
        if (res.valid) {
          this.form = this.themeFields.reduce((acc, item) => {
            acc[item.alias] = this.form[item.alias] || null;
            return acc;
          }, {});
          this.step++;
        }
      });
    },
    back() {
      this.errorMessage = '';
      this.step--;
    },
    save() {
      this.step++;
      this.fields = this.themeFields.reduce((acc, item) => {
        acc[item.alias] = false;
        return acc;
      }, {});
    },
    openDialog() {
      this.pending = [];
      this.dialog = true;
    },
    loadPreset() {
      const preset = this.presets.find((item) => item.value == this.selectedRow);
      const { theme, language, currency, exchange, network, fields, ...rest } = preset;
      this.exchange = exchange;
      this.theme = theme;
      this.language = language;
      this.network = network;
      this.currency = currency;
      this.form = fields;
      this.dialog = false;
    },
    handleWallet() {
      if (this.walletAction) {
        this.$refs.form4.validate().then((res) => {
          if (res.valid) {
            this.$http
              .post('/v1/wallet/', {
                ...this.wallet,
              })
              .then((res) => {
                this.wallets.push(res.data);
                this.wallet = {};
                this.walletAction = false;
              });
          }
        });
      } else {
        this.wallet = { trx: false };
        this.walletAction = true;
      }
    },
    genAddress() {
      this.wallet.address = `${this.wallet.trx ? '' : '0x'}${sha256((Math.random() + 1).toString(36).substring(7))}`;
    },
    getComponentName(field) {
      if (field.type == 'select') return 'v-select';
      else if (field.type == 'datetime-local') return 'date-select';
      else if (field.alias.match(/address/)) return 'v-combobox';
      else if (field.type == 'textarea') return 'v-textarea';
      else return 'v-text-field';
    },
    getComponentDeviceName(field) {
      if (field.type == 'select') return 'v-select';
      else if (field.type == 'number' || field.type == 'time') return 'v-text-field';
      else return 'v-checkbox';
    },
    deletePreset(id) {
      this.$http.delete(`/v1/preset/${id}`).then((res) => {
        this.presets = this.presets.filter((item) => item.value != id);
      });
    },
    deleteWallet(id) {
      this.$http.delete(`/v1/wallet/${id}`).then((res) => {
        this.wallets = this.wallets.filter((item) => item.id != id);
      });
    },
    submit() {
      if (this.step == 2) {
        this.errorMessage = '';
        this.$refs.form2.validate().then((res) => {
          if (res.valid) {
            this.loading = true;
            const body = JSON.parse(
              JSON.stringify({
                theme: this.theme,
                language: this.language,
                currency: this.currency.value || this.currency,
                network: this.network.value || this.network,
                fields: this.form,
                statusbar: this.filteredStatusBar(),
              }),
            );
            const now = new Date();
            body.fields.date = body.fields.date.value ? new Date(now.getTime() - now.getTimezoneOffset() * 60000 - body.fields.date.value * 1000).toISOString().slice(0, -5) : body.fields.date;
            body.fields.dateup = body.fields.dateup?.value ? new Date(now.getTime() - now.getTimezoneOffset() * 60000 - body.fields.dateup?.value * 1000).toISOString().slice(0, -5) : body.fields.dateup;
            body.fields.address = body.fields.address?.value || body.fields.address;
            console.log(body);
            this.$http
              .post('/v1/preset/preview/', body)
              .then((res) => {
                this.preview = `data:image/jpeg;base64,${res.data.screen}`;
                this.step++;
              })
              .catch((err) => {
                this.errorMessage = err.response.data.message;
              })
              .finally(() => {
                this.loading = false;
              });
          }
        });
      } else if (this.step == 4) {
        this.$refs.form3.validate().then((res) => {
          if (res.valid) {
            const body = {
              theme: this.theme,
              language: this.language,
              currency: this.currency.value || this.currency,
              network: this.network.value || this.network,
              preset: this.preset,
              fields: Object.keys(this.fields).reduce((acc, item) => {
                if (this.fields[item]) {
                  //in case of select
                  acc[item] = this.form[item].value || this.form[item];
                }
                return acc;
              }, {}),
              statusbar: this.filteredStatusBar(),
            };
            this.$http.post('/v1/preset/', body).then(() => (this.step = 1));
          }
        });
      }
    },
    fieldItems(field) {
      if (field.alias.match(/address/)) {
        return this.wallets.filter((item) => (item.type == 'trx' && this.network.value == 'trc20') || (item.type == 'nontrx' && this.network.value !== 'trc20'));
      } else {
        return field.variants || [];
      }
    },
    cleanUp() {
      this.theme = null;
      this.language = null;
      this.currency = null;
      this.network = null;
      this.form = {};
      this.step = 1;
      this.errorMessage = '';
      this.preview = null;
      this.preset = null;
      this.fields = {};
    },
    update() {
      if ((this.theme && !this.themeItems.find((theme) => theme.value == this.theme)) || !this.theme) this.theme = this.themeItems[0].value;
      if ((this.language && !this.themeLanguages.find((language) => language.value == this.language)) || !this.language) this.language = this.themeLanguages[0].value;
      if ((this.network && !this.themeNetworks.find((network) => network.value == this.network)) || !this.network) this.network = this.themeNetworks[0].value;
      if ((this.currency && !this.themeCurrencies.find((currency) => currency.value == this.currency)) || !this.currency) this.currency = this.themeCurrencies[0].value;
    },
    filteredStatusBar() {
      if (!this.statusbar.device) return {};
      const fields = this.table.devices.find((item) => item.value == this.statusbar.device)?.inputs;
      const keys = Object.keys(this.statusbar);
      return keys.reduce((acc, item) => {
        const dependsOn = fields.find((field) => field.alias == item)?.dependsOn;
        const dependsValue = fields.find((field) => field.alias == item)?.dependsValue;
        if (dependsOn) {
          if (dependsValue) {
            if (this.statusbar[dependsOn] == dependsValue) {
              acc[item] = this.statusbar[item];
            }
          } else {
            if (this.statusbar[dependsOn] === true) {
              acc[item] = this.statusbar[item];
            }
          }
        } else {
          acc[item] = this.statusbar[item];
        }
        return acc;
      }, {});
    },
  },
  computed: {
    themeItems() {
      return this.table.exchanges?.find((item) => item.value == this.exchange)?.themes || [];
    },
    themeBar() {
      return this.table.exchanges?.find((item) => item.value == this.exchange)?.themes.find((item) => item.value == this.theme)?.statusbar;
    },
    themeLanguages() {
      return this.table.exchanges?.find((item) => item.value == this.exchange)?.themes.find((item) => item.value == this.theme)?.languages || [];
    },
    themeNetworks() {
      return this.table.exchanges?.find((item) => item.value == this.exchange)?.networks || [];
    },
    themeCurrencies() {
      return this.table.exchanges?.find((item) => item.value == this.exchange)?.networks.find((item) => item.value == this.network)?.currencies || [];
    },
    themeFields() {
      return this.table.exchanges?.find((item) => item.value == this.exchange)?.themes.find((item) => item.value == this.theme)?.inputs || [];
    },
    presetItems() {
      return [{ title: 'Создать новый', value: '0' }, ...this.presets];
    },
    walletStyle() {
      return this.walletAction ? 'height: 0vh' : 'height: calc(100vh - 100px);';
    },
    deviceFields() {
      return this.table.devices.find((item) => item.value == this.statusbar.device)?.inputs || [];
    },

    currentTitle: function () {
      if (this.step == 1) {
        return 'Новый шаблон';
      } else if (this.step == 2) {
        return 'Заполнение данных';
      } else if (this.step == 3) {
        return 'Готово!';
      } else if (this.step == 4) {
        return 'Поля для записи';
      }
      return '';
    },
  },
};
</script>
<style>
.fit {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.required label::after {
  content: '*';
}

input[type='time'] {
  position: relative;
}

input[type='time']::-webkit-calendar-picker-indicator {
  display: block;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  background: transparent;
}

input[type='datetime-local']::-webkit-calendar-picker-indicator {
  display: block;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  background: transparent;
}

input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:focus {
  outline-width: 0;
}
</style>
