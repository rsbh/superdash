import Button from "@/components/Button";
import Input from "@/components/Input";

import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  function onNewAppBtnClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    navigate("/editor");
  }
  return (
    <div>
      <Header showAvatar={true} />
      <div style={{ padding: "16px" }}>
        <div>
          <Input></Input>
          <Button onClick={onNewAppBtnClick}>Create New App</Button>
        </div>
      </div>
    </div>
  );
}
