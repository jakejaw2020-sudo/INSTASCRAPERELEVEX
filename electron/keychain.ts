import { createRequire } from 'node:module';
import type { ApiSecretKey } from '../src/types';

const require = createRequire(import.meta.url);

type KeytarModule = {
  setPassword: (service: string, account: string, password: string) => Promise<void>;
  getPassword: (service: string, account: string) => Promise<string | null>;
  deletePassword: (service: string, account: string) => Promise<boolean>;
};

function resolveKeytarModule(): KeytarModule {
  const loaded = require('keytar') as Partial<KeytarModule> & { default?: Partial<KeytarModule> };
  const candidate = typeof loaded.getPassword === 'function' ? loaded : loaded.default;

  if (
    !candidate ||
    typeof candidate.getPassword !== 'function' ||
    typeof candidate.setPassword !== 'function' ||
    typeof candidate.deletePassword !== 'function'
  ) {
    const loadedKeys = loaded && typeof loaded === 'object' ? Object.keys(loaded).join(', ') : typeof loaded;
    throw new TypeError(`Failed to load keytar module. Export keys: ${loadedKeys || '(none)'}`);
  }

  return candidate as KeytarModule;
}

const keytar = resolveKeytarModule();
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
