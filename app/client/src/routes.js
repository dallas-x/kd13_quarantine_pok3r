// This is used for admin dashboards only.
// For main routing please see app.js

const routes = [
  {
    path: '/users',
    name: 'Users',
    icon: 'tim-icons icon-chart-pie-36',
    component: Users,
    layout: '/admin',
  },
  {
    path: '/cashGames',
    name: 'Cash Games',
    icon: 'tim-icons icon-chart-pie-36',
    component: CashGame,
    layout: '/admin',
  },
  {
    path: '/tournaments',
    name: 'Tournaments',
    icon: 'tim-icons icon-chart-pie-36',
    component: Tournaments,
    layout: '/admin',
  },
  {
    path: '/bob',
    name: 'Bob',
    icon: 'tim-icons icon-chart-pie-36',
    component: Bob,
    layout: '/admin',
  },
  {
    path: '/cashHand',
    name: 'Cash Hand',
    icon: 'tim-icons icon-chart-pie-36',
    component: CashHand,
    layout: '/admin',
  },
  {
    path: '/stats',
    name: 'Stats',
    icon: 'tim-icons icon-chart-pie-36',
    component: Stats,
    layout: '/admin',
  },
  {
    path: '/seasons',
    name: 'Seasons',
    icon: 'tim-icons icon-chart-pie-36',
    component: Seasons,
    layout: '/admin',
  },
  {
    path: '/messages',
    name: 'Messages',
    icon: 'tim-icons icon-chart-pie-36',
    component: Messages,
    layout: '/admin',
  },
  {
    path: '/settings',
    name: 'settings',
    icon: 'tim-icons icon-chart-pie-36',
    component: Settings,
    layout: '/admin',
  },
];

export default routes;
