<template>
  <v-app style="background-color: #d3d3d326" class="h-screen">
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
                <!-- <v-select :disabled="platform !== 'mobile'" v-model="device" :items="this.$ctable.devices" label="Статусбар" density="compact"></v-select> -->
                <!-- <v-select v-model="type" :items="typeItems" label="Направление" density="compact" :rules="notEmpty"></v-select> -->
                <!-- <v-select v-model="network" :items="this.$ctable.networks" label="Сеть" density="compact" :rules="notEmpty"></v-select> -->
              </v-form>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-form ref="form2">
                <v-text-field v-for="field in themeFields" :key="field.value" :type="field.type" density="compact" :label="field.name" :rules="notEmpty" @input="(event) => (form[field.alias] = event.target.value)">
                </v-text-field>
              </v-form>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-img class="mb-5" :aspect-ratio="1" :src="preview" />
          </v-window-item>
          <v-window-item :value="4"></v-window-item>
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
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'WebApp',
  data() {
    return {
      errorMessage: '',
      step: 1,
      notEmpty: [(v) => !!v || 'Поле не может быть пустым'],
      exchange: '',
      theme: '',
      form: {},
      table: {},
      preview: '',
      loading: false,
    };
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/config/` }).then((e) => {
      this.table = e.data;
      console.log(e.data);
    });
  },
  methods: {
    next() {
      this.errorMessage = '';
      this.$refs.form1.validate().then((res) => {
        if (res.valid) {
          this.step++;
        }
      });
    },
    back() {
      this.errorMessage = '';
      this.step--;
    },
    template() {
      this.errorMessage = '';
      this.step = 4;
    },
    preset() {
      // this.step = 3;
    },
    submit() {
      this.errorMessage = '';
      this.$refs.form2.validate().then((res) => {
        if (res.valid) {
          this.loading = true;
          this.$http
            .post('/v1/preset/preview/', {
              exchange: this.exchange,
              theme: this.theme,
              ...this.form,
            })
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
        return 'Сохранить!';
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
