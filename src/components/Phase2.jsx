import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { validateDataOnSubmit, validateWizardData } from "../utils/validations.js"
import FormErrorMessages from "./FormErrorMessages"
import useLocalStorage from "../hooks/useLocalStorage"
import { useHistory } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function Phase2({ onNextPhase, prevPhase }) {
  const [storedCity, setStoredCity] = useLocalStorage("city", "")
  const [storedStreet, setStoredStreet] = useLocalStorage("street", "")
  const [storedStreetNum, setStoredStreetNum] = useLocalStorage("street-number", "")

  const [isValidated, setIsValidated] = useState(false)
  const history = useHistory()
  const [wizardData, setWizardData] = useState({
    city: {
      value: storedCity,
      errors: [],
    },
    street: {
      value: storedStreet,
      errors: [],
    },
    'street-number': {
      value: storedStreetNum,
      errors: [],
    },
  })

  useEffect(() => {
    const checkValidity = () => {
      for (const attr in wizardData) {
        if (wizardData[attr].errors?.length || (!wizardData[attr].value && attr !== 'street-number')) {
          setIsValidated(false);
          return
        }
      }
      setIsValidated(true)
    }

    checkValidity()
  }, [wizardData])

  const handleChange = (e) => {
    const errors = validateWizardData(e)
    const {
      target: { name, value },
    } = e

    setWizardData((prevWizardData) => ({
      ...prevWizardData,
      [name]: {
        value,
        errors,
      },
    }))

    if (name === "city") setStoredCity(value)
    if (name === "street") setStoredStreet(value)
    if (name === "street-number") setStoredStreetNum(value)
  }

  const handleNext = (e) => {
    e.preventDefault()

    const { errors, value, name } = validateDataOnSubmit(wizardData)

    if (errors?.length > 0) {
      setWizardData((prevWizardData) => ({
        ...prevWizardData,
        [name]: {
          value,
          errors,
        },
      }))
      return
    }
    onNextPhase(wizardData)
    history.push("/phase-3")
  }

  const handlePrevPhase = () => {
    history.push("/")
    prevPhase()
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
          defaultValue={wizardData.city.value}
          required
        />
        <FormErrorMessages errors={wizardData.city.errors} />
      </Form.Group>
      <Row>
        <Col sm={9}>
          <Form.Group className="mt-3" controlId="phase2-street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Street"
              name="street"
              onBlur={handleChange}
              defaultValue={wizardData.street.value}
              required
            />
            <FormErrorMessages errors={wizardData.street.errors} />
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group className="mt-3" controlId="phase3-number">
            <Form.Label>Street N</Form.Label>
            <Form.Control
              type="number"
              name="street-number"
              defaultValue={wizardData['street-number'].value}
              onBlur={handleChange}
            />
            <FormErrorMessages errors={null} />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mt-3 d-flex justify-content-evenly form-btns">
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
          disabled={!isValidated}
        >
          Next &rArr;
        </Button>
      </Form.Group>
    </Form>
  )
}

export default Phase2
