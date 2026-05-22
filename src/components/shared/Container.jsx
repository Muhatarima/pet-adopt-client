export default function Container({ children }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      {children}
    </div>
  );
}