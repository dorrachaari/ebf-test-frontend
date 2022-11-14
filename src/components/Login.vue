<script>
import { loginUser } from "../auth-utils";

/**
 * Login component
 */
export default {
  page: {
    title: "Authentification",
    meta: [{ name: "description" }],
  },
  components: {},
  data() {
    return {
      username: "",
      password: "",
      authError: "Wrong username or password",
      isAuthError: false,
    };
  },
  methods: {
    /**
     * Login user with given details
     */
    loginUser() {
      loginUser(this.username, this.password).then((response) => {
        if (response) {
          this.$router.push({ path: "/" });
        }
      });
    },
  },
};
</script>

<template>
  <div id="auth-container" class="pt-1 d-xs-none">
    <div class="account-pages my-0 pt-0 my-sm-5 pt-sm-5">
      <div class="container">
        <div class="row justify-content-center d-xs-none" style="opacity: 0.9">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div
              class="card border-primary overflow-hidden"
              style="border: 2px solid"
            >
              <div class="bg-white">
                <div class="row text-center">
                  <div class="col-12 p-4 align-self-end">
                    <img
                      src="@/assets/images/ebf-logo-typography.png"
                      alt
                      class="img-fluid"
                    />
                  </div>
                </div>
              </div>

              <div class="card-body pt-3">
                <b-alert
                  v-model="isAuthError"
                  variant="danger"
                  class="mt-3"
                  dismissible
                  >{{ authError }}</b-alert
                >
  
                <b-form class="p-2" @submit.prevent="loginUser">
                  <b-form-group
                    id="input-group-1"
                    label="Username"
                    label-for="input-1"
                    label-class="mb-1 mr-2"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="username"
                      placeholder="Your username"
                      class="mb-4"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-2"
                    label="Password"
                    label-for="input-2"
                    label-class="mb-1 mr-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="password"
                      type="password"
                      placeholder="Your Password"
                      autocomplete="off"
                    ></b-form-input>
                  </b-form-group>
                  <div class="mt-5 text-center">
                    <b-button
                      type="submit"
                      variant="primary"
                      class="btn-block font-weight-bold font-size-16"
                      >Connect</b-button
                    >
                  </div>
                </b-form>
              </div>
              <!-- end card-body -->
            </div>
            <!-- end card -->

            <div
              class="mt-5 font-weight-bold font-size-16 text-light text-center"
            >
              <p>
                <a
                  href="https://ebf.com"
                  target="_blank"
                  style="color: #6ab96a"
                >
                  © {{ new Date().getFullYear() }} EBF.
                </a>
              </p>
            </div>
            <!-- end row -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
    </div>
  </div>
</template>

<style scoped>
@media all and (max-width: 400px) {
  #auth-container {
    background-image: url("~@/assets/images/background/back.jpg");
    height: 100%;
  }
}

@media all and (min-width: 401px) {
  #auth-container {
    background-image: url("~@/assets/images/background/back.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: local;
    height: 950px;
  }
}
</style>

