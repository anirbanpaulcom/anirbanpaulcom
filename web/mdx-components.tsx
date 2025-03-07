import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: (props) => (
      <a {...props} className="text-blue-500 hover:text-blue-700 no-underline">
        {props.children}
      </a>
    ),
    h2: (props) => (
      <h2 {...props} className="!my-4">
        {props.children}
      </h2>
    ),
  };
}
