import React,{useState} from "react";
import { token_backend, canisterId, createActor} from "../../../declarations/token_backend/index";
import { AuthClient } from "@dfinity/auth-client";

function Faucet() {
  const [disabledStatus, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme");
  
  async function handleClick(event) {
    setDisabled(true)
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    // const authenticatedCanister = createActor(canisterId, {
    //   agentOptions:{
    //     identity,
    //   }
    // })



    const result = await token_backend.payOut();
    setButtonText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button disabled ={disabledStatus} id="btn-payout" onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet; 
