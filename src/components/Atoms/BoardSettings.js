import React from "react";
import { Paper, Typography, TextField, Button, Chip } from "@mui/material";

const BoardSettings = ({ boardSettings, handleBoardColorChange, handleAddCustomTag }) => {
    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5">Board Settings</Typography>
            <Typography>Board Color:</Typography>
            <input
                type="color"
                value={boardSettings.boardColor}
                onChange={handleBoardColorChange}
                style={{ marginTop: "8px", marginBottom: "16px" }}
            />
            <Button variant="contained" onClick={handleAddCustomTag} style={{ marginBottom: "16px" }}>
                Add Custom Tag
            </Button>
            <div>
                <Typography variant="h6">Custom Tags:</Typography>
                {boardSettings.customTags.map((tag) => (
                    <Chip key={tag} label={tag} style={{ margin: "4px" }} />
                ))}
            </div>
        </Paper>
    );
};

export default BoardSettings;