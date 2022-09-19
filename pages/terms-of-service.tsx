import React from "react";
import { Legal } from "../components/Legal";

const TermsOfService = () => {
  const important =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet sit vitae labore delectus commodi assumenda dolorum! Alias, rem! Necessitatibus, quisquam beatae! Quas dolorum repellat aspernatur voluptatibus laborum facere deserunt quam.";

  return (
    <Legal
      title={"Terms of Service"}
      description={"terms of service"}
      important={important}
    ></Legal>
  );
};

export default TermsOfService;
