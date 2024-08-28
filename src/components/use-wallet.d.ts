interface WalletType {
    solana: {
        currentIndex: number;
        secretKey: string;
        publicKey: string;
    };
    eth: {
        currentIndex: number;
        secretKey: string;
        publicKey: string;
    };
    btc: {
        currentIndex: number;
        secretKey: string;
        publicKey: string;
    };
}
export default function createWallet(wallet: WalletType, seed: Buffer): WalletType;
export {};
