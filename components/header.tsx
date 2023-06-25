import Link from 'next/link';
import {
  Header as HeaderFromDesignSystem,
  Navigation,
  NavigationItem,
  Avatar,
  AvatarSize,
  Settings as SvgSettings,
  LogOut as SvgLogOut,
} from '@smartive-education/design-system-component-library-musketeers';
import { signOut, useSession } from 'next-auth/react';
import { PROFILE_IMG_URL } from '../constants/qwacker.constants';

export default function Header() {
  const session = useSession();

  return (
    <>
      <HeaderFromDesignSystem elementType={Link} iconLinkUrl={'/'}>
        <Navigation>
          <NavigationItem elementType={Link} href={'/profile/me'} testid={'button-page-profile'}>
            <Avatar alt="Avatar" size={AvatarSize.S} src={PROFILE_IMG_URL + session.data?.token.sub} />
          </NavigationItem>
          <NavigationItem label="Settings" elementType={Link} href={'/settings'}>
            <span className="animation-svg-settings">
              <SvgSettings height="16" width="16" />
            </span>
          </NavigationItem>
          <NavigationItem label="Logout" onClick={() => signOut()}>
            <span className="animation-svg-logout">
              <SvgLogOut height="16" width="16" />
            </span>
          </NavigationItem>
        </Navigation>
      </HeaderFromDesignSystem>
    </>
  );
}
