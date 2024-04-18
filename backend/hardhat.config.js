require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    networks: {
        hardhat: {
            // Hardhat 网络配置
            chainId: 31337, // 这里是 Hardhat 默认的链 ID，也可以根据需要修改
        },
    },
}
