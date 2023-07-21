import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('https://muchen-backend.vercel.app/formlogin', {
      username,
      password,
    });

    const { token } = response.data;

    return token;
  } catch (error) {
    throw new Error('UserName atau Password Salah');
  }
};

export const logout = () => {
  // Lakukan proses logout di sini, seperti membersihkan data atau menghapus token
};

export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios.post('https://muchen-backend.vercel.app/verify-token', { token });

      return true;
    } catch (error) {
      return false;
    }
  }

  return false;
};
