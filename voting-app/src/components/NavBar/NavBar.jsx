import React, { useState, useContext } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import logo from "../../neitec_company_logo.jpeg";

//INTERNAL IMPORT/
import { VotingContext } from "../../context/voter";
import Style from "./NavBar.module.css";
import loding from "../../loding.gif";

const NavBar = () => {
  const { connectWallet, error, currentAccount } = useContext(VotingContext);
  const [openNav, setOpenNav] = useState(true);

  const openNaviagtion = () => {
    if (openNav) {
      setOpenNav(false);
    } else if (!openNav) {
      setOpenNav(true);
    }
  };
  return (
    <div className={Style.navbar}>
      {error === "" ? (
        ""
      ) : (
        <div className={Style.message__Box}>
          <div style={Style.message}>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className={Style.navbar_box}>
      <div className={Style.title}>
        <img src={logo} alt="Logo" className={Style.logo} />
        <h1>Neitec Challenge</h1>
    </div>
        <div className={Style.connect}>
          {currentAccount ? (
            <div>
              <div className={Style.connect_flex}>
                <button onClick={() => openNaviagtion()}>
                  {currentAccount.slice(0, 10)}..
                </button>
                {currentAccount && (
                  <span>
                    {openNav ? (
                      <AiFillUnlock onClick={() => openNaviagtion()} />
                    ) : (
                      <AiFillLock onClick={() => openNaviagtion()} />
                    )}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <button onClick={() => connectWallet()}>Connect Wallet</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;