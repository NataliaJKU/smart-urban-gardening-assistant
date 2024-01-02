import {defineNuxtPlugin} from 'nuxt/app'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import OverlayPanel from 'primevue/overlaypanel'
import MultiSelect from 'primevue/multiselect'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Message from 'primevue/message'
import ConfirmPopup from 'primevue/confirmpopup'
import ConfirmationService from 'primevue/confirmationservice'
import Tag from 'primevue/tag'
import Dialog from 'primevue/dialog'
import CountryFlag from 'vue-country-flag-next'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.css'
library.add(fas)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue).use(ConfirmationService)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('InputText', InputText)
    .component('Password', Password)
    .component('Button', Button)
    .component('OverlayPanel', OverlayPanel)
    .component('MultiSelect', MultiSelect)
    .component('DataTable', DataTable)
    .component('Column', Column)
    .component('Message', Message)
    .component('ConfirmPopup', ConfirmPopup)
    .component('Tag', Tag)
    .component('Dialog', Dialog)
    .component('CountryFlag', CountryFlag)
})