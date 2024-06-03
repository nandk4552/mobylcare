import React from "react";
import { Helmet } from "react-helmet-async";
const Title = ({
  title = "Mobylcare Admin Panel",
  description = "This is chat application called InteractIO",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
