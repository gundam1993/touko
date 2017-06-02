<template>
  <div id="Photography">
    <div class="photo-preview" @click="nextPhoto">
      <transition name="fade" v-on:after-leave="photoDisplay = true">
        <img v-if="photoDisplay" :src="`http://touko-blog-photo.b0.upaiyun.com/${photos[photoIndex].name}!photography`">
      </transition>
    </div>
    <div class="photo-list">
      <div class="photo-thumbnails" v-for="(photo, index) in photos" @click="photoChoose(index)">
        <div class="photo-mask" v-if="photoIndex !== index"></div>
        <img :src="`http://touko-blog-photo.b0.upaiyun.com/${photo.name}!thumbnails`">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Photography',
    data: () => ({
      photoIndex: 0,
      photoDisplay: true
    }),
    props: {
      photos: {
        type: Array
      }
    },
    methods: {
      nextPhoto () {
        this.photoDisplay = false
        if (this.photoIndex < this.photos.length - 1) {
          this.photoIndex ++
        } else {
          this.photoIndex = 0
        }
      },
      photoChoose (index) {
        this.photoDisplay = false
        this.photoIndex = index
      }
    }
  }
</script>

<style lang='scss' scoped>
  #Photography {
    width: 100%;

    .photo-preview {
      width: 100%;
      height: 500px;
      text-align: center;
      margin-bottom: 1rem;


      img {
        max-width: 100%;
        vertical-align: center;
      }
    }

    .photo-list {
      width: 100%;
      text-align: center;

      .photo-thumbnails {
        display: inline-block;
        position: relative;
        height: 50px;
        margin: 0 5px;
        cursor: pointer;

        .photo-mask {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(255, 255, 255, 0.5);
          z-index: 10;
        }

        img {
          height: 100%;
        }
      }
    }
  }
</style>
