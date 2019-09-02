<template>
    <h1 @click="logIn()">
        登录
    </h1>
</template>


<script>
export default {
  data() {
    return {

    };
  },

  methods: {
    // 退出登录
    logIn() {
      this.$router.push("/Home");
    }
  }
};
</script>