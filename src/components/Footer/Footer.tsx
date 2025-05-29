import React from 'react';
import { toast } from 'react-toastify';
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
                toast.success('Attractor Testnet successfully added to MetaMask!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } catch (error: any) {
                console.error('Error adding network to MetaMask', error);
                
                // Check if the error is about existing network
                if (error.code === -32602 && error.message.includes('nativeCurrency.symbol')) {
                    toast.info('Attractor Testnet is already added to your MetaMask!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else {
                    toast.error('Failed to add network to MetaMask. Please try again.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            }
        } else {
            toast.error('MetaMask is not installed. Please install MetaMask to use this feature.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
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
