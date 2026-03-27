import type { ApiSecretKey } from '@/types';

export async function getSecret(key: ApiSecretKey): Promise<string | null> {
  return window.electronAPI.getSecret(key);
}

export async function setSecret(key: ApiSecretKey, value: string): Promise<void> {
  return window.electronAPI.setSecret(key, value);
}
