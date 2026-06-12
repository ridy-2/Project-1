import api from '../helpers/api';

const AuthApi = {
  login: async (email, password) => {
    const response = await api.get(`/users?email=${encodeURIComponent(email)}`);
    const users = response.data;
    if (users.length > 0 && users[0].password === password) {
      const userData = users[0];
      return {
        token: 'mock-jwt-token-xyz123',
        user: { 
          name: userData.name, 
          email: userData.email,
          role: userData.role || 'User',
          permissions: userData.permissions || ['Read']
        }
      };
    }
    throw new Error('Email atau password salah!');
  },
  register: async (name, email, password) => {
    const checkResponse = await api.get(`/users?email=${encodeURIComponent(email)}`);
    if (checkResponse.data.length > 0) {
      throw new Error('Email sudah terdaftar!');
    }
    const newUser = {
      id: email,
      email,
      name,
      password,
      role: 'User',
      permissions: ['Read']
    };
    const response = await api.post('/users', newUser);
    return response.data;
  }
};

export default AuthApi;
