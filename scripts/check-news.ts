import { getHomeNewsFromSupabase, getAllArticlesFromSupabase } from '../src/lib/news';

async function check() {
  const homeArticles = await getHomeNewsFromSupabase();
  const allArticles = await getAllArticlesFromSupabase();

  console.log(`📌 Noticias en Home (Total: ${homeArticles.length}):`);
  homeArticles.forEach((a, i) => console.log(` ${i+1}. [${a.category}] ${a.title} (${a.date})`));

  console.log(`\n📰 Historial completo en /news (Total: ${allArticles.length}):`);
  allArticles.forEach((a, i) => console.log(` ${i+1}. [${a.category}] ${a.title} (${a.date})`));
}

check();
