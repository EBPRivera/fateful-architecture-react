import { Container, Row, Col } from "react-bootstrap";

import CPageHeader from "../components/Custom/CPageHeader";

const Home = () => {
  return (
    <>
      <CPageHeader>
        <h1>Welcome to Fateful Architecture</h1>
      </CPageHeader>
      <div id="home-page" className="py-3">
        <div>
          <Container>
            <Row>
              <Col className="text-end">
                <h1>Your World</h1>
                <p className="px-0">
                  Build a world unique to you and your group. Build kingdoms,
                  islands, and mountains. Introduce its inhabitants and people
                  of interest. Make history happen through important events.
                  Bring life to your world &mdash; give it a reason to be saved.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="py-3">
          <Container>
            <Row>
              <Col>
                <h1>Your Character</h1>
                <p className="px-0">
                  Live through the eyes of your character and immerse yourself
                  in a world with endless possibilities. Through their shoes may
                  you explore, meet new people, and leave your mark in the
                  world's ever-growing history.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="py-3">
          <Container>
            <Row>
              <Col className="text-end">
                <h1>Your Story</h1>
                <p className="px-0">
                  Take the first step in your journey and redefine the world
                  through your actions. Witness and struggle so that you may
                  forge bonds and create unforgettable memories &mdash; not just
                  within your game, but with your fellow players.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Home;
