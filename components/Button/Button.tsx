import Link from "next/link";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  type:
    | "primary"
    | "secondary"
    | "secondary-outline"
    | "tertiary"
    | "quaternary"
    | "alert"
    | "donate"
    | "donate-white"
    | "org-circled-nav"
    | "org-circled"
    | "wht-circled"
    | "teal-circled"
    | "blk-text"
    | "wht-text"
    | "org-text"
    | "teal-text"
    | "form-submit"
    | string;
  onClick?: () => void;
  disabled?: boolean;
}

const styleLoader = (type: string) => {
  switch (type) {
    case "donate-white":
      return `rounded-full bg-white py-2 px-4 font-bold text-primary font-sans uppercase
      hover:bg-primary hover:text-white transition duration-300 ease-in-out`;
    case "donate":
      return `rounded-full bg-primary py-2 px-4 font-bold text-white font-sans uppercase
      hover:bg-primary transition duration-300 ease-in-out hover:shadow-lg hover:border-primary hover:border-1 hover:text-primary`;
    case "primary":
      return `rounded-full border-primary border-2 bg-primary py-2 px-4 font-bold text-white font-sans uppercase hover:bg-white transition duration-300 ease-in-out hover:shadow-lg hover:border-white hover:border-1 hover:text-primary`;
    case "secondary":
      return `rounded-full bg-white py-2 px-4 font-bold text-primary font-sans uppercase hover:bg-primary hover:text-white transition duration-300 ease-in-out`;
    case "secondary-outline":
      return `bg-white rounded-full border-2 border-primary py-2 px-4 font-bold text-primary font-sans uppercase hover:bg-primary hover:text-white hover:border-primary transition duration-300 ease-in-out`;
    case "tertiary":
      return `rounded-full bg-tertiary py-2 px-4 font-bold text-white font-sans uppercase hover:bg-tertiary-dark transition duration-300 ease-in-out`;
    case "quaternary":
      return `rounded-full bg-quaternary py-2 px-4 font-bold text-white font-sans uppercase`;
    case "alert":
      return `rounded-full bg-alert py-2 px-4 font-bold text-white font-sans uppercase`;

    case "org-circled-nav":
      return `rounded-[50%] border-[1px] border-orange py-2 px-6 font-semibold text-orange font-heading text-sm uppercase hover:border-teal hover:text-teal transition duration-300 ease-in-out`;
    case "org-circled":
      return `rounded-[50%] border-[1px] border-orange py-2 px-6 font-semibold text-orange font-heading text-lg uppercase hover:border-teal hover:text-teal transition duration-300 ease-in-out`;
    case "wht-circled":
      return `rounded-[50%] border-[1px] border-white py-2 px-6 font-semibold text-white font-heading text-lg uppercase hover:border-teal hover:text-teal transition duration-300 ease-in-out`;
    case "teal-circled":
      return `rounded-[50%] border-[1px] border-teal py-2 px-6 font-semibold text-teal font-heading text-lg uppercase hover:border-orange hover:text-orange transition duration-300 ease-in-out`;

    case "blk-text":
      return `font-sans text-black font-normal hover:font-semibold hover:text-orange transition duration-300 ease-in-out`;
    case "wht-text":
      return `font-sans text-white font-normal hover:font-semibold hover:text-orange transition duration-300 ease-in-out`;
    case "org-text":
      return `font-sans text-orange font-normal hover:font-semibold hover:text-teal transition duration-300 ease-in-out`;
    case "teal-text":
      return `font-sans text-teal font-normal hover:font-semibold hover:text-orange transition duration-300 ease-in-out`;

    default:
      return `rounded-full bg-primary py-2 px-4 font-semibold text-white font-heading uppercase`;
  }
};

const Button = ({
  href,
  children,
  className,
  type,
  target,
  disabled,
  ...props
}: ButtonProps) => {
  if (href && type !== "donate" && type !== "donate-white") {
    return (
      <Link
        className={`${styleLoader(type)} ${className}`}
        role="button"
        href={href}
        target={target}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={`${styleLoader(type)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
