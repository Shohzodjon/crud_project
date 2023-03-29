import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://94.158.54.194:9092/api/'
const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
