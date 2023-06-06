import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from './DescriptionBox.module.css'
import { SlMenu ,SlOptionsVertical} from "react-icons/sl";



function DescriptionBox() {
  const editorRef = useRef();
  return (
    <div className={styles.MainDiv}>
        <div className={styles.upperdiv}>
         
         <input ></input>
         <h5>in list <a>To Do</a></h5>
         <h5>Notifications</h5>
         <Button size="small" variant="text">Watch</Button>
         <h3>Description</h3>
         
        
         </div>
      <div className={styles.editordiv}>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey="7hjc9bj1n1hnc1k6o05y4omgm2oeajurq2wcsyeh4zbk3v68"
        />
      </div>


     
      <Stack className="buttons" spacing={2} direction="row">
        <Button size="small" variant="contained">Submit</Button>
        <Button size="small" variant="text">Cancel</Button>
      </Stack>
    </div>

  );
}

export default DescriptionBox;
