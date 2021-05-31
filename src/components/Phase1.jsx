import React, { useState } from "react"
import { InputGroup, FormControl, Button, Form } from "react-bootstrap"
import FormErrorMessages from "./FormErrorMessages"

const wizardValidations = {
  fullname: {
    required: true,
    pattern: /[a-zA-Z]{2,} /,
  },
  email: {
    required: true,
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  birthDate: {
    required: true,
  },
}

const Phase1 = ({ onNextPhase }) => {
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

  const validateWizardData = ({ target: { value, name } }) => {
    const newErrors = []
    const validations = wizardValidations[name]

    if (validations.required && !value) {
      newErrors.push(`${name} is required`)
    }

    if (validations.pattern && !validations.pattern.test(value)) {
      newErrors.push(`Invalid ${name} value`)
    }

    //set the new email input value
    //set the errors

    setWizardData((prevWizardData) => ({
      ...prevWizardData,
      [name]: {
        value: value,
        errors: newErrors,
      },
    }))

    return newErrors.length > 0
  }

  const validateDataOnSubmit = () => {
    for (const name in wizardValidations) {
      const { value } = wizardData[name]
      const isErrors = validateWizardData({ target: { value, name } })
      if (isErrors) return isErrors
    }
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

    const isErrors = validateDataOnSubmit()

    if (isErrors) return

    clearState()

    onNextPhase(wizardData)
  }

  return (
    <Form>
      <FormErrorMessages errors={wizardData.fullname.errors} />
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Your name"
          name="fullname"
          onBlur={validateWizardData}
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
          onBlur={validateWizardData}
          aria-label="Email"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <FormErrorMessages errors={wizardData.birthDate.errors} />
      <InputGroup className="mb-3">
        <FormControl
          type="date"
          onBlur={validateWizardData}
          name="birthDate"
          aria-label="Date"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <Button onClick={handleFormSubmit} variant="outline-success">
        Next Phase
      </Button>
    </Form>
  )
}

export default Phase1
