import { ITag } from 'interface-models/movie/tag.interface';
import { z } from 'zod';

export const TagCreateSchema = z.object({
    name: z.string({
        required_error: 'Field wajib diisi',
    }),
});

export type TTagCreateSchema = z.infer<typeof TagCreateSchema>;

export type TCTagFormProps = {
    id?: number;
    data?: ITag;
    isUpdate?: boolean;
};
