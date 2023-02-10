import { FormInstance, RuleObject, RuleRender } from 'antd/es/form';
import { AnyObject } from 'yup/lib/types';
import { useMediaQuery } from 'react-responsive';

/* 
    How to Use
    
    1. Define: 
        const yupSync = createYupSync(schema)
    2. Assign to props rules in FormItem
        rules={[yupSync]}
*/

export const createYupSync = (schema: AnyObject): RuleObject | RuleRender => {
    const ruleWithCtx =
        (fieldName?: string): RuleRender =>
        (ctx: FormInstance): RuleObject => {
            const { getFieldsValue } = ctx;
            return {
                // field using any type to avoid issue type from ant design
                async validator({ field }: any) {
                    await schema.validateSyncAt(field, getFieldsValue());
                },
                required: schema.fields[fieldName]?.exclusiveTests?.required,
            };
        };

    function rule(param: string): RuleRender;
    function rule(param: FormInstance): RuleObject;
    function rule(param) {
        if (typeof param === 'string') return ruleWithCtx(param) as RuleRender;
        else return ruleWithCtx(undefined)(param) as RuleObject;
    }

    return rule;
};

export const isMobileScreen = () => {
    return useMediaQuery({ query: '(max-width: 767px)' });
};
