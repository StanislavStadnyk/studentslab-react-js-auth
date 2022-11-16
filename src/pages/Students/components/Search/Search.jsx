import React from "react";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { BsSearch } from "react-icons/bs";

const Search = ({ onChange }) => {
  return (
    <FormGroup>
      <InputGroup>
        <Input placeholder="Search student" onChange={onChange} />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <BsSearch />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </FormGroup>
  );
};

Search.propTypes = {};

export default Search;
