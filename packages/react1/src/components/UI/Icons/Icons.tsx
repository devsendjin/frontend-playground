import { ReactComponent as GithubIcon } from "@images/svg/github.svg";

const svgIconMap = {
  github: GithubIcon,
} as const;

type SvgIconProps = React.SVGProps<SVGSVGElement> & {
  type: keyof typeof svgIconMap;
};

const SvgIcon: RFC<SvgIconProps> = ({ type, ...restProps }) => {
  if (!type) return null;
  const Component = svgIconMap[type];
  return <Component {...restProps} />;
};
SvgIcon.displayName = "SvgIcon";

export { svgIconMap, SvgIcon };
