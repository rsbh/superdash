import Header from "@/components/Header";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  function onNewAppBtnClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    navigate("/editor");
  }
  return (
    <div>
      <Header />
      <div>
        <div>
          <input></input>
          <button onClick={onNewAppBtnClick}>Create New App</button>
        </div>
      </div>
    </div>
  );
}
