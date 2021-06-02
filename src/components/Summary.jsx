import React, { useEffect } from "react"
import { FaBaseballBall, FaFilm, FaChessRook, FaCar } from "react-icons/fa"
import { GiMatryoshkaDolls } from "react-icons/gi"
import { Row, Image, ListGroup, Container, Col } from "react-bootstrap"

const hobbiesIcons = {
  chess: <FaChessRook />,
  movies: <FaFilm className="text-danger" />,
  sport: <FaBaseballBall className="text-warning" />,
  cars: <FaCar className="text-success" />,
  dolls: <GiMatryoshkaDolls style={{ color: "#e034ad" }} />,
}

function Summary({ data }) {
  useEffect(() => {
    for (const key in data) {
      localStorage.removeItem(key)
    }
  }, [data])

  return (
    <>
      <Container
        fluid
        className="summary-container d-flex flex-column align-items-center p-2"
      >
        <h2 className="text-dark mb-2">Summary</h2>
        <Row className="w-100">
          <Col md={5} sm={12} className="mt-2 ml-3 text-center">
            <Image
              className="summary-image"
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
                    {hobby} {hobbiesIcons[hobby]}
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
