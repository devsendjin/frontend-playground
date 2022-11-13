import { SVGProps } from "react";

const CrossIcon: RFC<SVGProps<any>> = (props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' {...props}>
      <path d='M24 3.752 19.577 0l-7.771 9.039L4.159.031 0 4.309c2.285 2.885 5.284 5.903 8.362 8.708L.197 22.464l1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z' />
    </svg>
  );
};

const CircleIcon: RFC<SVGProps<any>> = (props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' {...props}>
      <circle cx='12' cy='12' r='12' />
    </svg>
  );
};

export { CrossIcon, CircleIcon };
