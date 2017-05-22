<template>
  <div id="login-page">
    <v-container fluid class="login-page">
      <v-layout>
        <v-flex xs4 class="login-block">
          <v-card>
            <v-card-row class="grey darken-3">
              <v-card-title>
                <span class="white--text">登录</span>
              </v-card-title>
            </v-card-row>
            <v-card-row v-if="alerts">
              <v-alert error v-model="alerts" dismissible class="alerts">
                {{loginMessage}}
              </v-alert>
            </v-card-row>
            <v-card-text>
              <v-container fluid class="login-form">
                <v-text-field v-model="form.username" refs="username_input" label="用户名" single-line prepend-icon="account_circle" :rules="username_rules" required></v-text-field>
                <v-text-field v-model="form.password" name="password-input" label="密码" type="password" single-line prepend-icon="vpn_key" :rules="password_rules" @keyup.enter.native="login" required></v-text-field>
                <div class="login-button-area">
                  <v-btn class="white--text" error v-bind:loading="loading"  v-on:click.native="login"  v-bind:disabled="loading">登录</v-btn>
                  <v-btn class="white--text" secondary v-on:click.native="cleanForm">重置</v-btn>
                </div>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>  
</template>

<script>
import axios from 'axios'
import md5 from 'md5'
export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      token: '',
      loading: false,
      loginMessage: '',
      username_rules: [],
      password_rules: [],
      alerts: false,
      timeout: 2000
    }
  },
  head: () => ({
    title: '登录'
  }),
  methods: {
    login () {
      this.loading = true
      axios.post('/admin/login', {
        username: this.form.username,
        password: md5(this.form.password)
      })
        .then((res) => {
          this.loading = false
          if (res.data.success === 1) {
            this.loginSuccess(res.data)
          } else {
            this.loginFail(res.data)
          }
        }
      )
    },
    loginSuccess (res) {
      this.$router.push('/admin')
    },
    loginFail (data) {
      this.loginMessage = data.desc
      this.form.password = ''
      this.alerts = true
    },
    cleanForm () {
      this.form.username = ''
      this.form.password = ''
      this.token = ''
    },
    hideSnackbar () {
      this.snackbar = false
    }
  }
}
</script>

<style lang='scss' scoped>
  #login-page {
    height: 100%;
    width: 100%;
    background-color: #fff;
  }
  .login-page {
    height: 100%;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;

    div {
      width: 100%;
      text-align: center;
    }
  }
  .login-block {
    margin: auto;
  }
  
  .login-form {
    padding: 1rem;
  }
  .login-button-area {
    text-align: center;
    justify-content: center;

    button {
      margin: 0 10px;
    }
  }
  .alerts {
    margin: 0;
  }
</style>
