import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller, useController, useFormContext } from 'react-hook-form';
import { Trash, X } from 'react-bootstrap-icons';
import uploadImage from './assets/file_upload.png';

interface IFileUploadProps {
    limit: number;
    multiple: boolean;
    name: string;
}

const FileUpload: React.FC<IFileUploadProps> = ({ limit, multiple, name }) => {
    const {
        control,
        formState: { isSubmitting, errors },
    } = useFormContext();

    const { field } = useController({ name, control });
    const [singleFile, setSingleFile] = useState<File[]>([]);
    const [fileList, setFileList] = useState<File[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');

    const onFileDrop = useCallback(
        (e: React.SyntheticEvent<EventTarget>) => {
            const target = e.target as HTMLInputElement;
            if (!target.files) return;

            if (limit === 1) {
                const newFile = Object.values(target.files).map((file: File) => file);
                if (singleFile.length >= 1) return alert('Only a single image allowed');
                setSingleFile(newFile);
                field.onChange(newFile[0]);
            }

            if (multiple) {
                const newFiles = Object.values(target.files).map((file: File) => file);
                if (newFiles) {
                    const updatedList = [...fileList, ...newFiles];
                    if (updatedList.length > limit || newFiles.length > 3) {
                        return alert(`Файлов не может быть больше, чем ${ limit }`);
                    }
                    setFileList(updatedList);
                    field.onChange(updatedList);
                }
            }
        },
        [field, fileList, limit, multiple, singleFile],
    );

    const fileRemove = (file: File) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
    };

    const fileSingleRemove = () => {
        setSingleFile([]);
    };

    const calcSize = (size: number) => {
        return size < 1000000
            ? `${ Math.floor(size / 1000) } KB`
            : `${ Math.floor(size / 1000000) } MB`;
    };

    useEffect(() => {
        if (isSubmitting) {
            setFileList([]);
            setSingleFile([]);
        }
    }, [isSubmitting]);

    return (
        <>
            <div>
                <div
                    className={ 'd-flex flex-column justify-content-center align-items-center' }
                    style={ {
                        position: 'relative',
                        width: '100%',
                        height: '13rem',
                        border: '2px dashed #4267b2',
                        borderRadius: '20px',
                        backgroundColor: '#eeeeee',
                    } }
                    ref={ wrapperRef }
                    onDragEnter={ onDragEnter }
                    onDragLeave={ onDragLeave }
                    onDrop={ onDragLeave }
                >
                    <div className="d-flex flex-column text-center justify-content-center p-1">
                        <div style={ { color: '#ccc' } }>
                            { limit > 1 ? 'Browse files to upload' : 'Browse file to upload' }
                        </div>
                        <div>
                            <img
                                src={uploadImage}
                                alt="file upload"
                                style={ { width: '5rem' } }
                            />
                        </div>
                        <span>
                            <strong>Supported Files</strong>
                        </span>
                        <span>
                            JPG, JPEG, PNG
                        </span>
                    </div>
                    <Controller
                        name={ name }
                        defaultValue=""
                        control={ control }
                        render={ ({ field: { name, onBlur, ref } }) => (
                            <input
                                type="file"
                                name={ name }
                                onBlur={ onBlur }
                                ref={ ref }
                                onChange={ onFileDrop }
                                multiple={ multiple }
                                accept="image/jpg, image/png, image/jpeg"
                                style={ {
                                    opacity: 0,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    cursor: 'pointer',
                                } }
                            />
                        ) }
                    />
                </div>
            </div>

            <Form.Control.Feedback type="invalid"
                                   style={ { textAlign: 'center', margin: 1 } }
            >
                { errors?.[name]?.message?.toString() }
            </Form.Control.Feedback>

            {/* ?Image Preview ? */ }
            { fileList.length > 0 || singleFile.length > 0 ? (
                <div className={ 'd-flex flex-column gap-2 my-2' }>
                    { (multiple ? fileList : singleFile).map((item, index) => {
                        return (
                            <div
                                key={ index }
                                className={ 'p-2 px-4' }
                                style={ {
                                    position: 'relative',
                                    backgroundColor: '#f5f8ff',
                                    borderRadius: 1.5,
                                } }
                            >
                                <div className="">
                                    <div className={ 'me-1' }>
                                        <div>{ item.name }</div>
                                        <div>
                                            { calcSize(item.size) }
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant={'link'}
                                    onClick={ () => {
                                        if (multiple) {
                                            fileRemove(item);
                                        } else {
                                            fileSingleRemove();
                                        }
                                    } }
                                    style={ {
                                        color: '#df2c0e',
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                    } }
                                >
                                    <Trash className={'fs-4'} />
                                </Button>
                            </div>
                        );
                    }) }
                </div>
            ) : null }
        </>
    );
};

export default FileUpload;
