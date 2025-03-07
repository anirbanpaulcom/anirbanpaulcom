// import { fetcher } from '@/lib/util';
// import useSWR from 'swr';

// interface FetcherOptions<T> {
//   method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
//   body?: Record<string, unknown> | FormData;
//   pagination?: { page: number; limit: number };
//   initialData?: T;
//   revalidateOnFocus?: boolean;
//   shouldRetryOnError?: boolean;
//   isFormData?: boolean;
//   customHeaders?: Record<string, string>;
//   cache?: 'force-cache' | 'no-store';
// }

// export const useSWRFetcher = <T>(
//   url: string | null,
//   options: FetcherOptions<T> = {},
// ) => {
//   const {
//     method = 'GET',
//     body,
//     pagination,
//     initialData,
//     revalidateOnFocus = false,
//     shouldRetryOnError = false,
//     isFormData = false,
//     customHeaders = {},
//     cache = 'no-store',
//   } = options;

//   const headers: Record<string, string> = {
//     ...customHeaders,
//     'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
//   };

//   const {
//     data: response,
//     error,
//     isLoading,
//     isValidating,
//     mutate: swrMutate,
//   } = useSWR<T>(
//     method === 'GET' && url
//       ? pagination
//         ? `${url}?page=${pagination.page}&limit=${pagination.limit}`
//         : url
//       : null,
//     (url) => fetcher<T>(url, { method, headers, cache }),
//     {
//       fallbackData: initialData,
//       revalidateOnFocus,
//       shouldRetryOnError,
//     },
//   );

//   const executeMutation = async () => {
//     if (method === 'GET' || !url) return;
//     try {
//       const options: RequestInit = {
//         method,
//         headers,
//         body: body
//           ? isFormData
//             ? (body as FormData)
//             : JSON.stringify(body)
//           : undefined,
//       };

//       const result = await fetcher<T>(url, options);

//       if (method === 'POST' || method === 'PUT') {
//         swrMutate({ ...response, ...result }, false);
//       }

//       if (method === 'DELETE') {
//         swrMutate(undefined, false);
//       }

//       return result;
//     } catch (err) {
//       throw err;
//     }
//   };

//   if (method !== 'GET' && url) {
//     executeMutation();
//   }

//   return {
//     response,
//     data:
//       response && typeof response === 'object' && 'data' in response
//         ? (response as { data: T })?.data
//         : undefined,
//     error,
//     loading: isLoading,
//     isValidating,
//     mutate: swrMutate,
//     executeMutation,
//   };
// };
