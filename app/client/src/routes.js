// This is used for admin dashboards only.
// For main routing please see app.js
import Users from './Components/admin/Users';
import Bob from './Components/admin/Bob';
import CashGames from './Components/admin/CashGames';
import Tournaments from './Components/admin/Tournaments';
import Stats from './Components/admin/Stats';
import CashHand from './Components/admin/CashHand';
import Seasons from './Components/admin/Seasons';
import Messages from './Components/admin/Messages';
import Settings from './Components/admin/Settings';
import UploadData from './Components/admin/UploadData';

const routes = [
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
    icon: 'tim-icons icon-send',
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
    name: 'UploadData',
    component: UploadData,
    icon: 'tim-icons icon-settings',
    layout: '/admin',
  },
];

export default routes;
