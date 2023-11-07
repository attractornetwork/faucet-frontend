import React, {useState, useEffect, useCallback} from 'react';
import {Input, Button, Form} from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import './FormSection.css';
import ApiService from "../../services/apiService";
import {isValidAddress, isErrorResponse} from '../../utils/utils';
import {ErrorResponse} from "../../services/DTO";
import SuccessMessage from "../SuccessMessage/SuccessMessage";

interface FormSectionProps {
    captchaValue: string | null;
    setCaptchaValue: React.Dispatch<React.SetStateAction<string | null>>;
    recaptchaRef: React.MutableRefObject<ReCAPTCHA | null>;
}

const FormSection = ({captchaValue, setCaptchaValue, recaptchaRef}: FormSectionProps) => {
    const [state, setState] = useState({
        address: '',
        error: null as string | null,
        tokenName: 'ATTRA',
        tokenAmount: 1,
        availableBalance: null as number | null,
        enabled: true,
        isLoading: false,
        transactionUrl: null as string | null
    });

    const fetchData = async () => {
        try {
            const response = await ApiService.getInfo();
            setState(prevState => ({
                ...prevState,
                tokenAmount: response.dispensation.amount,
                tokenName: response.dispensation.token.symbol,
                availableBalance: response.balance,
                enabled: response.enabled
            }));
        } catch (error) {
            console.error("Error fetching faucet info:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (captchaValue) {
            submitForm().finally(() => {
                setCaptchaValue(null);
            });
        }
    }, [captchaValue]);

    const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputAddress = e.target.value;
        setState(prevState => ({
            ...prevState,
            address: inputAddress,
            error: isValidAddress(inputAddress) ? null : 'Incorrect wallet address',
            transactionUrl: null
        }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        if (!isValidAddress(state.address)) {
            setState(prevState => ({
                ...prevState,
                error: 'Incorrect wallet address'
            }));
            return;
        }

        setState(prevState => ({
            ...prevState,
            isLoading: true,
            transactionUrl: null
        }));

        recaptchaRef.current?.execute();
    };

    async function submitForm() {
        try {
            const response = await ApiService.triggerTokens({address: state.address}, captchaValue);

            setState(prevState => ({
                ...prevState,
                address: '',
                isLoading: false,
                error: null,
                transactionUrl: response.transaction.url
            }));
        } catch (err) {
            setState(prevState => ({
                ...prevState,
                isLoading: false
            }));

            if (isErrorResponse(err)) {
                const specificError = err as ErrorResponse;
                setState(prevState => ({
                    ...prevState,
                    error: specificError.message
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    error: 'Unexpected error. Please try again later.'
                }));
            }
        } finally {
            recaptchaRef.current?.reset();
        }
    }

    return (
        <div className="form-container">
            <section>
                <h1 className="section-title">Get Test Tokens</h1>
                <p className="form-description">
                    <>
                        This faucet transfers {state.tokenName} for testing and covering Gas fees on Attractor zkEVM
                        testnet.
                        <b> {state.tokenAmount} {state.tokenName}</b> per address per 24h is available.
                        <br/>
                        <br/>
                        Available balance: <b>{state.availableBalance} {state.tokenName}</b>
                    </>
                </p>
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        className="item-wrapper"
                        validateStatus={state.error ? 'error' : 'validating'}
                        help={state.error || ''}
                    >
                        <Input
                            className="form-input"
                            type="text"
                            value={state.address}
                            onChange={handleAddressChange}
                            placeholder="Wallet address"
                            onBlur={() => {
                                setState(prevState => ({
                                    ...prevState,
                                    error: isValidAddress(state.address) ? null : 'Incorrect wallet address'
                                }));
                            }}
                        />
                    </Form.Item>
                    <Form.Item className="item-wrapper">
                        <Button
                            className="form-button"
                            type="primary"
                            htmlType="submit"
                            disabled={!state.enabled || state.isLoading}
                        >
                            {state.isLoading ? "Loading..." : (state.enabled ? (state.tokenName ? `Get ${state.tokenName} tokens` : "Get tokens") : "Faucet currently unavailable, please try later.")}
                        </Button>
                    </Form.Item>
                    {state.transactionUrl && (
                        <SuccessMessage
                            title="Successful!"
                            onClose={() => setState(prevState => ({
                                ...prevState,
                                transactionUrl: null,
                                successMessage: null
                            }))}
                        >
                            Tokens are successfully sent. Check the transaction in the
                            <a href={state.transactionUrl} target="_blank" rel="noopener noreferrer"> explorer</a>
                        </SuccessMessage>
                    )}
                </Form>
            </section>
        </div>
    );
}

export default FormSection;