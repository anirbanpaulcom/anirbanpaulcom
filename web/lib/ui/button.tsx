'use client';
import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/util';
import Tooltiper from './tooltip';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: ReactNode | string;
  textWrapperClassName?: string;
  loading?: boolean;
  icon?: ReactNode;
  shortcut?: string;
  right?: ReactNode;
  disabledTooltip?: string | ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'danger-outline';
}

export const buttonVariantClasses: Record<
  'primary' | 'secondary' | 'success' | 'danger' | 'danger-outline',
  string
> = {
  primary: 'hover:bg-gray border-on',
  secondary: 'border-on hover:bg-reverse hover:text-reverse',
  success: 'bg-green-500 text-white hover:bg-green-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  'danger-outline':
    'border-on bg-white text-red-500 hover:bg-red-600 hover:text-white',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      variant = 'primary',
      className,
      textWrapperClassName,
      loading,
      icon,
      shortcut,
      disabledTooltip,
      right,
      ...props
    }: ButtonProps,
    forwardedRef,
  ) => {
    const variantClass = buttonVariantClasses[variant];

    if (disabledTooltip) {
      return (
        <Tooltiper content={disabledTooltip}>
          <div
            className={cn(
              'flex h-8 w-full cursor-not-allowed items-center justify-center gap-x-2 rounded-xl border border-gray-200 bg-gray-100 px-4 text-sm text-gray-400 transition-all focus:outline-none',
              {
                'border-transparent bg-transparent':
                  variant?.endsWith('outline'),
              },
              className,
            )}
          >
            {icon}
            {text && (
              <div
                className={cn(
                  'min-w-0 truncate font-semibold',
                  shortcut && 'flex-1 text-left',
                  textWrapperClassName,
                )}
              >
                {text}
              </div>
            )}
            {shortcut && (
              <kbd
                className={cn(
                  'hidden rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-light text-gray-400 md:inline-block',
                  {
                    'bg-gray-100': variant?.endsWith('outline'),
                  },
                )}
              >
                {shortcut}
              </kbd>
            )}
          </div>
        </Tooltiper>
      );
    }

    return (
      <button
        ref={forwardedRef}
        type={props.onClick ? 'button' : 'submit'}
        className={cn(
          'group cursor-pointer flex h-8 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm',
          props.disabled || loading
            ? 'cursor-not-allowed bg-gray text-gray-400 border-on'
            : variantClass,
          className,
        )}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading ? <DotsHorizontalIcon /> : icon ? icon : null}
        {text && (
          <div
            className={cn(
              'min-w-0 truncate font-semibold',
              shortcut && 'flex-1 text-left',
              textWrapperClassName,
            )}
          >
            {text}
          </div>
        )}
        {shortcut && (
          <kbd
            className={cn(
              'hidden rounded px-2 py-0.5 text-xs font-light transition-all duration-75 md:inline-block',
              {
                'bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-gray-300':
                  variant === 'primary',
                'bg-gray border-on text-gray-400': variant === 'secondary',
                'boder-on bg-transparent/10': variant === 'danger-outline',
              },
            )}
          >
            {shortcut}
          </kbd>
        )}
        {right}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
