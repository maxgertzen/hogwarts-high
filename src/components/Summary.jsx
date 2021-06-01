import {
  Row,
  Image,
  ListGroup,
  Card,
  FormControl,
  InputGroup,
  Container,
  Form,
  Button,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap"
// import img from './'
function Summary({ data }) {
  console.log(data)
  return (
    <>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Image src={data.image} roundedCircle />
          </Col>
          <Col xs={6} md={4}>
            <Card style={{ width: "18rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>Name: {data.name}</ListGroup.Item>
                <ListGroup.Item>Email: {data.email}</ListGroup.Item>
                <ListGroup.Item>Birth Date: {data.birthDate}</ListGroup.Item>
                <ListGroup.Item>
                  Address: {data.city} - {data.street} - {data.number}
                </ListGroup.Item>
                <ListGroup.Item>E-mail: {data.email}</ListGroup.Item>
                <ListGroup.Item>Hobbies: {data.hobbies}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Summary
// 1- Name       (required, 2 words (fn + ln), minimum 2 characters each)
// 2- Email      (required, valid email address)
// 3- Birth Date (required, dd/MM/yy)
// Phase 2:
// --------
// 4- City   (required)
// 5- Street (required)
// 6- Number (not required, not 0 or negative)
// Phase 3:
// --------
// 7- Image   (required, valid url)
// 8- Hobbies (not required. Chess, Movies, Sport, Cars, Dolls)
