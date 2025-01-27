import { BsExclamationTriangle } from "react-icons/bs";
import CardWrapper from "./card-wrapper";

const AuthError = () => {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Oops, Something went wrong!"
    >
        <div className="w-full flex justify-center items-center">
            <BsExclamationTriangle className="text-destructive"/>
        </div>
    </CardWrapper>
  );
};

export default AuthError;
