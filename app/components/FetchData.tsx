import { clsx } from "clsx";

type StateType<T> = {
  data: T | null;
  error?: string | null;
  loading: boolean;
  abortController: AbortController;
};

type Props<T> = {
  request: (abortSignal?: AbortSignal) => Promise<T>;
  children: (data: T | null, state: StateType<T>) => React.ReactNode;
  handleError?: boolean;
  handleLoading?: boolean;
  handleEmptyData?: boolean;
  loadingClassName?: string;
};

export async function FetchData<T>({
  request,
  children,
  handleError = true,
  handleLoading = true,
  handleEmptyData = true,
  loadingClassName,
}: Props<T>) {
  const abortController = new AbortController();
  let data: T | null = null;
  let error: string | null = null;
  let loading = true;

  try {
    data = await request(abortController.signal);

    loading = false;
  } catch (err: any) {
    loading = false;
    error = err.toString();
  }

  const state: StateType<T> = {
    data,
    error,
    loading,
    abortController,
  };

  // Handling error
  if (error && handleError) {
    return <div>Error: {error}</div>;
  }

  // Handling loading state
  if (loading && handleLoading) {
    return (
      <div
        className={clsx(
          "w-[100%]  flex justify-center items-center ",
          loadingClassName
        )}
      >
        <div>Loading...</div>
      </div>
    );
  }

  // Handling empty data
  if (
    handleEmptyData &&
    !loading &&
    //@ts-ignore
    (data?.items ? data.items.length === 0 : data?.length === 0)
  ) {
    return (
      <div
        className={clsx(
          "font-semibold w-full h-full items-center flex justify-center text-xl text-[#858C94]",
          loadingClassName
        )}
      >
        No data found.
      </div>
    );
  }
  // Default return
  return <>{typeof children === "function" ? children(data, state) : null}</>;
}
