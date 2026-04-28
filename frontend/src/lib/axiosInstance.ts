import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;

  // Если 401 и запрос не на refresh и еще не обновляли
  if (
    error.response?.status === 401 &&
      !originalRequest._retry
  ) {
    originalRequest._retry = true;

    try {
      // Запрос на обновление токена
      const refreshResponse = await axios.get(
        `${axiosInstance.defaults.baseURL}/auth/refresh`,
        { withCredentials: true },
      );
      const newAccessToken = refreshResponse.data.accessToken;
        
      // Сохраняем новый токен
      localStorage.setItem("accessToken", newAccessToken);

      // Повторяем оригинальный запрос с новым токеном
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Если refresh не удался - редирект на логин или очистка токенов
      console.error('Token refresh failed:', refreshError);
      localStorage.removeItem("accessToken");
      window.location.href = '/authorization'; // или используйте ваш роутер
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
});
export default axiosInstance;