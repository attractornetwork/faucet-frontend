import React from 'react';
import {Collapse, ConfigProvider} from 'antd';
import './FAQ.css';

const {Panel} = Collapse;

const FAQ: React.FC = () => {
    const theme = {
        token: {
            colorText: '#ffffff',
        }
    };

    return (
        <ConfigProvider theme={theme}>
            <section>
                <h1 className="section-title">FAQ</h1>

                <Collapse bordered={false}>

                    <Panel className="collapse-items" header="How do I use this?" key="1">
                        <p>To request funds, simply enter your wallet address and click “Send Me ATTRA” button. We support wallets as received addresses but not smart contracts.</p>
                    </Panel>

                    <Panel header="How does it work?" key="2">
                        <p>You can request testnet ATTRA every 24h without any authentication!</p>
                    </Panel>

                    <Panel header="What is a testnet Attractor faucet?" key="3">
                        <p>Attractor faucet is a developer tool to get testnet ATTRA in order to test and troubleshoot your decentralized application or protocol before going live on Attractor mainnet, where one must use real ATTRA. Most faucets require social authentication, but the Testnet Attractor faucet is free and fast.</p>
                    </Panel>

                    <Panel header="What is a testnet token?" key="4">
                        <p>Testnet tokens are a test currency that allows you to test your Attractor application before going live on mainnet.</p>
                    </Panel>

                    <Panel header='I get an error saying “Incorrect wallet address".' key="5">
                        <p>An Ethereum-based wallet address is 42 characters long including the “0x” in the beggining. We support only wallets that follow this spec, so please make sure your wallet meets the criteria. If issues persist, you can contact our Support.</p>
                    </Panel>

                    <Panel
                        header="The faucet confirmed that it sent me test tokens, but I still have not received it. Why?"
                        key="6">
                        <p>The time it takes for you to receive your test tokens may vary. This is because the network may be congested at this time.</p>
                    </Panel>

                    <Panel header="I have been failing the Google Captcha, what shall I do?" key="7">
                        <p>This happens when you are using a VPN, which we do not control. We recommend not using VPN if that is the case.</p>
                    </Panel>

                    <Panel header="What if it doesn’t work?" key="8">
                        <p>Please contact our Support team via email <a href="mailto:support@attra.me">support@attra.me</a></p>
                    </Panel>

                </Collapse>
            </section>
        </ConfigProvider>
    );
}

export default FAQ;
