import axios, { AxiosError } from 'axios';

const API_BASE = 'http://localhost:8000/api/users';

const API_URL_REGISTER = `${API_BASE}/register`;
const API_URL_LOGIN = `/api/auth/login`;
const API_URL_VALIDATE = `${API_BASE}/validatecode`;

// Tipos de datos

export interface RegisterUserData {
  username: string;
  password: string;
  email?: string;
  [key: string]: any;
}

export interface LoginUserData {
  username: string;
  password: string;
}

export interface ValidateCodeData {
  username: string;
  codeverification: string;
}

export interface ApiError {
  [key: string]: string[] | string;
}

// Funciones

export const registerUser = async (
  userData: RegisterUserData
): Promise<any> => {
  try {
    const response = await axios.post(API_URL_REGISTER, userData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const loginUser = async (
  userData: LoginUserData
): Promise<any> => {
  try {
    const response = await axios.post(API_URL_LOGIN, userData);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw handleApiError(error);
  }
};

export const validateCode = async (
  data: ValidateCodeData
): Promise<any> => {
  try {
    const response = await axios.post(API_URL_VALIDATE, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Manejo de errores

function handleApiError(error: unknown): ApiError | string {
  if (axios.isAxiosError(error)) {
    return error.response?.data ?? error.message;
  }
  return 'Unknown error';
}
