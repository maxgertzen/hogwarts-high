import React, { useState, useEffect } from "react"
import { FormControl, Button, Form } from "react-bootstrap"
import useLocalStorage from "../hooks/useLocalStorage"
import { useHistory } from "react-router-dom"
import { validateDataOnSubmit, validateWizardData } from "../validations"
import FormErrorMessages from "./FormErrorMessages"

const Phase1 = ({ onNextPhase }) => {
  const [storedFullName, setStoredFullName] = useLocalStorage("fullname", "")
  const [storedEmail, setStoredEmail] = useLocalStorage("email", "")
  const [storedBirthDate, setStoredBirthDate] = useLocalStorage("birthDate", "")
  const history = useHistory()
  const [isValidated, setIsValidated] = useState(true)
  const [wizardData, setWizardData] = useState({
    fullname: {
      value: storedFullName,
      errors: [],
    },
    email: {
      value: storedEmail,
      errors: [],
    },
    birthDate: {
      value: storedBirthDate,
      errors: [],
    },
  })

  useEffect(() => {
    const checkValidity = () => {
      for (const attr in wizardData) {
        if (wizardData[attr].errors.length) {
          setIsValidated(false);
          return
        }
      }
      setIsValidated(true)
    }

    checkValidity()
  }, [wizardData])

  const handleUpdatingWizardData = (e) => {
    const errors = validateWizardData(e);

    const {
      target: { name, value },
    } = e

    setWizardData((prevWizardData) => ({
      ...prevWizardData,
      [name]: {
        value: value,
        errors,
      },
    }))
    if (name === "fullname") setStoredFullName(value)
    if (name === "email") setStoredEmail(value)
    if (name === "birthDate") setStoredBirthDate(value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const { errors, value, name } = validateDataOnSubmit(wizardData)

    if (errors.length > 0) {
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
    history.push("/phase-2")
  }

  return (
    <Form className="p-3 ">
      <Form.Group className="mt-3" controlId="fullname">
        <Form.Label>Full Name</Form.Label>
        <FormControl
          placeholder="Your name"
          name="fullname"
          onBlur={handleUpdatingWizardData}
          aria-label="Fullname"
          aria-describedby="basic-addon1"
          defaultValue={wizardData.fullname.value}
        />
        <FormErrorMessages errors={wizardData.fullname.errors} />
      </Form.Group>
      <Form.Group className="mt-3" controlId="email">
        <Form.Label>Email Address</Form.Label>
        <FormControl
          placeholder="Your email"
          type="email"
          name="email"
          onBlur={handleUpdatingWizardData}
          aria-label="Email"
          aria-describedby="basic-addon1"
          defaultValue={wizardData.email.value}
        />
        <FormErrorMessages errors={wizardData.email.errors} />
      </Form.Group>
      <Form.Group className="mt-3" controlId="birthDate">
        <Form.Label>Birth Date</Form.Label>
        <FormControl
          type="date"
          onBlur={handleUpdatingWizardData}
          name="birthDate"
          aria-label="Date"
          aria-describedby="basic-addon1"
          defaultValue={wizardData.birthDate.value}
        />
        <FormErrorMessages errors={wizardData.birthDate.errors} />
      </Form.Group>

      <Form.Group className="mt-3">
        <Button
          className="mx-auto w-50 "
          onClick={(e) => handleFormSubmit(e)}
          variant="outline-success"
          disabled={!isValidated}
        >
          Next Phase &rArr;
        </Button>
      </Form.Group>
    </Form>
  )
}

export default Phase1
