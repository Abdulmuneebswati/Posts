import { useQuery } from '@tanstack/react-query';

function PromiseBuilder({ promiseFn, children, fetchKey, enabled }) {
  const { data, error, isPending } = useQuery({
    queryKey: fetchKey,
    queryFn: promiseFn,
    enabled,
  });

  return <>{children({ data, isLoading: isPending, error })}</>;
}

export default PromiseBuilder;
