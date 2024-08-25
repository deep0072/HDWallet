import React from "react";
import "./App.css";

import { Button } from "./components/ui/button";

import { useState } from "react";

import createWallet from "./components/use-wallet.js"

// import SeedDialogPhrase  from "./components/SeedDialogPhrase";
import SeedGrid from "./components/SeedGrid";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

function App() {
  const [mnemonics, setMnemonics] = useState([]);
  const [seed, setSeed] = useState("");
  const [wallet, setWallet] = useState({solana: {currentIndex:0}, eth: {currentIndex:0}, btc:{currentIndex:0}});


  const handleClick = () => {
    let phrase = generateMnemonic();

    let newSeed = mnemonicToSeedSync(phrase);
    console.log(newSeed.toString("hex") ,"newSeed.....");

   
    setSeed(newSeed.toString("hex"));
   

    setMnemonics(phrase.split(" "));
    handleWallet(newSeed.toString("hex"))
  };

  const handleWallet = (seedPhrase) => {
    let newWallet = {solana:{currentIndex:wallet.solana.currentIndex+=1},eth:{currentIndex:wallet.eth.currentIndex+=1},btc:{currentIndex:wallet.btc.currentIndex+=1}}
    setWallet(newWallet);
   
    
    createWallet(newWallet,seedPhrase)
  
  };
  return (
    <div className="bg-gray-900 p-2">
      <div className="flex justify-center">
        <h1 className="text-green font-bold text-5xl text-outline text-green-500  border-b-2 border-green-400 animate-pulse mt-10">DeepWallet</h1>
      </div>

      <div className="bg-gray-900 h-screen flex justify-center items-center">
        {/* <div className='text-lg font-bold text-green-400 border-b-2 border-green-500 hover:text-shadow-lg hover:shadow-green-400/50 border-gradient-to-r from-gree-400 to-green-600 via-green-500 animate-accordion-'>DeepWallet</div> */}

        <div className="bg-gray-800 rounded-lg p-6 w-1/3">
          <div className="flex justify-between items-center mb-4">
            <div className="w-3/4 bg-gray-700 h-10 rounded overflow-hidden text-white p-2">
              {" "}
              {seed}
            </div>
            <Button
              onClick={handleClick}
              className="w-1/5 bg-gray-700 h-10 rounded text-center px-1 py-1"
            >
              generate
            </Button>
          </div>

          <div className="text-center mb-2">
            <SeedGrid words={mnemonics} />
          </div>

          <div className="h-1 bg-green-500 mb-4"></div>

          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleWallet("sol")}
              className="w-1/4 bg-gray-700 h-8 rounded flex justify-center p-1 text-white"
            >
              sol
            </button>
            <button
              onClick={() => handleWallet("btc")}
              className="w-1/4 bg-gray-700 h-8 rounded flex justify-center p-1 text-white"
            >
              btc
            </button>
            <button
              onClick={() => handleWallet("eth")}
              className="w-1/4 bg-gray-700 h-8 rounded flex justify-center p-1 text-white"
            >
              eth
            </button>
          </div>

          <div className="flex justify-between">
          
              <div
               
                className="w-[25%] bg-gray-700 rounded p-4 text-white"
              >
                <p className="mb-2">private</p>
                <p className="mb-2">pubublic</p>
                <p>seed</p>
              </div>
          
              <div
               
                className="w-[25%] bg-gray-700 rounded p-4 text-white"
              >
                <p className="mb-2">private</p>
                <p className="mb-2">pubublic</p>
                <p>seed</p>
              </div>
          
              <div
               
                className="w-[25%] bg-gray-700 rounded p-4 text-white"
              >
                <p className="mb-2">private</p>
                <p className="mb-2">pubublic</p>
                <p>seed</p>
              </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
