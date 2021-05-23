// This is used for admin dashboards only.
// For main routing please see app.js
import Dashboard from './Components/Admin/Dashboard';
import Users from './Components/Admin/Users';
import Bob from './Components/Admin/Bob';
import CashGames from './Components/Admin/CashGames';
import Tournaments from './Components/Admin/Tournaments';
import Stats from './Components/Admin/Stats';
import CashHand from './Components/Admin/CashHand';
import Seasons from './Components/Admin/Seasons';
import Messages from './Components/Admin/Messages';
import Settings from './Components/Admin/Settings';
import UploadData from './Components/Admin/UploadData';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-components',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'tim-icons icon-badge',
    component: Users,
    layout: '/admin',
  },
  {
    path: '/cashGames',
    name: 'Cash Games',
    icon: 'tim-icons icon-money-coins',
    component: CashGames,
    layout: '/admin',
  },
  {
    path: '/tournaments',
    name: 'Tournaments',
    component: Tournaments,
    icon: 'tim-icons icon-trophy',
    layout: '/admin',
  },
  {
    path: '/bob',
    name: 'Bob',
    icon: 'tim-icons icon-bold',
    component: Bob,
    layout: '/admin',
  },
  {
    path: '/cashHand',
    name: 'Cash Hand',
    icon: 'tim-icons icon-tie-bow',
    component: CashHand,
    layout: '/admin',
  },
  {
    path: '/stats',
    name: 'Stats',
    icon: 'tim-icons icon-chart-bar-32',
    component: Stats,
    layout: '/admin',
  },
  {
    path: '/seasons',
    name: 'Seasons',
    icon: 'tim-icons icon-controller',
    component: Seasons,
    layout: '/admin',
  },
  {
    path: '/messages',
    name: 'Messages',
    icon: 'tim-icons icon-chat-33',
    component: Messages,
    layout: '/admin',
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    icon: 'tim-icons icon-settings',
    layout: '/admin',
  },
  {
    path: '/upload',
    name: 'Upload Data',
    component: UploadData,
    icon: 'tim-icons icon-cloud-upload-94',
    layout: '/admin',
  },
];

export default routes;
