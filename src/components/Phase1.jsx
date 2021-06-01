import React, { useState } from "react"
import { InputGroup, FormControl, Button, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { validateDataOnSubmit, validateWizardData } from "../validations"
import FormErrorMessages from "./FormErrorMessages"

const Phase1 = ({ onNextPhase }) => {
  const history = useHistory()
  const [wizardData, setWizardData] = useState({
    fullname: {
      value: "",
      errors: [],
    },
    email: {
      value: "",
      errors: [],
    },
    birthDate: {
      value: "",
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
  }

  const clearState = () => {
    setWizardData({
      fullname: {
        value: "",
        errors: [],
      },
      email: {
        value: "",
        errors: [],
      },
      birthDate: {
        value: "",
        errors: [],
      },
    })
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

    clearState()

    onNextPhase(wizardData)
    history.push("/phase-2")
  }

  return (
    <Form>
      <FormErrorMessages errors={wizardData.fullname.errors} />
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Your name"
          name="fullname"
          onBlur={handleUpdatingWizardData}
          aria-label="Fullname"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <FormErrorMessages errors={wizardData.email.errors} />
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Your email"
          type="email"
          name="email"
          onBlur={handleUpdatingWizardData}
          aria-label="Email"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <FormErrorMessages errors={wizardData.birthDate.errors} />
      <InputGroup className="mb-3">
        <FormControl
          type="date"
          onBlur={handleUpdatingWizardData}
          name="birthDate"
          aria-label="Date"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <Button onClick={(e) => handleFormSubmit(e)} variant="outline-success">
        Next Phase
      </Button>
    </Form>
  )
}

export default Phase1
