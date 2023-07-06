<template>
  <Web3Api />
</template>
<script setup>
import { ref } from "vue";
import Web3Api from "../components/Web3Api.vue";
//实例化web3  npm i web3
import Web3 from "web3";
// "wss://goerli.infura.io/ws/v3/8b40e2a413d645de8b2501c99911b24d"  是从infura获取到的
var web3 = new Web3(
  Web3.givenProvider ||
    "wss://goerli.infura.io/ws/v3/8b40e2a413d645de8b2501c99911b24d"
);
</script>
<style scoped></style>
