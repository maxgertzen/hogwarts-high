import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { validateDataOnSubmit } from '../validations';
import FormErrorMessages from "./FormErrorMessages"

function Phase2({ onNextPhase, prevPhase }) {
    const [formProps, setFormProps] = useState({
        city: {
            value: '',
            errors: []
        },
        street: {
            value: '',
            errors: []
        },
        streetNumber: {
            value: '',
            errors: []
        },
    });

    const handleChange = ({ target: { name, value } }, func) => {
        func((prevObj) => {
            return {
                ...prevObj,
                [name]: value
            }
        });
    }

    const handleNext = (e) => {
        e.preventDefault()

        const { errors, value, name } = validateDataOnSubmit(formProps)

        if (errors.length > 0) {
            setFormProps((prevFormProps) => ({
                ...prevFormProps,
                [name]: {
                    value,
                    errors,
                },
            }))
            return
        }

        onNextPhase(formProps)
    }
    return (
        <Form>
            <Form.Group controlId="phase2-city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter City" name="city" onChange={e => handleChange(e, setFormProps)} required />
                <FormErrorMessages errors={formProps.city.errors} />
            </Form.Group>
            <Form.Group controlId="phase2-street">
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" placeholder="Enter Street" name="street" onChange={e => handleChange(e, setFormProps)} required />
                <FormErrorMessages errors={formProps.street.errors} />
            </Form.Group>
            <Form.Group controlId="phase3-number">
                <FormErrorMessages errors={formProps.streetNumber.errors} />
                <Form.Control type="number" label="N" name="streetNumber" onChange={e => handleChange(e, setFormProps)} />
            </Form.Group>
            <Button variant="success" type="button" onClick={(e) => handleNext(e)}>
                Next
            </Button>
            {
                prevPhase ?
                    <Button variant="outline-success" type="button" onClick={() => prevPhase()}>
                        Back
                    </Button>
                    :
                    null
            }
        </Form>
    )
}

export default Phase2