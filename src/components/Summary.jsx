import React, { useEffect } from "react"
import { Row, Image, ListGroup, Card, Container, Col } from "react-bootstrap"

// import img from './'
function Summary({ data }) {
  useEffect(() => {
    for (const key in data) {
      localStorage.removeItem(key)
    }
  }, [])

  console.table(data)
  return (
    <>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Image
              src={data.image.value}
              style={{ borderRadius: "50%", objectFit: "contain" }}
              height="250px"
              width="250px"
              fluid
            />
          </Col>
          <Col xs={6} md={4}>
            <Card style={{ width: "18rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>Name: {data.fullname.value}</ListGroup.Item>
                <ListGroup.Item>Email: {data.email.value}</ListGroup.Item>
                <ListGroup.Item>
                  Birth Date: {data.birthDate.value}
                </ListGroup.Item>
                <ListGroup.Item>
                  Address: {data.city.value} - {data.street.value}
                </ListGroup.Item>
                {/* <ListGroup.Item>Hobbies: {data.hobbie}</ListGroup.Item> */}
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
