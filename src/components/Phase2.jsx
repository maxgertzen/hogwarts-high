import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { validateDataOnSubmit, validateWizardData } from "../validations"
import FormErrorMessages from "./FormErrorMessages"
import useLocalStorage from "../hooks/useLocalStorage"
import { useHistory } from "react-router-dom"

function Phase2({ onNextPhase }) {
  const [storedCity, setStoredCity] = useLocalStorage("city", "")
  const [storedStreet, setStoredStreet] = useLocalStorage("street", "")
  const [storedStreetNum, setStoredStreetNum] = useLocalStorage(
    "streetNumber",
    ""
  )
  const history = useHistory()
  const [formProps, setFormProps] = useState({
    city: {
      value: storedCity,
      errors: [],
    },
    street: {
      value: storedStreet,
      errors: [],
    },
    streetNumber: {
      value: storedStreetNum,
      errors: [],
    },
  })

  const handleChange = (e) => {
    const errors = validateWizardData(e)
    const {
      target: { name, value },
    } = e

    setFormProps((prevFormProps) => ({
      ...prevFormProps,
      [name]: {
        value,
        errors,
      },
    }))

    if (name === "city") setStoredCity(value)
    if (name === "street") setStoredStreet(value)
    if (name === "streetNumber") setStoredStreetNum(value)
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
    <Form className="p-3">
      <Form.Group className="mt-3" controlId="phase2-city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter City"
          name="city"
          onBlur={handleChange}
          defaultValue={formProps.city.value}
          required
        />
        <FormErrorMessages errors={formProps.city.errors} />
      </Form.Group>

      <Form.Group className="mt-3" controlId="phase2-street">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Street"
          name="street"
          onBlur={handleChange}
          defaultValue={formProps.street.value}
          required
        />
        <FormErrorMessages errors={formProps.street.errors} />
      </Form.Group>

      <Form.Group className="mt-3" controlId="phase3-number">
        <Form.Label>Street Number</Form.Label>
        <Form.Control
          type="number"
          label="N"
          name="streetNumber"
          defaultValue={formProps.streetNumber.value}
          onBlur={handleChange}
        />
      </Form.Group>
      <Form.Group className="mt-3 d-flex justify-content-evenly">
        <Button
          className="w-25"
          variant="outline-success"
          type="button"
          onClick={handlePrevPhase}
        >
          &lArr; Back
        </Button>
        <Button
          className="w-25"
          variant="success"
          type="button"
          onClick={(e) => handleNext(e)}
        >
          Next &rArr;
        </Button>
      </Form.Group>
    </Form>
  )
}

export default Phase2
