import React, { useState, useRef } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Alert,
  FormText,
  Form,
} from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks";
import { supabase } from "../../services/supabaseClient";
import Loader from "../../components/Loader/Loader";

const Message = ({ list }) => {
  const ref = useRef();
  const [selected, setSelected] = useState([]);
  const [textInTextArea, setInTextArea] = useState("");
  const [isBtnSendDisabled, setBtnSendDisabled] = useState(true);
  const [isBtnClearDisabled, setBtnClearDisabled] = useState(true);
  const [isAlertSendMessage, setAlertSendMessage] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const data = useAuth();

  const onChangeTypeahead = (item) => {
    setSelected(item);
    setBtnClearDisabled(false);
    setAlertSendMessage(false);
    setBtnSendDisabled(true);
  };

  const onInputChangeTypeahead = (value) => {
    if (value === "") {
      setBtnClearDisabled(true);
    } else {
      setBtnClearDisabled(false);
    }
  };

  const handleClearTypeahead = () => {
    ref.current.clear();

    setSelected([]);
    setBtnClearDisabled(true);
    setInTextArea("");
  };

  const onChangeTextarea = (e) => {
    setInTextArea(e.target.value);

    if (e.target.value.length <= 5) {
      setBtnSendDisabled(true);
    } else {
      setBtnSendDisabled(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase
        .from("messages")
        .insert({
          text: textInTextArea,
          authorName: data?.profile?.username,
          studentId: userSelected.id,
        })
        .select();

      if (error) throw error;

      setInTextArea("");
      setAlertSendMessage(true);
    } catch (error) {
      toast(error.message, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const userSelected = selected.length === 1 && selected[0];
  const textareaAndBtn = selected.length === 1 && !isAlertSendMessage && (
    <div>
      <FormGroup>
        <Input
          type="textarea"
          name="text"
          id="exampleText"
          placeholder="Input message"
          defaultValue={textInTextArea}
          onChange={onChangeTextarea}
        />
        <FormText>Min length 5 characters!</FormText>
      </FormGroup>

      <FormGroup>
        <Button color="primary" type="submit" disabled={isBtnSendDisabled}>
          Send message
        </Button>
      </FormGroup>
    </div>
  );

  const alertSendMessage = selected.length === 1 && isAlertSendMessage && (
    <Alert color="success">
      Your message for {userSelected.firstName} {userSelected.lastName} has been
      sent successfully!
    </Alert>
  );

  const typeAhead = (
    <FormGroup>
      <div className="d-flex">
        <div className="flex-fill mr-3">
          <Typeahead
            id="students-list"
            labelKey={(option) => `${option.firstName} ${option.lastName}`}
            ref={ref}
            onChange={onChangeTypeahead}
            onInputChange={(e) => onInputChangeTypeahead(e)}
            placeholder="Choose a student..."
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
        <h4 className="mb-4">Send message to anybody</h4>

        <Row>
          <Col md="8">
            <Loader isLoading={isLoading}>
              <Form onSubmit={handleSendMessage}>
                {typeAhead}
                {textareaAndBtn}
                {alertSendMessage}
              </Form>
            </Loader>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Message;
