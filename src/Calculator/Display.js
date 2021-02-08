import { useSelector } from "react-redux";

export default function Display() {
  const display = useSelector((state) => state.calculator.display);
  return (
    <div id="display">
      <div className="display">{display}</div>
    </div>
  );
}
