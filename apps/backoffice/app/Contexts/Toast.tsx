import { createContext } from 'react'
// import { IUser } from '../../../../interface-models/iam/user.interface'

export interface IToastContext {
    username: string
}

export const ToastContext = createContext<Partial<IToastContext>>({})