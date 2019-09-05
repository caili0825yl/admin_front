<template>

  <el-form
    ref="form"
    :model="article"
    label-width="100px"
  >
    <el-form-item label="文章标题：">
      <el-input v-model="article.title"></el-input>
    </el-form-item>

    <el-form-item label="文章类别：">
      <el-cascader
        @change="handleChange"
        :options="options"
        :show-all-levels="false"
      ></el-cascader>
    </el-form-item>

    <span>是否资源？</span>
    <el-radio
      v-model="article.resource"
      :label=true
    >是</el-radio>
    <el-radio
      v-model="article.resource"
      :label=false
    >否</el-radio>

    <el-form-item
      label="资源地址："
      style="margin-top:10px"
      v-if="article.resource"
    >
      <el-input v-model="article.resUrl" style="width:50%"></el-input>
    </el-form-item>
    <el-form-item
      label="提取码："
      style="margin-top:10px"
      v-if="article.resource"
    >
      <el-input v-model="article.code" style="width:10%"></el-input>
    </el-form-item>
    <el-form-item
      label="文章内容："
      style="margin-top:15%"
    >
      <editor
        v-model="article.body"
        :content="article.body"
        @on-change="change"
      ></editor>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
         @click="saveArticle"
      >立即创建</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import editor from "../../components/Editor";
export default {
  components: {
    editor
  },
  data() {
    return {
      article: {
        title: "",
        body: "",
        type: "",
        resource:false,
        code:"",
        resUrl:""
      },
    
      options: [
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
      ],
      value: ""
    };
  },
  methods: {
    saveArticle() {
      this.$http.post("article", this.article).then(res => {
        this.$message({
          message: "文章创建成功",
          type: "success"
        });
        this.$router.push("/articles/index");
      });
    },
    change(data) {
      this.article.body = data;
    },
    handleChange(value) {
      this.article.type = value[value.length - 1];
    }
  }
};
</script>