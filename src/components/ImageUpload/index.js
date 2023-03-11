import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    input: {
        display: "none",
    },
    dropzone: {
        border: "1px dashed grey",
        padding: theme.spacing(2),
        textAlign: "center",
    },
}));

function DraggableUploadImage({name, onUpload , id, ...props}) {
    const classes = useStyles();
    const [dragging, setDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            onUpload(file);
        }
    };

    const handleInputChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            onUpload(file ,name , id);
        }
    };

    return (
        <>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                name={name}
                onChange={handleInputChange}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Chọn ảnh
                </Button>
            </label>
            <div
                id={id}
                className={classes.dropzone}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ borderColor: dragging ? "blue" : "grey" }}
            >
                <p>Kéo thả ảnh vào để tải lên, hoặc bấm để chọn file</p>
            </div>
        </>
    );
}

export default DraggableUploadImage;
