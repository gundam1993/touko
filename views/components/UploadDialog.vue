<template>
  <v-dialog v-model="show" width="60%">
    <v-card>
      <v-card-title>上传图片</v-card-title>
      <v-card-row>
        <div class="upload-block">
          <div class="upload-button">
            <v-icon class="upload-icon">file_upload</v-icon>
          </div>

        </div>
      </v-card-row>
      <v-divider></v-divider>
      <v-card-row actions>
        <v-spacer></v-spacer>
        <v-btn flat v-on:click.native="show = false" class="primary--text">取消</v-btn>
        <v-btn flat v-on:click.native="" class="primary--text">确认</v-btn>
      </v-card-row>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'UploadDialog',
    data: () => ({
      show: this.display
    }),
    props: {
      display: {
        type: Boolean,
        default: false
      },
      token: [String, Number],
      policy: [String, Number]
    },
    watch: {
      show (newVal, oldVal) {
        if (newVal === false) {
          this.$emit('displayOff')
        }
      },
      display (newVal, oldVal) {
        if (newVal === true) {
          this.show = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload-block {
    height: 400px;
    width: 100%;
    padding: 0 1rem 1rem 1rem;

    .upload-button {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      border: 0.5rem rgba(0, 0, 0, 0.5) dashed;
      text-align: center;
      cursor: pointer;

      .upload-icon {
        font-size: 10rem;
        margin-top: 10%;
      }
    }
  }
</style>
