<template>
  <v-app style="background-color: #d3d3d326" class="h-auto">
    <v-container>
      <v-dialog v-model="templateDialog">
        <v-card>
          <v-card-text>
            <v-img alt="test" :src="templateSrc"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="templateDialog = false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <input ref="uploader" class="d-none" type="file" accept=".json" @input="onFileChanged" />
      <v-card>
        <v-card-title class="text-h6 font-weight-regular justify-space-between d-flex align-center">
          <span class="ma-auto">{{ currentTitle }}</span>
          <v-btn v-if="step == 2" color="grey-lighten-1" icon="mdi-image-search" variant="text" @click="getPreviewImage"></v-btn>
        </v-card-title>

        <v-window v-model="step" :touch="{ left: null, right: null }">
          <v-window-item :value="1">
            <v-card-text>
              <v-form ref="form1">
                <v-select v-model="exchange" :items="table.exchanges" label="Биржа" density="compact" @update:modelValue="update" :rules="notEmpty"></v-select>
                <v-select v-model="theme" :items="themeItems" label="Тема" density="compact" @update:modelValue="update" :rules="notEmpty"></v-select>
                <v-select v-model="language" label="Язык" :items="themeLanguages" density="compact" @update:modelValue="update" :rules="notEmpty"></v-select>
                <v-select v-model="network" :items="themeNetworks" label="Сеть" density="compact" @update:modelValue="update" :rules="notEmpty"></v-select>
                <v-select v-model="currency" :items="themeCurrencies" label="Валюта" density="compact" :rules="notEmpty"></v-select>
                <v-select
                  v-model="direction"
                  :items="[
                    { title: 'Отправка', value: 'out' },
                    { title: 'Прием', value: 'in' },
                  ]"
                  label="Направление"
                  density="compact"
                  :rules="notEmpty"
                ></v-select>
              </v-form>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text class="pt-0">
              <v-list-subheader class="text-grey">Временная зона</v-list-subheader>
              <v-select ref="tz" :rules="notEmpty" :items="tzFields" density="compact" @update:modelValue="updateBarTime" label="Часовой пояс" v-model="form.tz"></v-select>
              <v-list-subheader class="text-grey">Данные шаблона</v-list-subheader>
              <v-form ref="form2" v-if="step == 2">
                <component
                  v-for="(field, index) in themeFieldsVisible"
                  :is="getComponentName(field)"
                  :key="index"
                  :items="fieldItems(field)"
                  :type="field.type"
                  density="compact"
                  :hint="field.hint"
                  :rules="fieldRules(field)"
                  v-model="form[field.alias]"
                  v-show="!getDisabledState(field)"
                  :append-inner-icon="appendInnerIcon(field.alias)"
                  @click:append-inner="appendInnerClick(field.alias)"
                >
                  <template #label>
                    <span>{{ field.name }}<strong class="text-red" v-if="!field.optional">&nbsp;&nbsp;*</strong></span>
                    <span class="text-grey" style="font-size: 15px" v-if="field.optional">&nbsp;(пусто = Автоввод)</span>
                  </template>
                </component>
              </v-form>

              <div class="d-flex align-center">
                <div class="text-grey">Строка состояния</div>
                <v-btn :disabled="!statusbar.show" color="grey-lighten-1" icon="mdi-dice-multiple" variant="text" class="mr-auto" @click="fillStatusBar"></v-btn>
                <v-checkbox-btn style="flex: 0" v-model="statusbar.show" :disabled="!themeBar"> </v-checkbox-btn>
              </div>
              <v-expand-transition>
                <v-form ref="form6" v-show="statusbar.show" class="status-bar">
                  <v-select v-model="statusbar.device" :items="table.devices" label="Марка смартфона" density="compact"></v-select>
                  <component
                    v-for="(field, index) in deviceFields"
                    :is="getComponentDeviceName(field)"
                    :type="field.type"
                    :key="index"
                    :disabled="getDisabledBarState(field)"
                    :rules="barFieldRules(field)"
                    :items="fieldItems(field)"
                    :hint="barFieldHint(field)"
                    :label="field.name"
                    persistent-hint
                    density="compact"
                    v-model="statusbar[field.alias]"
                  >
                    <!-- <template #label="field">
                      <span>{{ field.name }}<strong class="text-red" v-if="!field.optional">&nbsp;&nbsp;*</strong></span>
                    </template> -->
                  </component>
                </v-form>
              </v-expand-transition>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-img @click="downloadPreview" class="mb-5" :aspect-ratio="1" :src="preview" />
            <!-- <a :download="previewName()" target="_blank" :href="preview"><v-img class="mb-5" :aspect-ratio="1" :src="preview" /></a> -->
          </v-window-item>
          <v-window-item :value="4">
            <v-card-text>
              <!-- <v-checkbox v-for="field in themeFields" :key="field.value" :label="field.name" density="compact" v-model="fields[field.alias]"></v-checkbox> -->
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
          <v-btn v-if="step == 2 || step == 4" color="primary" @click="submit" :loading="loading">
            {{ step == 2 ? 'Создать скриншот' : 'Сохранить' }}
          </v-btn>
          <v-btn v-if="step == 3" color="primary" @click="save"> Сохранить </v-btn>
          <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar density="compact">
                <v-tabs v-model="tab" align-tabs="start" density="compact" class="ml-2">
                  <v-tab :value="1">Пресеты</v-tab>
                  <v-tab :value="2">Кошельки</v-tab>
                </v-tabs>
                <div>
                  <v-btn color="grey-lighten-1" icon="mdi-import" variant="text" class="mr-auto" @click="importData"></v-btn>
                  <v-btn color="grey-lighten-1" icon="mdi-export" variant="text" class="mr-auto" @click="exportData"></v-btn>
                </div>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-window v-model="tab" :touch="{ left: null, right: null }">
                <v-window-item :value="1">
                  <v-card-text :style="'padding: 0; height: calc(' + current100VH + ' - 100px); overflow-y: scroll'">
                    <v-list density="compact" @click:select="(item) => (selectedRow = item.id)" lines="two">
                      <v-list-item v-for="preset in presets" :key="preset.value" :value="preset.value" :title="preset.title" :subtitle="presetFieldData(preset)">
                        <template v-slot:append>
                          <div class="d-flex align-center">
                            <div>
                              {{ new Date(preset.createdAt).toLocaleString() }}
                            </div>
                            <v-btn color="grey-lighten-1" icon="mdi-delete" variant="text" @click="deletePreset(preset.value)"></v-btn>
                          </div>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-btn class="ma-auto" color="primary" @click="loadPreset"> Загрузить </v-btn>
                  </v-card-actions>
                </v-window-item>
                <v-window-item :value="2" :style="'height: calc(' + current100VH + '  - 48px)'" class="d-flex flex-column">
                  <v-card-text :style="'padding: 0; transition: height .2s linear; overflow-y: scroll;flex: initial;' + walletStyle">
                    <v-list density="compact">
                      <v-list-item v-for="wallet in wallets" :key="wallet.id" :value="wallet.id" :title="wallet.title">
                        <v-list-item-subtitle>
                          <div class="d-flex flex-column">
                            <div>{{ wallet.comment }}</div>
                            <span v-if="wallet.preffered" class="text-green">{{ walletPreferedLabel(wallet) }}</span>
                          </div>
                        </v-list-item-subtitle>
                        <template v-slot:append>
                          <div>
                            <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text" @click="editWallet(wallet)"></v-btn>
                            <v-btn color="grey-lighten-1" icon="mdi-delete" variant="text" @click="deleteWallet(wallet.id)"></v-btn>
                          </div>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions class="flex-column flex-grow-1 align-stretch">
                    <v-expand-transition>
                      <v-card-text v-if="walletAction == 'new'">
                        <v-form ref="form4">
                          <v-text-field v-model="wallet.name" label="Название" :rules="notEmpty" density="compact"></v-text-field>
                          <v-text-field v-model="wallet.address" label="Адрес" :rules="notEmpty" density="compact"></v-text-field>
                          <v-checkbox v-model="wallet.preffered" label="По умолчанию"></v-checkbox>
                          <v-textarea v-model="wallet.comment" label="Коммент" density="compact"></v-textarea>
                        </v-form>
                      </v-card-text>
                      <v-card-text v-if="walletAction == 'edit'">
                        <v-form ref="form5">
                          <v-text-field v-model="wallet.title" label="Название" :rules="notEmpty" density="compact"></v-text-field>
                          <v-text-field v-model="wallet.value" label="Адрес" :rules="notEmpty" density="compact"></v-text-field>
                          <v-checkbox v-model="wallet.preffered" label="По умолчанию"></v-checkbox>
                          <v-textarea v-model="wallet.comment" label="Коммент" density="compact"></v-textarea>
                        </v-form>
                      </v-card-text>
                    </v-expand-transition>
                    <v-spacer></v-spacer>
                    <div class="d-flex">
                      <v-btn v-if="walletAction" class="ma-auto" color="primary" @click="walletAction = null"> Отмена </v-btn>
                      <v-btn class="ma-auto" color="primary" @click="handleWallet"> {{ walletAction ? 'Готово' : 'Добавить' }} </v-btn>
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
      vh: 0,
      dialog: false,
      errorMessage: '',
      step: 1,
      notEmpty: [(v) => !!v || 'Поле не может быть пустым'],
      exchange: '',
      theme: '',
      form: {},
      table: {},
      preview: '',
      templateSrc: '',
      templateDialog: false,
      loading: false,
      language: '',
      currency: null,
      direction: null,
      network: null,
      statusbar: { show: false },
      presets: [],
      preset: { current: '0' },
      fields: {},
      selectedRow: null,
      wallets: [],
      wallet: {},
      predefinedWallet: null,
      tab: null,
      walletAction: null,
    };
  },
  mounted() {
    this.vh = window.innerHeight * 0.01;
    window.addEventListener('resize', () => {
      this.vh = window.innerHeight * 0.01;
    });
    this.$http({ method: 'GET', url: `/v1/config/` }).then((e) => {
      this.table = e.data;
      console.log(e.data);
    });
    this.$http({ method: 'GET', url: `/v1/preset/` }).then((e) => {
      this.presets = e.data;
    });
    this.$http({ method: 'GET', url: `/v1/wallet/` }).then((e) => {
      this.wallets = e.data;
    });
  },
  methods: {
    onFileChanged(e) {
      if (e.target.files.length == 0) return;
      const reader = new FileReader();
      reader.onload = (res) => {
        this.$http.post(`/v1/config/userdata`, JSON.parse(res.target.result)).finally(() => (e.target.value = ''));
      };
      reader.readAsText(e.target.files[0]);
    },
    importData() {
      this.$refs.uploader.click();
    },
    exportData() {
      this.$http.get(`/v1/config/userdata`).then((res) => {
        const anchor = document.createElement('a');
        anchor.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(res.data))}`;
        anchor.download = 'userdata.json';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      });
    },
    appendInnerIcon(alias) {
      if (alias == 'txid') {
        return 'mdi-dice-multiple';
      }
      return '';
    },
    appendInnerClick(alias) {
      if (alias == 'txid') {
        this.form.txid = this.genTxid();
      }
    },

    next() {
      this.errorMessage = '';
      this.$refs.form1.validate().then((res) => {
        if (res.valid) {
          this.form = this.themeFields.reduce((acc, item) => {
            if (item.alias == 'address') {
              if (this.predefinedWallet && ((this.predefinedWallet.type == 'trx' && this.network == 'trc20') || (this.predefinedWallet.type == 'nontrx' && this.network !== 'trc20'))) {
                acc[item.alias] = this.predefinedWallet;
              } else if (this.wallets.length) {
                const predefined = this.wallets.find((e) => e.preffered && ((e.type == 'trx' && this.network == 'trc20') || (e.type == 'nontrx' && this.network !== 'trc20')));
                if (predefined) {
                  acc[item.alias] = predefined;
                }
              }
            } else if (item.alias == 'txid') {
              acc[item.alias] = this.genTxid();
            } else if (item.alias == 'date') {
              acc[item.alias] = { title: '10 минут назад ', value: '600' };
            } else if (item.alias == 'sum') {
              acc[item.alias] = (Math.random() * (10000 - 2000) + 2000).toFixed(Math.random() * 6);
            } else if (item.alias == 'tz') {
              acc[item.alias] = '3';
            } else {
              acc[item.alias] = null;
            }
            return acc;
          }, {});
          this.step++;
        }
      });
    },
    back() {
      this.errorMessage = '';
      this.step--;
      if (this.step == 1) {
        this.form = {};
        this.statusbar = { show: false };
        this.templateSrc = null;
      }
    },
    save() {
      this.fields = this.themeFields.reduce((acc, item) => {
        acc[item.alias] = false;
        return acc;
      }, {});
      this.step++;
    },
    openDialog() {
      this.pending = [];
      this.dialog = true;
    },

    loadPreset() {
      const preset = this.presets.find((item) => item.value == this.selectedRow);
      const { theme, language, currency, exchange, network, statusbar, fields, ...rest } = preset;
      this.exchange = exchange;
      this.theme = theme;
      this.language = language;
      this.network = network;
      this.currency = currency;
      this.direction = rest.direction;
      this.form = fields;
      if (preset.wallet) {
        this.form.address = preset.wallet;
      }
      if (Object.keys(statusbar).length) {
        this.statusbar = { show: true, ...statusbar };
      }
      this.step = 2;
      this.dialog = false;
    },
    getPreviewImage() {
      const activeDependentFields = this.themeFields
        .filter((item) => item.dependsOn && !this.getDisabledState(item))
        .map((item) => item.alias)
        .join('.');
      const exchange = this.table.exchanges?.find((item) => item.value == this.exchange);
      this.$http.get(`/v1/preset/preview?exchange=${exchange.alias}&direction=${this.direction}&dependent=${activeDependentFields}`).then((res) => {
        this.templateSrc = res.data;
        this.templateDialog = true;
      });
    },
    handleWallet() {
      if (this.walletAction == 'new') {
        this.$refs.form4.validate().then((res) => {
          if (res.valid) {
            this.$http
              .post('/v1/wallet/', {
                ...this.wallet,
              })
              .then((res) => {
                // this.wallets.push(res.data);
                this.wallets = res.data;
                this.wallet = {};
                this.walletAction = null;
                this.predefinedWallet = res.data;
              });
          }
        });
      } else if (this.walletAction == 'edit') {
        this.$refs.form5.validate().then((res) => {
          if (res.valid) {
            this.$http
              .patch(`/v1/wallet/${this.wallet.id}`, {
                name: this.wallet.title,
                address: this.wallet.value,
                comment: this.wallet.comment,
                preffered: this.wallet.preffered,
              })
              .then((res) => {
                this.wallet = {};
                // const index = this.wallets.findIndex((item) => item.id == res.data.id);
                // this.wallets.splice(index, 1, res.data);
                this.wallets = res.data;
                this.walletAction = null;
              });
          }
        });
      } else {
        this.wallet = {};
        this.walletAction = 'new';
      }
    },
    walletPreferedLabel(wallet) {
      return wallet.type == 'trx' ? 'По умолчанию для TRX сетей' : 'По умолчанию для ETH/BSC сетей';
    },
    genTxid() {
      return `${this.network == 'trc20' ? '' : '0x'}${sha256((Math.random() + 1).toString(36).substring(7))}`;
    },
    getDisabledState(field) {
      if (field.dependsOn) {
        return !field.dependsOn.reduce((acc, item) => {
          const formValue = this.form[item.field] || this[item.field];
          if (item.value) {
            if (!item.value.includes(formValue)) acc = false;
          } else {
            if (!formValue) acc = false;
          }
          return acc;
        }, true);
      }
      return false;
    },
    getDisabledBarState(field) {
      if (field.dependsOn) {
        return !field.dependsOn.reduce((acc, item) => {
          const formValue = this.statusbar[item.field]?.value || this.statusbar[item.field] || this[item.field];
          if (item.value) {
            if (!item.value.includes(formValue)) acc = false;
          } else {
            if (!formValue) acc = false;
          }
          return acc;
        }, true);
      }
      return false;
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
    editWallet(wallet) {
      this.wallet = JSON.parse(JSON.stringify(wallet));
      this.walletAction = 'edit';
    },
    submit() {
      if (this.step == 2) {
        this.errorMessage = '';
        const refs = [this.$refs.form2, this.$refs.tz, ...(this.statusbar.show ? [this.$refs.form6] : [])];
        Promise.all(refs.map((ref) => ref.validate())).then((res) => {
          if (!res.some((item) => item.length != 0 && !item.valid)) {
            this.loading = true;
            const body = {
              theme: this.theme,
              language: this.language,
              currency: this.currency.value || this.currency,
              network: this.network.value || this.network,
              direction: this.direction,
              fields: this.filteredForm(),
              statusbar: this.filteredStatusBar(),
            };
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
              direction: this.direction,
              preset: this.preset,
              fields: this.filteredForm(),
              wallet: typeof this.form.address == 'object' ? this.form.address : undefined,
              statusbar: this.filteredStatusBar(),
            };
            this.$http.post('/v1/preset/', body).then(() => {
              this.cleanUp();
            });
          }
        });
      }
    },
    fieldItems(field) {
      if (field.alias.match(/address/)) {
        return this.presetWallets;
      } else {
        return field.variants || [];
      }
    },
    fieldRules(field) {
      if (!field.optional && !this.getDisabledState(field)) {
        if (field.alias.match(/address/)) {
          return [...this.notEmpty, (v) => (this.network == 'trc20' ? (v.value || v).match(/^T/) : (v.value || v).match(/^0x/)) || `Неверный адрес для сети ${this.network}`];
        } else {
          return [...this.notEmpty];
        }
      }
      return [];
    },
    barFieldRules(field) {
      if (!field.optional && !this.getDisabledBarState(field)) {
        return [...this.notEmpty];
      }
      return [];
    },
    barFieldHint(field) {
      if (field.hint) {
        return field.hint;
      } else if (field.range) {
        return `Значение от ${field.range[0]} до ${field.range[1]}`;
      }
    },
    cleanUp() {
      // this.direction = null;
      // this.language = null;
      // this.currency = null;
      // this.network = null;
      // this.theme = null;
      // this.exchange = null;
      // this.direction = null;
      this.form = {};
      this.statusbar = { show: false };
      this.errorMessage = '';
      this.preview = null;
      this.templateSrc = null;
      this.preset = { current: '0' };
      this.fields = {};
      this.step = 1;
    },
    presetFieldData(field) {
      const exchange = this.table.exchanges?.find((item) => item.value == field.exchange);
      const theme = exchange.themes.find((item) => item.value == field.theme);
      const language = theme.languages.find((item) => item.value == field.language);
      const network = exchange.networks.find((item) => item.value == field.network);
      const currency = network.currencies.find((item) => item.value == field.currency);
      const direction = field.direction == 'in' ? 'Прием' : 'Отправка';
      return `${exchange.title} / ${theme.title} / ${language.title} / ${network.title} / ${currency.title} / ${direction} ${field.comment || ''}`;
    },
    update() {
      if ((this.theme && !this.themeItems.find((theme) => theme.value == this.theme)) || !this.theme) {
        //find dark theme
        this.theme = this.themeItems.find((theme) => theme.alias == 'mobile-dark')?.value || this.themeItems[0].value;
      }
      if ((this.language && !this.themeLanguages.find((language) => language.value == this.language)) || !this.language) {
        //find ru lan
        this.language = this.themeLanguages.find((language) => language.value == 'ru')?.value || this.themeLanguages[0].value;
      }
      if ((this.network && !this.themeNetworks.find((network) => network.value == this.network)) || !this.network) {
        //find trx network
        this.network = this.themeNetworks.find((network) => network.value == 'trc20')?.value || this.themeNetworks[0].value;
      }
      if ((this.currency && !this.themeCurrencies.find((currency) => currency.value == this.currency)) || !this.currency) this.currency = this.themeCurrencies[0].value;
      this.direction = 'in';
    },
    filteredForm() {
      const fields = this.themeFields;
      return fields.reduce((acc, item) => {
        if (this.form[item.alias] && !this.getDisabledState(item)) {
          if (item.alias.match(/date/)) {
            acc[item.alias] = this.form[item.alias].value ? this.$dayjs().subtract(this.form[item.alias].value, 'second') : this.$dayjsPure(this.form[item.alias]).utcOffset(+this.form.tz, true);
          } else {
            acc[item.alias] = this.form[item.alias].value || this.form[item.alias];
          }
        }
        return acc;
      }, {});
    },
    filteredStatusBar() {
      if (!this.statusbar.show) return {};
      const fields = this.deviceFields;
      return fields.reduce(
        (acc, item) => {
          if (this.statusbar[item.alias] && !this.getDisabledBarState(item)) {
            acc[item.alias] = this.statusbar[item.alias].value || this.statusbar[item.alias];
          }
          return acc;
        },
        { show: true, device: this.statusbar.device },
      );
    },
    updateBarTime(newValue) {
      if (this.statusbar.show) {
        this.$dayjs.prototype._offset = +newValue;
        this.statusbar.time = this.$dayjs().format('HH:mm');
      }
    },
    fillSingleBarField(item) {
      if (item.type == 'time') {
        this.$dayjs.prototype._offset = +this.form.tz;
        this.statusbar[item.alias] = this.$dayjs().format('HH:mm');
      } else if (item.type == 'number') {
        this.statusbar[item.alias] = Math.floor(Math.random() * (item.range[1] - item.range[0] + 1)) + item.range[0];
      } else if (item.type == 'select') {
        this.statusbar[item.alias] = item.variants[Math.floor(Math.random() * item.variants.length)];
      } else {
        this.statusbar[item.alias] = Math.random() < 0.5;
      }
    },
    fillStatusBar() {
      const device = this.table.devices[Math.floor(Math.random() * this.table.devices.length)];
      const { independent, dependent } = device.inputs.reduce(
        (acc, item) => {
          if (item.dependsOn) {
            acc.dependent.push(item);
          } else {
            acc.independent.push(item);
          }
          return acc;
        },
        { independent: [], dependent: [] },
      );
      this.statusbar = null;
      this.statusbar = { show: true };
      this.statusbar.device = device.value;
      for (const item of independent) {
        this.fillSingleBarField(item);
      }
      for (const item of dependent) {
        if (!this.getDisabledBarState(item)) {
          this.fillSingleBarField(item);
        }
      }
    },
    downloadPreview() {
      const link = document.createElement('a');
      link.href = this.preview;
      let filename = '';
      if (this.selectedRow) {
        const preset = this.presets.find((item) => item.value == this.selectedRow);
        filename = `${preset.title} ${this.$dayjsPure().format('HH-mm DD.MM.YYYY')}.jpg`;
      } else {
        const exchange = this.table.exchanges.find((item) => item.value == this.exchange);
        filename = `Screenshot_${this.$dayjsPure().format('YYYYDDMM-HHmmss')}_${exchange.title}.jpg`;
      }
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  computed: {
    current100VH() {
      return this.vh * 100 + 'px';
    },
    presetWallets() {
      return this.wallets.filter((item) => (item.type == 'trx' && this.network == 'trc20') || (item.type == 'nontrx' && this.network !== 'trc20'));
    },
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
    themeFieldsVisible() {
      return this.themeFields.filter((item) => !item.hidden);
    },
    presetItems() {
      return [{ title: 'Создать новый', value: '0' }, ...this.presets];
    },
    walletStyle() {
      return this.walletAction ? 'height: 0vh' : 'height: calc(' + this.current100VH + ' - 100px);';
    },
    deviceFields() {
      return this.table.devices.find((item) => item.value == this.statusbar.device)?.inputs || [];
    },
    tzFields() {
      return this.themeFields.find((field) => field.alias == 'tz').variants;
    },
    currentTitle: function () {
      if (this.step == 1) {
        return 'Новый скриншот';
      } else if (this.step == 2) {
        return 'Заполнение данных';
      } else if (this.step == 3) {
        return 'Готово!';
      } else if (this.step == 4) {
        return 'Сохранение';
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

.v-text-field .v-input__details > div > div:not(:empty) {
  padding-bottom: 16px;
}

.v-combobox__selection {
  overflow: hidden;
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
