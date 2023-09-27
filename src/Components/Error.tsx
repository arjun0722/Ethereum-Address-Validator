
import React from "react";
// import MuiAlert ,{AlertProps} from "@mui/material/Alert";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import "./Error.css";

interface getErrorProps {
  message : string | string[]
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Error({ message } : getErrorProps) {
  return (
    <div>
      <Alert className="error_style"  severity="error">
        {message}
      </Alert>
    </div>
  );
}

export default Error;




