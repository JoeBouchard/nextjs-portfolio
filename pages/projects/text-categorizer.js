import { useEffect, useReducer, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { BsFillInfoSquareFill as Info } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { AiFillCloseSquare as Close } from "react-icons/ai";

const syllableCounter =
  /([aeiouyAEIOUY]+[^e.\s])|([aiouyAEIOUY]+\b)|(\b[^aeiouy0-9.']+e\b)/gim;
//  /([e]+[^sd\W][^e]|[e]+\w{2}|[aiouy]+|\W[^aeiou]+[e]\W)/g;

const TextCategorizer = () => {
  const [info, showInfo] = useReducer((i) => !i, false);
  const [text, setText] = useState("");
  const [parsed, setParsed] = useReducer(
    (oldValue, data) =>
      !data || data.reset
        ? {}
        : {
            ...Object.keys(data).reduce(
              (state, value) => ({
                ...state,
                [value]: data[value] + (oldValue[value] || 0),
              }),
              {}
            ),
            id: undefined,
          },
    {}
  );
  const [loading, setLoading] = useState();
  const [length, setLength] = useState(0);
  const small = useMediaQuery(400);

  useEffect(() => {
    const workerArray = [];
    setTimeout(() => {
      setLoading("");
      if (document.getElementById("text-input").value === text) {
        const id = parseInt(Math.random() * 10000);
        const l = text
          .replaceAll(/[^A-Za-z \n]/gi, "")
          .split(/[^A-Za-z]/)
          .filter((val) => val.length > 0).length;

        const readyArray = [];

        for (let i = 0; i <= l / 10000; i++) {
          const f = new Worker(
            new URL("../../resources/frequencyWorker.js", import.meta.url)
          );
          readyArray.push(false);
          f.onmessage = ({ data }) => {
            if (data.loaded) readyArray[i] = true;
            if (typeof data.loading !== "undefined" || data.loaded) {
              setLoading(data.loading);
            } else {
              setParsed(data);
            }
          };
          workerArray.push(f);
        }
        setParsed({ reset: true });
        setLength(
          text
            .replaceAll(/[^A-Za-z \n]/gi, "")
            .split(/[^A-Za-z]/)
            .filter((val) => val.length > 0).length
        );
        let count = 0;
        text.split("\n").forEach((t) => {
          workerArray[count % workerArray.length].postMessage({
            text: t,
            id,
          });
        });
      }
      setLoading();
    }, 1000);
    return () => workerArray.forEach((w) => w.terminate());
  }, [text]);

  const l = text.replaceAll(/[^A-Za-z \n]/gi, "");

  let fcValue = 0;
  let fcGrade = 0;
  if (length && text) {
    const wordsPerSentence = length / (text.match(/[\.\?\!]/g) || " ").length;
    const syllablesPerWord =
      ((text.match(syllableCounter) || " ").length * 0.98) / length;
    fcValue = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
    fcGrade = 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;
  }
  return (
    <>
      <div id="loading-message" />
      <h2 className="text-3xl font-bold mb-5 text-center">Text Categorizer</h2>
      <div
        style={{
          position: "fixed",
          top: "12vh",
          left: "5px",
          zIndex: 10000,
        }}
        className={
          (info &&
            " p-1 rounded border bg-stone-300 text-indigo-900 animate-expand") ||
          " text-stone-300 bg-indigo-900"
        }
      >
        <IconContext.Provider value={{ size: 32 }}>
          {!info ? (
            <Info onClick={() => showInfo()} />
          ) : (
            <Close onClick={() => showInfo()} />
          )}
        </IconContext.Provider>
        {info && (
          <div
            className="text-slate-900 bg-stone-100 p-1 rounded"
            style={{
              width: 250,
            }}
          >
            This service gauges semantic similarity between what is written in
            the text box and a variety of text sources from the internet. The
            higher the value for a given source, the greater the stylistic
            match. A value higher than 60 indicates a high match.
          </div>
        )}
      </div>
      <div
        className="mx-auto"
        style={{
          width: "fit-content",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <textarea
          id="text-input"
          rows="4"
          cols="50"
          style={{
            width: small ? "80vw" : "40vw",
            height: "70vh",
          }}
          className="mx-auto text-slate-900 p-1"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        {parsed.parsedLength && parsed.parsedLength / length < 0.9 ? (
          <div
            className="mx-5 text-center my-auto"
            style={{
              flexGrow: 1,
              width: small ? "80vw" : "40vw",
            }}
          >
            {parsed.parsedLength} / {length}
            <PropagateLoader color={"#e7e5e3"} className="my-auto" />
          </div>
        ) : (
          <table
            className="mx-5"
            style={{
              flexGrow: 1,
              width: small ? "80vw" : "40vw",
            }}
          >
            <thead>
              <tr>
                <td>Source</td>
                <td>Value</td>
              </tr>
            </thead>
            <tbody>
              {Object.keys(parsed)
                .sort((a, b) => (parsed[a] < parsed[b] ? 1 : -1))
                .map(
                  (p) =>
                    parsed[p] &&
                    !p.toLowerCase().includes("length") && (
                      <tr>
                        <td>{p}</td>
                        <td>
                          {parseInt((parsed[p] * 1000) / parsed.length) / 10}
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        )}
      </div>
      <div>Flesch-Kincaid score: {fcValue}</div>
      <div>Flesch-Kincaid grade level: {fcGrade}</div>
    </>
  );
};

export default TextCategorizer;
