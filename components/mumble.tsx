import { QwackModelDecorated } from '../models/qwacker.model';
import { getFormattedTimestamp } from '../helpers/common.helpers';
import MumbleInlineHeader from './mumble-inline-header';
import MumbleOutlineHeader from './mumble-outline-header';
import MumbleContent from './mumble-content';
import MumbleFooter from './mumble-footer';

type MumbleProps = {
  mumbleData: QwackModelDecorated;
  avatarUrl: string;
  children?: JSX.Element;
  isInline?: boolean;
  onDeleteCallback?: () => void;
};

function Mumble({ mumbleData, avatarUrl, isInline, children, onDeleteCallback }: MumbleProps) {
  return (
    <div className="relative">
      {isInline ? (
        <MumbleInlineHeader
          displayName={mumbleData.creatorData.firstName + ' ' + mumbleData.creatorData.lastName}
          userName={mumbleData.creatorData.userName}
          avatarUrl={avatarUrl}
          timeStamp={getFormattedTimestamp(mumbleData.id)}
          creator={mumbleData.creator}
        ></MumbleInlineHeader>
      ) : (
        <MumbleOutlineHeader
          displayName={mumbleData.creatorData.firstName + ' ' + mumbleData.creatorData.lastName}
          userName={mumbleData.creatorData.userName}
          avatarUrl={avatarUrl}
          timeStamp={getFormattedTimestamp(mumbleData.id)}
          creator={mumbleData.creator}
        ></MumbleOutlineHeader>
      )}
      <MumbleContent text={mumbleData.text} mediaUrl={mumbleData.mediaUrl ? mumbleData.mediaUrl : null}></MumbleContent>
      <MumbleFooter mumbleData={mumbleData} onDeleteCallback={onDeleteCallback}></MumbleFooter>
      {children}
    </div>
  );
}

export default Mumble;
