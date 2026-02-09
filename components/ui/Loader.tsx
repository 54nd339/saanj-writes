
interface LoaderProps {
  siteName?: string;
}

export function Loader({ siteName = 'Saanj.Lit' }: LoaderProps) {
  return (
    <div className="min-h-screen w-full bg-[var(--bg-main)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent)] animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.4s',
              }}
            />
          ))}
        </div>

        <p className="font-serif text-base sm:text-lg md:text-xl text-[var(--text-muted)] tracking-wider opacity-60 animate-pulse-slow">
          {siteName}
        </p>
      </div>
    </div>
  );
}
