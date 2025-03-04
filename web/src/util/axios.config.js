import axios from "axios";

// 请求拦截器
axios.interceptors.request.use(function (config) {
  console.log('请求拦截器 成功 ');
  // 从本地存储中获取 token
  const token = localStorage.getItem('token');
  // 在请求头中添加 Authorization 字段，并设置为 Bearer 类型的 token
  config.headers.Authorization = `Bearer ${token}`
  return config;
}, function (error) {
  console.log('请求拦截器 失败 ');
  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 从响应头中获取新的 token
  const { authorization } = response.headers;
  // 如果响应头中包含新的 token，则将其存储到本地存储中
  if (authorization) {
    localStorage.setItem('token', authorization);
  }
  return response;
}, function (error) {
  console.log('响应拦截器 失败 ')
  console.log(error)
  // 获取响应状态码
  const { status } = error.response
  console.log(status);

  // 如果状态码为 401，则重定向到登录页面
  if (status === 401) {
    localStorage.removeItem('token')
    window.location.href = "/login"
  }
  return Promise.reject(error);
});
