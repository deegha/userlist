import { ErrorMessage } from 'formik';

interface IInput {
  showErrors: boolean;
  name: string;
  placeholder: string;
  label?: string;
}
export const Input = ({
  showErrors = true,
  name,
  placeholder,
  label,
  ...props
}: IInput) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-semibold text-tBase">{label}</label>}
      <div className="rounded-lg border-2 border-border p-2">
        <input
          {...props}
          name={name}
          placeholder={placeholder}
          className="w-full border-none bg-transparent text-tBase outline-none"
        />
      </div>
      {showErrors && (
        <div className="text-red-700">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};
