import { Catch, ExceptionFilter } from '@nestjs/common';
import { ZodError } from 'zod';

// @Injectable({ scope: Scope.REQUEST })
// @Catch(ZodValidationException)
// export class ZodExceptionFilter implements ExceptionFilter {
//     catch(exception: ZodError, host: ArgumentsHost): void {
//         const ctx = host.switchToHttp();
//         const request = ctx.getRequest<Request>();
//         const response = ctx.getResponse();
//         const status = HttpStatus.UNPROCESSABLE_ENTITY;

//         console.log('zod error', exception);
//         exception.getZodError();

//         // response.status(status).json({
//         //     errors: exception.name,
//         //     message: exception.message,
//         //     statusCode: status,
//         // });

//         // console.log('zod kesini', exception);

//         request.session['error'] = {
//             errors: exception.name,
//             message: exception.message,
//             statusCode: status,
//         };
//     }
// }

@Catch(ZodValidationExceptionFilter)
export class ZodValidationExceptionFilter implements ExceptionFilter {
    catch(exception: ZodError): void {
        console.log('get zod error', exception);
        // exception.getZodError(); // -> ZodError
    }
}
