<template>
  <van-space>
    <van-button type="primary" @click="createWallet">创建钱包</van-button>
    <van-button type="primary">导入钱包</van-button>
  </van-space>
  <template v-if="showMn">
    <p class="mnemonic_systems">{{ mnemonic }}</p>
    <van-button size="small" @click="confirmSaveMnemonic"
      >我已经保存</van-button
    >
  </template>
  <van-dialog
    v-model:show="show"
    title="请输入密码"
    show-cancel-button
    @confirm="confirmPwd"
  >
    <van-cell-group inset>
      <van-field
        v-model="password"
        label="密码"
        placeholder="请输入密码"
        type="password"
      />
    </van-cell-group>
  </van-dialog>
  <van-dialog
    v-model:show="showMnDialog"
    title="请输入助记词"
    show-cancel-button
    @confirm="confirmMn"
  >
    <van-cell-group inset>
      <van-field
        v-model="mnemonic2"
        label="助记词"
        placeholder="请输入助记词"
      />
    </van-cell-group>
  </van-dialog>
</template>
<script setup>
//密码123123
import { ref } from "vue";
import { showDialog, showNotify } from "vant";
import "vant/es/notify/style";
import * as bip39 from "bip39";
import { hdkey } from "ethereumjs-wallet";
import store2 from "store2";
const show = ref(false);
const showMn = ref(false);
const showMnDialog = ref(false);
const password = ref("");
const mnemonic = ref("");
const mnemonic2 = ref("");
//
const createWallet = () => {
  show.value = true;
};
const confirmPwd = async () => {
  if (password.value === "") {
    showNotify({ type: "danger", message: "请输入密码" });
  } else {
    const walletInfo = store2.get("walletInfo");
    mnemonic.value = walletInfo
      ? walletInfo[0].mnemonic
      : bip39.generateMnemonic();
    if (walletInfo) {
      confirmMn();
    } else {
      showMn.value = true;
    }
  }
};
// 首先生成助记词  然后转成seed   通过hdkey生成hdwallet(HD 钱包)  生成钱包的derivePath路径的keypair
const confirmMn = async () => {
  const storeWallet = store2.get("walletInfo") || [];
  if (mnemonic.value !== mnemonic2.value && storeWallet.length === 0) {
    return;
  }
  showMnDialog.value = false;
  const seed = await bip39.mnemonicToSeed(mnemonic.value);
  const hdWallet = hdkey.fromMasterSeed(seed);
  const addressIndex =
    storeWallet.walletInfo === 0 ? 0 : storeWallet.length + 1;
  const keyPair = hdWallet.derivePath(`m/44'/60'/0'/0/${addressIndex}`);
  //根据钱包对象获取钱包地址  私钥
  const wallet = keyPair.getWallet();
  const lowerCaseAddress = wallet.getAddressString();
  const CheckSumAddress = wallet.getChecksumAddressString();
  const privateKey = wallet.getPrivateKey().toString();
  const keystore = await wallet.toV3(password.value);
  const walletObj = {
    id: addressIndex,
    mnemonic: mnemonic.value,
    balance: 0,
    address: lowerCaseAddress,
    privateKey,
    keystore,
  };
  const walletInfo = storeWallet;
  walletInfo.push(walletObj)
  store2("walletInfo", walletInfo);
  console.log(walletInfo, "用户钱包信息");
};
const confirmSaveMnemonic = () => {
  showMnDialog.value = true;
};
</script>
<style scoped lang="scss">
.mnemonic_systems {
  user-select: all;
}
</style>
