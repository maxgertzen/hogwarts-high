// Phase 3:
// --------
// 7- Image   (required, valid url)
// 8- Hobbies (not required. Chess, Movies, Sport, Cars, Dolls)
import { FormControl, InputGroup, Container, Form, Button, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';


// import Phase2 from 'Phase2';

function Phase3() {

    const Phase3 = ({ onNextPhase }) => {
            const [wizardData, setWizardData] = useState({
            image: {
                required: true,
                pattern: '/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/'
            },
            hobbie: {
                required: false,
                pattern: null
            }

        })




        return <>
            <Form>
                <Form.Group controlId="phase2-file">
                    <Form.File 
                    id="image" 
                    name="image" 
                    label="image" />
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