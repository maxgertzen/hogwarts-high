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
  const addHobbie = (e) => {
    if (e.target.name && e.target.checked) {
      setWizardData((prevWizardData) => ({
        ...prevWizardData,
        hobbie: {
          ...wizardData.hobbie,
          value: setStoredHobbie(wizardData.hobbie.value + e.target.name + ","),
        },
      }))
    } else {
      setWizardData((prevWizardData) => ({
        ...prevWizardData,
        hobbie: {
          ...wizardData.hobbie,
          value: setStoredHobbie(
            wizardData.hobbie.value.split(",").remove(e.target.name).join()
          ),
        },
      }))
    }
  }
  return (
    <>
      <Form className="form-container">
        <Form.Group>
          <Form.Label>Example multiple select</Form.Label>
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

        <Form.Label>Hobbie</Form.Label>

        <Form.Group id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            name="chess"
            label="Chess"
            onClick={addHobbie}
          />
        </Form.Group>
        <Form.Group id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            name="movies"
            label="Movies"
            onClick={addHobbie}
          />
        </Form.Group>
        <Form.Group id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            name="sport"
            label="Sport"
            onClick={addHobbie}
          />
        </Form.Group>
        <Form.Group id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            name="cars"
            label="Cars"
            onClick={addHobbie}
          />
        </Form.Group>
        <Form.Group id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            name="dolls"
            label="Dolls"
            onClick={addHobbie}
          />
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
