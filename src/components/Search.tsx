import React, { useState } from "react"
import { fetchNyTimesSearch } from "./../utils/"
import { Form } from "./Form"

export const Search = ({ apiKey }) => {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const handleSubmit = async formFields => {
    setLoading(true)
    try {
      let response = await fetchNyTimesSearch({
        apiKey,
        ...formFields,
      })
      console.log(response)
    } catch (e) {
      setErrorMsg("Unable to Authorize!")
    }
    setLoading(false)
  }
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
            type: 'text'
          },
        ]}
      />
    </div>
  )
}