import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <div id="home-page">
      <div>
        <Container>
          <h3 className="py-3 mb-0">Welcome to Scaena</h3>
        </Container>
      </div>
      <div>
        <Container>
          <p className="px-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            condimentum fringilla nibh et commodo. Suspendisse at rhoncus neque,
            vitae condimentum nibh. Nam et erat sed augue sodales lacinia
            vulputate a tellus. Nam mollis odio ac urna hendrerit, vitae
            vehicula purus imperdiet. In hac habitasse platea dictumst. Sed
            feugiat nec diam sit amet tincidunt. Morbi dignissim urna eget sem
            venenatis congue.
          </p>
          <p className="px-0">
            Suspendisse lacinia tristique risus, eget placerat sapien accumsan
            non. Curabitur tincidunt, dolor sit amet posuere rutrum, enim dolor
            tincidunt est, laoreet condimentum lacus mauris non sapien. Donec ac
            nisl vel ipsum commodo iaculis eu ut arcu. Pellentesque eleifend
            vehicula massa eget porttitor. Sed porta quis mauris sit amet
            dignissim. Pellentesque id neque sed odio mollis convallis. Nulla
            nec odio lorem. Etiam ornare efficitur aliquet. Curabitur non
            maximus urna, sed lacinia neque. Duis neque arcu, interdum vitae
            sodales eu, iaculis a nulla.
          </p>
        </Container>
      </div>
    </div>
  );
};

export default Home;
