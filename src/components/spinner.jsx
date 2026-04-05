export default function Spinner({ size = "md", color = "blue" }) {
  // Mapping for different sizes
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  // Mapping for different colors
  const colorClasses = {
    blue: "border-blue-500",
    white: "border-white",
    gray: "border-gray-500",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          animate-spin 
          rounded-full 
          border-t-transparent
        `}
      />
    </div>
  );
}
