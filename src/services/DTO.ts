export interface FaucetInfoResponse {
    enabled: boolean;
    address: string;
    balance: number;
    dispensation: {
        token: {
            address: string;
            symbol: string;
        };
        amount: number;
    };
}

export interface TriggerRequest {
    address: string;
}

export interface TriggerResponse {
    transaction: {
        hash: string;
        url: string;
    };
}

export interface ErrorResponse {
    statusCode: number;
    message: string;
}