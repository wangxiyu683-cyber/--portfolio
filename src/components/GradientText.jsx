/**
 * GradientText — animated moving gradient text
 * Ported from react-bits' GradientText (JS+CSS) to this project's plain Vite setup.
 */
export default function GradientText({
  children,
  className = '',
  style = {},
  colors = ['#323360', '#2F307E', '#5556C4'],
  animationSpeed = 8,
  showBorder = false,
}) {
  const gradient = `linear-gradient(90deg, ${[...colors, colors[0]].join(', ')})`

  return (
    <span className={`gradient-text-wrapper relative ${className}`}>
      {showBorder && (
        <span
          aria-hidden
          className="gradient-text-border absolute -inset-1 rounded-[1.25em] -z-10"
          style={{
            backgroundImage: gradient,
            backgroundSize: '300% 100%',
            animation: `gradient-text-move ${animationSpeed}s linear infinite`,
          }}
        />
      )}
      <span
        className="gradient-text-content"
        style={{
          ...style,
          backgroundImage: gradient,
          backgroundSize: '300% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          animation: `gradient-text-move ${animationSpeed}s linear infinite`,
        }}
      >
        {children}
      </span>
    </span>
  )
}
