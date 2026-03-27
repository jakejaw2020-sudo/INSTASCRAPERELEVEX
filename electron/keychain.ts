import keytar from 'keytar';
import type { ApiSecretKey } from '../src/types';

const SERVICE = 'elevex-carousel-studio';

export async function setSecret(key: ApiSecretKey, value: string): Promise<void> {
  await keytar.setPassword(SERVICE, key, value);
}

export async function getSecret(key: ApiSecretKey): Promise<string | null> {
  return keytar.getPassword(SERVICE, key);
}

export async function deleteSecret(key: ApiSecretKey): Promise<boolean> {
  return keytar.deletePassword(SERVICE, key);
}
