import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";

export const key: InjectionKey<Store<State>> = Symbol();

// vuex类型声明
export type State = {
  count: number;
};

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
