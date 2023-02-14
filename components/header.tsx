import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Header as HeaderFromDesignSystem,
  Navigation,
  NavigationItem,
  Avatar,
  AvatarSize,
  Settings as SvgSettings,
  LogOut as SvgLogOut,
} from '@smartive-education/design-system-component-library-musketeers';

export default function Header() {
  const router = useRouter();

  return (
    <>
      <HeaderFromDesignSystem onClickLogo={() => router.push('/')}>
        <Navigation>
          <Link href="/profile/myProfileHandle">
            <NavigationItem onClick={(e) => e}>
              <Avatar
                alt="Avatar"
                size={AvatarSize.S}
                src="https://randompicturegenerator.com/img/people-generator/gd121f56d8674f28d00ce9f1c44686e7a9bee58b8d33a3c57daaada1fa493c214290f9490833d1ff18f4ee16cd5298e1f_640.jpg"
              />
            </NavigationItem>
          </Link>
          <Link href="/settings">
            <NavigationItem label="Settings" onClick={(e) => e}>
              <span className="animation-svg-settings">
                <SvgSettings height="16" width="16" />
              </span>
            </NavigationItem>
          </Link>
          <Link href="/logout">
            <NavigationItem label="Logout" onClick={(e) => e}>
              <span className="animation-svg-logout">
                <SvgLogOut height="16" width="16" />
              </span>
            </NavigationItem>
          </Link>
        </Navigation>
      </HeaderFromDesignSystem>
    </>
  );
}
