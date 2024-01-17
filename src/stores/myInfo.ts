import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useMyInfoStore = defineStore(
  'myInfo',
  () => {
    const sellers = ref<Array<{ value: number; label: string }>>([])

    function setSellers(data: { value: number; label: string }[]) {
      sellers.value.push(...data)
    }

    function getSellers(): {
      value: number
      label: string
    }[] {
      return sellers.value
    }

    return { setSellers, getSellers }
  },
  { persist: true }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMyInfoStore as any, import.meta.hot))
}
