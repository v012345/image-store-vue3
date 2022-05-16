import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import SpeedDial from 'primevue/speeddial';
import Paginator from 'primevue/paginator';
import Galleria from 'primevue/galleria';
import FileUpload from 'primevue/fileupload';
import BlockUI from 'primevue/blockui';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Sidebar from 'primevue/sidebar';
import router from './router'

import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';


import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primeicons/primeicons.css'

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(router);

app.component('Dialog', Dialog);
app.component('Toast', Toast);
app.component('SpeedDial', SpeedDial);
app.component('Paginator', Paginator);
app.component('Galleria', Galleria);
app.component('FileUpload', FileUpload);
app.component('BlockUI', BlockUI);
app.component('ProgressSpinner', ProgressSpinner);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Toolbar', Toolbar);
app.component('Sidebar', Sidebar);

app.mount('#app')