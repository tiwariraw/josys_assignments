import { FC } from "react";

interface PractiseProps {
  title: string;
}

// type PractiseProps = {
//   title: string;
// };

const Practise: FC<PractiseProps> = ({ title }) => {
  return (
    <>
      <h1>React + Typescript</h1>
      <h3>name: {title}</h3>
    </>
  );
};

// const Practise = ({ title }: { title: string }) => {
//   return (
//     <>
//       <h1>React + Typescript</h1>
//       <h3>name: {title}</h3>
//     </>
//   );
// };

export default Practise;
