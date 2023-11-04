import React, { useState, useRef } from 'react';
import Header from './components/Header/Header';
import FormSection from './components/Form/FormSection';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import ReCAPTCHA from "react-google-recaptcha";

function App() {
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const recaptchaRef = useRef(null);
    const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY || "";

    const onReCAPTCHAVerified = (value: string | null) => {
        setCaptchaValue(value);
    };

    return (
        <div>
            <Header />
            <FormSection captchaValue={captchaValue} setCaptchaValue={setCaptchaValue} recaptchaRef={recaptchaRef} />
            <FAQ />
            <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={recaptchaKey}
                onChange={onReCAPTCHAVerified}
            />
            <Footer />
        </div>
    );
}

export default App;
