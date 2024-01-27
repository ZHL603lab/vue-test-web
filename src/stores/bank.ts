import { defineStore } from 'pinia'

export const useBankStore = defineStore( 'bank', {
    state: () => {
      return {
        topselect: [],
        sortBy: null,
        sortOrderDec: true,
      }
    }
  },
)
