import React, { useContext, useEffect } from 'react';
import { Col, Form, FormInstance, Row } from 'antd';
import { isMobileScreen } from 'apps/backoffice/app/Utils/utils';
import InputCollection, { StrictSelectProps } from './InputCollection';
import { StrictDateRangePickerProps } from './InputCollection/DateRangePicker';

export type InternalHooks = {
    registerWatch: (FC: (store: Record<string, any>) => void) => void;
};
export interface IFilterFormInstance<T = any> extends FormInstance<T> {
    getInternalHooks: (mark: string) => InternalHooks;
}
export const HOOK_MARK = 'RC_FORM_INTERNAL_HOOKS';

type RegisterFilterItem<
    P extends Record<string, any>,
    N extends string | undefined,
> = P & {
    name: string;
    filterType?: N;
};

type CustomFilterProps = {
    render: React.FC;
};

export type TFilterItem =
    | RegisterFilterItem<StrictSelectProps, 'Select'>
    | RegisterFilterItem<StrictDateRangePickerProps, 'DateRangePicker'>
    | RegisterFilterItem<CustomFilterProps, undefined>;

export interface IFilterProps {
    children: React.ReactNode;
    onChange: (store: Record<string, any>) => void;
}

interface IFilterContextValues {
    isMobile?: boolean;
}

const FilterContext = React.createContext<IFilterContextValues>({
    isMobile: undefined,
});

const Filter = ({ children, onChange }: IFilterProps) => {
    const [form] = Form.useForm();
    const isMobile = isMobileScreen();

    useEffect(() => {
        const { registerWatch } = (
            form as IFilterFormInstance
        ).getInternalHooks(HOOK_MARK);

        const cancelRegister = registerWatch(onChange);
        return cancelRegister;
    }, []);

    return (
        <FilterContext.Provider value={{ isMobile }}>
            <Form form={form}>
                <Row gutter={[8, 0]} align="middle">
                    {children}
                </Row>
            </Form>
        </FilterContext.Provider>
    );
};

const FilterInputNotFound = () => <div></div>;

const FilterItem = (props: TFilterItem) => {
    const { name, filterType, ...rest } = props;
    const { isMobile } = useContext(FilterContext);

    const customFilterProps = props as CustomFilterProps;

    const Component =
        InputCollection[filterType] ||
        customFilterProps.render ||
        FilterInputNotFound;

    return (
        <Col style={{ margin: isMobile ? '5px 0' : '2px' }}>
            <Form.Item name={name} noStyle>
                <Component {...(rest as any)} />
            </Form.Item>
        </Col>
    );
};

Filter.Item = FilterItem;

export default Filter;
