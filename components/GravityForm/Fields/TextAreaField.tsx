import { TextAreaField as TextAreaFieldType, FieldError } from "graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "utilities/useGravityForm";

interface Props {
  field: TextAreaFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE = "";

export default function TextAreaField({ field, fieldErrors, formId }: Props) {
  const {
    databaseId: id,
    type,
    label,
    placeholder,
    description,
    cssClass,
    isRequired,
  } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div
      className={`gfield flex flex-col font-sans gfield-${type} ${cssClass}`.trim()}
    >
      <label
        className={`mb-2 text-left text-sm font-bold text-black`}
        htmlFor={htmlId}
      >
        {`${label} ${isRequired ? "*" : ""}`}
      </label>
      <textarea
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        className={`form-input[type='textarea'] font-body h-48 w-full bg-white p-2 text-black border-[1px] border-black`}
        placeholder={(isRequired ? `${placeholder}*` : placeholder) ?? ``}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateTextAreaFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          });
        }}
      />
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </div>
  );
}
