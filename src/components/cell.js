import React from "react";
import { useState } from "react";

export const Cell = ({ value, onClick, cMenu }) => {

    const getValue = (value) => {
        if (!value.isRevealed) {
            return value.isFlagged ? "🚩" : null;
        }
        if (value.isMine) {
            return "💣";
        }
        if (value.neighbor === 0) {
            return null;
        }
        return value.neighbor;
    }

    return (
        <div
            onClick={onClick}
            onContextMenu={cMenu}
        >
            {getValue(value)}
        </div>
    )
}