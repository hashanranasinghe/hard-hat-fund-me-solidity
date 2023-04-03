const { getNamedAccounts, ethers, network } = require("hardhat");
const { developmentsChains } = require("../../helper-hardhat-config");
const { assert } = require("chai");

developmentsChains.includes(network.name)
  ? describe.skip
  : describe("FundMe Staging Tests", () => {
      let fundMe;
      let deployer;
      const sendValue = ethers.utils.parseEther("0.03");
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe", deployer);
      });

      it("allows people to fund and withdraw", async () => {
        const fundTxResponse = await fundMe.fund({ value: sendValue });
        await fundTxResponse.wait(1);
        const withdrawTxResponse = await fundMe.withdraw();
        await withdrawTxResponse.wait(1);
        const endingBalance = await fundMe.provider.getBalance(fundMe.address);
        assert.equal(endingBalance.toString(), "0");
      });
    });
