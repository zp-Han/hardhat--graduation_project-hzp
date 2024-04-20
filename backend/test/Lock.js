const { artifacts } = require("hardhat")
const stuBehaviorInfoSys = artifacts.require("stuBehaviorInfoSys")
contract("stuBehaviorInfoSys", (accounts) => {
    let contractInstance

    // 部署合约
    before(async () => {
        contractInstance = await stuBehaviorInfoSys.deployed()
    })

    // 测试注册功能
    it("should register a student", async () => {
        await contractInstance.register(123, "Alice", "Class A", "Faculty X", {
            from: accounts[0],
        })
        const studentInfo = await contractInstance.getStudentInfo({
            from: accounts[0],
        })
        assert.equal(
            studentInfo[0].toNumber(),
            123,
            "Student ID does not match",
        )
        assert.equal(studentInfo[1], "Alice", "Student name does not match")
        assert.equal(studentInfo[2], "Class A", "Student class does not match")
        assert.equal(
            studentInfo[3],
            "Faculty X",
            "Student faculty does not match",
        )
    })

    // 测试提交行为记录功能
    it("should submit behavior record for a student", async () => {
        await contractInstance.register(123, "Alice", "Class A", "Faculty X", {
            from: accounts[0],
        })
        await contractInstance.submitBehavior(1, 5, 100, 1, 8, {
            from: accounts[0],
        })
        const behaviorInfo = await contractInstance.getBehaviorInfo(
            accounts[0],
            1,
        )
        assert.equal(behaviorInfo[0].toNumber(), 1, "Timestamp does not match")
        assert.equal(behaviorInfo[1].toNumber(), 5, "Study hours do not match")
        assert.equal(behaviorInfo[2].toNumber(), 100, "Expenses do not match")
        assert.equal(
            behaviorInfo[3].toNumber(),
            1,
            "Exercise hours do not match",
        )
        assert.equal(behaviorInfo[4].toNumber(), 8, "Sleep hours do not match")
    })
})
