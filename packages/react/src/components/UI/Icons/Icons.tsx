import { ReactComponent as GithubIcon } from '@images/svg/github.svg';

const svgIconMap = {
  github: GithubIcon,
} as const;

interface ISvgIconProps extends React.SVGProps<SVGSVGElement> {
  type: keyof typeof svgIconMap;
}

const SvgIcon: RFC<ISvgIconProps> = ({ type, ...restProps }) => {
  if (!type) return null;
  const Component = svgIconMap[type];
  return <Component {...restProps} />;
};
SvgIcon.displayName = 'SvgIcon';

export { svgIconMap, SvgIcon };
