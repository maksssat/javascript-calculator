export default function Display(props) {
  return (
    <div id="display">
      <div className="display">{props.display}</div>
      <div className="result">{props.result}</div>
    </div>
  );
}
