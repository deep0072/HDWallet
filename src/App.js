import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { Button } from './components/ui/button';
import { useState } from 'react';
import createWallet from './components/use-wallet';
// import TruncateEthAddressFromMid from './components/utils/truncateAddress.js'
// import SeedDialogPhrase  from "./components/SeedDialogPhrase";
import SeedGrid from './components/SeedGrid';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import * as buffer from 'buffer';
import FullTextCard from './components/FullTextCard';
window.Buffer = buffer.Buffer;
function App() {
    const [mnemonics, setMnemonics] = useState([]);
    const [seed, setSeed] = useState('');
    const [wallet, setWallet] = useState({
        solana: { currentIndex: 0, publicKey: '', secretKey: '' },
        eth: { currentIndex: 0, publicKey: '', secretKey: '' },
        btc: { currentIndex: 0, publicKey: '', secretKey: '' },
    });
    const handleClick = () => {
        const phrase = generateMnemonic();
        const newSeed = mnemonicToSeedSync(phrase);
        setSeed(newSeed.toString('hex'));
        setMnemonics(phrase.split(' '));
        handleWallet(newSeed);
    };
    const handleWallet = (seedPhrase) => {
        const newWallet = {
            solana: { currentIndex: (wallet.solana.currentIndex += 1), publicKey: '', secretKey: '' },
            eth: { currentIndex: (wallet.eth.currentIndex += 1), publicKey: '', secretKey: '' },
            btc: { currentIndex: (wallet.btc.currentIndex += 1), publicKey: '', secretKey: '' },
        };
        const walletInfo = createWallet(newWallet, seedPhrase);
        console.log(walletInfo, 'walletInfo');
        newWallet.solana.publicKey = walletInfo.solana.publicKey;
        newWallet.solana.secretKey = walletInfo.solana.secretKey;
        newWallet.eth.publicKey = walletInfo.eth.publicKey;
        newWallet.eth.secretKey = walletInfo.eth.secretKey;
        newWallet.btc.publicKey = walletInfo.btc.publicKey;
        newWallet.btc.secretKey = walletInfo.btc.secretKey;
        setWallet(newWallet);
    };
    return (_jsxs("div", { className: "bg-gray-900 p-2", children: [_jsx("div", { className: "flex justify-center mt-3", children: _jsx("h1", { className: "text-green font-bold text-5xl text-outline text-green-500  border-b-2 border-green-400 animate-pulse mt-10", children: "HDeepWallet" }) }), _jsx("div", { className: "bg-gray-900 h-screen flex justify-center items-center my-15", children: _jsxs("div", { className: "bg-gray-800 rounded-lg p-6 w-1/3", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("div", { className: "w-3/4 bg-gray-700 h-10 rounded overflow-hidden text-white p-2", children: [' ', seed] }), _jsx(Button, { onClick: handleClick, className: "w-1/5 bg-gray-700 h-10 rounded text-center px-1 py-1", children: "generate" })] }), _jsx("div", { className: "text-center mb-2", children: seed && _jsx(SeedGrid, { words: mnemonics }) }), _jsxs("div", { className: "flex justify-between mb-4 mt-4", children: [_jsx("div", { className: "w-1/4 animate-pulse border border-purple-500 border-opacity-100 opacity-100  bg-gray-700 h-8 rounded flex justify-center p-1 bg-gradient-to-r from-orange-500 via-purple-400 to-purple-100  bg-clip-text text-transparent text-lg font-semibold", children: "sol" }), _jsx("div", { className: "w-1/4 animate-pulse border border-yellow-500 border-opacity-100 opacity-100  bg-gray-700 h-8 rounded flex justify-center p-1 bg-gradient-to-r from-orange-500 via-orange-100 to-orange-400 bg-clip-text text-transparent text-lg font-semibold", children: "btc" }), _jsx("div", { className: "w-1/4 animate-pulse  border border-purple-300 opacity-100  bg-gray-700 h-8 rounded flex justify-center p-1  bg-gradient-to-r from-purple-300 to-blue-200   bg-clip-text text-transparent text-lg font-semibold", children: "eth" })] }), _jsxs("div", { className: "flex justify-between ", children: [_jsxs("div", { className: "w-[25%] bg-gray-700 rounded p-4 text-white text-center", children: [_jsxs("div", { className: "border border-purple-500 border-opacity-100 opacity-100  mt-3 rounded flex justify-center", children: [_jsx("p", { className: "mb-2  mt-2", children: _jsx(FullTextCard, { id: "secretKey", wallet: wallet.solana['secretKey'] }) }), ' '] }), _jsx("div", { className: "border border-purple-500 border-opacity-100 opacity-100 mt-3 rounded flex justify-center", children: _jsx("p", { className: "mb-2  mt-2", children: _jsx(FullTextCard, { id: "Public Key", wallet: wallet.solana['publicKey'] }) }) })] }), _jsxs("div", { className: "w-[25%] bg-gray-700 rounded p-4 text-white text-center", children: [_jsx("div", { className: " border rounded border-yellow-500 border-opacity-100 opacity-100  mt-2 flex justify-center", children: _jsx("p", { className: "mb-2  mt-2", children: _jsx(FullTextCard, { id: "secretKey", wallet: wallet.btc['secretKey'] }) }) }), _jsx("div", { className: " border rounded  border-yellow-500 border-opacity-100 opacity-100  mt-3 flex justify-center", children: _jsx("p", { className: "mb-2  mt-2", children: _jsx(FullTextCard, { id: "Public Key", wallet: wallet.btc['publicKey'] }) }) })] }), _jsxs("div", { className: "w-[25%] bg-gray-700 rounded p-4 text-white text-center", children: [_jsxs("div", { className: "border rounded border-purple-300 border-opacity-100 opacity-100  mt-3 flex justify-center", children: [_jsx("p", { className: "mb-2  mt-2", children: _jsx(FullTextCard, { id: "secretKey", wallet: wallet.eth['secretKey'] }) }), ' '] }), _jsxs("div", { className: "border rounded border-purple-300 border-opacity-100 opacity-100  mt-3 flex justify-center", children: [_jsx("p", { className: "mb-2  mt-2", children: _jsx(FullTextCard, { id: "Public Key", wallet: wallet.eth['publicKey'] }) }), ' '] })] })] })] }) })] }));
}
export default App;
