import { contextBridge, ipcRenderer } from 'electron';
import type { DalleParams, GptParams, PublishParams } from '../src/types';

contextBridge.exposeInMainWorld('electronAPI', {
  getSecret: (key: string) => ipcRenderer.invoke('keychain:get', key),
  setSecret: (key: string, value: string) => ipcRenderer.invoke('keychain:set', key, value),
  deleteSecret: (key: string) => ipcRenderer.invoke('keychain:delete', key),
  generateContent: (params: GptParams) => ipcRenderer.invoke('openai:generate', params),
  generateImage: (params: DalleParams) => ipcRenderer.invoke('openai:image', params),
  scrapeInstagram: (url: string) => ipcRenderer.invoke('apify:scrape', url),
  publishCarousel: (params: PublishParams) => ipcRenderer.invoke('meta:publish', params),
  openFilePicker: (options: Electron.OpenDialogOptions) => ipcRenderer.invoke('fs:openFile', options)
});
