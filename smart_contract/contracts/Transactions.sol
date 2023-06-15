// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transactions {
    struct Transaction {
        address from;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    Transaction[] public transactions;

    event TransactionAdded(address indexed from, address indexed receiver, uint256 amount, string message, uint256 timestamp, string keyword);

    function addToBlockchain(address _receiver, uint256 _amount, string memory _message, string memory _keyword) external {
        Transaction memory newTransaction = Transaction({
            from: msg.sender,
            receiver: _receiver,
            amount: _amount,
            message: _message,
            timestamp: block.timestamp,
            keyword: _keyword
        });

        transactions.push(newTransaction);

        emit TransactionAdded(newTransaction.from, newTransaction.receiver, newTransaction.amount, newTransaction.message, newTransaction.timestamp, newTransaction.keyword);
    }

    function getAllTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }

    function getTransactionsCount() external view returns (uint256) {
        return transactions.length;
    }
}
