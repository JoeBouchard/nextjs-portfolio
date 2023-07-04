import Hexel from "../projects/hexel";

const HexApp = ({ color }) => (
  <div className="p-5">
    <Hexel color={color} />
  </div>
);

export default HexApp;

export const getServerSideProps = () => {
  let color = Math.floor(Math.random() * 16777215).toString(16);
  while (color.length < 6) color = "0" + color;
  // Pass data to the page via props
  return { props: { color } };
};
