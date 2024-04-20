require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-ethers")
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.8",
    networks: {
        hardhat: {
            // Hardhat 网络配置
            development: {
                url: "http://localhost:8545",
            },
            chainId: 31337, // 这里是 Hardhat 默认的链 ID，也可以根据需要修改
        },
    },
}
