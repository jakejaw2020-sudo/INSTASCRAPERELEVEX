import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { join } from 'node:path';
import OpenAI from 'openai';
import { scrapeInstagramUrl } from '../src/services/apify';
import { publishCarousel } from '../src/services/meta';
import { getSecret, setSecret, deleteSecret } from './keychain';
import type { DalleParams, GptParams, PublishParams } from '../src/types';

const isDev = !app.isPackaged;

function createWindow(): void {
  const window = new BrowserWindow({
    width: 1680,
    height: 980,
    minWidth: 1320,
    minHeight: 760,
    backgroundColor: '#080808',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev) {
    window.loadURL('http://localhost:5173');
  } else {
    window.loadFile(join(__dirname, '../dist/index.html'));
  }
}

ipcMain.handle('keychain:get', async (_, key: string) => getSecret(key as never));
ipcMain.handle('keychain:set', async (_, key: string, value: string) => setSecret(key as never, value));
ipcMain.handle('keychain:delete', async (_, key: string) => deleteSecret(key as never));

ipcMain.handle('fs:openFile', async (_, options: Electron.OpenDialogOptions) => {
  const result = await dialog.showOpenDialog(options);
  return result.filePaths;
});

ipcMain.handle('openai:generate', async (_, params: GptParams) => {
  const apiKey = await getSecret('openai_api_key');
  if (!apiKey) {
    throw new Error('Missing OpenAI API key in Keychain.');
  }

  const client = new OpenAI({ apiKey });
  const response = await client.responses.create({
    model: 'gpt-4o',
    input: [
      { role: 'system', content: params.systemPrompt },
      { role: 'user', content: params.userPrompt }
    ],
    text: params.jsonMode ? { format: { type: 'json_object' } } : undefined
  });
  return response.output_text;
});

ipcMain.handle('openai:image', async (_, params: DalleParams) => {
  const apiKey = await getSecret('openai_api_key');
  if (!apiKey) {
    throw new Error('Missing OpenAI API key in Keychain.');
  }
  const client = new OpenAI({ apiKey });
  const response = await client.images.generate({
    model: 'gpt-image-1',
    prompt: params.prompt,
    size: params.size ?? '1024x1024',
    quality: params.quality ?? 'standard'
  });
  return response.data[0]?.url ?? '';
});

ipcMain.handle('apify:scrape', async (_, url: string) => {
  const apifyToken = await getSecret('apify_api_token');
  if (!apifyToken) {
    throw new Error('Missing Apify token in Keychain.');
  }
  return scrapeInstagramUrl(url, apifyToken);
});

ipcMain.handle('meta:publish', async (_, params: PublishParams) => {
  const accessToken = await getSecret('meta_access_token');
  const instagramUserId = await getSecret('meta_instagram_user_id');

  if (!accessToken || !instagramUserId) {
    throw new Error('Missing Meta credentials in Keychain.');
  }

  return publishCarousel({
    slides: params.slides,
    caption: params.caption,
    instagramUserId,
    accessToken
  });
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
