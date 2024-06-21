import { IStudio } from 'interface-models/movie/studio.interface';
import { z } from 'zod';

export const StudioCreateSchema = z.object({
    studioNumber: z.coerce
        .number({
            required_error: 'Field wajib diisi',
        })
        .min(1, {
            message: 'Nomor studio minimal 1',
        }),
    seatCapacity: z.coerce
        .number({
            required_error: 'Field wajib diisi',
        })
        .min(1, {
            message: 'Kapasitas tempat duduk minimal 1',
        }),
});

export type TStudioCreateSchema = z.infer<typeof StudioCreateSchema>;

export type TCStudioFormProps = {
    id?: number;
    data?: IStudio;
    isUpdate?: boolean;
};
