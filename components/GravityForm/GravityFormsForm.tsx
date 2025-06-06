import "react-toastify/dist/ReactToastify.css";
import { gql, useMutation } from "@apollo/client";

import {
  FieldError,
  FormField,
  FormFieldValuesInput,
  FormIdTypeEnum,
  GfForm as GravityFormsFormType,
  SubmitGfFormInput,
} from "graphql";
import useGravityForm from "utilities/useGravityForm";
// import styles from "./GravityForm.module.scss";

import GravityFormsField from "./GravityFormsField";
import { Button } from "components/Button";
import removeHtml from "utilities/removeHtml";

interface Props {
  form: GravityFormsFormType;
  formId?: number;
}

const GravityFormsForm = ({ form, formId }: Props) => {
  const { formFields, title, id, databaseId, submitButton, confirmations } =
    form ?? {
      formFields: {
        nodes: [],
      },
      title: "",
      id: "",
      databaseId: 0,
      submitButton: {
        text: "",
      },
      confirmations: [
        {
          message: "",
        },
      ],
    };

  const { state } = useGravityForm();

  const [submitGfForm, { data, loading, error }] = useMutation(
    gql`
      mutation SubmitGfForm($input: SubmitGfFormInput!) {
        submitGfForm(input: $input) {
          clientMutationId
          confirmation {
            message
          }
          entry {
            formId
          }
          errors {
            message
            id
          }
        }
      }
    `,
    {
      onCompleted: (data: any) => {
        if (
          data?.submitGfForm?.errors &&
          data?.submitGfForm?.errors.length > 0
        ) {
          data?.submitGfForm?.errors.forEach((error: FieldError) => {
            console.log(error.message);
          });
        }
        if (data?.submitGfForm?.confirmation) {
          console.log(data?.submitGfForm?.confirmation?.message),
          window.location.reload();
        }
      },
    }
  );

  const haveEntryId = Boolean(data?.entry?.entryId);
  const haveFieldErrors = Boolean(data?.entry?.errors?.length);
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors;
  const hasConfirmation = confirmations && confirmations.length > 0;
  const defaultConfirmation = hasConfirmation && confirmations[0]?.message;
  const fields = formFields?.nodes || [];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;
    // alert(event?.target?.value)
    submitGfForm({
      variables: {
        input: {
          id: formId,
          fieldValues: state,
        },
      },
    })
      .catch((errors: any) => {
        console.log(errors)
      })
      .then((data: any) => {
        console.log("Submitted");
      });
  };

  function getFieldErrors(id: number): FieldError[] {
    if (!haveFieldErrors) return [];

    return data?.submitGfForm?.errors.filter(
      (error: FieldError) => error?.id === id
    );
  }
  // console.log(state);

  return (
    <>
      <form
        // className={`${styles[`form`]}`}
        method="post"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        <div className={`mx-auto flex max-w-xl flex-col gap-4 items-center justify-center`}>
          {fields
            ? fields.map((field, index) => {
                return (
                  <GravityFormsField
                    key={`${field?.id}-${index}`}
                    formId={formId}
                    field={field}
                    fieldErrors={getFieldErrors(Number(field?.id))}
                  />
                );
              })
            : null}
          {error ? (
            <div className="error-message text-primary">{error.message}</div>
          ) : null}
          {/* <Button
            type="org-circled"
            disabled={loading}
            className={`mx-auto max-w-fit`}
          >
            {submitButton?.text ?? "Submit"}
          </Button> */}
          <a
            href="https://www.jotform.com/form/251426597713059"
            type="org-circled"
            className={`rounded-[50%] border-[1px] border-orange py-2 px-6 font-semibold text-orange font-heading text-lg uppercase hover:border-teal hover:text-teal transition duration-300 ease-in-out md:flex ml-4 min-[830px]:ml-8`}
          >
            {submitButton?.text ?? "Get in Touch"}
          </a>
        </div>
      </form>
    </>
  );
};

export default GravityFormsForm;
