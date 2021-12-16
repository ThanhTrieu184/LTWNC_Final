import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState, useEffect } from "react";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { CommentService } from "../services";
import { exceptionConstants } from "../constants";
import { ConfirmModal, Comment } from ".";
import io from "socket.io-client";

const { SUCCESS, CREATED } = exceptionConstants;
const socket = io("localhost:1804");

const CommentSection = ({ postId }) => {
  const [isEntering, setIsEntering] = useState(false);
  const [isShowAllComments, setIsShowAllComments] = useState(false);
  const [cmt, setCmt] = useState("");
  const [cmts, setCmts] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [currentCmt, setCurrentCmt] = useState();

  const handleComment = async (isEdit) => {
    if (cmt) {
      if (isEdit && currentCmt) {
        const res = await CommentService.updateComment({
          commentId: currentCmt._id,
          commentContent: cmt,
        });

        if (res.code === SUCCESS) {
          setCurrentCmt();
        }
      } else {
        const res = await CommentService.createNewComment({
          commentContent: cmt,
          postId,
        });

        if (res.code === CREATED) {
          setCmts([...cmts, res.data.comment]);
        }
      }
      setCmt("");
    }
  };

  const handleDeleteComment = async () => {
    setIsShowDeleteModal(false);
    if (currentCmt) {
      const res = await CommentService.deleteComment(currentCmt._id);
      if (res.code === SUCCESS) {
        setCmts(cmts.filter((c) => c._id !== res.data.deletedComment._id));
        setCurrentCmt();
        setCmt("");
      }
    }
  };

  const handleEditComment = (comment) => {
    setIsEntering(true);
    setCmt(comment.comment_content);
    setCurrentCmt(comment);
  };

  useEffect(() => {
    const fetchComment = async (postId) => {
      const res = await CommentService.getComments(postId);
      setCmts(res.data.comments);
      setFirstLoad(false);
    };
    if (firstLoad) {
      fetchComment(postId);
    }
    socket.on("newComment", (res) => {
      setCmts([...cmts, res.comment]);
    });
    socket.on("updateComment", (res) => {
      const updatedCmts = cmts.filter((c) => c._id !== res.comment._id);
      setCmts([...updatedCmts, res.comment]);
    });
    socket.on("deleteComment", (res) => {
      setCmts(cmts.filter((c) => c._id !== res.deletedComment._id));
    });
  }, [cmts, firstLoad, postId]);

  return (
    <Fragment>
      <div className="text-sm mt-4 mb-2 text-gray-400 cursor-pointer font-medium flex justify-between">
        <span onClick={() => setIsShowAllComments(!isShowAllComments)}>
          {isShowAllComments
            ? "Ẩn bình luận"
            : cmts.length > 0
            ? `Hiển thị ${cmts.length} bình luận`
            : "Chưa có bình luận"}
        </span>
        <span onClick={() => setIsEntering(!isEntering)}>Bình luận</span>
      </div>
      {isEntering && (
        <div className="flex my-4 items-center space-x-2">
          <input
            onChange={(e) => setCmt(e.target.value)}
            className="input h-12 input-bordered flex-1 rounded-full"
            placeholder="Nói gì đó về bài viết này"
            value={cmt}
          ></input>
          <div
            onClick={() => (currentCmt ? handleComment(true) : handleComment())}
            className="flex items-center justify-center rounded-full my-btn-gradient"
          >
            <FontAwesomeIcon className="text-white" icon={Icon.faPaperPlane} />
          </div>
        </div>
      )}
      <div className="flex flex-col space-y-2">
        {cmts.length > 0 && (
          <Comment
            comment={cmts[cmts.length - 1]}
            handleEditComment={handleEditComment}
            setIsShowDeleteModal={setIsShowDeleteModal}
            setCurrentCmt={setCurrentCmt}
          />
        )}
        {isShowAllComments &&
          cmts.length > 0 &&
          cmts
            .slice(0, cmts.length - 1)
            .map((c) => (
              <Comment
                key={c._id}
                comment={c}
                handleEditComment={handleEditComment}
                setIsShowDeleteModal={setIsShowDeleteModal}
                setCurrentCmt={setCurrentCmt}
              />
            ))
            .reverse()}
      </div>

      <ConfirmModal
        title="Xóa bình luận?"
        message="Một khi bạn nhấn vào 'Có', bình luận của bạn cho bài viết này sẽ bị xóa."
        isOpen={isShowDeleteModal}
        handleCancel={() => {
          setIsShowDeleteModal(false);
          setCurrentCmt();
        }}
        handleConfirm={() => handleDeleteComment()}
      />
    </Fragment>
  );
};

export default CommentSection;
