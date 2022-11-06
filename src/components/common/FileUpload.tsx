interface IFileUploadProps {
    limit: number;
    multiple?: boolean;
    name: string;
    onChange: (file: File | File[]) => void;
    isSubmitting: boolean;
    error?: string;
    ref: any;
}

const CustomBox = styled(Box)({
    '&.MuiBox-root': {
        backgroundColor: '#fff',
        borderRadius: '2rem',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        padding: '1rem'
    },
    '&.MuiBox-root:hover, &.MuiBox-root.dragover': {
        opacity: 0.6
    }
});

import { FileUpload as FileUploadIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, FormHelperText, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export const FileUpload: React.FC<IFileUploadProps> = ({
    limit,
    multiple,
    name,
    onChange,
    isSubmitting,
    error,
    ref
}) => {
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
                onChange(newFile[0]);
            }

            if (multiple) {
                const newFiles = Object.values(target.files).map((file: File) => file);
                if (newFiles) {
                    const updatedList = [...fileList, ...newFiles];
                    if (updatedList.length > limit || newFiles.length > 3) {
                        return alert(`Image must not be more than ${limit}`);
                    }
                    setFileList(updatedList);
                    onChange(updatedList);
                }
            }
        },
        [onChange, fileList, limit, multiple, singleFile]
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
        return size < 1000000 ? `${Math.floor(size / 1000)} KB` : `${Math.floor(size / 1000000)} MB`;
    };

    useEffect(() => {
        if (isSubmitting) {
            setFileList([]);
            setSingleFile([]);
        }
    }, [isSubmitting]);

    return (
        <>
            <CustomBox>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '13rem',
                        border: '2px dashed #4267b2',
                        borderRadius: '20px'
                    }}
                    ref={wrapperRef}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDragLeave}>
                    <Stack justifyContent="center" sx={{ p: 1, textAlign: 'center' }}>
                        <Typography sx={{ color: '#ccc' }}>
                            {limit > 1 ? 'Browse files to upload' : 'Browse file to upload'}
                        </Typography>
                        <div>
                            <FileUploadIcon />
                        </div>
                        <Typography variant="body1" component="span">
                            <strong>Supported Files</strong>
                        </Typography>
                        <Typography variant="body2" component="span">
                            JPG, JPEG, PNG
                        </Typography>
                    </Stack>
                    <input
                        type="file"
                        name={name}
                        ref={ref}
                        onChange={onFileDrop}
                        multiple={multiple}
                        accept="image/jpg, image/png, image/jpeg"
                        style={{
                            opacity: 0,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer'
                        }}
                    />
                </Box>
            </CustomBox>

            <FormHelperText sx={{ textAlign: 'center', my: 1 }} error={!!error}>
                {error ? error : ''}
            </FormHelperText>

            {fileList.length > 0 || singleFile.length > 0 ? (
                <Stack spacing={2} sx={{ my: 2 }}>
                    {(multiple ? fileList : singleFile).map((item, index) => {
                        return (
                            <Box
                                key={index}
                                sx={{
                                    position: 'relative',
                                    backgroundColor: '#f5f8ff',
                                    borderRadius: 1.5,
                                    p: 0.5
                                }}>
                                <Box sx={{ ml: 1 }}>
                                    <Typography>{item.name}</Typography>
                                    <Typography variant="body2">{calcSize(item.size)}</Typography>
                                </Box>
                                <IconButton
                                    onClick={() => {
                                        if (multiple) {
                                            fileRemove(item);
                                        } else {
                                            fileSingleRemove();
                                        }
                                    }}
                                    sx={{
                                        color: '#df2c0e',
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)'
                                    }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        );
                    })}
                </Stack>
            ) : null}
        </>
    );
};

export default FileUpload;
