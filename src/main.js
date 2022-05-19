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
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Skeleton from 'primevue/skeleton';
import ProgressBar from 'primevue/progressbar';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Chip from 'primevue/chip';
import Menu from 'primevue/menu';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import router from './router'
import store from "./store";

import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';


import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.use(store);
app.use(ConfirmationService);

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
app.component('DataView', DataView);
app.component('Dropdown', Dropdown);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('Skeleton', Skeleton);
app.component('ProgressBar', ProgressBar);
app.component('Divider', Divider);
app.component('Card', Card);
app.component('Chip', Chip);
app.component('Menu', Menu);
app.component('ConfirmPopup', ConfirmPopup);


app.mount('#app')