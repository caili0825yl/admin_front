<template>
  <div>
    <el-cascader
      @change="handleChange"
      :options="options"
      :show-all-levels="false"
      v-model="value"
    ></el-cascader>
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

    <el-table :data="articles">
      <el-table-column
        prop="time"
        label="日期"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
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
      articles: [],
      size: 0,
      value: [],
      type: "",
      total: 0,
      page: 1,
      resultPage:1,
      search:"",
      options: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "1",
          label: "站长随笔"
        },
        {
          label: "动画",
          children: [
            {
              value: "2-1",
              label: "文章"
            },
            {
              value: "2-2",
              label: "TV资源"
            },
            {
              value: "2-3",
              label: "OVA资源"
            },
            {
              value: "2-4",
              label: "剧场版资源"
            }
          ]
        },
        {
          label: "轻小说",
          children: [
            {
              value: "3-1",
              label: "文章"
            },

            {
              value: "3-2",
              label: "资源"
            }
          ]
        },
        {
          label: "游戏",
          children: [
            {
              value: "4-1",
              label: "文章"
            },
            {
              label: "掌机资源",
              children: [
                {
                  label: "GBA",
                  value: "4-2-1"
                },
                {
                  value: "4-2-2",
                  label: "NDS"
                },
                {
                  value: "4-2-3",
                  label: "3DS"
                },
                {
                  value: "4-2-4",
                  label: "PSP"
                },
                {
                  value: "4-2-5",
                  label: "PSV"
                }
              ]
            },
            {
              label: "主机资源",
              children: [
                {
                  label: "NGC",
                  value: "4-3-1"
                },
                {
                  value: "4-3-2",
                  label: "PS2"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {
    this.value = ["all"];
    this.type = "all";
    this.fetch();
  },
  methods: {
    fetch() {
      this.$http
        .get(`article?page=` + this.page + `&type=` + this.type)
        .then(res => {
          this.articles = res.data.articles;
          this.total = res.data.count;
          this.size = res.data.size;
        });
    },
    edit(id) {
      this.$router.replace(`/articles/${id}/edit`);
    },
    remove(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$http.delete(`article/${id}`).then(res => {
            if (res.status === 200) {
              this.$message({
                message: "文章删除成功",
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
      this.$http
        .get(`article?page=` + +this.page + `&type=` + this.type)
        .then(res => {
          this.articles = res.data.articles;
          this.total = res.data.count;
          this.size = res.data.size;
        });
    },
    handleChange(value) {
      this.type = value[value.length - 1];
    },
    searchResult(){
      if (this.search === "" || this.search.split(" ").join("").length === 0) {
         return
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
  },
  watch: {
    type: function(newVal, oldVal) {
      this.page = 1;
      this.$http
        .get(`article?page=` + this.page + `&type=` + this.type)
        .then(res => {
          this.articles = res.data.articles;
          this.total = res.data.count;
          this.size = res.data.size;
        });
    }
  }
};
</script>
