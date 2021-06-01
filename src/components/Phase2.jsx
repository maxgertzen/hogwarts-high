import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { validateDataOnSubmit } from "../validations"

function Phase2({ onNextPhase, prevPhase }) {
  const history = useHistory()
  const [formProps, setFormProps] = useState({
    city: {
      value: "",
      errors: [],
    },
    street: {
      value: "",
      errors: [],
    },
    streetNumber: {
      value: "",
      errors: [],
    },
  })

  const handleChange = ({ target: { name, value } }, func) => {
    func((prevObj) => {
      return {
        ...prevObj,
        [name]: value,
      }
    })
  }

  const handleNext = (e) => {
    e.preventDefault()

    const { errors, value, name } = validateDataOnSubmit(formProps)

    if (errors.length > 0) {
      setFormProps((prevFormProps) => ({
        ...prevFormProps,
        [name]: {
          value,
          errors,
        },
      }))
      return
    }

    onNextPhase(formProps)
    history.push("/phase-3")
  }

  const handlePrevPhase = () => {
    history.push("/")
  }
  return (
    <Form>
      <Form.Group controlId="phase2-city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter City"
          name="city"
          onChange={(e) => handleChange(e, setFormProps)}
          required
        />
      </Form.Group>
      <Form.Group controlId="phase2-street">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Street"
          name="street"
          onChange={(e) => handleChange(e, setFormProps)}
          required
        />
      </Form.Group>
      <Form.Group controlId="phase3-number">
        <Form.Check
          type="number"
          label="N"
          name="streetNumber"
          onChange={(e) => handleChange(e, setFormProps)}
        />
      </Form.Group>
      <Button variant="success" type="button" onClick={(e) => handleNext(e)}>
        Next
      </Button>
      {prevPhase ? (
        <Button
          variant="outline-success"
          type="button"
          onClick={() => handlePrevPhase()}
        >
          Back
        </Button>
      ) : null}
    </Form>
  )
}

export default Phase2
