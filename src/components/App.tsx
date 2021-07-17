import React from "react";
import { Auth } from "./../components/Auth";
import { Search } from "./../components/Search";

type IAppProps = {
  pluginData?: {
    local?: {
      apiKey?: string;
    };
  };
};

export const App = ({ pluginData }: IAppProps) => {
  const isAuthorized =
    pluginData && pluginData.local && pluginData.local.apiKey;
  return (
    <div>
      {!isAuthorized && <Auth />}
      {isAuthorized && <Search apiKey={pluginData.local.apiKey} />}
    </div>
  );
};
