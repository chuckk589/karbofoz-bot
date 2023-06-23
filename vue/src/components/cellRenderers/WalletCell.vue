<template>
  <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text" @click="editWallet"></v-btn>
</template>

<script>
export default {
  name: 'WalletCell',
  data() {
    return {};
  },
  methods: {
    editWallet() {
      this.$emitter.emit('openModal', {
        url: `/wallet/${this.params.data.id}`,
        method: 'PATCH',
        header: `Редактирование кошелька ${this.params.data.title}`,
        eventName: 'edit-wallet',
        fields: [
          {
            key: 'name',
            label: 'Название',
            value: this.params.data.title,
          },
          {
            key: 'address',
            label: 'Адрес',
            value: this.params.data.value,
          },
          {
            key: 'comment',
            label: 'Комментарий',
            value: this.params.data.comment,
          },
          {
            key: 'preffered',
            label: 'По умолчанию',
            value: this.params.data.preffered,
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
        ],
      });
    },
  },
};
</script>
