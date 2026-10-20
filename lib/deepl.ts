export function deeplConfigured() {
  return Boolean(process.env.DEEPL_API_KEY);
}

function deeplEndpoint() {
  const key = process.env.DEEPL_API_KEY ?? '';
  const free = key.endsWith(':fx') || process.env.DEEPL_FREE === '1';
  return free ? 'https://api-free.deepl.com/v2/translate' : 'https://api.deepl.com/v2/translate';
}

export async function translateFr(text: string, target: 'DE' | 'EN') {
  const key = process.env.DEEPL_API_KEY;
  if (!key) {
    throw new Error('DEEPL_API_KEY manquant. Renseignez la clé ou saisissez DE/EN à la main.');
  }

  const body = new URLSearchParams();
  body.set('text', text);
  body.set('source_lang', 'FR');
  body.set('target_lang', target === 'EN' ? 'EN-GB' : 'DE');

  const res = await fetch(deeplEndpoint(), {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const data = (await res.json()) as {
    translations?: {text: string}[];
    message?: string;
  };

  if (!res.ok || !data.translations?.[0]?.text) {
    throw new Error(data.message ?? 'Traduction DeepL impossible.');
  }

  return data.translations[0].text;
}
