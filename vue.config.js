const mode = process.env.NODE_ENV === 'production' ? '.min' : '';

const cdn = {
	css: [
        "https://cdn.jsdelivr.net/npm/vant@2.8/lib/index.css",
    ],
    js: [
        // vue
        `https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue${mode}.js`,
        // vue-router
        `https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router${mode}.js`,
        // vuex
        `https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex${mode}.js`,
        // axios
        `https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios${mode}.js`,
        // lodash
        `https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash${mode}.js`,
        // vant
        `https://cdn.jsdelivr.net/npm/vant@2.8/lib/vant${mode}.js`,

        `https://cdn.jsdelivr.net/npm/echarts@4.6.0/dist/echarts.simple.min.js`,
        `https://cdn.jsdelivr.net/npm/vue-echarts@4.0.2`,
	],
};

module.exports = {
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'lodash': '_',
            'vue-echarts': 'VueECharts',
            
        },
        
        
    },
    publicPath: '/economy/',
    outputDir: 'economy',
    productionSourceMap: false,
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/scss/variables.scss";`
            },
        },
    },
    chainWebpack: config => {
        config.plugin('html')
          .tap(args => {
            args[0].cdn = cdn
            return args
          })
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
    
};
