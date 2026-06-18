// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { TailSpin } from "react-loader-spinner";

// export default function Loader() {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

//   // useEffect(() => {
//   //     setLoading(true);
//   //     const timer = setTimeout(()=>{
//   //       setLoading(false);
//   //     },700)

//   //    return () => clearTimeout(timer)
//   // },[location.pathname])

//   // if(!loading) return null;

//   return (
//     <div
//       className="position-fixed top-0 start-0 w-100 vh-100 d-flex 
//       justify-content-center align-items-center"
//       style={{
//         background: "rgba(255,255,255,0.4)",
//         zIndex: 9999,
//       }}
//     >
//       <TailSpin height="40" width="40" color="var(--primary-color)" />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

export default function Loader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(255,255,255,0.4)",
        zIndex: 9999,
      }}
    >
      <TailSpin height="40" width="40" color="var(--primary-color)" />
    </div>
  );
}