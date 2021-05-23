// This is used for admin dashboards only.
// For main routing please see app.js
import Dashboard from './Components/dashboard/Dashboard';
import Tournaments from './Components/dashboard/Tournaments';
import Stats from './Components/dashboard/Stats';
import Messages from './Components/dashboard/Messages';
import Profile from './Components/dashboard/Profile';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-components',
    component: Dashboard,
    layout: '/dashboard',
  },
  // {
  //   path: '/tournaments',
  //   name: 'Tournaments',
  //   component: Tournaments,
  //   icon: 'tim-icons icon-trophy',
  //   layout: '/dashboard',
  // },
  // {
  //   path: '/stats',
  //   name: 'Stats',
  //   icon: 'tim-icons icon-chart-bar-32',
  //   component: Stats,
  //   layout: '/dashboard',
  // },
  // {
  //   path: '/messages',
  //   name: 'Messages',
  //   icon: 'tim-icons icon-chat-33',
  //   component: Messages,
  //   layout: '/dashboard',
  // },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: Profile,
  //   icon: 'tim-icons icon-settings',
  //   layout: '/dashboard',
  // },
];

export default routes;
