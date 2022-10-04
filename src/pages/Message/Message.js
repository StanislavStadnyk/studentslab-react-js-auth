import React, { useState, useRef } from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Alert,
} from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const Message = ({ list, sendMessage }) => {
  const ref = useRef();
  const [selected, setSelected] = useState([]);
  const [textInTextArea, setInTextArea] = useState('');
  const [isBtnSendDisabled, setBtnSendDisabled] = useState(true);
  const [isBtnClearDisabled, setBtnClearDisabled] = useState(true);
  const [isAlertSendMessage, setAlertSendMessage] = useState(false);

  const randomId = parseInt(Math.random(new Date()) * 1000000);

  const onChangeTypeahead = (item) => {
    setSelected(item);
    setBtnClearDisabled(false);
    setAlertSendMessage(false);
    setBtnSendDisabled(true);
  };

  const onInputChangeTypeahead = (value) => {
    if (value === '') {
      setBtnClearDisabled(true);
    } else {
      setBtnClearDisabled(false);
    }
  };

  const handleClearTypeahead = () => {
    ref.current.clear();

    setSelected([]);
    setBtnClearDisabled(true);
    setInTextArea('');
  };

  const onChangeTextarea = (e) => {
    setInTextArea(e.target.value);

    if (e.target.value === '') {
      setBtnSendDisabled(true);
    } else {
      setBtnSendDisabled(false);
    }
  };

  const handleSendMessage = () => {
    sendMessage(userSelected, {
      id: randomId,
      message: textInTextArea,
    });
    setInTextArea('');
    setAlertSendMessage(true);
  };

  const userSelected = selected.length === 1 && selected[0];
  const textareaAndBtn = selected.length === 1 && !isAlertSendMessage && (
    <div>
      <FormGroup>
        <Input
          type='textarea'
          name='text'
          id='exampleText'
          placeholder='Input message'
          defaultValue={textInTextArea}
          onChange={onChangeTextarea}
        />
      </FormGroup>

      <FormGroup>
        <Button
          color='primary'
          disabled={isBtnSendDisabled}
          onClick={() => handleSendMessage()}
        >
          Send message
        </Button>
      </FormGroup>
    </div>
  );

  const alertSendMessage = selected.length === 1 && isAlertSendMessage && (
    <Alert color='success'>
      Your message for {userSelected.firstName} {userSelected.lastName} has been
      sent successfully!
    </Alert>
  );

  const typeAhead = (
    <FormGroup>
      <div className='d-flex'>
        <div className='flex-fill mr-3'>
          <Typeahead
            id='students-list'
            labelKey={(option) => `${option.firstName} ${option.lastName}`}
            ref={ref}
            onChange={onChangeTypeahead}
            onInputChange={(e) => onInputChangeTypeahead(e)}
            placeholder='Choose a student...'
            options={list}
          />
        </div>
        <Button onClick={handleClearTypeahead} disabled={isBtnClearDisabled}>
          Clear
        </Button>
      </div>
    </FormGroup>
  );

  return (
    <Card>
      <CardBody>
        <h4 className='mb-4'>Send message to anybody</h4>

        <Row>
          <Col md='8'>
            {typeAhead}
            {textareaAndBtn}
            {alertSendMessage}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Message;
