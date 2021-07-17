import React, { useState } from "react";
import { fetchNyTimesSearch, sendJsonMessage } from "./../utils/";
import { Form } from "./Form";
import { FILL_RESULTS } from "../messages";

export const Search = ({ apiKey }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const handleSubmit = async formFields => {
    setLoading(true);
    try {
      let response = await fetchNyTimesSearch({
        apiKey,
        ...formFields
      });
      setLoading(false);
      sendJsonMessage(FILL_RESULTS, {
        response
      });
    } catch (e) {
      setErrorMsg("Unable to Authorize!");
    }
    setLoading(false);
  };
  return (
    <div>
      <Form
        loading={loading}
        onSubmit={handleSubmit}
        errorMsg={errorMsg}
        fields={[
          {
            name: "q",
            placeholder: "Search NY Times...",
            type: "text"
          }
        ]}
      />
    </div>
  );
};
