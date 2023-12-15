import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMyInfoStore = defineStore({
  id: 'myInfo',
  state: () => ({
    sellers: [] as { value: number; label: string }[]
  }),
  actions: {
    setSellers(sellers: []) {
      this.sellers = sellers
    },
    getSellers() {
      return this.sellers
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMyInfoStore as any, import.meta.hot))
}
