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
                <v-select v-model="exchange" :items="table.exchanges" label="Биржа" density="compact" :rules="notEmpty"></v-select>
                <v-select v-model="theme" :items="themeItems" label="Тема" density="compact" :rules="notEmpty"></v-select>
                <v-select v-model="language" :items="themeLanguages" label="Язык" density="compact" :rules="notEmpty"></v-select>
                <v-combobox v-model="currency" :items="table.currencies" label="Валюта" density="compact" :rules="notEmpty"></v-combobox>
                <v-combobox v-model="network" :items="table.networks" label="Сеть" density="compact" :rules="notEmpty"></v-combobox>
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
                  :items="field.variants"
                  :type="field.type"
                  density="compact"
                  step="1"
                  :rules="!field.optional ? notEmpty : []"
                  v-model="form[field.alias]"
                  :append-inner-icon="appendInnerIcon(field.alias)"
                  @click:append-inner="appendInnerClick(field.alias)"
                >
                  <template #label>
                    <span>{{ field.name }}<strong class="text-red" v-if="!field.optional">&nbsp;&nbsp;*</strong></span>
                  </template>
                </component>
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
          <v-btn v-if="step == 1" variant="text" @click="openDialog"> Пресеты </v-btn>
          <v-btn v-if="step > 1" variant="text" @click="back"> Назад </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step == 1" color="primary" @click="next"> Далее </v-btn>
          <v-btn v-if="step == 2 || step == 4" color="primary" @click="submit" :loading="loading"> Готово </v-btn>
          <v-btn v-if="step == 3" color="primary" @click="save"> Сохранить </v-btn>
          <!-- <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar density="compact">
                <v-btn icon @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Пресеты</v-toolbar-title>
              </v-toolbar>

              <v-card-text style="padding: 0">
                <v-list density="compact" @click:select="(item) => (selectedRow = item.id)">
                  <v-list-item v-for="preset in presets" :key="preset.value" :value="preset.value">
                    <v-list-item-title>{{ preset.title }}</v-list-item-title>
                    <template v-slot:append>
                      <v-btn color="grey-lighten-1" icon="mdi-delete" variant="text" @click="deletePreset(preset.value)"></v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn class="ma-auto" color="primary" @click="loadPreset"> Загрузить </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="ma-auto" color="primary" @click="applyPreset"> Применить </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
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
                <v-window-item v-for="n in 3" :key="n" :value="n">
                  <v-card-text style="padding: 0">
                    <v-list density="compact" @click:select="(item) => (selectedRow = item.id)">
                      <v-list-item v-for="preset in presets" :key="preset.value" :value="preset.value">
                        <v-list-item-title>{{ preset.title }}</v-list-item-title>
                        <template v-slot:append>
                          <v-btn color="grey-lighten-1" icon="mdi-delete" variant="text" @click="deletePreset(preset.value)"></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn class="ma-auto" color="primary" @click="loadPreset"> Загрузить </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-auto" color="primary" @click="applyPreset"> Применить </v-btn>
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
import sha256 from 'crypto-js/sha256';
import DateSelect from '../components/DateSelect.vue';
export default {
  components: {
    VTextField,
    VSelect,
    DateSelect,
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
      presets: [],
      preset: {},
      fields: {},
      pending: [],
      selectedRow: null,
      tab: null,
    };
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/config/` }).then((e) => {
      this.table = e.data;
      console.log(e.data);
    });
    this.$http({ method: 'GET', url: `/v1/preset/` }).then((e) => {
      this.presets = e.data;
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
        console.log(this.network.value);
        this.form.txid = `${this.network.value == 'trc20' ? '' : '0x'}${sha256((Math.random() + 1).toString(36).substring(7))}`;
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
      console.log(preset);
      const { theme, language, currency, exchange, network, fields, ...rest } = preset;
      this.exchange = exchange;
      this.theme = theme;
      this.language = language;
      this.network = network;
      this.currency = currency;
      this.form = fields;
      this.dialog = false;
    },
    applyPreset() {
      this.$http
        .delete('/v1/preset/', {
          data: {
            ids: this.pending,
          },
        })
        .then((res) => {
          this.dialog = false;
        });
    },
    getComponentName(field) {
      if (field.type == 'select') return 'v-select';
      else if (field.type == 'datetime-local') return 'date-select';
      else return 'v-text-field';
    },
    deletePreset(id) {
      this.presets = this.presets.filter((item) => item.value != id);
      this.pending.push(id);
    },
    submit() {
      if (this.step == 2) {
        this.errorMessage = '';
        this.$refs.form2.validate().then((res) => {
          if (res.valid) {
            this.loading = true;
            const body = {
              theme: this.theme,
              language: this.language,
              currency: this.currency.value || this.currency,
              network: this.network.value || this.network,
              fields: this.form,
            };
            body.fields.date = body.fields.date.value ? new Date(Date.now() - body.fields.date.value * 1000) : body.fields.date;

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
            };
            this.$http.post('/v1/preset/', body).then(() => (this.step = 1));
          }
        });
      }
    },
  },
  computed: {
    themeItems() {
      return this.table.templates?.find((item) => item.value == this.exchange)?.themes || [];
    },
    themeLanguages() {
      return this.table.templates?.find((item) => item.value == this.exchange)?.themes.find((item) => item.value == this.theme)?.languages || [];
    },
    themeFields() {
      return this.table.templates?.find((item) => item.value == this.exchange)?.themes.find((item) => item.value == this.theme)?.inputs || [];
    },
    presetItems() {
      return [{ title: 'Создать новый', value: '0' }, ...this.presets];
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
