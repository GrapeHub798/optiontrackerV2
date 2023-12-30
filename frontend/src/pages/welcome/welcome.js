import React, { useEffect, useState } from "react";

import { history } from "../../_helpers/history";
import { APP_URL_PATHS } from "../../shared/sharedConstants";

export const Welcome = () => {
  //load in post login pieces from back
  const [hasPostLogin, setHasPostLogin] = useState(true);
  useEffect(() => {
    setTimeout(() => setHasPostLogin(false), 2000);
  }, []);

  useEffect(() => {
    if (!hasPostLogin) {
      history.navigate(APP_URL_PATHS.DASHBOARD);
    }
  }, [hasPostLogin]);

  return (
    <div>
      Use this screen to add in wizards and other things before going to next
      page
    </div>
  );
};
