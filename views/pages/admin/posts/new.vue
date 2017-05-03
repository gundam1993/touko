<template>
  <!-- <post-editor :post="post" submitUrl="/api/admin/post/new"></post-editor>  -->
  <div id="new-post-page">
    <v-card class="paper-block">
      <v-card-title class="pb-1">
        <v-text-field
          label="标题"
          hide-details
          v-model="post.title"
        ></v-text-field>
      </v-card-title>
      <v-card-text class='pt-0'>
        <markdownEditor 
          :rows="19"
          @contentChange="contentChange"></markdownEditor>
      </v-card-text>
      <v-divider />
      <v-card-row actions >
        <v-btn class="mr-3" default dark large>重置</v-btn>

        <v-btn  error dark large>发布</v-btn>
      </v-card-row>
    </v-card>
  </div>
</template>

<script>
  import markdownEditor from '~components/markdownEditor'
  export default {
    name: 'NewPostPage',
    layout: 'admin',
    head: () => ({
      title: '发表文章'
    }),
    data: () => ({
      post: {
        title: '',
        content: ''
      }
    }),
    components: {
      markdownEditor
    },
    methods: {
      contentChange (value) {
        this.post.content = value
      }
    }
  }
</script>

<style lang='scss' scoped>
  #new-post-page {
    padding: 1rem;
    height: 100%;
  }
</style>
