import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    const addNetworkToMetaMask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x25E5',
                            chainName: 'Attractor Testnet',
                            nativeCurrency: {
                                name: 'ATTRA',
                                symbol: 'ATTRA',
                                decimals: 18,
                            },
                            rpcUrls: ['https://rpc.testnet.attra.me/'],
                            blockExplorerUrls: ['https://explorer.testnet.attra.me/'],
                        },
                    ],
                });
            } catch (error) {
                console.error('Error adding network to MetaMask', error);
            }
        } else {
            console.error('MetaMask is not installed');
        }
    };


    return (
        <footer>
            © 2025 Attractor Network | All rights reserved
            <button className="metamask-import-button" onClick={addNetworkToMetaMask}>
                Add Attractor Network
            </button>
        </footer>
    );
}

export default Footer;
