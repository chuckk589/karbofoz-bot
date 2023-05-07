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
                  v-for="field in themeFields"
                  :is="getComponentName(field)"
                  :key="field.value"
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
            <a download="myImage.png" target="_blank" :href="preview"><v-img class="mb-5" :aspect-ratio="1" :src="preview" /></a>
          </v-window-item>
          <v-window-item :value="4">
            <v-card-text>
              <v-checkbox v-for="field in themeFields" :key="field.value" :label="field.name" density="compact" v-model="fields[field.alias]"></v-checkbox>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="4">
            <v-card-text> </v-card-text>
          </v-window-item>
          <v-card-text v-if="errorMessage">
            <span class="d-block text-red mb-2">{{ errorMessage }}</span>
          </v-card-text>
        </v-window>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn v-if="step == 1" variant="text" @click="preset"> Пресеты </v-btn>
          <v-btn v-if="step > 1" variant="text" @click="back"> Назад </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step == 1" color="primary" @click="next"> Далее </v-btn>
          <v-btn v-if="step == 2" color="primary" @click="submit" :loading="loading"> Готово </v-btn>
          <v-btn v-if="step == 3" color="primary" @click="save"> Сохранить </v-btn>
          <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" dark v-bind="props"> Open Dialog </v-btn>
            </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn variant="text" @click="dialog = false"> Save </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-list lines="three" subheader>
                <v-list-subheader>User Controls</v-list-subheader>
                <v-list-item title="Content filtering" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
                <v-list-item title="Password" subtitle="Require password for purchase or use password to restrict purchase"></v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list lines="two" subheader>
                <v-list-subheader>General</v-list-subheader>
                <v-list-item title="Notifications" subtitle="Notify me about updates to apps or games that I downloaded">
                  <template v-slot:prepend>
                    <v-checkbox v-model="notifications"></v-checkbox>
                  </template>
                </v-list-item>
                <v-list-item title="Sound" subtitle="Auto-update apps at any time. Data charges may apply">
                  <template v-slot:prepend>
                    <v-checkbox v-model="sound"></v-checkbox>
                  </template>
                </v-list-item>
                <v-list-item title="Auto-add widgets" subtitle="Automatically add home screen widgets">
                  <template v-slot:prepend>
                    <v-checkbox v-model="widgets"></v-checkbox>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { VTextField } from 'vuetify/components/VTextField';
import sha256 from 'crypto-js/sha256';
import { VSelect } from 'vuetify/components/VSelect';
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
      fields: {},
      table: {},
      preview: '',
      loading: false,
      language: '',
      currency: null,
      network: null,
    };
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/config/` }).then((e) => {
      this.table = e.data;
      console.log(e.data);
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
    test() {
      console.log(this.form.date);
    },
    next() {
      this.errorMessage = '';
      this.$refs.form1.validate().then((res) => {
        if (res.valid) {
          this.form = this.themeFields.reduce((acc, item) => {
            acc[item.alias] = null;
            return acc;
          }, {});
          this.step++;
        }
      });
    },
    manageInput(event) {
      console.log(event);
      this.form[event.target.name] = event.target.value;
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
      // this.$http
      //   .post('/v1/preset/', {
      //     theme: this.theme,
      //     language: this.language,
      //     currency: this.currency,
      //     network: this.network,
      //     ...this.form,
      //   })
      //   .then((res) => {})
      //   .catch((err) => {
      //     this.errorMessage = err.response.data.message;
      //   })
      //   .finally(() => {});
    },
    preset() {
      // this.errorMessage = '';
      // this.step = 4;
      console.log(this.network.value);
    },
    getComponentName(field) {
      if (field.type == 'select') return 'v-select';
      else if (field.type == 'datetime-local') return 'date-select';
      else return 'v-text-field';
    },
    submit() {
      this.step = 4;
      return;
      this.errorMessage = '';
      this.$refs.form2.validate().then((res) => {
        if (res.valid) {
          this.loading = true;
          const body = {
            theme: this.theme,
            language: this.language,
            currency: this.currency.value || this.currency,
            network: this.network.value || this.network,
            ...this.form,
          };
          body.date = body.date.value ? new Date(Date.now() - body.date.value * 1000) : body.date;

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
