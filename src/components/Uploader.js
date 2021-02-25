import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import ErrorBoundary from '../ErrorBoundary';

const buttonRef = React.createRef();

class Uploader extends Component {
  state = { loading: false, showModal: false };

  handleOnDrop = (file) => {
    console.log(file);
    console.log('---------------------------');
    fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify(file),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
      console.log('---------------------------');
    });
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.error(reason, file);
  };

  handleOnRemoveFile = (file) => {
    console.log('---------------------------');
    console.log(file);
    console.log('---------------------------');
  };

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  render() {
    return (
      <CSVReader
        onDrop={this.handleOnDrop}
        onError={this.handleOnError}
        style={{}}
        config={{ header: true }}
        addRemoveButton
        onRemoveFile={this.handleOnRemoveFile}
      >
        <span>Drag & Drop CSV file here or click to upload.</span>
      </CSVReader>
    );
  }
}

export default function UploaderWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Uploader {...props} />
    </ErrorBoundary>
  );
}
