export default function ProgressBar(props) {
  const width = props.width ? props.width : "100%";
  const progressWidth = props.progress + "%";
  return (
    <div
      style={{
        width: width,
        height: props.height ? props.height : "30px",
        backgroundColor: props.bgColor ? props.bgColor : "#ecf2f9",
      }}
    >
      <div
        style={{
          width: progressWidth,
          height: props.height ? props.height : "30px",
          backgroundColor: props.color ? props.color : "#0283ff",
        }}
      ></div>
    </div>
  );
}
