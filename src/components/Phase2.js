import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Phase2({ onNextPhase, prevPhase }) {
    const [formProps, setFormProps] = useState({});

    const handleChange = ({ target }, func) => {
        func((prevObj) => {
            return {
                ...prevObj,
                [target.name]: target.value
            }
        });
    }

    const handleNext = (e) => {

    }
    return (
        <Form>
            <Form.Group controlId="phase2-city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter City" name="city-form" onChange={e => handleChange(e, setFormProps)} required />
            </Form.Group>
            <Form.Group controlId="phase2-street">
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" placeholder="Enter Street" name="street-form" onChange={e => handleChange(e, setFormProps)} required />
            </Form.Group>
            <Form.Group controlId="phase3-number">
                <Form.Check type="number" label="N" name="number" onChange={e => handleChange(e, setFormProps)} />
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