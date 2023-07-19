<template>
  <div class="accountList" id="accountList">
    <van-cell-group inset>
      <div v-for="d in walletArr" :key="d.id">
        <van-cell :title="`ID：${d.id}`" icon="shop-o">
          <template #right-icon>
            <van-icon name="search" class="search-icon" />
          </template>
        </van-cell>
        <van-cell
          :title="`hash地址：${d.newAddress}`"
          icon="shop-o"
          @click.stop="touchCopyAddress(d.address)"
        >
          <template #right-icon>
            <van-button size="small" @click.stop="seed(d)">转账</van-button>
          </template>
        </van-cell>
        <van-cell :title="`余额：${d.balance}ETH`" icon="shop-o">
          <template #right-icon>
            <van-icon name="search" class="search-icon" />
          </template>
        </van-cell>
      </div>
    </van-cell-group>
  </div>
  <van-dialog
    v-model:show="showDialog"
    title="标题"
    show-cancel-button
    @confirm="submitForm"
  >
    <van-form ref="formRef" :model="seedForm">
      <van-field
        v-model="seedForm.toAddress"
        :rules="toAddressRules"
        name="toAddress"
        label="转账地址"
        placeholder="转账地址"
      />
      <van-field
        v-model="seedForm.price"
        :rules="priceRules"
        name="price"
        label="转账金额"
        placeholder="转账金额"
      />
      <van-field
        v-model="seedForm.pwd"
        :rules="pwdRules"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
      />
    </van-form>
  </van-dialog>
  <!-- <ExportToWord element="accountList" filename="document">
    <button>click here to export</button>
  </ExportToWord> -->
</template>
<script setup>
import { ref, onMounted, beforeUnmount } from "vue";
import store2 from "store2";
import Web3 from "web3";
import ethwallet, { hdkey } from "ethereumjs-wallet";
import { showNotify } from "vant";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
import { ExportToWord } from "vue-doc-exporter";
const showDialog = ref(false);
const walletArr = ref();

const web3 = new Web3(
  Web3.givenProvider ||
    "wss://goerli.infura.io/ws/v3/8b40e2a413d645de8b2501c99911b24d"
);
onMounted(() => {
  walletArr.value = store2.get("walletInfo") || [];
  walletArr.value.forEach(async (item) => {
    item.newAddress =
      item.address.slice(0, 8) +
      "......" +
      item.address.slice(item.address.length - 8);
    const result = await web3.eth.getBalance(item.address);
    item.balance = web3.utils.fromWei(result, "ether");
  });
});

const touchCopyAddress = async (originalAddress) => {
  try {
    // 复制
    await toClipboard(originalAddress);
    showNotify({ type: "success", message: "复制成功" });
    // 复制成功
  } catch (e) {
    showNotify({ type: "danger", message: "复制失败" });
    // 复制失败
  }
};
const toAddressRules = [{ required: true, message: "请填写转账地址" }];
const priceRules = [{ required: true, message: "请填写转账金额" }];
const pwdRules = [{ required: true, message: "请填写密码" }];
const seedForm = ref({
  toAddress: "",
  price: "",
  pwd: "",
});
const formRef = ref(null);
const submitForm = async () => {
  formRef.value?.validate().then((valid) => {
    if (valid) {
      console.log("表单校验通过");
      // ...
    } else {
      // 表单校验不通过，提示错误信息
      console.log("表单校验不通过");
    }
  });
};
const seed = async (wallet) => {
  showDialog.value = true;
  return;
  let pass = window.prompt("请输入账户密码");
  let walletObj;
  try {
    walletObj = await ethwallet.fromV3(wallet.keystore, pass);
  } catch (err) {
    alert("密码错误");
    return false;
  }
  let key = walletObj.getPrivateKey().toString("hex");
  const privateKey = Buffer(key, "hex");
  const fromaddress = wallet.address;
  let nonce = await web3.eth.getTransactionCount(fromaddress);
  let gasPrice = await web3.eth.getGasPrice();
  //number转账金额
  let balance = await web3.utils.toWei(number);
};
</script>
<style scoped lang="scss"></style>
