import React, { useState } from "react"

export const Form = ({ fields, errorMsg, loading, onSubmit }) => {
  const [formFields, setFormFields] = useState({})
  return (
    <div className="p-xxsmall">
      <form
        style={{ opacity: loading ? 0.5 : 1 }}
        onSubmit={e => {
          e.preventDefault()
          onSubmit(formFields)
        }}
      >
        {errorMsg && (
          <div className="flex icon--red section-title">
            <span>Error: </span>
            {errorMsg}
          </div>
        )}
        {fields.map((f,i) => {
          if (f.type === "text") {
            return (
              <input
                {...f}
                key={i}
                className="input__field"
                type="text"
                onChange={e => {
                  setFormFields({
                    [e.target.name]: e.target.value,
                  })
                }}
              />
            )
          }
        })}
        <div className="pt-xxsmall">
          <button className="button button--primary mb-xxsmall" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}