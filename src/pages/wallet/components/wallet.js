import { useState, useEffect, useCallback } from "react";
import Spinner from "../../../components/spiner";
import url from "../../../config/url";
import UseFetcher from "../../../components/fetcher/useFetcher";
import axios from "axios";
import { WalletTransactionsTable } from "../../../components/tables/walletTransactions";
import setAuthToken from "../../../functions/setAuthToken";
import { RiCoinsLine } from "react-icons/ri";

import { TbReceiptOff } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { TbCopy } from "react-icons/tb";
import { ImSpinner } from "react-icons/im";

const WalletPage = () => {
  const { data, isLoading, isError } = UseFetcher(`${url.BASE_URL}dashboard`);
  const { datur, isLoadingg, isErrrro } = UseFetcher(
    `${url.BASE_URL}wallet/balance`
  );

  const dashboardData = data?.data?.data;

  const [openBank, setOpenBank] = useState(false);
  const [state, setState] = useState({
    filterState: "All",
    filter: false,
    currPage: 0,
    data: [],
    balance: 0,
    fundingLoading: false,
    topUpDetails: {
      accountName: "",
      accountNumber: "",
      walletNumber: "",
      bankName: "Access Bank",
    },
  });

  const getWalletBalance = useCallback(async () => {
    try {
      const walletData = await axios.post(`${url.BASE_URL}wallet/balance`);
      const transactionData = await axios.post(
        `${url.BASE_URL}wallet/transaction-history`
      );
      let topUpData = await axios.post(
        `${url.BASE_URL}wallet/get-wallet-details`
      );
      topUpData = topUpData.data;

      console.log(topUpData,"top up");

      setState((prevState) => {
        return {
          ...prevState.data,
          balance: walletData.data.balance,
          data: [...transactionData?.data?.data],
          topUpDetails: {
            accountName: topUpData?.wallet_name,
            accountNumber: topUpData?.wallet_no,
            walletNumber: topUpData?.state_id,
            bankName: "Access Bank",
          },
        };
      });
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    setAuthToken();
    getWalletBalance();
  }, []);

  const [isCopied, setIsCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(
    state.topUpDetails.accountNumber
  );

  const copyToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.value = state.topUpDetails.accountNumber;

    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(textarea);

    setIsCopied(true);
    setCopiedText(state.topUpDetails.accountNumber);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  function formatMoney(amount) {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
      return "Invalid input";
    }

    return numericAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  }

  return (
    <>
      {isLoading && <Spinner />}
      {dashboardData && (
        <section className="px-0 md:px-4 ">
          <div className="flex justify-between items-center mb-6 md:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            <div className="flex space-x-3 items-center">
              <div className="bg-teal-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                <RiCoinsLine className="text-teal-800 w-5 h-5 md:w-8 md:h-8" />
              </div>

              <div>
                <h1 className="text-xl text-gray-600 md:text-3xl font-bold">
                  ₦{formatMoney(state?.balance) || "-"}
                </h1>
                <p className="text-gray-500 flex flex-col uppercase text-xs md:flex-row">
                  Wallet Number {"  -"}{" "}
                  <span className="font-bold text-gray-700 leading">{`  ${state.topUpDetails.accountNumber}`}</span>{" "}
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpenBank(true)}
              className="-mt-2 bg-teal-600 text-white px-8 py-3 md:px-16 md:py-4 rounded font-bold hover:bg-teal-500"
            >
              Top up
            </button>
          </div>

          <div className="w-full mt-10 lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            {/* <Section
              title="Transaction History"
              action="View more"
              href="/payment/demand-notices"
            > */}
            <h2 className="font-bold text-gray-500 text-lg mb-3">
              Transaction History
            </h2>

            {/* <div className="flex flex-col md:space-x-3 md:items-center md:pt-4 pb-8 md:flex-row">
              <p className="font-bold hidden md:block">Filter by:</p>{" "}
              <div className="mt-3 flex space-x-3 md:mt-0">
                <select
                  id="default"
                  className="bg-gray-white border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-48 p-2.5"
                >
                  <option defaultValue>Time</option>
                  <option value="US">24 hours</option>
                  <option value="CA">7 days</option>
                  <option value="FR">Last week</option>
                  <option value="DE">Last Month</option>
                  <option value="DE">Last 12 Month</option>
                </select>
                <select
                  id="default"
                  className="bg-gray-white border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-48 p-2.5"
                >
                  <option defaultValue>Filter by:</option>
                  <option value="US">Transaction ID</option>
                  <option value="CA">Amount</option>
                  <option value="FR">Transaction Type</option>
                </select>
              </div>
            </div> */}

            {state.data?.length > 0 ? (
              <div className="flex flex-col w-full">
                <div className="w-full border-2 rounded-xl">
                  <WalletTransactionsTable data={state.data} />
                </div>
              </div>
            ) : (
              <div className="flex justify-center w-full space-x-4">
                <div className="flex flex-col justify-center items-center">
                  <TbReceiptOff className="w-28 h-28 text-teal-600" />
                  <p className="text-lg font-bold text-gray-500">
                    No Transaction
                  </p>
                </div>
              </div>
            )}
          </div>

          {openBank && (
            <>
              <div className="modal-backdrop fade-in"></div>
              <div className="modal show w-full ">
                <div className="rounded-2xl">
                  <div className="bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                    <div className="relative p-8">
                      <div className="flex items-center justify-between space-x-4">
                        <h1 className="text-xl mb-2 font-bold w-56 md:w-80">
                          Top Up Wallet
                        </h1>
                        <div className="flex justify-between items-center pl-8">
                          <button onClick={() => setOpenBank(false)}>
                            <MdClose className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-500 w-64">
                        {" "}
                        Transfer funds to the account details below to top up
                        your wallet
                      </p>
                      <div className="flex flex-col space-y-4 border-2 rounded-xl w-full mt-16 shadow-md p-6">
                        <div className="flex w-full justify-between ">
                          <p className="text-gray-400">Account Name</p>
                          <p className="font-bold">
                            {state?.topUpDetails?.accountName}{" "}
                          </p>
                        </div>
                        <div className="flex w-full justify-between ">
                          <p className="text-gray-400">Account Number</p>
                          <p className="font-bold">
                            {state?.topUpDetails?.accountNumber}{" "}
                          </p>
                        </div>
                        <div className="flex w-full justify-between ">
                          <p className="text-gray-400">Bank Name</p>
                          <p className="font-bold">Access Bank</p>
                        </div>
                      </div>
                      <div
                        onClick={copyToClipboard}
                        className={`flex justify-center w-full border-2 rounded-lg mt-3 p-3 cursor-pointer transition-all  ${
                          isCopied
                            ? "text-teal-500 border-teal-500 bg-green-50 hover:bg-green-50"
                            : "text-teal-500  border-teal-500 hover:bg-teal-50 bg-white"
                        }`}
                      >
                        <TbCopy className="w-5 h-5 mr-1" />
                        {isCopied ? "COPIED!" : "Click to copy account number"}
                      </div>
                      {state.fundingLoading ? (
                        <div
                          onClick={() => setOpenBank(false)}
                          className="flex justify-center w-full cursor-pointer rounded-lg mt-20 p-3 bg-teal-500 text-white font-bold hover:bg-teal-400"
                        >
                          Checking
                          <ImSpinner className="w-5 h-5 ml-2 animate-spin" />
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setOpenBank(false);
                          }}
                          className="flex justify-center w-full cursor-pointer rounded-lg mt-20 p-3 bg-teal-500 text-white font-bold hover:bg-teal-400"
                        >
                          Funds Transferred
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
};
export default WalletPage;
