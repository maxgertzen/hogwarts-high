
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { validateWizardData, validateDataOnSubmit } from '../validations';
import FormErrorMessages from "./FormErrorMessages"


const Phase3 = ({ onNextPhase, prevPhase }) => {

    const [wizardData, setWizardData] = useState(
        {
            image: {
                value: "",
                errors: [],
            },
            hobbie: {
                value: "",
                errors: [],
            }

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
            image: {
                value: "",
                errors: [],
            },
            hobbie: {
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
    }

    const url = './user.png'

    return (<>
        <Form>
            <Form.Group controlId="image">
                <Form.Label>image</Form.Label>
                <Form.Control
                    name="image"
                    label="image"
                    type="text"
                    defaultValue={url}
                    onBlur={handleUpdatingWizardData}
                    required
                />
            </Form.Group>

            {/* <FormErrorMessages errors={wizardData.image.errors} /> */}
            <Form.Group controlId="hobbie">
                <Form.Label>hobbie</Form.Label>
                <Form.Control as="select" multiple
                    name="hobbie"
                    className="form-control"
                    onBlur={handleUpdatingWizardData}>
                    <option>Chess</option>
                    <option>Movies</option>
                    <option>Sport</option>
                    <option>Cars</option>
                    <option>Dolls</option>
                </Form.Control>
            </Form.Group>

            <Button variant="success"
                type="button"
                onClick={(e) => handleFormSubmit(e)}>

                Next
            </Button>

            {
                prevPhase ?
                    <Button variant="outline-success"
                        type="button"
                        onClick={() => prevPhase()}>
                        Back
                    </Button>
                    : null
            }
        </Form>
    </>)
}

export default Phase3;