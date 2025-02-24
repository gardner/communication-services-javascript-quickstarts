import { FluentThemeProvider } from "@azure/communication-react";
import { initializeIcons, registerIcons, Stack } from "@fluentui/react";
import React from "react";
import { ChatComponents } from "./ChatComponents";
import { DEFAULT_COMPONENT_ICONS } from "@azure/communication-react";

function CompletedComponentsApp(): JSX.Element {
  const stackStyle = {
    root: {
      width: "100%",
    },
  };

  initializeIcons();
  registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

  return (
    <FluentThemeProvider>
      <Stack horizontal horizontalAlign="space-evenly" styles={stackStyle}>
        <ChatComponents />
      </Stack>
    </FluentThemeProvider>
  );
}

export default CompletedComponentsApp;
