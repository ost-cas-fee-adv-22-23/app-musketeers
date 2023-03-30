import { Mumble as SvgMumble } from '@smartive-education/design-system-component-library-musketeers';

export default function LoadingIndicator(props: { isLoading: boolean }) {
  return props.isLoading ? (
    <div className="flex justify-center gap-xl mt-l">
      <span className="animate-pulse">
        <SvgMumble width="40" height="40" color="text-violet-600" />
      </span>
      <span className="animate-pulse" style={{ animationDelay: '300ms' }}>
        <SvgMumble width="40" height="40" color="text-violet-600" />
      </span>
      <span className="animate-pulse" style={{ animationDelay: '600ms' }}>
        <SvgMumble width="40" height="40" color="text-violet-600" />
      </span>
    </div>
  ) : null;
}
