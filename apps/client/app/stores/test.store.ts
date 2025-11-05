import { defineStore } from 'pinia';

export const useTestStore = defineStore('testStore', {
  state: () => ({
    token: 'test-token'
  }),
  getters: {
  },
  actions: {
  }
});
