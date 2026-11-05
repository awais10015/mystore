export default function PageLoader({ children }) {
  return (
    <div className="flex min-h-[calc(100dvh-22rem)] items-center justify-center px-4 text-gray-600">
      {children ?? "Loading…"}
    </div>
  );
}
