const Education = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl my-2">Education</h2>
      <h2 className="text-2xl">
        Graduated from the University of Oklahoma with dual degrees in May of
        2021
      </h2>
      <div className="grid grid-cols-2 mt-10">
        <div className="hover:animate-grow font-bold mx-3 p-2 border rounded-lg grow border-zinc-700 dark:border-zinc-300 border-3 ">
          <h3 className="text-2xl mt-3">
            Bachelor of Science in Computer Science
          </h3>
          <div>Minor in Mathematics</div>
          <div className="mt-3">Graduated with Special Distinction</div>
          <div className="mb-2">GPA: 3.9</div>
          <div className="mt-2">Coursework:</div>
          <ul className="font-normal">
            <li>Artificial Neural Networks and Evolution</li>
            <li>Text Analytics</li>
            <li>Software Engineering I & II</li>
            <li>Software Requirements and Specification</li>
            <li>Database Management Systems</li>
            <li>Human/Computer Interaction</li>
            <li>Algorithm Analysis</li>
            <li>Data Structures</li>
          </ul>
        </div>
        <div className="hover:animate-grow font-bold mx-3 p-2 border rounded-lg grow border-zinc-700 dark:border-zinc-300 border-3 ">
          <h3 className="text-2xl mt-3">Bachelor of Arts in Linguistics</h3>
          <div>Minor in Portuguese</div>
          <div className="mt-3">Graduated Summa Cum Laude</div>
          <div className="mb-2">GPA: 3.9</div>
          <div className="mt-2">Coursework:</div>
          <ul className="font-normal">
            <li>Translation</li>
            <li>Second Language Acquisition</li>
            <li>Linguistic Field Methods</li>
            <li>Historical Linguistics</li>
            <li>Phonology</li>
            <li>Syntax</li>
            <li>Semantics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Education;
