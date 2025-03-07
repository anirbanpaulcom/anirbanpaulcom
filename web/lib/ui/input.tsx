'use client';

import { cn } from '@/lib/util';
import { EyeClosedIcon } from '@radix-ui/react-icons';
import React, { useCallback, useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { IoAlertCircleOutline } from 'react-icons/io5';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassname?: string;
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassname, type, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const toggleIsPasswordVisible = useCallback(
      () => setIsPasswordVisible(!isPasswordVisible),
      [isPasswordVisible, setIsPasswordVisible],
    );

    return (
      <div className={`my-4 ${containerClassname}`}>
        {props.label && (
          <label
            htmlFor={props.id}
            className="block text-base font-medium text-gray-500 mb-1"
          >
            {props.label}
          </label>
        )}
        <div className="relative flex">
          <input
            type={isPasswordVisible ? 'text' : type}
            className={cn(
              'w-full h-10 p-2 rounded-lg border bg-gray-100 font-normal border-gray-300 text-gray-900 placeholder-gray-400 placeholder:text-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-md',
              props.error &&
                'border-red-500 focus:border-red-500 focus:ring-red-500',
              className,
            )}
            ref={ref}
            {...props}
          />

          <div className="group">
            {props.error && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex flex-none items-center px-2.5">
                <IoAlertCircleOutline
                  className={cn(
                    'size-5 text-white',
                    type === 'password' &&
                      'transition-opacity group-hover:opacity-0',
                  )}
                  fill="#ef4444"
                />
              </div>
            )}
            {type === 'password' && (
              <button
                className={cn(
                  'absolute inset-y-0 right-0 flex items-center px-3',
                  props.error &&
                    'opacity-0 transition-opacity group-hover:opacity-100',
                )}
                type="button"
                onClick={() => toggleIsPasswordVisible()}
                aria-label={
                  isPasswordVisible ? 'Hide password' : 'Show Password'
                }
              >
                {isPasswordVisible ? (
                  <BsEye
                    className="size-4 flex-none text-gray-500 transition hover:text-gray-700"
                    aria-hidden
                  />
                ) : (
                  <EyeClosedIcon
                    className="size-4 flex-none text-gray-500 transition hover:text-gray-700"
                    aria-hidden
                  />
                )}
              </button>
            )}
          </div>
        </div>

        {props.error && (
          <span
            className="mt-2 block text-sm text-red-500"
            role="alert"
            aria-live="assertive"
          >
            {props.error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
