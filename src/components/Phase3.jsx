import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { validateWizardData, validateDataOnSubmit } from "../validations"
import useLocalStorage from "../hooks/useLocalStorage"
import FormErrorMessages from "./FormErrorMessages"

const Phase3 = ({ onNextPhase }) => {
  const history = useHistory()
  const [storedImageUrl, setStoredImageUrl] = useLocalStorage("image", "")
  const [storedHobbie, setStoredHobbie] = useLocalStorage("hobbie", "")
  const [wizardData, setWizardData] = useState({
    image: {
      value: storedImageUrl,
      errors: [],
    },
    hobbie: {
      value: storedHobbie,
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
    if (name === "image") setStoredImageUrl(value)
    if (name === "hobbie") setStoredHobbie(value)
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
    history.push("/summary")
  }

  const handlePrevPhase = () => {
    history.push("/phase-2")
  }

  return (
    <>
      <Form className="p-3">
        <Form.Group className="mt-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            name="image"
            label="image"
            type="text"
            defaultValue={wizardData.image.value}
            required
            onChange={handleUpdatingWizardData}
          />
        </Form.Group>
        <FormErrorMessages errors={wizardData.image.errors} />

        <Form.Group className="my-3">
          <Form.Label>Hobbies</Form.Label>
          <Form.Control
            as="select"
            multiple
            id="hobbie"
            name="hobbie"
            className="form-control"
          >
            <option>Chess</option>
            <option>Movies</option>
            <option>Sport</option>
            <option>Cars</option>
            <option>Dolls</option>
          </Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-evenly">
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
            onClick={(e) => handleFormSubmit(e)}
          >
            End
          </Button>
        </div>
      </Form>
    </>
  )
}

export default Phase3
