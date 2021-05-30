import React, { useEffect, useState, useRef } from 'react';
import { auth } from '../../firebase';
import classnames from 'classnames';
import purpleBlock from 'url:../../assets/img/square-purple-1.png';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import NotificationAlert from 'react-notification-alert';

const Registration = () => {
  const [squares1to6, setSquares1to6] = useState('');
  const [squares7and8, setSquares7and8] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const notificationAlertRef = useRef(null);
  const history = useHistory();
  useEffect(() => {
    document.body.classList.toggle('register-page');
    document.documentElement.addEventListener('mousemove', followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle('register-page');
      document.documentElement.removeEventListener('mousemove', followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      'perspective(500px) rotateY(' + posX * 0.05 + 'deg) rotateX(' + posY * -0.05 + 'deg)',
    );
    setSquares7and8(
      'perspective(500px) rotateY(' + posX * 0.02 + 'deg) rotateX(' + posY * -0.02 + 'deg)',
    );
  };
  const fireRegistration = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        if (userCredential.additionalUserInfo.isNewUser) {
          history.push('/admin/upload');
        } else history.go('/admin');
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;
        const options = {
          place: 'tr',
          message: errorMessage,
          type: 'danger',
          icon: 'tim-icons icon-bell-55',
          autoDismiss: 7,
        };
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
          notificationAlertRef.current.notificationAlert(options);
        } else {
          errorMessage = 'An uknown error has occurred, please contact support!';
          notificationAlertRef.current.notificationAlert(options);
        }
      });
  };
  return (
    <div className="wrapper">
      <NotificationAlert ref={notificationAlertRef} />
      <div className="page-header">
        <div className="page-header-image" />
        <div className="content">
          <Container>
            <Row>
              <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                <div className="square square-7" id="square7" style={{ transform: squares7and8 }} />
                <div className="square square-8" id="square8" style={{ transform: squares7and8 }} />
                <Card className="card-register">
                  <CardHeader>
                    <CardImg alt="..." src={purpleBlock} />
                    <CardTitle tag="h4">Register</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form
                      className="form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        fireRegistration(email, password);
                      }}
                    >
                      <InputGroup
                        className={classnames({
                          'input-group-focus': emailFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="email"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      <InputGroup
                        className={classnames({
                          'input-group-focus': passwordFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="*********"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={(e) => setPasswordFocus(true)}
                          onBlur={(e) => setPasswordFocus(false)}
                        />
                      </InputGroup>
                      <FormGroup check className="text-left">
                        <Label check>
                          <Input type="checkbox" />
                          <span className="form-check-sign" />I agree to the{' '}
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            terms and conditions
                          </a>
                          .
                        </Label>
                      </FormGroup>
                      <br />
                      <FormGroup>
                        <Button className="btn-round" color="primary" size="lg">
                          Get Started
                        </Button>
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <a
                      className="btn btn-round"
                      color="secondary"
                      tag={Link}
                      to="/login"
                      href="/login"
                    >
                      Have an Account?
                    </a>
                    <p>We are not accepting new accounts at this time!</p>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <div className="register-bg" />
            <div className="square square-1" id="square1" style={{ transform: squares1to6 }} />
            <div className="square square-2" id="square2" style={{ transform: squares1to6 }} />
            <div className="square square-3" id="square3" style={{ transform: squares1to6 }} />
            <div className="square square-4" id="square4" style={{ transform: squares1to6 }} />
            <div className="square square-5" id="square5" style={{ transform: squares1to6 }} />
            <div className="square square-6" id="square6" style={{ transform: squares1to6 }} />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Registration;
