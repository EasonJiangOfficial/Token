import React, { useState } from "react";
import { token_backend,canisterId, createActor} from "../../../declarations/token_backend/index";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
  const [toId, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    setDisabled(true);
    setDisabled(false);
    setId("");
    setAmount("");
    setFeedback(result);
    setHidden(false);


    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions:{
        identity,
      }      
    })

    const result = await authenticatedCanister.transfer(Principal.fromText(toId), Number(amount));

  }

  function setToId(event) {
    setId(event.target.value);
  }

  function setTransferAmount(event) {
    setAmount(event.target.value);
  }

  

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                onChange={setToId}
                value={toId}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                onChange={setTransferAmount}
                value={amount}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button disabled = {disabled ? true : false} id="btn-transfer" onClick={handleClick}>
            Transfer
          </button>
        </p>
        { isHidden ? null : <p>{feedback}</p>}
      </div>
    </div>
  );
}

export default Transfer;
