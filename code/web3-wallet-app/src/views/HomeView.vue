<template>
  <div class="home">
    <div class="wrap">
    <div class="login"></div>
  </div>
  </div>
</template>



<style lang="scss">
body {
  // padding: 10px;
  padding: 0;
  margin: 0;
}
.wrap{
  width: 100vw;
  height: 100vh;
  background-image: url('https://uccn.zhichubao.com/image/demo/beijingtu.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  .login{
    width: 400px;
    height: 600px;
    box-shadow: 0px 2px 10px #ff0;
    position: fixed;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>