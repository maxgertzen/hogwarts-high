// Phase 3:
// --------
// 7- Image   (required, valid url)
// 8- Hobbies (not required. Chess, Movies, Sport, Cars, Dolls)
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { validateWizardData, validateDataOnSubmit } from '../validations';


// import Phase2 from 'Phase2';

const Phase3 = ({ onNextPhase, prevPhase }) => {
    const [wizardData, setWizardData] = useState({
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
    }


    return (<>
        <Form>
            <Form.Group controlId="phase2-file">
                <Form.Label>Example multiple select</Form.Label>
                <Form.Control
                    id="image"
                    name="image"
                    label="image"
                    type="text"
                    onBlur={handleUpdatingWizardData} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Example multiple select</Form.Label>
                <Form.Control as="select" multiple
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
            <Button variant="success" type="button" onClick={(e) => handleFormSubmit(e)}>
                End
            </Button>
            {
                prevPhase ?
                    <Button variant="outline-success" type="button" onClick={() => prevPhase}>
                        Back
                    </Button> :
                    null}

        </Form>
    </>)
}

export default Phase3;