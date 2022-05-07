import { createApp } from 'vue'
import { createPinia } from 'pinia'  //导入pinia
import App from './App.vue'
import router from './router'
import vant from '@/vant'
import '@/assets/styles/global.less'
import '@/assets/iconfont/iconfont.css'

// import SwiperClass, { /* swiper modules... */ } from 'swiper'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// // import swiper module styles
// import 'swiper/css'
// // more module style...
// // use swiper modules
// SwiperClass.use([/* swiper modules... */])



const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(vant)
// app.use(VueAwesomeSwiper)
app.mount('#app')
