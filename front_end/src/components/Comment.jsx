import React from "react";
import { useSelector } from "react-redux";
import { formatDateFromNow } from "../utils/formatDate";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = (props) => {
  const { comment, handleEditComment, setIsShowDeleteModal, setCurrentCmt } =
    props;
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="text-sm" key={comment._id}>
      <div className="flex justify-between items-center group hover:bg-gray-50 p-2 hover:bg-opacity-70 rounded-md">
        <div className="w-11/12">
          <span className="font-medium mr-2">
            {comment.commented_by.username}
          </span>
          <span className="">{comment.comment_content}</span>
        </div>
        {user.id === comment.commented_by._id && (
          <div className="hidden space-x-4 text-gray-400 group-hover:flex justify-center">
            <FontAwesomeIcon
              onClick={() => handleEditComment(comment)}
              icon={Icon.faPen}
              className="cursor-pointer hover:text-gray-800"
            />
            <FontAwesomeIcon
              onClick={() => {
                setIsShowDeleteModal(true);
                setCurrentCmt(comment);
              }}
              icon={Icon.faTrash}
              className="cursor-pointer hover:text-gray-800"
            />
          </div>
        )}
      </div>
      <small className="font-thin text-gray-400 pl-2">
        {formatDateFromNow(comment.commented_date)}
      </small>
    </div>
  );
};

export default Comment;
