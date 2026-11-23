import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '~/data/site';
import { postUrl, type Lang } from '~/i18n/ui';

export async function feed(context: APIContext, lang: Lang) {
  const posts = (await getCollection('journal', (e) => e.id.startsWith(`${lang}/`) && !e.data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return rss({
    title: `${SITE.name} — ${lang === 'tr' ? 'Günlük' : 'Journal'}`,
    description: lang === 'tr' ? 'DEMİRCE Mimarlık ofisinden haberler ve notlar' : 'News and notes from DEMİRCE Architects',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: postUrl(p.id.split('/')[1], lang),
      categories: p.data.tags,
    })),
    customData: `<language>${lang === 'tr' ? 'tr-TR' : 'en-GB'}</language>`,
  });
}

