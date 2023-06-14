import {createContext, useEffect, useState } from "react";
import { ethers } from 'ethers'
;

import { contractAbi, contractAddress } from "../utils/constans";

export const TransactionsContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer)

    return transactionContract;
    
}

export const TransactionsProvider = ( {children} ) => {

    const [currentAccount, setCurrentAccount] = useState("")

    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});

    const [isLoading, setIsLoading] = useState(false);

    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));

    }

    const checkIfWalletIsConnected = async () => {

        try {
            if(!ethereum) return alert("Installa MetaMask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if(accounts.length) {
                setCurrentAccount(accounts[0]);

                //getallTransactions();
            }else {
                console.log('Nessun conto Trovato');
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }

  
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Installa MetaMask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    }

    const sendTransactions = async () => {
        try {
            if(!ethereum) return alert("Installa MetaMask");

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //hexadecimal 21000 GWEI
                    value: parsedAmount._hex, 
                }]

            });

            const transactionHash = await transactionContract.transfer(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash}`);

            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success - ${transactionHash}`);

            const transactionCount = await transactionContract.balanceOf();
            setTransactionCount(transactionCount.toNumber());

            //get data from form
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[])
    return (
        <TransactionsContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}