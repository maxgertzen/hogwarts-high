import React, { useState, useEffect } from "react"
import { FormControl, Button, Form } from "react-bootstrap"
import useLocalStorage from "../hooks/useLocalStorage"
import { useHistory } from "react-router-dom"
import { validateDataOnSubmit, validateWizardData } from "../utils/validations.js"
import FormErrorMessages from "./FormErrorMessages"

const Phase1 = ({ onNextPhase }) => {
  const [storedFullName, setStoredFullName] = useLocalStorage("full-name", "")
  const [storedEmail, setStoredEmail] = useLocalStorage("email", "")
  const [storedBirthDate, setStoredBirthDate] = useLocalStorage(
    "birth-date",
    ""
  )
  const history = useHistory()
  const [isValidated, setIsValidated] = useState(false)
  const [wizardData, setWizardData] = useState({
    "full-name": {
      value: storedFullName,
      errors: [],
    },
    email: {
      value: storedEmail,
      errors: [],
    },
    "birth-date": {
      value: storedBirthDate,
      errors: [],
    },
  })

  useEffect(() => {
    const checkValidity = () => {
      for (const attr in wizardData) {
        if (wizardData[attr].errors?.length || !wizardData[attr].value) {
          setIsValidated(false)
          return
        }
      }
      setIsValidated(true)
    }

    checkValidity()
  }, [wizardData])

  const getTodayDate = () => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, "0")
    const mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
    const yyyy = today.getFullYear()

    return `${yyyy}-${mm}-${dd}`
  }

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
    if (name === "full-name") setStoredFullName(value)
    if (name === "email") setStoredEmail(value)
    if (name === "birth-date") setStoredBirthDate(value)
  }

  const handleFormSubmit = (e) => {
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
    history.push("/phase-2")
  }

  return (
    <Form className="p-3 ">
      <Form.Group className="mt-3" controlId="fullname">
        <Form.Label>Full Name</Form.Label>
        <FormControl
          placeholder="Your name"
          name="full-name"
          onBlur={handleUpdatingWizardData}
          aria-label="Fullname"
          aria-describedby="basic-addon1"
          defaultValue={wizardData["full-name"].value}
        />
        <FormErrorMessages errors={wizardData["full-name"].errors} />
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
          name="birth-date"
          aria-label="Date"
          aria-describedby="basic-addon1"
          defaultValue={wizardData["birth-date"].value}
          min="1900-01-01"
          max={getTodayDate()}
        />
        <FormErrorMessages errors={wizardData["birth-date"].errors} />
      </Form.Group>

      <Form.Group className="mt-3 form-btns">
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
