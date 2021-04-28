import React from "react";

type IAppProps = {
  pluginData?: {
    local?: {
      apiKey?: string;
    };
  };
};

export const App = ({ pluginData }: IAppProps) => {
  return <div>Hello World</div>;
};
