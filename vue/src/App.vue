<template>
  <div>
    <router-view />
    <ConfirmDialog />
    <EditComponent />
  </div>
</template>

<script>
import EditComponent from './components/EditComponent.vue';
import ConfirmDialog from './components/ConfirmDialog.vue';
export default {
  name: 'App',
  components: {
    EditComponent,
    ConfirmDialog,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
@import 'ag-grid-community/dist/styles/ag-grid.css';
@import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

#wobar {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch !important;
  justify-content: flex-start !important;
}
#main div,
#main div div {
  display: flex;
  justify-content: center;
  align-items: center;
}
#main {
  display: flex;
  flex-direction: column;
  align-items: stretch !important;
}
</style>
