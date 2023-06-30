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
          <div v-if="step == 1" class="random-btn">
            <v-btn color="grey-lighten-1" icon="mdi-dice-2" variant="text" @click="fillForm(false)"></v-btn>
            <span class="ml-2">Full random</span>
          </div>
          <span class="ma-auto">{{ currentTitle }}</span>
          <div v-if="step == 1" class="random-btn">
            <v-btn class="ml-auto" color="grey-lighten-1" icon="mdi-dice-2-outline" variant="text" @click="fillForm(false)"></v-btn>
            <span class="mr-2">TRX random</span>
          </div>
          <div v-if="step == 2" class="random-btn">
            <v-btn class="ml-auto" color="grey-lighten-1" icon="mdi-image-search" variant="text" @click="getPreviewImage"></v-btn>
            <span class="mr-2">Исходник</span>
          </div>
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
                    { title: 'Приём', value: 'in' },
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
              <v-select @update:menu="scrollWorkAround" ref="tz" :rules="notEmpty" :items="tzFields" density="compact" @update:modelValue="updateBarTime" label="Часовой пояс" v-model="form.tz"></v-select>
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
                  <v-select v-model="statusbar.device" :items="table.devices" label="Производитель смартфона" @update:modelValue="manualDeviceChange" density="compact"></v-select>
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
                    :range="field.range"
                    persistent-hint
                    density="compact"
                    v-model="statusbar[field.alias]"
                  >
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
                    <!-- <v-textarea v-model="preset.comment" label="Комментарий" density="compact"></v-textarea> -->
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
          <v-btn v-if="step == 1" variant="text" @click="openDialog('presets')"> Пресеты </v-btn>
          <v-btn class="ma-auto" v-if="step == 1" variant="text" @click="openDialog('wallets')"> Кошельки </v-btn>
          <v-btn v-if="step > 1" variant="text" @click="back"> Назад </v-btn>
          <v-spacer v-if="step > 1"></v-spacer>
          <v-btn v-if="step == 1" color="primary" @click="next"> Далее </v-btn>
          <v-btn v-if="step == 2 || step == 4" color="primary" @click="submit" :loading="loading">
            {{ step == 2 ? 'Создать скриншот' : 'Сохранить' }}
          </v-btn>
          <v-btn v-if="step == 3" color="primary" @click="save"> Сохранить </v-btn>
          <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <div class="v-card v-theme--dark v-card--density-default v-card--variant-elevated">
              <v-toolbar density="compact">
                <div class="d-flex align-center" v-if="agstate == 'presets'">
                  <v-btn>Пресеты</v-btn>
                  <v-btn color="grey-lighten-1" icon="mdi-delete" variant="text" @click="deletePresets"></v-btn>
                  <v-btn color="grey-lighten-1" icon="mdi-import" variant="text" class="mr-auto" @click="importData"></v-btn>
                  <v-btn color="grey-lighten-1" icon="mdi-export" variant="text" class="mr-auto" @click="exportData"></v-btn>
                </div>
                <div v-else>
                  <v-btn>Кошельки</v-btn>
                  <v-btn color="grey-lighten-1" icon="mdi-plus" variant="text" @click="createWallet"></v-btn>
                  <v-btn color="grey-lighten-1" icon="mdi-delete" variant="text" @click="deleteWallets"></v-btn>
                </div>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <AgGridVue
                :class="mobileClass + 'ag-theme-alpine-dark pw-table'"
                :column-defs="aggrid[agstate].columnDefs"
                :default-col-def="defaultColDef"
                suppressRowClickSelection
                suppressContextMenu
                suppressCellFocus
                :get-row-id="aggrid[agstate].getRowId"
                :rowClassRules="aggrid[agstate].rowClassRules"
                :row-data="AGrowData"
                rowSelection="multiple"
                animateRows
                style="height: 100%"
                @grid-ready="onGridReady"
                @sortChanged="AGGridManualFilter"
                :context="context"
                detailRowAutoHeight
              >
              </AgGridVue>
            </div>
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
import { AgGridVue } from 'ag-grid-vue3';
import sha256 from 'crypto-js/sha256';
import PresetContentCell from '../components/cellRenderers/PresetContentCell.vue';
import PresetCell from '../components/cellRenderers/PresetCell.vue';
import WalletContentCell from '../components/cellRenderers/WalletContentCell.vue';
import WalletCell from '../components/cellRenderers/WalletCell.vue';
import DateSelect from '../components/DateSelect.vue';
import RadioSelect from '@/components/RadioSelect.vue';
import SliderSelect from '@/components/SliderSelect.vue';

