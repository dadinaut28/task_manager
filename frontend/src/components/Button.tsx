import type { MouseEventHandler, ReactElement } from "react";

interface ButtonProps {
  content?: string | undefined;
  onClick?: MouseEventHandler;
  className: string;
  disabled?: boolean;
  children?: ReactElement;
}

function Button({
  content,
  onClick,
  className,
  disabled = false,
  children,
}: ButtonProps) {
  const defaultClass =
    "h-8 w-24 cursor-pointer bg-blue-600 rounded-md text-white";
  const buttonClass = className ? className : defaultClass;

  return (
    <button disabled={disabled} className={buttonClass} onClick={onClick}>
      {children}
      {content}
    </button>
  );
}

export default Button;
