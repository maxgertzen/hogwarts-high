// Phase 3:
// --------
// 7- Image   (required, valid url)
// 8- Hobbies (not required. Chess, Movies, Sport, Cars, Dolls)
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { validateWizardData, validateDataOnSubmit } from "../validations"
import useLocalStorage from "../hooks/useLocalStorage";

// import Phase2 from 'Phase2';

const Phase3 = ({ onNextPhase, prevPhase }) => {
    const [storedImageUrl, setStoredImageUrl] = useLocalStorage('street', '')
    const [storedHobbie, setStoredHobbie] = useLocalStorage('hobbie', '')
    const [wizardData, setWizardData] = useState({
        image: {
            value: storedImageUrl,
            errors: [],
        },
        hobbie: {
            value: storedHobbie,
            errors: [],
        }

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
        if (name === 'image') setStoredImageUrl(value)
        if (name === 'hobbie') setStoredHobbie(value)
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
            <Form>
                <Form.Group>
                    <Form.Label>Example multiple select</Form.Label>
                    <Form.Control
                        name="image"
                        label="image"
                        type="text"
                        onBlur={handleUpdatingWizardData}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Example multiple select</Form.Label>
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
