// 存储后端返回的用户数据
/** username: String,
    gender: Number,
    introduction: String,
    avatar: String,
    role: Number,
 *
 */

// 侧边栏折叠
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserInfoStore = defineStore("userInfo", () => {

  const userInfo = ref();

  const changeUserInfo = (value) => {
    userInfo.value = {
      ...userInfo.value,
      ...value
    }
  }

  const clearUserInfo = () => {
    userInfo.value = {}
  }


  return { userInfo, changeUserInfo, clearUserInfo }

},
  // 持久化
  {
    persist: {
      paths: ['userInfo']
    }
  }
);
