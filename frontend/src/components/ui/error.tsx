const ErrorComponent = ({ message }: any) => (
  <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
    Failed to load clients: {message}
  </div>
);

export default ErrorComponent;
