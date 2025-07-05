import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'bulma/css/bulma.min.css'
import './style.css'

import router from './router/router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
