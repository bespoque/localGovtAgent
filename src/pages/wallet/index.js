import React, { useState, useEffect } from "react";
import WalletPage from "./components/wallet";
import CreateWallet from "./components/createWallet";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import url from "../../config/url";

const Wallet = () => {
  let ABSSIN_number = localStorage.getItem("ABSSIN_number");
  const [state, setState] = useState({
    openCreateWallet: undefined,
    openExistingWallet: undefined,
    hasWallet: undefined,
  });

  ABSSIN_number = ABSSIN_number.replace(/"/g, "");

  console.log(ABSSIN_number);

  // const fetchUserDetails = async () => {
  //   setAuthToken();
  //   try {
  //     const data = await axios.post(`${url.BASE_URL}user/individual`, {
  //       id: ABSSIN_number,
  //     });
  //     console.log(data.data.data, "USER DETAILS");

  //     setState((prev) => {
  //       return {
  //         ...prev,
  //         hasWallet: data?.data.data.hasWallet
  //       };
  //     });
  //   } catch (error) {}
  // };
  const checkIfUserHasWallet = async () => {
    setAuthToken();
    try {
      const data = await axios.post(`${url.BASE_URL}wallet/balance`);
      console.log(data, "USER DETAILS");

      setState((prev) => {
        return {
          ...prev,
          hasWallet: true,
          openCreateWallet: false,
          openExistingWallet: true,
        };
      });
    } catch (error) {
      console.log(error);
      setState((prev) => {
        return {
          ...prev,
          hasWallet: false,
          openCreateWallet: true,
          openExistingWallet: false,
        };
      });
    }
  };

  console.log(state.hasWallet, "DOES IT HAVE WALLET");
  useEffect(() => {
    // fetchUserDetails();
    checkIfUserHasWallet();
  }, []);

  return (
    <section>
      {/* {state.hasWallet ? <WalletPage /> : <CreateWallet state={state} setState={setState}/>} */}
      {state.openExistingWallet ? (
        <WalletPage />
      ) : (
        <CreateWallet state={state} setState={setState} />
      )}
    </section>
  );
};

export default Wallet;
