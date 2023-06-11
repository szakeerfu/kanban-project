import React, { useState } from "react";
import { MoreHorizontal, X } from "react-feather";

import Card from "../card/Card";
import Editable from "../Editabled/Editable";

import "./Board.css";

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [isCardOver, setIsCardOver] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const deleteBoard = () => {
    props.removeBoard();
  };

  const toggleDeleteButton = () => {
    setShowDeleteButton(!showDeleteButton);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsCardOver(true);
  };

  const handleDragLeave = () => {
    setIsCardOver(false);
  };

  const handleDragStart = (event, cardId, cardTitle) => {
    event.dataTransfer.setData("cardId", cardId);
    event.dataTransfer.setData("cardTitle", cardTitle);
  };

  return (
    <div
      className={`board ${isCardOver ? "card-over" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div
          className="board_header_title_more"
          onMouseEnter={toggleDeleteButton}
          onMouseLeave={toggleDeleteButton}
        >
          <MoreHorizontal onClick={toggleDropdown} />
          {showDeleteButton && (
            <button className="delete-button" onClick={deleteBoard}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
            handleDragStart={(event) =>
              handleDragStart(event, item.id, item.title)
            }
          />
        ))}
        {props.board.cards?.length === 0 && ( // Render drop zone only if there are no cards in the board
          <div
            className="board_empty-drop-zone"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
         
          </div>
        )}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;
