//importing all the datatypes and datastrucutres needed
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter"

actor Token{
var owner:Principal = Principal.fromText("fafa7-fcvlu-2mege-2j62z-lvajf-qpq7u-wch2h-4hfdi-6jnax-sialj-5qe"); //creates the owner as a var with a Principal type, sets it equal to the identity
var totalSuply : Nat = 1000000000; //sets a total supply of coins to 10000000
var symbol : Text = "DESH"; //sets the symbol var to DESH
private stable var balanceEntries : [(Principal,Nat)] =[]; //creates a private var that stores all the user and their balances using an array type with the Principal type as the first parameter and Nat being the second parameter
private var balances = HashMap.HashMap<Principal,Nat>(1, Principal.equal, Principal.hash); // creates a hashmap that has a princip

if(balances.size() < 1){
        balances.put(owner, totalSuply);
    };

public query func balanceOf(who:Principal): async Nat{

 let balance : Nat = switch (balances.get(who)){
    case null 0;
    case (?result) result;
};
return balance; 
};

public query func getSymbol() : async Text {
    return symbol;
};

public shared(msg) func payOut() : async Text {
    Debug.print(debug_show(msg.caller));
    if(balances.get(msg.caller) == null){
        let result = await transfer(msg.caller, 10000);
        return result; 
        
    } else {
        return "Already Claimed"
    };
};

public shared(msg) func transfer(to: Principal, amount: Nat) : async Text{
 let fromBalance = await balanceOf(msg.caller);

 if (fromBalance > amount){
    let newFromBalance : Nat = fromBalance - amount; 
    balances.put(msg.caller,newFromBalance);
    
    let toBalance = await balanceOf(to);
    let newToBalance = toBalance + amount;
    balances.put(to,newToBalance);
    
    return "Success"
 } else {
    return "Not sufficient funds"
 };
};

system func preupgrade(){
    balanceEntries := Iter.toArray(balances.entries());
};

system func postupgrade(){
    balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(),1,Principal.equal,Principal.hash);
    if(balances.size() < 1){
        balances.put(owner, totalSuply);
    }
};
}