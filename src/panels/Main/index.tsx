import { useEffect } from "react";
import { Panel, Search } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";

import { VoteUser } from "./components";
import { socialRatingService } from "@/services";

interface IProps {
  id: string;
}

function Main({ id }: IProps) {
  useEffect(() => {
    socialRatingService.getAllUser();
  }, []);

  console.log(socialRatingService.getAvailableVotes);

  return (
    <Panel id={id}>
      <div className="flex flex-col flex-1" style={{ maxWidth: "100vw" }}>
        <Search placeholder="Найти друга" />
        <VoteUser user={socialRatingService.getAvailableVotes} />
      </div>

    </Panel>
  );
}

export default observer(Main);
