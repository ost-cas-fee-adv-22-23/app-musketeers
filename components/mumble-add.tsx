import {
  Card,
  CardSize,
  Textarea,
  Button,
  ButtonType,
  ButtonSize,
  Upload,
  Send,
} from '@smartive-education/design-system-component-library-musketeers';

type MumbleAddProps = {
  avatar: JSX.Element;
  title: string;
  onImageUpload: () => void;
  onSend: () => void;
};

function MumbleAdd(props: MumbleAddProps) {
  return (
    <Card size={CardSize.XL} hasRoundBorders={true}>
      <div className="relative">
        <div className="absolute -top-s -left-[80px] hidden sm:block">{props.avatar}</div>

        <div className="label-xl text-slate-900 mb-s">{props.title}</div>

        <Textarea onChange={(event) => event} placeholder="Deine Meinung zählt!" rows={8} value="" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-xs mt-xs">
          <Button
            label="Bild hochladen"
            onClick={props.onImageUpload}
            type={ButtonType.DEFAULT}
            size={ButtonSize.M}
            isFullWidth={true}
            showBorder={false}
          >
            <Upload />
          </Button>
          <Button
            label="Absenden"
            onClick={props.onSend}
            type={ButtonType.VIOLET}
            size={ButtonSize.M}
            isFullWidth={true}
            showBorder={false}
          >
            <Send />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default MumbleAdd;
