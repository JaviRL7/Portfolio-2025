// src/services/apiService.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

const axiosRes = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
});

// ---- Tipos del dominio ----
export interface Comment {
  id: string;
  name: string;
  texto: string;
  role?: string;
  createdAt: string; // ISO
}

export interface CreateCommentDto {
  name: string;
  role?: string;
  texto: string;
}

// ---- Helper para extraer data (compat con { content }) ----
function unwrap<T = any>(data: any): T {
  return data?.content ?? data;
}

// ---- Manejo de errores estándar ----
function handleError(error: unknown, showFail: boolean) {
  const err = error as AxiosError<any>;
  const msg =
    err.response?.data?.message ||
    err.message ||
    'Ocurrió un error. Intentalo de nuevo.';
  if (showFail) toast.error(msg, { duration: 2000 });
  throw err;
}

// ---- Métodos base ----
async function get<T = any>(
  url: string,
  { showSuccess = false, showFail = true, config }: { showSuccess?: boolean; showFail?: boolean; config?: AxiosRequestConfig } = {},
): Promise<T> {
  try {
    const res = await axiosRes.get(url, config);
    if (showSuccess && res.data?.message) toast.success(res.data.message, { duration: 2000 });
    return unwrap<T>(res.data);
  } catch (e) {
    handleError(e, showFail);
    return Promise.reject(e);
  }
}

async function post<T = any>(
  url: string,
  data?: unknown,
  { showSuccess = false, showFail = true, config }: { showSuccess?: boolean; showFail?: boolean; config?: AxiosRequestConfig } = {},
): Promise<T> {
  try {
    const res = await axiosRes.post(url, data, config);
    if (showSuccess && res.data?.message) toast.success(res.data.message, { duration: 2000 });
    return unwrap<T>(res.data);
  } catch (e) {
    handleError(e, showFail);
    return Promise.reject(e);

  }
}

async function put<T = any>(
  url: string,
  data?: unknown,
  { showSuccess = false, showFail = true, config }: { showSuccess?: boolean; showFail?: boolean; config?: AxiosRequestConfig } = {},
): Promise<T> {
  try {
    const res = await axiosRes.put(url, data, config);
    if (showSuccess && res.data?.message) toast.success(res.data.message, { duration: 2000 });
    return unwrap<T>(res.data);
  } catch (e) {
    handleError(e, showFail);
    return Promise.reject(e);

  }
}

async function patch<T = any>(
  url: string,
  data?: unknown,
  { showSuccess = false, showFail = true, config }: { showSuccess?: boolean; showFail?: boolean; config?: AxiosRequestConfig } = {},
): Promise<T> {
  try {
    const res = await axiosRes.patch(url, data, config);
    if (showSuccess && res.data?.message) toast.success(res.data.message, { duration: 2000 });
    return unwrap<T>(res.data);
  } catch (e) {
    handleError(e, showFail);
    return Promise.reject(e);

  }
}

async function del<T = any>(
  url: string,
  { showSuccess = false, showFail = true, config }: { showSuccess?: boolean; showFail?: boolean; config?: AxiosRequestConfig } = {},
): Promise<T> {
  try {
    const res = await axiosRes.delete(url, config);
    if (showSuccess && res.data?.message) toast.success(res.data.message, { duration: 2000 });
    return unwrap<T>(res.data);
  } catch (e) {
    handleError(e, showFail);
    return Promise.reject(e);

  }
}


export const commentsApi = {
  create: (payload: CreateCommentDto) =>
    post<Comment>('/comments', payload, { showSuccess: true }),

  list: () => get<Comment[]>('/comments'),
};

export const apiService = { get, post, put, patch, del };
export default axiosRes;
