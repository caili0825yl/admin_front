<template>
  <div>
    <div style="margin:2% auto">
      <el-input
        placeholder="请输入搜索内容"
        class="input-with-select"
        v-model="search"
        style="width:30%"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchResult"
        ></el-button>
      </el-input>
    </div>

    <el-table :data="users">
      <el-table-column
        label="头像"
        width="200"
      >
        <template slot-scope="scope">

          <el-image
            :src=scope.row.avatar
            :fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row._id)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button
            @click="remove(scope.row._id)"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:5%;text-align:center">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page=true
      >
      </el-pagination>
    </div>
  </div>
</template>



<style>
</style>

<script>
export default {
  data() {
    return {
      users: [],
      size: 0,
      value: [],
      total: 0,
      page: 1,
      fit: "scale-down",
      search:""
    };
  },
  created() {
    this.value = ["all"];
    this.type = "all";
    this.fetch();
  },
  methods: {
    fetch() {
      this.$http.get(`user/users/?page=` + this.page).then(res => {
        this.users = res.data.users;
        this.total = res.data.count;
        this.size = res.data.size;
      });
    },
    edit(id) {
      this.$router.replace(`user/users/${id}/edit`);
    },
    remove(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$http.delete(`user/users/${id}`).then(res => {
            if (res.status === 200) {
              this.$message({
                message: "用户删除成功",
                type: "success"
              });
              this.fetch();
            } else {
              this.$message({
                message: "系统繁忙",
                type: "warning"
              });
            }
          });
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.$http.get(`user/users/?page=` + this.page).then(res => {
        this.users = res.data.users;
        this.total = res.data.count;
        this.size = res.data.size;
      });
    },
    searchResult() {
      if (this.search === "" || this.search.split(" ").join("").length === 0) {
        return;
      }
      this.$http
        .get(
          `article/search/result?search=` +
            this.search +
            `&page=` +
            this.resultPage
        )
        .then(res => {
          this.articles = res.data.articles;
          this.total = res.data.count;
          this.size = res.data.size;
        });
    }
  }
};
</script>
