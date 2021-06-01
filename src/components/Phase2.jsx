import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { validateDataOnSubmit } from '../validations';
import FormErrorMessages from "./FormErrorMessages"
import useLocalStorage from '../hooks/useLocalStorage';
import { useHistory } from 'react-router-dom';

function Phase2({ onNextPhase }) {
    const [storedCity, setStoredCity] = useLocalStorage('city', '')
    const [storedStreet, setStoredStreet] = useLocalStorage('street', '')
    const [storedStreetNum, setStoredStreetNum] = useLocalStorage('streetNumber', '')
    const history = useHistory()
    const [formProps, setFormProps] = useState({
        city: {
            value: storedCity,
            errors: []
        },
        street: {
            value: storedStreet,
            errors: []
        },
        streetNumber: {
            value: storedStreetNum,
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
        if (name === 'city') setStoredCity(value);
        if (name === 'street') setStoredStreet(value);
        if (name === 'streetNumber') setStoredStreetNum(value);
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
        history.push("/phase-3")
    }

    const handlePrevPhase = () => {
        history.push("/")
    }
    return (
        <Form>
            <Form.Group controlId="phase2-city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter City" name="city" onBlur={e => handleChange(e, setFormProps)} required />
                <FormErrorMessages errors={formProps.city.errors} />
            </Form.Group>
            <Form.Group controlId="phase2-street">
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" placeholder="Enter Street" name="street" onBlur={e => handleChange(e, setFormProps)} required />
                <FormErrorMessages errors={formProps.street.errors} />
            </Form.Group>
            <Form.Group controlId="phase3-number">
                <FormErrorMessages errors={formProps.streetNumber.errors} />
                <Form.Control type="number" label="N" name="streetNumber" onBlur={e => handleChange(e, setFormProps)} />
            </Form.Group>
            <Button variant="success" type="button" onClick={(e) => handleNext(e)}>
                Next
            </Button>
            <Button variant="outline-success" type="button" onClick={handlePrevPhase}>
                Back
            </Button>
        </Form>
    )
}



export default Phase2
