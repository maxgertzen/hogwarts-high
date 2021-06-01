import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { validateWizardData, validateDataOnSubmit } from "../validations"
import useLocalStorage from "../hooks/useLocalStorage"
import FormErrorMessages from "./FormErrorMessages"


const Phase3 = ({ onNextPhase, prevPhase }) => {
  const [storedImageUrl, setStoredImageUrl] = useLocalStorage("image", "");
  const [storedHobbies, setStoredHobbies] = useLocalStorage("hobbies", JSON.stringify([]));
  const [wizardData, setWizardData] = useState({
    image: {
      value: storedImageUrl,
      errors: [],
    },
    hobbies: []
  })
  const history = useHistory()

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
  }

  const addHobbie = (e) => {
    if (e.target.name && e.target.checked) {
        setStoredHobbies(JSON.stringify(
          [
            ...wizardData.hobbies,
            e.target.name
          ]))
        setWizardData((prevWizardData) => ({
          ...prevWizardData,
          hobbies: [
            ...wizardData.hobbies,
            e.target.name
          ]
        }))
    }
    else {
      setStoredHobbies(JSON.stringify(wizardData.hobbies.filter(hobbie => hobbie  !==  e.target.name)))
      setWizardData((prevWizardData) => ({
        ...prevWizardData,
        hobbies: wizardData.hobbies.filter(hobbie => hobbie  !==  e.target.name)
      }))
    }
    // else {
    //   debugger 
    //   console.log(wizardData.hobbie.value)
    //   if (wizardData.hobbie.value.split(',') > 0 && wizardData.hobbie.value) {
    //     const temp = wizardData.hobbie.value.name.split(',').remove(e.target.name).join();
    //     if (e.target.name) {
  
    //       setWizardData((prevWizardData) => ({
    //         ...prevWizardData,
    //         hobbie: {
    //           ...wizardData.hobbie,
    //           value: temp,
    //         },
    //       }))
    //     }
    //   }

    // }

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
            onBlur={handleUpdatingWizardData}
          />
        </Form.Group>
        <FormErrorMessages errors={wizardData.image.errors} />


        <Form.Label>Hobbie</Form.Label>

        <Form.Group id="chessformGridCheckbox">
          <Form.Check type="checkbox" name="chess" label="Chess" onClick={addHobbie} />
        </Form.Group>
        <Form.Group id="moviesformGridCheckbox">
          <Form.Check type="checkbox" name="movies" label="Movies" onClick={addHobbie} />
        </Form.Group>
        <Form.Group id="sportformGridCheckbox">
          <Form.Check type="checkbox" name="sport" label="Sport" onClick={addHobbie} />
        </Form.Group>
        <Form.Group id="carsformGridCheckbox">
          <Form.Check type="checkbox" name="cars" label="Cars" onClick={addHobbie} />
        </Form.Group>
        <Form.Group id="dollsformGridCheckbox">
          <Form.Check type="checkbox" name="dolls" label="Dolls" onClick={addHobbie} />
        </Form.Group>

        <Button
          variant="success"
          type="button"
          onClick={(e) => handleFormSubmit(e)}
        >
          End
        </Button>
        {prevPhase ? (
          <Button
            variant="outline-success"
            type="button"
            onClick={handlePrevPhase}
          >
            Back
          </Button>
        ) : null}
      </Form>
    </>
  )
}

export default Phase3
