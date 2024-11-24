import { FC } from "react";

interface DemoProps {
  title: string;
}

const Demo: FC<DemoProps> = ({ title }) => {
  return (
    <>
      <h3>Demo component</h3>
      <p>title: {title}</p>
    </>
  );
};

// function Demo({ title }: { title: string }) {
//   return (
//     <>
//       <h3>Demo component</h3>
//       <p>title: {title}</p>
//     </>
//   );
// }

export default Demo;