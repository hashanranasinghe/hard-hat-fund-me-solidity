// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        //Eth in terms of usd
        //3000,00000000
        return uint256(price * 1e10); //1**10==10000000000
    }

    function getVersion(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        return priceFeed.version();
    }

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        getVersion(priceFeed);
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountedInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountedInUsd;
    }
}