export default {
  components: {
    AgGridVue,
    VTextField,
    VSelect,
    DateSelect,
    RadioSelect,
    SliderSelect,
    VCombobox,
    VCheckbox,
    VTextarea,
    PresetContentCell,
    PresetCell,
    WalletContentCell,
    WalletCell,
  },
  name: 'WebApp',
  data() {
    return {
      //aggrid
      agstate: 'presets',
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        filter: true,
        flex: 1,
        autoHeight: true,
        suppressMenu: true,
      },
      context: { table: null },

      aggrid: {
        wallets: {
          getRowId: function (params) {
            return params.data.id;
          },
          rowClassRules: {
            preffered: 'data.preffered == 1',
          },
          columnDefs: [
            {
              field: 'title',
              flex: 3,
              headerName: 'Содержание',
              headerCheckboxSelection: true,
              checkboxSelection: true,
              cellRenderer: 'WalletContentCell',
            },
            {
              field: 'action',
              headerName: '',
              filter: false,
              sortable: false,
              maxWidth: 70,
              cellRenderer: 'WalletCell',
            },
          ],
        },
        presets: {
          getRowId: function (params) {
            return params.data.value;
          },
          columnDefs: [
            { field: 'title', minWidth: 150, headerName: 'Содержание', headerCheckboxSelection: true, checkboxSelection: true, cellRenderer: 'PresetContentCell' },
            {
              field: 'createdAt',
              headerName: 'Дата создания',
              cellStyle: () => {
                return this.$vuetify.display.mobile ? { 'white-space': 'pre' } : {};
              },
              sortable: true,
              minWidth: 125,
              maxWidth: 180,
              valueFormatter: (params) => new Date(params.value).toLocaleString('ru-Ru', { dateStyle: 'short', timeStyle: 'short' }).split(', ').join('\n'),
            },
            {
              field: 'action',
              headerName: '',
              filter: false,
              maxWidth: 140,
              sortable: false,
              cellRenderer: 'PresetCell',
            },
          ],
        },
      },
      //aggrid
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
      loadedPreset: null,
      wallets: [],
      predefinedWallet: null,
      walletAction: null,
    };
  },
  beforeUnmount() {
    this.$emitter.off('*');
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/config/` }).then((e) => {
      this.table = e.data;
      this.context = { table: this.table };
      console.log(e.data);
      //load binance
      this.exchange = this.table.exchanges.find((e) => e.title == 'Binance')?.value;
      this.update();
    });
    this.$http({ method: 'GET', url: `/v1/preset/` }).then((e) => {
      this.presets = e.data;
    });
    this.$http({ method: 'GET', url: `/v1/wallet/` }).then((e) => {
      this.wallets = e.data;
    });
    this.$emitter.on('delete-preset-step2', (ids) => {
      this.$http.delete(`/v1/preset?ids=${ids.join(',')}`).then((res) => {
        this.presets = this.presets.filter((item) => res.data.includes(+item.value) == false);
      });
    });
    this.$emitter.on('delete-preset-step1', (ids) => {
      setTimeout(() => {
        this.$emitter.emit('openDialog', {
          header: 'Удаление пресетов',
          message: `Вы собираетесь удалить ${ids.length} пресетов. Продолжить?`,
          eventName: 'delete-preset-step2',
          id: ids,
        });
      }, 500);
    });
    this.$emitter.on('create-wallet', (wallets) => {
      this.wallets = wallets;
      setTimeout(() => this.gridApi.refreshCells({ force: true }), 0);
      //find biggest id
      const id = Math.max(...this.wallets.map((e) => e.id));
      this.predefinedWallet = this.wallets.find((e) => e.id == id);
    });
    this.$emitter.on('delete-wallet', (ids) => {
      this.$http.delete(`/v1/wallet?ids=${ids.join(',')}`).then((res) => {
        this.wallets = this.wallets.filter((item) => res.data.includes(+item.id) == false);
      });
    }),
      this.$emitter.on('load-preset', (evt) => {
        const preset = this.presets.find((item) => item.value == evt.id);
        const { theme, language, currency, exchange, network, statusbar, fields, ...rest } = preset;
        this.exchange = exchange;
        this.theme = theme;
        this.language = language;
        this.network = network;
        this.currency = currency;
        this.direction = rest.direction;
        this.form = fields;
        this.form.sum = (Math.random() * (10000 - 2000) + 2000).toFixed(Math.random() * 6);
        if (preset.wallet) {
          this.form.address = preset.wallet;
          console.log(preset.wallet);
        }
        if (Object.keys(statusbar).length) {
          this.statusbar = { show: true, ...statusbar };
        }
        this.loadedPreset = evt.id;
        this.fillStatusBar(false);
        this.step = 2;
        this.dialog = false;
      });
    this.$emitter.on('edit-wallet', (wallets) => {
      this.wallets = wallets;
      setTimeout(() => this.gridApi.refreshCells({ force: true }), 0);
    });
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
      this.AGGridLoadFilter();
    },
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
        anchor.download = `Пресеты ${new Date().toLocaleString('ru-Ru', { dateStyle: 'short', timeStyle: 'short' })}.json`;
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
      this.loadedPreset = null;
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
        if (this.loadedPreset) {
          this.openDialog('presets');
        }
      }
    },
    save() {
      this.fields = this.themeFields.reduce((acc, item) => {
        acc[item.alias] = false;
        return acc;
      }, {});
      this.step++;
    },
    openDialog(type) {
      this.agstate = type;
      this.dialog = true;
    },
    createWallet() {
      this.$emitter.emit('openModal', {
        url: `/wallet/`,
        method: 'POST',
        header: 'Создание кошелька',
        eventName: 'create-wallet',
        fields: [
          {
            label: 'Название',
            key: 'name',
          },
          {
            label: 'Адрес',
            key: 'address',
          },
          {
            label: 'По умолчанию',
            key: 'preffered',
            type: 'select',
            options: [
              {
                value: true,
                title: 'Да',
              },
              {
                value: false,
                title: 'Нет',
              },
            ],
          },
          // {
          //   label: 'Коммент',
          //   key: 'comment',
          // },
        ],
      });
    },
    deletePresets() {
      const selectedRows = this.gridApi.getSelectedRows();
      if (!selectedRows.length) return;
      const ids = selectedRows.map((c) => c.value);
      this.$emitter.emit('openDialog', {
        header: 'Удаление пресетов',
        message: 'Вы уверены, что хотите удалить пресет(ы)?',
        eventName: 'delete-preset-step1',
        id: ids,
      });
    },
    deleteWallets() {
      const selectedRows = this.gridApi.getSelectedRows();
      if (!selectedRows.length) return;
      const ids = selectedRows.map((c) => c.id);
      this.$emitter.emit('openDialog', {
        header: 'Удаление кошельков',
        message: `Сейчас будет удалено ${ids.length} кошельков. Продолжить?`,
        eventName: 'delete-wallet',
        id: ids,
      });
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
        const keys = Object.getOwnPropertyNames(field.dependsOn);
        for (let i = 0; i < keys.length; i++) {
          // const key = keys[i];
          // const formValue = this.statusbar[key]?.value ?? this.statusbar[key] ?? this[key] ?? false;
          // const filterKeys = Object.getOwnPropertyNames(field.dependsOn[key]);
          // for (let j = 0; j < filterKeys.length; j++) {
          //   const filterKey = filterKeys[j];
          //   const filterValue = field.dependsOn[key][filterKey];
          //   if (filterKey == '$eq') {
          //     if (filterValue != formValue) return true;
          //   } else if (filterKey == '$ne') {
          //     if (filterValue == formValue) return true;
          //   }
          // }
          return !this.checkSingleStatusBarField(field);
        }
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
      else if (field.type == 'radio') return 'radio-select';
      else if (field.type == 'slider' || field.type == 'floatslider') return 'slider-select';
      else return 'v-checkbox';
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
            this.$http
              .post('/v1/preset/', body)
              .then((res) => {
                this.cleanUp();
                // push or replace
                const index = this.presets.findIndex((item) => item.value == res.data.value);
                if (index == -1) this.presets.push(res.data);
                else this.presets.splice(index, 1, res.data);
              })
              .catch((err) => {
                this.errorMessage = err.response.data.message;
              });
          }
        });
      }
    },
    fieldItems(field) {
      if (field.alias.match(/address/)) {
        return this.presetWallets;
      } else {
        return field.variants?.filter((item) => {
          const result = this.checkSingleStatusBarField(item);
          if (!result && this.statusbar[field.alias] == item.value) this.statusbar[field.alias] = undefined;
          return result;
        });
      }
    },
    checkSingleStatusBarField(item) {
      if (item.dependsOn) {
        const keys = Object.getOwnPropertyNames(item.dependsOn);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key == '$or') {
            for (let j = 0; j < item.dependsOn[key].length; j++) {
              if (this.checkSingleStatusBarField({ dependsOn: item.dependsOn[key][j] })) {
                return true;
              }
            }
            return false;
          }
          const formValue = this.statusbar[key]?.value ?? this.statusbar[key] ?? this[key] ?? false;
          const filterKeys = Object.getOwnPropertyNames(item.dependsOn[key]);
          for (let j = 0; j < filterKeys.length; j++) {
            const filterKey = filterKeys[j];
            const filterValue = item.dependsOn[key][filterKey];
            if (filterKey == '$eq') {
              if (filterValue != formValue) return false;
            } else if (filterKey == '$ne') {
              if (filterValue == formValue) return false;
            }
          }
        }
      }
      return true;
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
    manualDeviceChange(newValue) {
      this.statusbar = { show: true, device: newValue };
      if (newValue == 'samsung') {
        this.statusbar.wifiS1 = 4;
        this.statusbar.wifiS2 = 4;
        this.statusbar.simnum = 'sim1';
        // this.statusbar.wifiMode = 'volte';
      } else if (newValue == 'iphone') {
        this.statusbar.simnum = 'sim1';
        this.statusbar.network = 'lte';
        this.statusbar.wifiS = 3;
        this.statusbar['4g'] = 4;
      } else if (newValue == 'xiaomi') {
        this.statusbar.wifi = true;
        this.statusbar.wifiS = 5;
        this.statusbar['4g'] = 5;
        this.statusbar.volte = true;
      } else if (newValue == 'realme') {
        this.statusbar.volte = true;
      }
      //fill some fields with default values
      const device = this.table.devices.find((item) => item.value == newValue);
      device.inputs
        .filter((input) => ['time', 'charge', 'speed'].includes(input.alias))
        .forEach((item) => {
          this.fillSingleBarField(item);
        });
    },
    AGGridManualFilter() {
      const colState = this.columnApi.getColumnState();
      const sortState = colState
        .filter(function (s) {
          return s.sort != null;
        })
        .map(function (s) {
          return { colId: s.colId, sort: s.sort, sortIndex: s.sortIndex };
        });
      localStorage.setItem(`karbSort_${this.agstate}`, JSON.stringify(sortState));
    },
    AGGridLoadFilter() {
      const sortState = localStorage.getItem(`karbSort_${this.agstate}`);
      if (sortState) {
        this.columnApi.applyColumnState({
          state: JSON.parse(sortState),
          defaultState: { sort: null },
        });
      }
    },
    AGGridCellDataStyle() {
      return this.$vuetify.display.mobile ? 'white-space:pre' : '';
    },
    scrollWorkAround(state) {
      //scroll to current item
      if (state) {
        setTimeout(() => {
          const el = document.querySelector('.v-list-item--active');
          if (el) {
            const parent = el.closest('.v-list');
            if (parent) {
              parent.scrollTop = el.offsetTop - parent.offsetTop - parent.clientHeight / 2 + el.clientHeight / 2;
            }
          }
        }, 0);
      }
    },
    cleanUp() {
      this.form = {};
      this.statusbar = { show: false };
      this.errorMessage = '';
      this.preview = null;
      this.loadedPreset = null;
      this.templateSrc = null;
      this.preset = { current: '0' };
      this.fields = {};
      this.step = 1;
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
      } else if (item.type == 'floatslider') {
        const num = Math.random() * (item.range[1] / 100 - item.range[0] + 1) + item.range[0];
        const len = 3 - Math.floor(num).toString().length;
        this.statusbar[item.alias] = num.toFixed(len);
      } else if (item.type == 'number' || item.type == 'radio' || item.type == 'slider') {
        this.statusbar[item.alias] = Math.floor(Math.random() * (item.range[1] - item.range[0] + 1)) + item.range[0];
      } else if (item.type == 'select') {
        this.statusbar[item.alias] = item.variants[Math.floor(Math.random() * item.variants.length)];
      } else {
        this.statusbar[item.alias] = Math.random() < 0.5;
      }
    },
    fillStatusBar(randomAll = true) {
      let device;
      if (randomAll) {
        device = this.table.devices[Math.floor(Math.random() * this.table.devices.length)];
      } else {
        const preset = this.presets.find((preset) => preset.value == this.loadedPreset);
        device = this.table.devices.find((device) => device.value == preset.statusbar.device);
        if (!device) return;
      }
      const { independent, dependent } = device.inputs.reduce(
        (acc, item) => {
          if (randomAll || (!randomAll && item.alwaysRandom)) {
            if (item.dependsOn) {
              acc.dependent.push(item);
            } else {
              acc.independent.push(item);
            }
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
    fillForm(randomAll = true) {
      this.exchange = this.table.exchanges[Math.floor(Math.random() * this.table.exchanges.length)].value;
      this.theme = this.themeItems[Math.floor(Math.random() * this.themeItems.length)].value;
      let language;
      if (randomAll) {
        language = this.themeLanguages[Math.floor(Math.random() * this.themeLanguages.length)].value;
        this.network = this.themeNetworks[Math.floor(Math.random() * this.themeNetworks.length)].value;
        this.currency = this.themeCurrencies[Math.floor(Math.random() * this.themeCurrencies.length)].value;
        this.direction = ['in', 'out'][Math.floor(Math.random() * 2)];
      } else {
        //language
        //find ru or uk
        const ruuk = this.themeLanguages.filter((language) => language.value == 'ru' || language.value == 'uk');
        if (ruuk.length) {
          language = ruuk[Math.floor(Math.random() * ruuk.length)].value;
        } else {
          language = this.themeLanguages.find((language) => language.value == 'en')?.value || this.themeLanguages[0].value;
        }
        //network
        this.network = this.themeNetworks.find((network) => network.value == 'trc20')?.value || this.themeNetworks[0].value;
        //currency
        this.currency = this.themeCurrencies.find((currency) => currency.value == 'usdt')?.value || this.themeCurrencies[0].value;
        //direction
        this.direction = 'in';
      }
      this.language = language;
    },
    downloadPreview() {
      const link = document.createElement('a');
      link.href = this.preview;
      let filename = '';
      if (this.loadedPreset) {
        const preset = this.presets.find((item) => item.value == this.loadedPreset);
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
    AGrowData() {
      return this[this.agstate];
    },
    mobileClass() {
      return this.$vuetify.display.mobile ? 'ag-mobile ' : '';
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

.preffered {
  background-color: #1b5e20 !important;
}

.v-text-field .v-input__details > div > div:not(:empty) {
  padding-bottom: 16px;
}

.random-btn {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.random-btn .v-btn {
  width: calc(var(--v-btn-height));
  height: calc(var(--v-btn-height));
}

.random-btn span {
  line-height: 16px;
}

.pw-table button {
  height: unset !important;
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

.ag-cell-wrap-text {
  word-break: unset;
}
.ag-mobile .ag-header-cell {
  padding-left: 5px;
  padding-right: 5px;
}
.ag-mobile .ag-cell {
  padding-left: 5px;
  padding-right: 5px;
}
.ag-mobile .ag-selection-checkbox {
  margin-left: 7px;
}
.ag-mobile .ag-header-select-all {
  margin-left: 7px;
  margin-right: 12px !important;
}
</style>
