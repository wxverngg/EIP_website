import { syncRssFeed } from '../src/lib/rss/rss-sync';

async function main() {
  console.log('🔄 Ejecutando sincronización inmediata desde el RSS de Soro AI hacia Supabase...');
  try {
    const result = await syncRssFeed();
    console.log('\n📊 Resultado de la sincronización:');
    console.log(' - Éxito:', result.success);
    console.log(' - Nuevos artículos importados:', result.newArticlesCount);
    console.log(' - Artículos omitidos (duplicados):', result.skippedArticlesCount);
  } catch (error) {
    console.error('❌ Error al ejecutar sincronización:', error);
  }
}

main();
