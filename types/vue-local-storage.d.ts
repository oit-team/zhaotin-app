interface vueLocalStorage {
  set(),
  get(),
  remove,
}

declare module 'vue/types/vue' {
  interface Vue {
    $ls: vueLocalStorage;
  }
}
