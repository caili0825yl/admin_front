import Vue from 'vue'
import Router from 'vue-router'
import ListArticle from './views/article/ListArticle'
import CreateArticle from './views/article/CreateArticle'
import EditArticle from './views/article/EditArticle'
import UserList from './views/user/UserList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/articles/index'
    },
    {
      path: '/articles/index',
      component: ListArticle
    },
    {
      path: '/articles/create',
      component: CreateArticle
    },
    {
      path: '/articles/:id/edit',
      component: EditArticle
    },{
      path:'/users/index',
      component:UserList
    }
  ]
})
