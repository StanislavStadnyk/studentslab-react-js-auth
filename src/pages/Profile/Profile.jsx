import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import { supabase } from "../../services/supabaseClient";
import { useAuth } from "../../hooks";
import Loader from "../../components/Loader/Loader";
import Avatar from "../../components/Avatar/Avatar";

const Profile = () => {
  const [isLoading, setLoading] = useState(false);
  const { user, profile, setProfile } = useAuth();

  const getProfile = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) throw error;

      if (data) {
        setProfile({
          username: data.username,
          website: data.website,
          avatar_url: data.avatar_url,
        });
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // TODO: need to remove warning
    if (!profile) getProfile();
  }, [profile]);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username: profile.username,
        website: profile.website,
        avatar_url: profile.avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <div>No data</div>;
  }

  return (
    <Card>
      <CardBody>
        <h4 className="mb-4">Profile</h4>

        <Loader isLoading={isLoading}>
          <Form onSubmit={updateProfile}>
            <Row>
              <Col md={3}>
                <Avatar
                  url={profile.avatar_url}
                  size={146}
                  onUpload={(url) => {
                    setProfile({
                      ...profile,
                      avatar_url: url,
                    });
                  }}
                />
              </Col>

              <Col md={9}>
                <FormGroup row={true}>
                  <Label for="email" sm={3}>
                    Email:
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="email"
                      name="email"
                      placeholder="with a placeholder"
                      type="email"
                      value={user.email}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row={true}>
                  <Label for="name" sm={3}>
                    Name:
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={profile.username || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          username: e.target.value,
                        })
                      }
                    />
                  </Col>
                </FormGroup>

                <FormGroup row={true}>
                  <Label for="name" sm={3}>
                    Website:
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={profile.website || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          website: e.target.value,
                        })
                      }
                    />
                  </Col>
                </FormGroup>
              </Col>
            </Row>

            <Button block={true} color="success" disabled={isLoading}>
              Update profile
            </Button>
          </Form>
        </Loader>
      </CardBody>
    </Card>
  );
};

export default Profile;
