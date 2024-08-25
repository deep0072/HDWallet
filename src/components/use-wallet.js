import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import bs58 from "bs58"

import * as buffer from "buffer";
window.Buffer = buffer.Buffer;


export default function createWallet(wallet, seed){
    
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
              neWallet.solana = neWallet.solana || {};
            const {publicKey, secretKey} = createSolanaWallet(seed,path)

            neWallet.solana.publicKey = publicKey
            neWallet.solana.secretKey = secretKey
            
            return neWallet }
        // if (wallet.btc){
        //     const path = `m/44'/0'/${wallet.btc.currentIndex}'/0'`; 
        //     const [publicKey, secretKey] = createSolanaWallet(seed,path)}
         
        //     return (publicKey,secret)}
        // if (wallet.eth){
        //     const path = `m/44'/60'/${wallet.solana.currentIndex}'/0'`; 
        //     const [publicKey, secretKey] = createSolanaWallet(seed,path)

            // return (publicKey,secret)
        }

    }
        
        // }else if (wallet.btc){
        //     //create btc wallet
        //     const path = `m/44'/0'/0'/${wallet.btc.currentIndex}'`; 
        // }else if (wallet.eth){
        //     // create eth wallet
        //     const path = `m/44'/60'/0'/${wallet.btc.currentIndex}'`; 
        // // }


      

    

        
  
    



function createSolanaWallet(seed,path){
 

      // Simplified for one wallet creation
  
        const derivedSeed = derivePath(path, seed).key;
       
        let  secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
        let secretKey = bs58.encode(secret)
       

        return {"publicKey":publicKey, "secretKey":secretKey}

}