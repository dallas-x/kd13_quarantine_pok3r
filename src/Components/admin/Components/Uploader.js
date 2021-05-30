import React, { Component, createRef } from 'react';
import { CSVReader } from 'react-papaparse';
import { Row, Container, Button } from 'reactstrap';
import ErrorBoundary from './ErrorBoundary';
import { firestore, updateUserProfileDocument } from '../../../firebase';
import { createWeek } from '../../../utilities';

const buttonRef = createRef();

class Uploader extends Component {
  state = { loaded: false, status: 'no file has been loaded' };

  handleOnDrop = async (file) => {
    const batch = firestore.batch();
    // Collect club information
    const gameInfo = (({ ClubID, GameCode, GameName, GameType, DateStarted, DateEnded }) => ({
      ClubID,
      GameCode,
      GameName,
      GameType,
      DateStarted,
      DateEnded,
    }))(file[0].data);
    const clubRef = await firestore.collection(`Clubs/${gameInfo.ClubID}/Games/`).doc();

    await batch.set(clubRef, gameInfo);
    const tpp = file.length + 1;
    console.log(this.props.newUser);
    console.log(this.props.user);
    if (this.props.newUser) {
      await updateUserProfileDocument(this.props.user, { clubID: gameInfo.ClubID });
    }
    await file.map(async ({ data }) => {
      const player = {
        Name: data.Player,
        Player_ID: data.ID,
        Hands: data.Hands,
        Profit: data.Profit,
        Rank: tpp - data.Rank,
      };
      const currentWeek = createWeek();
      const bobRef = await firestore
        .collection(`Bob/${gameInfo.ClubID}/${currentWeek}/`)
        .doc(data.ID);
      await batch.set(bobRef, player);
    });

    await batch.commit().catch((error) => {
      if (error) {
        console.log('log this error to splunk');
      }
    });
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
          <p>{this.props.newUser}</p>
          <CSVReader
            type="button"
            onDrop={this.handleOnDrop}
            onError={this.handleOnError}
            config={{ header: true, delimiter: ';', skipEmptyLines: true }}
            addRemoveButton
            onRemoveFile={this.handleOnRemoveFile}
          >
            <Button className="btn-simple" color="info">
              <i className="tim-icons icon-upload" /> Upload
            </Button>
          </CSVReader>
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
