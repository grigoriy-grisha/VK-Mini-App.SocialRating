import { observer } from "mobx-react-lite";
import { Button, Div, ModalPage, ModalPageHeader } from "@vkontakte/vkui";
import {countService} from "../../services/CountService.ts";


interface IProps {
  id: string;
}

function CountModal({ id }: IProps) {
  return (
    <ModalPage id={id}>
      <ModalPageHeader>Counter</ModalPageHeader>
      <Div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={countService.increment}>-</Button>
        {countService.count}
        <Button onClick={countService.decrement}>+</Button>
      </Div>
    </ModalPage>
  );
}

export default observer(CountModal);
