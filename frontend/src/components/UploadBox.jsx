import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
    FaCloudUploadAlt,
    FaFileAudio,
    FaCheckCircle,
} from "react-icons/fa";

const UploadBox = ({ onFileSelect }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {

        if (acceptedFiles.length > 0) {

            setSelectedFile(acceptedFiles[0]);

            onFileSelect(acceptedFiles[0]);

        }

    }, [onFileSelect]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({

        accept: {
            "audio/*": [],
        },

        multiple: false,

        onDrop,

    });

    return (

        <div
            {...getRootProps()}
            className={`upload-box ${isDragActive ? "active" : ""}`}
        >

            <input {...getInputProps()} />

            <FaCloudUploadAlt className="upload-icon" />

            <h2>
                {isDragActive
                    ? "Drop your audio here"
                    : "Drag & Drop Audio"}
            </h2>

            <p className="upload-subtitle">

                Supports

                <strong>
                    {" "}
                    MP3 • WAV • M4A • FLAC
                </strong>

            </p>

            <div className="divider">

                <span>OR</span>

            </div>

            <button type="button">

                Select Audio

            </button>

            <small className="upload-note">

                Maximum file size: 50 MB

            </small>

            {selectedFile && (

                <div className="selected-file">

                    <FaCheckCircle />

                    <FaFileAudio />

                    <span>{selectedFile.name}</span>

                </div>

            )}

        </div>

    );

};

export default UploadBox;