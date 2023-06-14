import { useContext } from "react"
import { TransactionsContext } from '../context/TransactionsContext';

import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ( { addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  return (
    <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
            <p className="text-white text-base">Da: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
            <p className="text-white text-base">Per: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base ">Importo: {amount} ETH</p>
          {message && (
            <>
            <br />
            <p className="text-white text-base">Messaggio: {message}</p>
            </>
          )}

          <div className="bg-black p-3 px-5 w-max rounded-3xl mt-5 shadow-2xl">
            <p className="text-[#37c7da] font-bold">{timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
 

const Transactions = () => {
  const { currentAccount } = useContext(TransactionsContext)
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">Ultime Transazioni</h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">Collega il tuo conto per vedere le ultime transazioni</h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {dummyData.reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Transactions