// import { gql } from "@apollo/client";

import { EmailField as EmailFieldType, FieldError } from "graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  EmailFieldValue,
} from "utilities/useGravityForm";

// export const EMAIL_FIELD_FIELDS = gql`
//   fragment EmailFieldFields on EmailField {
//     id
//     formId
//     label
//     description
//     cssClass
//     isRequired
//     placeholder
//   }
// `;

interface Props {
  field: EmailFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

const DEFAULT_VALUE = "";

export default function EmailField({ field, fieldErrors, formId }: Props) {
  const {
    databaseId: id,
    type,
    label,
    description,
    cssClass,
    isRequired,
    placeholder,
  } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as EmailFieldValue | undefined;
  const value = fieldValue?.emailValues?.value || DEFAULT_VALUE;

  return (
    <div
      className={`gfield flex flex-col gap-2 gfield-${type} ${
        cssClass ?? ""
      }`.trim()}
    >
      <label
        className={`text-left font-sans text-sm font-bold text-gray-700`}
        htmlFor={htmlId}
      >
        {`${label} ${isRequired ? "*" : ""}`}
      </label>
      <input
        type="email"
        name={String(id)}
        className={`form-input[type='email'] font-sans w-full bg-white p-2 text-black border-[1px] border-black`}
        id={htmlId}
        placeholder={field?.isRequired ? `${placeholder || label}*` : (placeholder || label) || ""}
        required={isRequired || false}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateEmailFieldValue,
            fieldValue: {
              id,
              emailValues: {
                value: event.target.value,
              },
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
