
export default {
  mode: 'universal',
  target: 'server',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],
  plugins: [
    { src: "~/plugins/google-maps", ssr: true },
  ],
  components: true,
  buildModules: [],
  modules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {
    //what ever options you may like
  },
  build: {
    transpile: [/^vue2-google-maps($|\/)/],
  },

}
