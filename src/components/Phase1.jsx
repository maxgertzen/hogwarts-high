import React, { useState } from "react"
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

  const handleUpdatingWizardData = (e) => {
    const errors = validateWizardData(e)
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
        <div className="d-flex flex-start errors-container flex-nowrap">
          <FormErrorMessages errors={wizardData.fullname.errors} />
        </div>
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
        <div className="d-flex flex-start errors-container flex-nowrap">
          <FormErrorMessages errors={wizardData.email.errors} />
        </div>
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
        <div className="d-flex flex-start errors-container flex-nowrap">
          <FormErrorMessages errors={wizardData.birthDate.errors} />
        </div>
      </Form.Group>

      <Form.Group className="mt-3">
        <Button
          className="mx-auto w-50 "
          onClick={(e) => handleFormSubmit(e)}
          variant="outline-success"
        >
          Next Phase &rArr;
        </Button>
      </Form.Group>
    </Form>
  )
}

export default Phase1
