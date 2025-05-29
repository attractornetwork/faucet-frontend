import React from 'react';
import { toast } from 'react-toastify';
import './Footer.css';

const Footer: React.FC = () => {
    const CHAIN_ID = '0x25E5'; // Attractor Testnet chainId

    const checkIfNetworkExists = async (): Promise<boolean> => {
        if (!window.ethereum) return false;
        
        try {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            return chainId === CHAIN_ID;
        } catch (error) {
            console.error('Error checking chain ID:', error);
            return false;
        }
    };

    const addNetworkToMetaMask = async () => {
        // Check if we're in a browser environment
        if (typeof window === 'undefined') {
            toast.error('This feature is only available in a browser environment');
            return;
        }

        // Check if MetaMask is installed
        if (!window.ethereum) {
            toast.error(
                <div>
                    <p>MetaMask is not installed!</p>
                    <p>Please install MetaMask to use this feature:</p>
                    <a 
                        href="https://metamask.io/download/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#fff', textDecoration: 'underline' }}
                    >
                        Download MetaMask
                    </a>
                </div>,
                {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );
            return;
        }

        try {
            // First check if we're already on the correct network
            const isOnCorrectNetwork = await checkIfNetworkExists();
            if (isOnCorrectNetwork) {
                toast.info('You are already connected to Attractor Testnet!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }

            // Try to add the network
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: CHAIN_ID,
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
                toast.error(
                    <div>
                        <p>Failed to add network to MetaMask</p>
                        <p>Error: {error.message || 'Unknown error'}</p>
                    </div>,
                    {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    }
                );
            }
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
