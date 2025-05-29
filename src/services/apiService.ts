import axios from 'axios';
import {AxiosResponse} from 'axios';
import {FaucetInfoResponse, TriggerRequest, TriggerResponse} from "./DTO";

class ApiService {
    private http = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            'X-Real-IP': window.location.hostname === 'localhost' ? '127.0.0.1' : undefined
        }
    });

    private async handleRequest<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
        try {
            const response = await request;
            return response.data;
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const axiosError = error as { response?: { data?: unknown } };
                if (axiosError.response?.data) {
                    throw axiosError.response.data;
                }
            }
            throw error;
        }
    }

    async getInfo(): Promise<FaucetInfoResponse> {
        return this.handleRequest(this.http.get<FaucetInfoResponse>('/faucet/info'));
    }

    async triggerTokens(body: TriggerRequest, captchaValue: string | null): Promise<TriggerResponse> {
        const config = {
            headers: {
                'X-Captcha-Value': captchaValue || ''
            },
        };
        return this.handleRequest(this.http.post<TriggerResponse>('/faucet/trigger', body, config));
    }
}

export default new ApiService();
