import { MouseEvent } from 'react';
import { QwackModelDecorated } from '../models/qwacker.model';
import { getFormattedTimestamp } from '../helpers/common.helpers';
import MumbleInlineHeader from './mumble-inline-header';
import MumbleOutlineHeader from './mumble-outline-header';
import MumbleContent from './mumble-content';
import MumbleFooter from './mumble-footer';

type MumbleProps = {
  mumbleData: QwackModelDecorated;
  avatarUrl: string;
  onClickUserName: (e: MouseEvent<Element>) => void;
  children?: JSX.Element;
  isInline?: boolean;
  onDeleteCallback?: () => void;
};

function Mumble({ mumbleData, avatarUrl, onClickUserName, isInline, children, onDeleteCallback }: MumbleProps) {
  return (
    <div className="relative">
      {isInline ? (
        <MumbleInlineHeader
          displayName={mumbleData.creatorData.firstName + ' ' + mumbleData.creatorData.lastName}
          userName={mumbleData.creatorData.userName}
          avatarUrl={avatarUrl}
          timeStamp={getFormattedTimestamp(mumbleData.id)}
          onClickUserName={onClickUserName}
        ></MumbleInlineHeader>
      ) : (
        <MumbleOutlineHeader
          displayName={mumbleData.creatorData.firstName + ' ' + mumbleData.creatorData.lastName}
          userName={mumbleData.creatorData.userName}
          avatarUrl={avatarUrl}
          timeStamp={getFormattedTimestamp(mumbleData.id)}
          onClickUserName={onClickUserName}
        ></MumbleOutlineHeader>
      )}
      <MumbleContent text={mumbleData.text} mediaUrl={mumbleData.mediaUrl ? mumbleData.mediaUrl : null}></MumbleContent>
      <MumbleFooter mumbleData={mumbleData} onDeleteCallback={onDeleteCallback}></MumbleFooter>
      {children}
    </div>
  );
}

export default Mumble;
