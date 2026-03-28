export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/hsp-lounge-certified/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'HSP Lounge Certified | 繊細なあなたに、安心できる居場所を',
      meta: [
        { name: 'description', content: 'HSP（Highly Sensitive Person）の視点で26店舗のカフェ環境を科学的に評価。光・音・空間・接客など15基準で認定。' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Domine:wght@400;500;600;700&family=Literata:opsz,wght@7..72,400;7..72,500;7..72,700&family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@400;700;900&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0' },
      ],
    },
  },
})
