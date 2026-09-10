const variants = {
  primary:
    "bg-clay text-cream hover:bg-clay-600 shadow-sm shadow-clay/30",
  outline:
    "border border-espresso-700 text-espresso-800 hover:bg-espresso-900 hover:text-cream",
  ghost: "text-espresso-800 hover:bg-latte-200",
};

export default function Button({
  as: Tag = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
