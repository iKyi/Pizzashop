import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
  },
}));
export default function IntroModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("cookieagree", "yes");
  };
  useEffect(() => {
    const isAgreed = localStorage.getItem("cookieagree");
    if (isAgreed !== "yes") {
        handleOpen();
    }
    return () => {};
  }, []);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper + ` introInner`}>
            <img
              src="https://i.ytimg.com/vi/BYf0pIOepnQ/maxresdefault.jpg"
              alt="Romeo"
            />
            <div className="introModalInner">
              <h2>Wait right there dear dragon !</h2>
              <p>
                This miracle of a non-functional food ordering app uses some
                cookies and local storage functionality to store and process
                your activity.
              </p>
              <p>
                If you believe me (Romeo) will somehow misuse your data (which
                is absurd) you are free to leave forever, and enjoy your coffees
                with someone else !
              </p>
              <p>So what will you choose ?!</p>
              <div className="botDual">
                <div>
                  <a
                    href="http://letmegooglethat.com/?q=how+do+i+make+better+decisions+in+life"
                    className="btn red"
                  >
                    Against my better judgement, leavee.
                  </a>
                </div>
                <div>
                  <button className="btn green" onClick={(e) => handleClose()}>
                    I trust you Romeo, with my life.
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
