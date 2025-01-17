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
      {label && (
        <label className="text-sm font-semibold text-tBase">{label}</label>
      )}
      <div className="border-1 rounded-sm border-border bg-bgTextInput p-2">
        <input
          {...props}
          name={name}
          placeholder={placeholder}
          className="w-full border-none bg-transparent text-colorTextInput outline-none"
        />
      </div>
      {showErrors && (
        <div className="text-sm text-red-500">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};
