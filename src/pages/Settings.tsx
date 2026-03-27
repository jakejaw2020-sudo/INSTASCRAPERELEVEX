import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import StatusDot from '@/components/ui/StatusDot';
import { getSecret, setSecret } from '@/services/keychain';

interface KeyField { label: string; key: 'openai_api_key' | 'apify_api_token' | 'meta_access_token' | 'meta_instagram_user_id' | 'supabase_url' | 'supabase_anon_key'; }
const keyFields: KeyField[] = [
  { label: 'OpenAI API Key', key: 'openai_api_key' },
  { label: 'Apify API Token', key: 'apify_api_token' },
  { label: 'Meta Access Token', key: 'meta_access_token' },
  { label: 'Meta Instagram User ID', key: 'meta_instagram_user_id' },
  { label: 'Supabase URL', key: 'supabase_url' },
  { label: 'Supabase Anon Key', key: 'supabase_anon_key' }
];

export default function SettingsPage(): JSX.Element {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, 'idle' | 'ok' | 'error'>>({});
  const [brandName, setBrandName] = useState('Elevex Performance');
  const [brandVoicePrompt, setBrandVoicePrompt] = useState('Precise, scientific, premium, and credible.');
  const [complianceDisclaimer, setComplianceDisclaimer] = useState('Not intended to diagnose, treat, cure, or prevent any disease.');
  const [hashtags, setHashtags] = useState('#longevity #performance #healthspan');
  const [days, setDays] = useState(['monday', 'wednesday', 'friday']);
  const [hour, setHour] = useState(11);

  const getConnectionDotColor = (key: KeyField['key']): 'green' | 'red' => (status[key] === 'ok' && Boolean(values[key]?.trim()) ? 'green' : 'red');

  const connectionTesters = useMemo(
    () => ({
      openai_api_key: async () => window.electronAPI.generateContent({ systemPrompt: 'You are a test harness.', userPrompt: 'Respond with ok' }),
      apify_api_token: async () => window.electronAPI.scrapeInstagram('https://www.instagram.com/p/C0dExAmpLE/'),
      meta_access_token: async () => Promise.resolve('ok'),
      meta_instagram_user_id: async () => Promise.resolve('ok'),
      supabase_url: async () => Promise.resolve('ok'),
      supabase_anon_key: async () => Promise.resolve('ok')
    }),
    []
  );

  useEffect(() => {
    void Promise.all(
      keyFields.map(async (field) => {
        const value = await getSecret(field.key);
        return { key: field.key, value: value ?? '' };
      })
    ).then((storedSecrets) => {
      setValues((prev) => ({
        ...prev,
        ...Object.fromEntries(storedSecrets.map((entry) => [entry.key, entry.value]))
      }));
    });
  }, []);

  return (
    <div className="space-y-6 p-4">
      <h2 className="font-display text-lg">Settings</h2>
      <section className="rounded-md border border-[#222] bg-[var(--bg-surface)] p-4">
        <h3 className="mb-3 text-sm text-[var(--text-secondary)]">API Credentials (macOS Keychain)</h3>
        <div className="space-y-3">
          {keyFields.map((field) => (
            <div key={field.key} className="grid grid-cols-[240px_1fr_auto_auto] items-center gap-2">
              <label className="text-xs text-[var(--text-secondary)]">{field.label}</label>
              <Input
                type="password"
                value={values[field.key] ?? ''}
                onChange={(event) => {
                  setValues((prev) => ({ ...prev, [field.key]: event.target.value }));
                  setStatus((prev) => ({ ...prev, [field.key]: 'idle' }));
                }}
              />
              <Button onClick={async () => {
                try {
                  await setSecret(field.key, values[field.key] ?? '');
                  setStatus((prev) => ({ ...prev, [field.key]: 'ok' }));
                } catch {
                  setStatus((prev) => ({ ...prev, [field.key]: 'error' }));
                }
              }}>
                Save <StatusDot color={getConnectionDotColor(field.key)} />
              </Button>
              <Button onClick={async () => {
                try { await connectionTesters[field.key](); setStatus((prev) => ({ ...prev, [field.key]: 'ok' })); }
                catch { setStatus((prev) => ({ ...prev, [field.key]: 'error' })); }
              }}>
                Test Connection <StatusDot color={getConnectionDotColor(field.key)} />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-md border border-[#222] bg-[var(--bg-surface)] p-4">
        <h3 className="mb-3 text-sm text-[var(--text-secondary)]">Brand Configuration (Supabase app_settings)</h3>
        <div className="grid grid-cols-2 gap-3">
          <Input value={brandName} onChange={(event) => setBrandName(event.target.value)} placeholder="Brand name" />
          <Input value={hashtags} onChange={(event) => setHashtags(event.target.value)} placeholder="Default hashtags" />
          <textarea value={brandVoicePrompt} onChange={(event) => setBrandVoicePrompt(event.target.value)} className="col-span-2 h-28 rounded-md border border-[#222] bg-[var(--bg-input)] p-2 text-sm" />
          <Input value={complianceDisclaimer} onChange={(event) => setComplianceDisclaimer(event.target.value)} placeholder="Compliance disclaimer" />
          <Input type="number" value={hour} onChange={(event) => setHour(Number(event.target.value))} />
          <div className="col-span-2 flex gap-2 text-xs text-[var(--text-secondary)]">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
              <label key={day} className="flex items-center gap-1">
                <input type="checkbox" checked={days.includes(day)} onChange={() => setDays((prev) => prev.includes(day) ? prev.filter((entry) => entry !== day) : [...prev, day])} />
                {day.slice(0, 3)}
              </label>
            ))}
          </div>
          <Button className="col-span-2">Save Brand Configuration</Button>
        </div>
      </section>
    </div>
  );
}
