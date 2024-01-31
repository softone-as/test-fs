import { HttpException } from '@nestjs/common';

export default class UnverifiedPhoneNumberException extends HttpException {
    public errorCode: number;

    constructor(message: string) {
        super(message, 499);
        this.errorCode = 499;
    }
}
