// Phase 3:
// --------
// 7- Image   (required, valid url)
// 8- Hobbies (not required. Chess, Movies, Sport, Cars, Dolls)
import { FormControl, InputGroup, Container, Form, Button, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const urlValid = '/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/'

// import Phase2 from 'Phase2';

function Phase3() {
    const [loginData, setLoginData] = useState({

        image: {
            value: '',
            errors: [],
            validations: {
                required: true,
                pattern: null
            }
        },
        hobbies: {
            value: '',
            errors: [],
            validations: {
                required: false,
                pattern: null
            }
        },

    })


    const validateInput = ({ target: { value, name } }) => {
        //Clear email error
        const newErrors = [];
        const { validations } = loginData[name];

        if (validations.required && !value) {
            newErrors.push(`${name} is required`);
        }

        if (validations.pattern && !validations.pattern.test(value)) {
            newErrors.push(`Invalid ${name} value`);
        }


        setLoginData({
            ...loginData,
            [name]: {
                ...loginData[name],
                value: value,
                errors: newErrors
            }
        });
    };


    return <>
        <Form>
            <Form.Group controlId="phase2-file">
                <Form.File id="exampleFormControlFile1" label="Example file input" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Example multiple select</Form.Label>
                <Form.Control as="select" multiple>
                    <option>Chess</option>
                    <option>Movies</option>
                    <option>Sport</option>
                    <option>Cars</option>
                    <option>Dolls</option>
                </Form.Control>
            </Form.Group>
            <Button variant="success" type="button" onClick={(e) => handleEndForm(e)}>
                End
            </Button>
            {
                prevPhase ?
                    <Button variant="outline-success" type="button" onClick={() => prevPhase()}>
                        Back
                </Button> :
                    null}

        </Form>
    </>
}

export default Phase2;