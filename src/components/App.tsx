import React from "react"
import { Auth } from './../components/Auth'
import { Search } from "./../components/Search"

type IAppProps = {
  pluginData?: {
    local?: {
      apiKey?: string,
    },
  },
}

export const App = ({ pluginData }: IAppProps) => {
  return (
    <div>
      <Auth />
      {pluginData && pluginData.local && pluginData.local.apiKey && (
        <Search apiKey={pluginData.local.apiKey} />
      )}
    </div>
  )
}