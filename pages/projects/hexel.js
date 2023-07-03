import { useState } from "react";

const Hexel = ({ color }) => {
  const [bgColor, setBgColor] = useState("white");
  const [guess, setGuessed] = useState("FFFFFF");
  const [guesses, setGuesses] = useState(["#FFFFFF"]);

  console.log(color);

  if (
    guesses[0].toLowerCase().includes(color.toLowerCase()) &&
    bgColor !== "green"
  )
    setBgColor("green");

  const opposite = bgColor !== "white" ? "white" : "black";

  return (
    <div
      style={{
        display: "flex",
        margin: 20,
        background: bgColor,
        minHeight: 300,
        // height: "80vh",
        borderRadius: 16,
        padding: "12px 48px",
        flexDirection: "column",
        color: opposite,
      }}
    >
      {guesses[0].toLowerCase().includes(color.toLowerCase()) && (
        <div>
          You guessed it right in {guesses.length - 1} guesses! The color was #
          {color.toUpperCase()}
        </div>
      )}
      <div
        style={{
          display: "flex",
          gap: "24px",
          margin: "0px auto",
        }}
      >
        <button
          className={`text-${opposite} font-bold py-2 px-4 rounded-full`}
          onClick={() => setBgColor(opposite)}
        >
          Show on {opposite}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: "24px",
          margin: "0px auto",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border: `2px solid ${opposite}`,
            borderRadius: 8,
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              paddingBottom: 8,
              justifyContent: "space-between",
              borderBottom: `1px solid ${opposite}`,
            }}
          >
            <div>
              #
              <input
                style={{
                  color: opposite,
                  background: bgColor,
                  borderBottom: `1px solid ${opposite}`,
                  width: 64,
                }}
                value={guess}
                onChange={(e) => {
                  if (
                    e.target.value.length <= 6 &&
                    /^[0-9a-fA-F]{0,6}$/g.test(e.target.value)
                  )
                    setGuessed(e.target.value.toUpperCase());
                }}
              />
            </div>
            <button
              style={{
                border: `1px solid ${opposite}`,
                borderRadius: 4,
                color: opposite,
                padding: 4,
              }}
              disabled={guess.length !== 6}
              onClick={(e) => setGuesses([`#${guess}`, ...guesses])}
            >
              Guess!
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              paddingTop: 8,
              maxHeight: 185,
              overflowY: "scroll",
            }}
          >
            {guesses.map((e, i) => {
              let rDif1,
                gDif1,
                bDif1,
                rDif2,
                gDif2,
                bDif2 = 256;

              if (i < guesses.length - 1) {
                rDif1 = Math.abs(
                  parseInt(e.slice(1, 3), 16) - parseInt(color.slice(0, 2), 16)
                );
                rDif2 = Math.abs(
                  parseInt(guesses[i + 1].slice(1, 3), 16) -
                    parseInt(color.slice(0, 2), 16)
                );

                gDif1 = Math.abs(
                  parseInt(e.slice(3, 5), 16) - parseInt(color.slice(2, 4), 16)
                );
                gDif2 = Math.abs(
                  parseInt(color.slice(2, 4), 16) -
                    parseInt(guesses[i + 1].slice(3, 5), 16)
                );

                bDif1 = Math.abs(
                  parseInt(e.slice(5, 7), 16) - parseInt(color.slice(4, 6), 16)
                );
                bDif2 = Math.abs(
                  parseInt(color.slice(4, 6), 16) -
                    parseInt(guesses[i + 1].slice(5, 7), 16)
                );
              }

              //   console.log(rDif1, rDif2, gDif1, gDif2, bDif1, bDif2, color, e);
              return (
                <div
                  style={{
                    width: 250,
                    height: 25,
                    display: "flex",
                    gap: 8,
                    color: opposite,
                  }}
                  draggable
                >
                  <span>#</span>
                  <span
                    style={{
                      color: rDif1 <= rDif2 ? "green" : "red",
                      fontWeight: rDif1 === 0 ? "bold" : "normal",
                    }}
                  >
                    {e.slice(1, 3)}
                  </span>
                  <span
                    style={{
                      color: gDif1 <= gDif2 ? "green" : "red",
                      fontWeight: gDif1 === 0 ? "bold" : "normal",
                    }}
                  >
                    {e.slice(3, 5)}
                  </span>
                  <span
                    style={{
                      color: bDif1 <= bDif2 ? "green" : "red",
                      fontWeight: bDif1 == 0 ? "bold" : "normal",
                    }}
                  >
                    {e.slice(5, 7)}
                  </span>

                  <div style={{ background: e, flexGrow: 1, height: 25 }} />
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ width: 250, height: 250, color: opposite }}>
          Mystery color
          <div style={{ background: `#${color}`, height: 100 }}></div>
          <div style={{ background: guesses[0], height: 100 }}></div>
          Your most recent guess: {guesses[0]}
        </div>
      </div>
      <div style={{ color: opposite, textAlign: "center", marginTop: 48 }}>
        Guess the hex code of the mystery color on the right!
        <br />
        You can also change the background color from white to black.
        <br />
        Best of luck!
      </div>
    </div>
  );
};

export default Hexel;

export const getServerSideProps = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  // Pass data to the page via props
  return { props: { color } };
};
