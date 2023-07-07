<template>
  <div class="account-sys">
    <van-button type="primary" @click="getMnemonic">生成助记词</van-button>
    <van-button type="primary" @click="createKeypair">生成密钥对</van-button>
    <h1>助记词： {{ mnemonicStr }}</h1>
  </div>
</template>
<script setup>
import { ref } from "vue";
// import * as bip39 from "bip39";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import ethwallet, { hdkey } from "ethereumjs-wallet";
import Web3 from "web3";
const mnemonicStr = ref(
  "coyote mechanic fame garage gospel culture endorse truth march always oyster letter"
);
const addressStr = ref("0xe843bd9a53c7c0d31fa84c1a3af67aa4be9d209d");
const priKeyStr = ref(
  "2acb54f206fb5a407517f866452db61d05038737d6de47550b0dd826e2b6cce2"
);
const derivePath = ref("m/44'/60'/0'/0/0");
const getMnemonic = () => {
  //创建助记词
  const mnemonic = generateMnemonic();
  console.log(mnemonic, "助记词");
};
const createKeypair = async () => {
  //生成密钥对 keypair
  //首先生成一个种子
  const seed = await mnemonicToSeed(mnemonicStr.value);
  //分层钱包
  const hdWallet = hdkey.fromMasterSeed(seed);
  const keypair = hdWallet.derivePath(derivePath.value);
  //可以使用一个助记词 产生n多个账号
  //获取私钥
  //1.获取钱包对象
  const wallet = keypair.getWallet();
  //2.获取钱包地址
  const lowerCaseAddress = wallet.getAddressString();
  // console.log(lowerCaseAddress, "lowerCaseAddress");
  //3.获取钱包的校验地址(有的字母会大写)
  const checkAddress = wallet.getChecksumAddressString();
  //4.获取私钥
  const priKey = wallet.getPrivateKey().toString("hex");
  // console.log(priKey, "priKey");

  //导出keystore 两种方法
  // 1.web3js
  const web3 = new Web3(
    Web3.givenProvider ||
      "wss://goerli.infura.io/ws/v3/8b40e2a413d645de8b2501c99911b24d"
  );
  const keystore = web3.eth.accounts.encrypt(priKey, "111111");
  // console.log(JSON.parse(JSON.stringify(keystore)), "keystore");

  //2.wallet对象
  const keystore2 = await wallet.toV3("111111");
  // console.log(keystore2, "keystore2");

  //通过keystore获取私钥
  // 1.web3js
  const res = web3.eth.accounts.decrypt(keystore, "111111");
  // console.log(res.privateKey);
  // 2.wallet
  const wallet2 = await ethwallet.fromV3(keystore2, "111111");
  const key = wallet2.getPrivateKey().toString("hex");
  // console.log(key);

  // 通过私钥获取地址
  const priKey2 = Buffer(priKeyStr.value, "hex");
  const wallet3 = ethwallet.fromPrivateKey(priKey2);
  const lowerCaseAddress2 = wallet.getAddressString();
  console.log(priKey2, "priKey2");
  console.log(lowerCaseAddress2);
};
</script>
<style scoped></style>
