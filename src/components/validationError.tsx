import { useCallback } from "react";
import { useSelector } from "react-redux";

export default function validationError() {
  const { error } = useSelector((state) => state.auth);

  const errorMessage = useCallback(() => {
    return Object.keys(error).map((name) => {
      const msg = error[name].join(", ");
      return `${name} ${msg}`;
    });
  }, [error]);

  console.log(error !== null && errorMessage());

  return (
    error !== null &&
    errorMessage().map((error) => (
      <div className="alert alert-danger m-1 p-1" role="alert" key={error}>
        {error}
      </div>
    ))
  );
}
