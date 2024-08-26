import React from 'react'
import './App.css'

import { Button } from './components/ui/button'

import { useState } from 'react'

import createWallet from './components/use-wallet.js'
import TruncateEthAddressFromMid from './components/utils/truncateAddress.js'

// import SeedDialogPhrase  from "./components/SeedDialogPhrase";
import SeedGrid from './components/SeedGrid'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import * as buffer from 'buffer'
import FullTextCard from './components/FullTextCard.jsx'
window.Buffer = buffer.Buffer

function App() {
  const [mnemonics, setMnemonics] = useState([])
  const [isHovered, setIsHovered] = useState(false)
  const [seed, setSeed] = useState('')
  const [wallet, setWallet] = useState({
    solana: { currentIndex: 0, publicKey: '', secretKey: '' },
    eth: { currentIndex: 0, publicKey: '', secretKey: '' },
    btc: { currentIndex: 0, publicKey: '', secretKey: '' },
  })

  const handleClick = () => {
    let phrase = generateMnemonic()

    let newSeed = mnemonicToSeedSync(phrase)

    setSeed(newSeed.toString('hex'))

    setMnemonics(phrase.split(' '))
    handleWallet(newSeed)
  }

  const handleWallet = seedPhrase => {
    const newWallet = {
      solana: { currentIndex: (wallet.solana.currentIndex += 1), publicKey: '', secretKey: '' },
      eth: { currentIndex: (wallet.eth.currentIndex += 1), publicKey: '', secretKey: '' },
      btc: { currentIndex: (wallet.btc.currentIndex += 1), publicKey: '', secretKey: '' },
    }

    const walletInfo = createWallet(newWallet, seedPhrase)
    console.log(walletInfo, 'walletInfo')
    newWallet.solana.publicKey = walletInfo.solana.publicKey
    newWallet.solana.secretKey = walletInfo.solana.secretKey
    newWallet.eth.publicKey = walletInfo.eth.publicKey
    newWallet.eth.secretKey = walletInfo.eth.secretKey
    newWallet.btc.publicKey = walletInfo.btc.publicKey
    newWallet.btc.secretKey = walletInfo.btc.secretKey
    setWallet(newWallet)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  return (
    <div className="bg-gray-900 p-2">
      <div className="flex justify-center mt-3">
        <h1 className="text-green font-bold text-5xl text-outline text-green-500  border-b-2 border-green-400 animate-pulse mt-10">
          HDeepWallet
        </h1>
      </div>

      <div className="bg-gray-900 h-screen flex justify-center items-center my-15">
        {/* <div className='text-lg font-bold text-green-400 border-b-2 border-green-500 hover:text-shadow-lg hover:shadow-green-400/50 border-gradient-to-r from-gree-400 to-green-600 via-green-500 animate-accordion-'>DeepWallet</div> */}

        <div className="bg-gray-800 rounded-lg p-6 w-1/3">
          <div className="flex justify-between items-center mb-4">
            <div className="w-3/4 bg-gray-700 h-10 rounded overflow-hidden text-white p-2">
              {' '}
              {seed}
            </div>
            <Button
              onClick={handleClick}
              className="w-1/5 bg-gray-700 h-10 rounded text-center px-1 py-1"
            >
              generate
            </Button>
          </div>

          <div className="text-center mb-2">{seed && <SeedGrid words={mnemonics} />}</div>

          <div className="flex justify-between mb-4">
            <div className="w-1/4 animate-pulse border border-purple-500 border-opacity-100 opacity-100  bg-gray-700 h-8 rounded flex justify-center p-1 bg-gradient-to-r from-orange-500 via-purple-400 to-purple-100  bg-clip-text text-transparent text-lg font-semibold">
              sol
            </div>
            <div className="w-1/4 animate-pulse border border-yellow-500 border-opacity-100 opacity-100  bg-gray-700 h-8 rounded flex justify-center p-1 bg-gradient-to-r from-orange-500 via-orange-100 to-orange-400 bg-clip-text text-transparent text-lg font-semibold">
              btc
            </div>
            <div className="w-1/4 animate-pulse  border border-purple-300 opacity-100  bg-gray-700 h-8 rounded flex justify-center p-1  bg-gradient-to-r from-purple-300 to-blue-200   bg-clip-text text-transparent text-lg font-semibold">
              eth
            </div>
          </div>

          <div className="flex justify-between ">
            <div className="w-[25%] bg-gray-700 rounded p-4 text-white text-center">
              <div className="border border-purple-500 border-opacity-100 opacity-100  mt-3 rounded flex justify-center">
                <p className="mb-2  mt-2">
                  <FullTextCard id="secretKey" wallet={wallet.solana['secretKey']} />
                </p>{' '}
              </div>
              <div className="border border-purple-500 border-opacity-100 opacity-100 mt-3 rounded flex justify-center">
                <p className="mb-2  mt-2">
                  <FullTextCard id="Public Key" wallet={wallet.solana['publicKey']} />
                </p>
              </div>
            </div>

            <div className="w-[25%] bg-gray-700 rounded p-4 text-white text-center">
              <div className=" border rounded border-yellow-500 border-opacity-100 opacity-100  mt-2 flex justify-center">
                <p className="mb-2  mt-2">
                  <FullTextCard id="secretKey" wallet={wallet.btc['secretKey']} />
                </p>
              </div>
              <div className=" border rounded  border-yellow-500 border-opacity-100 opacity-100  mt-3 flex justify-center">
                <p className="mb-2  mt-2">
                  <FullTextCard id="Public Key" wallet={wallet.btc['publicKey']} />
                </p>
              </div>

              {/* <p className="mb-2">pubublic</p>
               */}
            </div>

            <div className="w-[25%] bg-gray-700 rounded p-4 text-white text-center">
              <div className="border rounded border-purple-300 border-opacity-100 opacity-100  mt-3 flex justify-center">
                <p className="mb-2  mt-2">
                  <FullTextCard id="secretKey" wallet={wallet.eth['secretKey']} />
                </p>{' '}
              </div>
              <div className="border rounded border-purple-300 border-opacity-100 opacity-100  mt-3 flex justify-center">
                <p className="mb-2  mt-2">
                  <FullTextCard id="Public Key" wallet={wallet.eth['publicKey']} />
                </p>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
