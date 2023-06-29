import Hexel from "../projects/hexel";

const HexApp = ({ color }) => (
  <div className="p-5">
    <Hexel color={color} />
  </div>
);

export const getServerSideProps = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  // Pass data to the page via props
  return { props: { color } };
};
export default HexApp;
