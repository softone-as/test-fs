import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';

const { Dragger } = Upload;

export type TUploader = UploadProps & {
    icon?: React.ReactNode;
    text?: React.ReactNode;
};

const Uploader = ({ icon, text, ...rest }: TUploader) => {
    return (
        <Dragger {...rest}>
            <p className="ant-upload-drag-icon">{icon ?? <InboxOutlined />}</p>
            {text ?? (
                <>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload
                    </p>
                </>
            )}
        </Dragger>
    );
};

export default Uploader;
