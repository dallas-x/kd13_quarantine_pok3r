import React, { useEffect, useState, useContext, useRef } from 'react';
import { auth } from '../../firebase';
import classnames from 'classnames';
import purpleBlock from 'url:../../assets/img/square-purple-1.png';
import { useHistory } from 'react-router-dom';
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
import NotificationAlert from 'react-notification-alert';

const Login = () => {
  const [squares1to6, setSquares1to6] = useState('');
  const [squares7and8, setSquares7and8] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [termsConditions, setTermsConditions] = useState(false);
  const [readTerms, setReadTerms] = useState(false);
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

  const fireLogin = async (username, password) => {
    auth
      .signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        if (userCredential.user.isNewUser) {
          history.replace('/admin/upload');
        } else history.replace('/admin');
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
                    <CardTitle tag="h4">Login</CardTitle>
                  </CardHeader>

                  <CardBody className="form">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        fireLogin(username, password);
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
                          placeholder="Email"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
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
                          placeholder="Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={(e) => setPasswordFocus(true)}
                          onBlur={(e) => setPasswordFocus(false)}
                        />
                      </InputGroup>
                      <FormGroup check className="text-left">
                        <Label check>
                          <Input
                            type="checkbox"
                            checked={termsConditions}
                            onChange={(e) => {
                              setTermsConditions(e.target.checked);
                            }}
                          />
                          <span className="form-check-sign" />I agree to the{' '}
                          <a
                            href="https://github.com/k1ddarkn3ss/kd13_quarantine_pok3r/blob/main/DOCS/Rules/TERMS_OF_USE.MD"
                            onClick={(e) => {
                              e.preventDefault();
                              setReadTerms(true);
                            }}
                          >
                            terms and conditions
                          </a>
                          .
                        </Label>
                      </FormGroup>
                      <br />
                      <FormGroup>
                        <Button
                          disabled={!termsConditions}
                          className="btn-round"
                          color="primary"
                          size="lg"
                        >
                          Login
                        </Button>
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <a
                      className="btn btn-round"
                      color="secondary"
                      tag={Link}
                      to="/registration"
                      href="/registration"
                    >
                      Need an account
                    </a>
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

export default Login;
