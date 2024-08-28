
import { derivePath } from 'ed25519-hd-key'
import { Keypair } from '@solana/web3.js'
import nacl from 'tweetnacl'
import bs58 from 'bs58'
import { Wallet, HDNodeWallet } from 'ethers'
import * as buffer from 'buffer'

import CoinKey from 'coinkey'

window.Buffer = buffer.Buffer

interface WalletType {
  solana: {
    currentIndex: number,
    secretKey: string,
    publicKey: string
  }
  eth: {
    currentIndex: number,
    secretKey: string,
    publicKey: string
  }
  btc: {
    currentIndex: number,
    secretKey: string,
    publicKey: string
  }
}

export default function createWallet(wallet: WalletType, seed:Buffer) {

  const neWallet: WalletType = {
    solana: {
      currentIndex: 0,
      secretKey: "",
      publicKey: ""
    },
    btc: {
      currentIndex: 0,
      secretKey: "",
      publicKey: ""
    },
    eth: {
      currentIndex: 0,
      secretKey: "",
      publicKey: ""
    }
  }

 
    if (wallet.solana) {
      const path = `m/44'/501'/${wallet.solana.currentIndex}'/0'`
      neWallet.solana = neWallet.solana || {}
      const { publicKey, secretKey } = createSolanaWallet(seed, path)

      neWallet.solana.publicKey = publicKey
      neWallet.solana.secretKey = secretKey
    }
    // if (wallet.btc){
    //     const path = `m/44'/0'/${wallet.btc.currentIndex}'/0'`;
    //     const [publicKey, secretKey] = createaBtcWallet(seed,path)}

    if (wallet.eth) {
      console.log('creating eth wallet............')
      neWallet.eth = neWallet.eth || {}
      const path = `m/44'/60'/${wallet.eth.currentIndex}'/0'`

      const { publicKey, secretKey } = createEthWallet(seed, path)

      neWallet.eth.publicKey = publicKey
      neWallet.eth.secretKey = secretKey
    }

    if (wallet.btc) {
      console.log('creating eth wallet............')
      neWallet.btc = neWallet.btc || {}
  

      const { publicKey, secretKey } = createBtcWallet(seed)

      neWallet.btc.publicKey = publicKey
      neWallet.btc.secretKey = secretKey
    }
  

  // }else if (wallet.btc){
  //     //create btc wallet
  //     const path = `m/44'/0'/0'/${wallet.btc.currentIndex}'`;
  // }else if (wallet.eth){
  //     // create eth wallet
  //     const path = `m/44'/60'/0'/${wallet.btc.currentIndex}'`;
  // // }
  return neWallet
}

function createBtcWallet(seed:Buffer) {
  const  ck = new CoinKey.createRandom(seed, 'hex')

  return { publicKey: ck.publicAddress, secretKey: ck.privateKey.toString('hex') }
}

function createSolanaWallet(seed:Buffer, path:string) {


  const derivedSeed = derivePath(path, seed.toString('hex')).key

  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
  const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58()
  const secretKey = bs58.encode(secret)

  return { publicKey: publicKey, secretKey: secretKey }
}
function createEthWallet(seed:Buffer, path:string) {
  const hdNode = HDNodeWallet.fromSeed(seed)
  const child = hdNode.derivePath(path)
  const privateKey = child.privateKey
  const wallet = new Wallet(privateKey)
  const publicKey = wallet.address

  return { publicKey: publicKey, secretKey: privateKey }
}
