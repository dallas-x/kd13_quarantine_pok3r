import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import { Row, Container } from 'reactstrap';
import { Redirect } from '@reach/router';
import ErrorBoundary from '../ErrorBoundary';

const buttonRef = React.createRef();

class Uploader extends Component {
  state = { loaded: false, status: 'no file has been loaded' };

  handleOnDrop = (file) => {
    console.log(file);
    console.log('---------------------------');
    fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify(file),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(
      (response) => {
        if (response.ok) {
          this.setState({ status: 'File Uploaded for Processing', loaded: true });
          console.log(response.body);
          return response.body.json();
        } else {
          this.setState({ status: 'File was rejected by Server' });
          return Promise.reject(response);
        }
      },
      (error) => {
        console.error(error);
        this.setState({ status: 'Unknown Error has occured' });
      },
    );
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.error(reason, file);
    this.setState({ status: 'There was an error while processing your request' });
  };

  handleOnRemoveFile = (file) => {
    console.log('---------------------------');
    console.log(file);
    this.setState({ status: 'File was proccessed!' });
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
      <Container>
        <Row>
          <CSVReader
            onDrop={this.handleOnDrop}
            onError={this.handleOnError}
            style={{}}
            config={{ header: true, delimiter: ';', skipEmptyLines: true }}
            addRemoveButton
            onRemoveFile={this.handleOnRemoveFile}
          >
            <span>Drag & Drop CSV file here or click to upload.</span>
          </CSVReader>
        </Row>
        <Row>
          <p>{this.state.status}</p>
        </Row>
      </Container>
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
