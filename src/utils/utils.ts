import {ErrorResponse} from "../services/DTO";

export const isValidAddress = (address: string): boolean => {
    const pattern = /^0x[a-fA-F0-9]{40}$/;
    return pattern.test(address);
};

export function isErrorResponse(obj: any): obj is ErrorResponse {
    return obj && typeof obj.statusCode === 'number' && typeof obj.message === 'string';
}