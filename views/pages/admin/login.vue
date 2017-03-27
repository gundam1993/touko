<template>
  <div id="login-page">
    <v-container fluid class="login-page">
      <v-row>
        <v-col xs4 class="login-block">
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
                <v-row>
                  <v-text-field v-model="form.username" refs="username_input" label="用户名" single-line prepend-icon="account_circle" :rules="username_rules" required></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="form.password" name="password-input" label="密码" type="password" single-line prepend-icon="vpn_key" :rules="password_rules" required></v-text-field>
                </v-row>
                <v-row class="login-button-area">
                  <v-btn error v-bind:loading="loading"  v-on:click.native="login"  v-bind:disabled="loading">登录</v-btn>
                  <v-btn secondary v-on:click.native="cleanForm">重置</v-btn>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>  
</template>

<script>
import axios from 'axios'
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
  methods: {
    login () {
      this.loading = true
      var info = {
        name: this.form.username,
        password: this.form.password
      }
      axios.post('/admin/signin', info)
        .then((res) => {
          this.loading = false
          if (res.data.code === 1) {
            this.loginSuccess(res.data)
          } else {
            this.loginFail(res.data)
          }
        }
      )
    },
    loginSuccess (res) {
      let sessionData = JSON.stringify(res.data)
      sessionStorage.setItem('blog-login-info', sessionData)
      this.$router.push('/admin')
    },
    loginFail (data) {
      console.log(data)
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
