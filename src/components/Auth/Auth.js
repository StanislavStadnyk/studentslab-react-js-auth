import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";

import { supabase } from "../../services/supabaseClient";
import { useAuth } from "../../hooks";
import { PROD_URL } from "../../config";
import Loader from "../Loader/Loader";

const Auth = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const isBtnDisabled = email === "";
  const { token } = useAuth();

  if (token) {
    return <Redirect to={`${PROD_URL}`} />;
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });

      if (error) throw error;
      toast("Check your email for the login link!", {
        type: "success",
      });
    } catch (error) {
      toast(error.error_description || error.message, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e) => setEmail(e.target.value);

  return (
    <Row>
      <Col
        md={{
          offset: 3,
          size: 6,
        }}
      >
        <Card>
          <CardBody aria-live="polite">
            <Loader isLoading={isLoading} text="Sending magic link...">
              <h1 className="mb-4">Supabase + React</h1>
              <p className="mb-4">
                Sign in via magic link with your email below
              </p>

              <Form onSubmit={handleOnSubmit}>
                <FormGroup>
                  <Input
                    id="email"
                    className="inputField"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={handleOnChange}
                  />
                </FormGroup>

                <Button
                  color="success"
                  block={true}
                  className="text-uppercase"
                  type="submit"
                  disabled={isBtnDisabled}
                >
                  Send magic link
                </Button>
              </Form>
            </Loader>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Auth;
