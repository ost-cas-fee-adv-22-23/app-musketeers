import { IconLink, IconLinkType, Profile, Time } from '@smartive-education/design-system-component-library-musketeers';
import { MouseEvent } from 'react';

type MumbleProps = {
  avatar: JSX.Element;
  displayName: string;
  userName: string;
  timestamp: string;
  onClickUserName: (e: MouseEvent<Element>) => void;
  onClickTimestamp: (e: MouseEvent<Element>) => void;
  footer: JSX.Element;
  children?: JSX.Element;
  mumble: JSX.Element;
  isInline?: boolean;
};

function Mumble(props: MumbleProps) {
  return (
    <div className="relative">
      {props.isInline ? (
        <div className={'flex items-center mb-s'}>
          <div>{props.avatar}</div>
          <div className={'flex flex-col ml-xs'}>
            <div className="label-m text-slate-900 mb-xxs">{props.displayName}</div>
            <div className="flex gap-s">
              <IconLink type={IconLinkType.VIOLET} label={props.userName} href="" target="" onClick={props.onClickUserName}>
                <Profile />
              </IconLink>
              <IconLink
                type={IconLinkType.DEFAULT}
                label={props.timestamp}
                href=""
                target=""
                onClick={props.onClickTimestamp}
              >
                <Time />
              </IconLink>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute -top-s -left-[80px] hidden sm:block">{props.avatar}</div>

          <div className="label-l text-slate-900 mb-xxs">{props.displayName}</div>

          <div className="flex gap-s">
            <IconLink type={IconLinkType.VIOLET} label={props.userName} href="" target="" onClick={props.onClickUserName}>
              <Profile />
            </IconLink>
            <IconLink type={IconLinkType.DEFAULT} label={props.timestamp} href="" target="" onClick={props.onClickTimestamp}>
              <Time />
            </IconLink>
          </div>
        </>
      )}

      <div className="paragraph-s text-slate-900 grid gap-m">{props.mumble}</div>

      <div className="pt-s flex gap-s">{props.footer}</div>

      {props.children}
    </div>
  );
}

export default Mumble;
