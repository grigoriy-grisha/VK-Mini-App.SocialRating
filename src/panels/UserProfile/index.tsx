import {Panel, PanelHeader} from "@vkontakte/vkui";

interface IProps {
    id: string
}

function UserProfile({id}: IProps) {
    return <Panel id={id}>
        <PanelHeader>Главная</PanelHeader>
    </Panel>
}

export default UserProfile
