// routes.js 
 
export const routes = {
  activate: { locale: "activate", route: "/activate" },
  dashboard: { locale: "dashboard", route: "/dashboard" },
  faqs: { locale: "faqs", route: "/faqs" },
  home: { locale: "home", route: "" },
  login: { locale: "login", route: "/login" },
  profile: { locale: "profile", route: "/profile" },
  register: { locale: "register", route: "/register" },
  recover: { locale: "recover", route: "/recover" },
  reset_password: { locale: "reset_password", route: "/reset_password" },
  resort: { locale: "resort", route: "/resort" },
  terms: { locale: "terms", route: "/terms" },
  privacy: { locale: "privacy", route: "/privacy" },
  booking: { locale: "booking", route: "/booking" },
  movements: { locale: "movements", route: "/movements" },
  balance: { locale: "balance", route: "/balance" },
  destination: { locale: "destination", route: "/destination" },
  accumulate: { locale: "accumulate", route: "/accumulate" },
  about: { locale: "about", route: "/about" }
}

export const protectedRoutes = [routes.profile.route, routes.movements.route, routes.booking.route]
export const authRoutes = [routes.login.route]
export const publicRoutes = [
  routes.home.route,
  routes.terms.route,
  routes.privacy.route,
  routes.dashboard.route,
  routes.resort.route,
  routes.faqs.route,
  routes.about.route,
  routes.accumulate.route,
  routes.destination.route
]
