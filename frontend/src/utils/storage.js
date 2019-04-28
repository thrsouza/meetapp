const prefix = '@Meetapp:';

const storageKeys = {
  token: `${prefix}token`,
  user: `${prefix}user`,
};

export default {
  // Token
  setToken: token => localStorage.setItem(storageKeys.token, token),
  getToken: () => localStorage.getItem(storageKeys.token),
  removeToken: () => localStorage.removeItem(storageKeys.token),

  // User
  setUser: user => localStorage.setItem(storageKeys.user, JSON.stringify(user)),
  getUser: () => JSON.parse(localStorage.getItem(storageKeys.user)),
  removeUser: () => localStorage.removeItem(storageKeys.user),
};
