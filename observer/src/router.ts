import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/colors",
      name: "colors",
      component: () =>
        import(/* webpackChunkName: "colors" */ "./views/Colors.vue")
    }
  ]
});
