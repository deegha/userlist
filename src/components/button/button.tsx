interface IButton {
  text: string;
  variant: 'primary' | 'secondary' | 'danger';
  type?: 'submit' | 'reset' | 'button';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
export const Button = ({
  text,
  type,
  loading,
  variant,
  disabled,
  onClick,
}: IButton) => {
  const baseStyles = `inline-flex items-center justify-center px-6 py-2 text-base font-medium transition duration-200 rounded-lg focus:outline-none focus:ring`;
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300',
    secondary:
      'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300',
  };
  const disabledStyles = `opacity-50 cursor-not-allowed`;
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${disabled ? disabledStyles : variantStyles[variant]}`}
    >
      {loading ? (
        <>
          <svg
            className="mr-2 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        text
      )}
    </button>
  );
};
