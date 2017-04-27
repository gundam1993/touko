<template>
  <post-editor :post="post" submitUrl="/api/admin/post/new"></post-editor> 
</template>

<script>
  import postEditor from '~components/PostEditor'
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
      postEditor
    }
  }
</script>
