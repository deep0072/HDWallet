import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

import * as buffer from "buffer";
window.Buffer = buffer.Buffer;


export default function createWallet(wallet, seed){
    console.log(seed, "inside createWallet")
    let coinType
    if (wallet.solana) {
        coinType = "501'"

    }else if (wallet.btc) {
        coinType = "0'"
    }else if (wallet.eth) {
        coinType = "60'"
      
    }




    let neWallet = new Object();
    
    for (let key in wallet){
        if (wallet.solana){
            const path = `m/44'/501'/${wallet.solana.currentIndex}'/0'`; 
            createSolanaWallet(seed,path)}
        // }else if (wallet.btc){
        //     //create btc wallet
        //     const path = `m/44'/0'/0'/${wallet.btc.currentIndex}'`; 
        // }else if (wallet.eth){
        //     // create eth wallet
        //     const path = `m/44'/60'/0'/${wallet.btc.currentIndex}'`; 
        // // }


      

    }  

        
  
    return (publicKey,secret)

}


function createSolanaWallet(seed,path){
 

      // Simplified for one wallet creation
  
        const {key,chainCode} = derivePath(path, seed);
        console.log(derivePath, "derive path")
        const secret = nacl.sign.keyPair.fromSeed(key).secretKey;
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
        console.log(publicKey, secret)

}