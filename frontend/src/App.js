import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [successAlert, setSuccessAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [bucket, setBucket] = useState('images'); // Default to 'images'
  const fileInputRef = useRef(null);

  const buckets = ['documents', 'videos', 'images'];

  useEffect(() => {
    refreshFiles(bucket); // Refresh files when the component mounts
  }, [bucket]);

  const refreshFiles = (bucket) => {
    fetch(`http://127.0.0.1:5000/files/${bucket}`)
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch(`http://127.0.0.1:5000/files/upload/${bucket}`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'File uploaded to Minio successfully') {
            setSuccessAlert('File Successfully Uploaded');
            setErrorAlert('');
          } else {
            setErrorAlert('Upload Failed');
            setSuccessAlert('');
          }

          // Refresh the list of uploaded files after a successful upload
          refreshFiles(bucket);
        })
        .catch((error) => {
          console.error(error);
          setErrorAlert('Upload Failed');
          setSuccessAlert('');
        });
    } else {
      setErrorAlert('No file selected for upload');
      setSuccessAlert('');
    }
  };

  const handleFileClick = (fileName) => {
    setSelectedFile(fileName);
  };

  const handleDelete = () => {
    if (selectedFile) {
      fetch(`http://127.0.0.1:5000/files/delete/${bucket}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_name: selectedFile }),
      })
        .then((response) => response.json())
        .then(() => {
          setFiles((prevFiles) => prevFiles.filter((file) => file !== selectedFile));
          setSelectedFile(null);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const openFileManager = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <div className="project-heading">
        <h1>My File Manager</h1>
      </div>
      <div className="buttons-container" style={{ backgroundColor: 'yellow' }}>
        {buckets.map((b) => (
          <button key={b} onClick={() => setBucket(b)}>
            {b.charAt(0).toUpperCase() + b.slice(1)}
          </button>
        ))}
      </div>
      <div className="file-upload-container" style={{ backgroundColor: 'white' }}>
        <div className="drag-drop" onClick={openFileManager} style={{ backgroundColor: 'white' }}>
          <p>Select File</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".jpg, .jpeg, .png, .pdf, .doc, .mp4"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload File</button>
        {successAlert && <p style={{ color: 'green' }}>{successAlert}</p>}
        {errorAlert && <p style={{ color: 'red' }}>{errorAlert}</p>}
      </div>
      <div className="file-manager-container" style={{ backgroundColor: 'white' }}>
        <h2 align='center'>Uploaded Files ({bucket})</h2>
        <ul>
          {files.map((file) => (
            <li
              key={file}
              onClick={() => handleFileClick(file)}
              style={{ cursor: 'pointer' }}
            >
              {file}
            </li>
          ))}
        </ul>
      </div>
      {selectedFile && (
        <div className="file-popup" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <span className="close" onClick={() => setSelectedFile(null)} style={{ color: 'white' }}>&times;</span>
          <h2>Selected File: {selectedFile}</h2>
          {selectedFile.endsWith('.jpg') || selectedFile.endsWith('.jpeg') || selectedFile.endsWith('.png') ? (
            <img
              src={`http://127.0.0.1:9000/files/${bucket}/${selectedFile}`}
              alt={selectedFile}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          ) : null}
          {selectedFile.endsWith('.pdf') ? (
            <embed
              src={`http://127.0.0.1:9000/files/${bucket}/${selectedFile}`}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          ) : null}
          {selectedFile.endsWith('.mp4') ? (
            <video width="100%" controls>
              <source src={`http://127.0.0.1:9000/files/${bucket}/${selectedFile}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
          <button className="delete-button" onClick={handleDelete}>Delete File</button>
        </div>
      )}
    </div>
  );
}

export default App;
