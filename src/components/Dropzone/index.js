import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone';

import './styles.css';

const Dropzone = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'video/*'
  })

  return (
    <div className="upload" {...getRootProps()}>
      <input {...getInputProps()} accept="video/*" />
      <p>Arraste arquivos ou clique aqui</p>
    </div>
  )
}

export default Dropzone;