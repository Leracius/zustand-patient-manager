export default function Error({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center my-2 text-red-500 font-bold  uppercase text-sm">
      {children}
    </p>
  );
}
