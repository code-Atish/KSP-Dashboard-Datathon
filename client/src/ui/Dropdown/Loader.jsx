import { PropagateLoader } from "react-spinners";
import "./dropdown.css";
export default function Loader() {
  return (
    <div className="loading_screen">
      <PropagateLoader
        color={"#5eb1ef"} //Optional color --black-a4
        loading={true}
        cssOverride={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: 20,
          alignItems: "center",
        }}
        size={13}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
