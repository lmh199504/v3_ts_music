import { createApp } from 'vue'
import { createPinia } from 'pinia'  //导入pinia
import App from './App.vue'
import router from './router'
import vant from '@/vant'
import '@/assets/styles/global.less'
import '@/assets/iconfont/iconfont.css'
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(vant)
app.mount('#app')
