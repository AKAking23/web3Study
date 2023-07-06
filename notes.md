---
marp: true
---

# web3 学习笔记

## 钱包

热钱包 HotWallet（联网的在线钱包）
冷钱包 Cold Wallet（脱离网络环境的离线钱包）
生成、存储、签名
只存账户 真正的资产是存在链上

## MetaMask

助记词、私钥（登录）
不在以太坊主网开发 去测试网（Goerli）
可以创建多个账号（每个网络） 每个账号都有一个私钥 可以通过私钥 倒入账号

### Goerli

    获取eth需要挖矿
    网址：https://goerli-faucet.pk910.de/
    网址：https://www.tokenpocket.pro/

## 智能合约（DApp）

去中心化的 App
以太坊的智能应用程序，某些约定的情况下去发布 用户按照约定的规则去使用程序
分布式的应用开发
技术栈 web3 全栈开发 solidity

## 搭建 vue 项目

安装依赖
web3 bip39 ethereumjs-tx@1.3.7 ethereumjs-util ethereumjs-wallet

## web3js

npm i web3
用前端变成工具与 eth 进行交互
用 web3 去连接 eth 的 RPC 层 || 暴露的 RPC 接口的节点
web3 js 的包
web3.eth：用于与以太坊区块链和智能合约之间的交互。

web3.utils：包含一些辅助方法。

web3.shh：用于协议进行通信的 P2P 和广播。

web3.bzz：用于与群网络交互的 Bzz 模块。

打开 infura 网站地址：https://infura.io/dashboard，使用邮箱注册后登陆
163 邮箱

web3 的高频 API ：

1.创建账号：
web3.eth.accounts.create([entropy])


使用ethereumjs-tx@1.3.7
需要一个垫片  vue.config.js
const NodePolyfillWebpackPlugin = require("node-polyfill-webpack-plugin");
