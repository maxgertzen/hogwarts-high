import React, { useEffect } from "react"
import { Row, Image, ListGroup, Container, Col } from "react-bootstrap"

function Summary({ data }) {
  useEffect(() => {
    for (const key in data) {
      localStorage.removeItem(key)
    }
    console.log(data.hobbies)
  }, [data])

  return (
    <>
      <Container fluid className="d-flex flex-column align-items-center  p-2">
        <h2 className="text-dark mb-2">Summary</h2>
        <Row className="w-100">
          <Col md={5} className="mt-2 ml-3">
            <Image
              src={data.image.value}
              style={{ clipPath: "circle()" }}
              height="200px"
              width="200px"
            />
          </Col>
          <Col md={7} className="ml-3">
            <ListGroup variant="flush">
              <ListGroup.Item className="mt-2">
                <strong> Name: </strong> {data["full-name"].value}
              </ListGroup.Item>
              <ListGroup.Item className="mt-2">
                <strong> Email: </strong> {data.email.value}
              </ListGroup.Item>
              <ListGroup.Item className="mt-2">
                <strong> Birth Date: </strong> {data["birth-date"].value}
              </ListGroup.Item>
              <ListGroup.Item className="mt-2">
                <strong> Address: </strong> {data.city.value} -
                {data.street.value}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="w-100 text-center mt-3">
          {data.hobbies.length > 0 && (
            <>
              <h4> Hobbies </h4>
              <Col className="d-flex justify-content-evenly my-3">
                {data.hobbies.map((hobby, idx) => (
                  <ListGroup.Item className="text-capitalize" key={idx}>
                    {hobby}
                  </ListGroup.Item>
                ))}
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  )
}
export default Summary
