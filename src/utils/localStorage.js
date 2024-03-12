export const setToken = (token) => {
  localStorage.setItem("My-TOKEN", JSON.stringify(token));
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem("My-TOKEN"));
};
export const removeToken = () => {
  localStorage.getItem("My-TOKEN");
};
