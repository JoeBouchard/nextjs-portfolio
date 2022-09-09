import wordFreqs from "./wordFreqs.json";
let headers = [...Object.keys(wordFreqs.a)];

self.postMessage({ loaded: true });

self.onmessage = ({ data: { text, id } }) => {
  self.postMessage({ loading: true, id });
  const split = text
    .replaceAll(/[^A-Za-z \n]/gi, "")
    .split(/[^A-Za-z]/)
    .filter((val) => val.length > 0);
  if (split.length === 0) {
    self.postMessage({ loading: false, id });
    return;
  }

  const count = split.reduce((state, val) => {
    const temp = { ...state };
    if (!temp[val.toLowerCase()]) temp[val.toLowerCase()] = 0;
    temp[val.toLowerCase()]++;
    return temp;
  }, {});

  const rawFreqs = Object.keys(count).reduce(
    (state, val) => {
      const temp = { ...state };
      if (!wordFreqs[val]) return temp;
      headers.forEach((h) => {
        temp[h] += parseFloat(count[val] * wordFreqs[val][h]);
      });
      return temp;
    },
    headers.reduce((state, val) => ({ ...state, [val]: 0 }), {})
  );

  const numWords = Object.keys(count).reduce((state, val) => {
    if (wordFreqs[val]) return state + count[val];
    return state;
  }, 0);

  if (numWords === 0) {
    self.postMessage({ loading: false, id });
    return;
  }

  self.postMessage({
    ...rawFreqs,
    id,
    length: numWords,
    parsedLength: split.length,
  });
  self.postMessage({ loading: false, id });
};
