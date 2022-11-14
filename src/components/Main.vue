<script>
import { logout } from "../auth-utils";

export default {
mounted() {
    this.userName=sessionStorage.getItem('username')
    this.companyName=sessionStorage.getItem('companyName')
  },

  data(){
      return {
          userName : null,
          companyName : null
      }
  },

  methods:{
    logout() {
      logout().then(() => {
        this.$router.push({ path: "/login" });
      });
    },
  }
}
</script>

<template>
<div>
  <vue-snotify></vue-snotify>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand style="margin-left:30px" href="#">{{companyName}} Portal</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ms-auto">

        <b-nav-item-dropdown right  style="margin-right:30px">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            {{userName}} 
          </template>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>