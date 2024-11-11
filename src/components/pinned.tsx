export function Pinned() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="absolute h-3 w-3 rounded-full bg-blue-500 ring-4 ring-white" />
        <div className="absolute animate-ping-static -inset-[5px] h-6 w-6 rounded-full bg-blue-500" />
      </div>
    </div>
  );
}
