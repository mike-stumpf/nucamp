import HeartLogo from "../assets/heart.svg";

export default function Heart(props) {
  return (
    <div className="heart">
      <img className="heart-img" src={HeartLogo} alt="heart" />
      <p className="heart-message">{props.msg}</p>
    </div>
  );
}
