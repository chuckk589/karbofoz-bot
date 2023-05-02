<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
};
</script>
<style>
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
