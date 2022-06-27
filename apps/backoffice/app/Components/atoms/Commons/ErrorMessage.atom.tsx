import React, { useState } from 'react';
import { ErrorMessageText } from './ErrorMessage.atom.styled';

type ErrorMessageProps = {
    text: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
    return <ErrorMessageText>{text}</ErrorMessageText>;
};

export default ErrorMessage;
