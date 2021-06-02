import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { validateWizardData, validateDataOnSubmit } from "../validations"
import useLocalStorage from "../hooks/useLocalStorage"
import FormErrorMessages from "./FormErrorMessages"

const Phase3 = ({ onNextPhase, prevPhase }) => {
  const [storedImageUrl, setStoredImageUrl] = useLocalStorage("image", "")
  const [storedHobbies, setStoredHobbies] = useLocalStorage("hobbies", "")
  const [isValidated, setIsValidated] = useState(true)
  const [wizardData, setWizardData] = useState({
    image: {
      value: storedImageUrl,
      errors: [],
    },
    hobbies: storedHobbies,
  })
  const history = useHistory()

  useEffect(() => {
    const checkValidity = () => {
      for (const attr in wizardData) {
        if (wizardData[attr].errors?.length) {
          setIsValidated(false)
          return
        }
      }
      setIsValidated(true)
    }

    checkValidity()
  }, [wizardData])

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
    if (name === "hobbies") setStoredHobbies(value)
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
    prevPhase()
  }

  const addHobbie = (e) => {
    if (e.target.name && e.target.checked) {
      setStoredHobbies(JSON.stringify([...wizardData.hobbies, e.target.name]))
      setWizardData((prevWizardData) => ({
        ...prevWizardData,
        hobbies: [...wizardData.hobbies, e.target.name],
      }))
    } else {
      setStoredHobbies(
        JSON.stringify(
          wizardData.hobbies.filter((hobbie) => hobbie !== e.target.name)
        )
      )
      setWizardData((prevWizardData) => ({
        ...prevWizardData,
        hobbies: wizardData.hobbies.filter(
          (hobbie) => hobbie !== e.target.name
        ),
      }))
    }
  }
  return (
    <>
      <Form className=" p-3">
        <Form.Group className="my-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            name="image"
            label="image"
            type="text"
            defaultValue={wizardData.image.value}
            required
            onChange={handleUpdatingWizardData}
          />
          <FormErrorMessages errors={wizardData.image.errors} />
        </Form.Group>

        <Form.Group id="chessformGridCheckbox">
          <Form.Check
            type="checkbox"
            name="chess"
            label="Chess"
            onClick={addHobbie}
          />
        </Form.Group>
        <Form.Group id="moviesformGridCheckbox">
          <Form.Check
            type="checkbox"
            name="movies"
            label="Movies"
            onClick={addHobbie}
          />
        </Form.Group>
        <Form.Group id="sportformGridCheckbox">
          <Form.Check
            type="checkbox"
            name="sport"
            label="Sport"
            onClick={addHobbie}
          />
        </Form.Group>
        <Form.Group id="carsformGridCheckbox">
          <Form.Check
            type="checkbox"
            name="cars"
            label="Cars"
            onClick={addHobbie}
          />
        </Form.Group>
        <Form.Group id="dollsformGridCheckbox">
          <Form.Check
            type="checkbox"
            name="dolls"
            label="Dolls"
            onClick={addHobbie}
          />
        </Form.Group>

        <Form.Group className="d-flex justify-content-evenly mt-3 form-btns">
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
            disabled={!isValidated}
          >
            End
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default Phase3
