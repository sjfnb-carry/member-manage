// 侧边栏折叠
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGetterRouterStore = defineStore("GetterRouter", () => {
  const isGetterRouter = ref(false);

  const changeGetterRouter = (value) => {
    isGetterRouter.value = value
  }

  return { isGetterRouter, changeGetterRouter };
});
