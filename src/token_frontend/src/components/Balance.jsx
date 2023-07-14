import React, { useState } from "react";
import { token_backend } from "../../../declarations/token_backend/index";
import { Principal } from "@dfinity/principal";

function Balance() {
  const [inputValue, setValue] = useState("");
  const [balanceResult, setBalanceResult] = useState("");
  const [symbolValue, setSymbol] = useState("");
  const [isShown, setShown] = useState(false);

  function inputSetter(event) {
    setValue(event.target.value);
  }

  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await token_backend.balanceOf(principal);
    setBalanceResult(balance.toLocaleString());

    const symbol = await token_backend.getSymbol();
    setSymbol(symbol);
    
    setShown(true);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={inputSetter}
        />
      </p>
      <p className="trade-buttons">
        <button id="btn-request-balance" onClick={handleClick}>
          Check Balance
        </button>
      </p>
      {isShown ? (
        <p>
          This account has a balance of {balanceResult} {symbolValue}.
        </p>
      ) : null}
    </div>
  );
}

export default Balance;
