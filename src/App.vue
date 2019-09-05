<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside
      width="200px"
      style="background-color: rgb(238, 241, 246)"
    >
      <el-menu
        router
        :default-active='$route.path'
      >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-tickets"></i>文章管理</template>
          <el-menu-item index='/articles/index'>文章列表</el-menu-item>
          <el-menu-item index='/articles/create'>新建文章</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-tickets"></i>用户管理</template>
          <el-menu-item index='/users/index'>用户列表</el-menu-item>
        </el-submenu>
      </el-menu>

    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">

        <i
          class="el-icon-user-solid"
          style="margin-right: 15px"
        ></i>

        <span>管理员</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.w-e-text-container{
  height: 600px !important;
}
</style>
