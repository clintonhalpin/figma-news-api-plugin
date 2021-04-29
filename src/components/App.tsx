import React from "react";
import { Auth } from "./Auth";
import { Search } from "./Search";

type IAppProps = {
  pluginData?: {
    local?: {
      apiKey?: string;
    };
  };
};

export const App = ({ pluginData }: IAppProps) => {
  return (
    <div>
      <Auth />
      {pluginData && pluginData.local && pluginData.local.apiKey && (
        <Search apiKey={pluginData.local.apiKey} />
      )}
    </div>
  );
};
