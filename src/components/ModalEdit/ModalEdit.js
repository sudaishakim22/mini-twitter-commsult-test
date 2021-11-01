import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { updateTweet } from "../../redux/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalEdit = (props) => {
  const dispatch = useDispatch();
  const [editedTweet, setEditedTweet] = useState("");

  useEffect(() => {
    setEditedTweet(props.editTweet.tweet);
  }, [props.editTweet]);

  const handleClose = () => {
    props.onCloseModal(false);
  };

  const onChangeEditHandler = (e) => {
    setEditedTweet(e.target.value);
  };

  const onSubmitHandler = async () => {
    const newDate = new Date();
    let params = {
      id: props.editTweet.tweetId,
      tweetBody: editedTweet,
      update_date: newDate.toISOString(),
    };
    const updateResult = await dispatch(updateTweet(params));
    if (updateResult.status === 200) {
      handleClose();
    }
  };

  return (
    <>
      <Modal
        open={props.show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Tweet
          </Typography>
          <hr />
          <TextField
            id="outlined-basic"
            label="Edit Tweet Here"
            variant="outlined"
            style={{ marginTop: "20px", width: "100%" }}
            value={editedTweet}
            onChange={onChangeEditHandler}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Button variant="text" onClick={onSubmitHandler}>
              Sumbit
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalEdit;
