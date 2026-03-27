import { createRequire } from 'node:module';
import type { ApiSecretKey } from '../src/types';

const require = createRequire(import.meta.url);
type KeytarModule = {
  setPassword: (service: string, account: string, password: string) => Promise<void>;
  getPassword: (service: string, account: string) => Promise<string | null>;
  deletePassword: (service: string, account: string) => Promise<boolean>;
};
const keytar = require('keytar') as KeytarModule;

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
