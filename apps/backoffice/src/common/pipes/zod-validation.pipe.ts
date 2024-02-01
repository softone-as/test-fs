import { BadRequestException, Logger } from '@nestjs/common';
import { ZodError } from 'zod';
import { createZodValidationPipe } from 'nestjs-zod';

export const MyZodValidationPipe = createZodValidationPipe({
    // provide custom validation exception factory
    createValidationException: (error: ZodError) => {
        Logger.log('zod error', error);
        return new BadRequestException('Ooops');
    },
});
