// 侧边栏折叠
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCollapseStore = defineStore("collapse", () => {
  const isCollapsed = ref(false);

  const changeCollapsed = () => {
    isCollapsed.value = !isCollapsed.value
  }


  return { isCollapsed, changeCollapsed }

},
  // 持久化
  {
    persist: {
      paths: ['isCollapsed']
    }
  }
);
