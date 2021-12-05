import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'

import 'reset-css'
import "@/assets/styles/global.css"

import App from './App.vue'

const app = createApp(App)

app.use(Notifications)

app.config.errorHandler = (e, vm) => vm.$notify({ type: 'error', text: e.message ?? 'An error occurred' })

app.mount('#app')
