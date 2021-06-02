import React, { useEffect } from "react"
import { Row, Image, ListGroup, Container, Col } from "react-bootstrap"

// import img from './'
function Summary({ data }) {
  useEffect(() => {
    for (const key in data) {
      localStorage.removeItem(key)
    }
  }, [data])

  console.table(data)
  return (
    <>
      <Container className="d-flex flex-column align-items-center my-2">
        <h2 className="text-dark">Summary</h2>
        <Row>
          <Col className="my-3">
            <Image
              src={data.image.value}
              style={{ clipPath: "circle()" }}
              height="200px"
              width="200px"
              fluid
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item className="mt-2">
                <strong> Name: </strong> {data['full-name'].value}
              </ListGroup.Item>
              <ListGroup.Item className="mt-2">
                <strong> Email: </strong> {data.email.value}
              </ListGroup.Item>
              <ListGroup.Item className="mt-2">
                <strong> Birth Date: </strong> {data['birth-date'].value}
              </ListGroup.Item>
              <ListGroup.Item className="mt-2">
                <strong> Address: </strong> {data.city.value} -
                {data.street.value}
              </ListGroup.Item>
              {/* <ListGroup.Item>Hobbies: {data.hobbie}</ListGroup.Item> */}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Summary
