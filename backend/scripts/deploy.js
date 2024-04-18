// const { ethers } = require("hardhat")

// async function main() {
//     const StudentBehaviorContractFactory = await ethers.getContractFactory(
//         "StudentBehaviorContract",
//     )
//     console.log("正在部署合约...")
//     const studentBehaviorContract =
//         await StudentBehaviorContractFactory.deploy()

//     // 等待合约部署完成
//     await studentBehaviorContract.waitForDeployment()

//     // 输出合约地址
//     console.log("合约部署完成:", studentBehaviorContract.target)
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error("部署失败:", error)
//         process.exit(1)
//     })
const { ethers } = require("hardhat")

async function main() {
    const StuBehaviorInfoSysFactory =
        await ethers.getContractFactory("stuBehaviorInfoSys")
    console.log("正在部署合约...")
    const stuBehaviorInfoSys = await StuBehaviorInfoSysFactory.deploy()

    // 等待合约部署完成
    await stuBehaviorInfoSys.waitForDeployment()

    // 输出合约地址
    console.log("合约部署完成:", stuBehaviorInfoSys.target)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("部署失败:", error)
        process.exit(1)
    })
