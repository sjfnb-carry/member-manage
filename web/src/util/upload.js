import axios from "axios"

function upload(path, userForm) {
  // 创建一个新的FormData对象，用于存储表单数据
  const params = new FormData()
  // 遍历userForm对象，将所有属性添加到FormData对象中
  for (let i in userForm) {
    // 将userForm的每个属性及其值添加到params对象中
    params.append(i, userForm[i])
  }

  return axios.post(path, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default upload
