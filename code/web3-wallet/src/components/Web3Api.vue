<template>
  <div>高频API</div>
  <van-button type="primary" @click="createAccount">创建账户</van-button>
  <van-button type="primary" @click="toWeiFun">单位转化</van-button>
  <h1>账户信息</h1>
  <h4>地址：{{ web3Address }}</h4>
  <h4>余额：{{ web3Mount }}</h4>

  <h1>转账操作</h1>
  <van-divider></van-divider>
  <van-button type="primary" @click="transaction">开始转账</van-button>
</template>
<script setup>
import { ref } from "vue";
import Web3 from "web3";
import Tx from "ethereumjs-tx";

var web3 = new Web3(
  Web3.givenProvider ||
    "wss://goerli.infura.io/ws/v3/8b40e2a413d645de8b2501c99911b24d"
);
const web3Address = ref("0x8b877a4E06dc58eE3bd907989dBb1a40EB3eFdCa");
const privateKey = ref(
  "0f21487b5c4934b3e2d1028d71824bf96f1d44e055e5a24166219d9bbdeccd0f"
);
let web3Mount = ref(0);
//创建账户
const createAccount = () => {
  const account = web3.eth.accounts.create("123");
  console.log(account, "account");
  //返回 地址address、私钥privateKey
  web3Address.value = account.address;
  getMount(account.address);
};

// 余额获取
const getMount = (address) => {
  web3.eth.getBalance(address).then((mount) => {
    web3Mount.value = web3.utils.fromWei(mount, "ether");
    console.log(web3Mount.value, "余额");
  });
};
// getMount("0x8b877a4E06dc58eE3bd907989dBb1a40EB3eFdCa");

//单位转化
const toWeiFun = () => {
  // 1.Eth转为wei
  const num1 = Web3.utils.toWei("0.3");
  console.log(num1);
  const num2 = web3.utils.toWei("0.3");
  console.log(num2);
  // 2.wei转为Eth
  const num3 = web3.utils.fromWei("300000000000000000", "ether");
  console.log(num3);
};

//转账操作
const transaction = async () => {
  // 1.构建转账参数
  // 获取账户交易的次数
  const nonce = await web3.eth.getTransactionCount(web3Address.value);
  // 获取预计转账的gas（燃料费）
  const gasPrice = await web3.eth.getGasPrice();
  // 转账金额（以wei作为单位）
  const value = web3.utils.toWei("0.005");
  //交易对象
  const rawTx = {
    form: web3Address.value,
    nonce,
    gasPrice,
    to: "0x855B0741AA8a7938D125a373Efd6e9a0a09686F6",
    value,
    data: "0x0000",
  };

  // 2.生成编码 生成serializedTx
  //转化私钥
  const pKey = Buffer(privateKey.value, "hex");
  //gas估算
  const gas = await web3.eth.estimateGas(rawTx);
  rawTx.gas = gas;
  // ethereumjs-tx 实现私钥加密
  var tx = new Tx(rawTx);
  tx.sign(pKey);
  //生成serializedTx
  const serializedTx = "0x" + tx.serialize().toString("hex");
  // 3.开始转账
  const trans = web3.eth.sendSignedTransaction(serializedTx);
  trans.on("transactionHash", (txid) => {
    console.log(txid, "交易ID");
    console.log(`https://goerli.etherscan.io/tx/${txid}`);
  });
};
</script>
<style scoped></style>
