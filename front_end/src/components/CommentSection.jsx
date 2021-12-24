import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState, useEffect } from "react";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { CommentService } from "../services";
import { exceptionConstants } from "../constants";
import { ConfirmModal, Comment, Loading } from ".";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { commentSlice } from "../redux/slices";
import toast from "react-hot-toast";

const { enableLoading, disableLoading } = commentSlice.actions;
const { SUCCESS, CREATED } = exceptionConstants;
const socket = io("https://ltwnc-final.herokuapp.com");

const CommentSection = ({ postId }) => {
  const dispatch = useDispatch();
  const { isCommentFetching } = useSelector((state) => state.comment);
  const { userTheme } = useSelector((state) => state.responsive);
  const [isEntering, setIsEntering] = useState(false);
  const [isShowAllComments, setIsShowAllComments] = useState(false);
  const [cmt, setCmt] = useState("");
  const [cmts, setCmts] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [currentCmt, setCurrentCmt] = useState();

  const setLoading = async (loading) => {
    if (loading === true) {
      dispatch(enableLoading());
    } else {
      dispatch(disableLoading());
    }
  };

  const handleComment = async (isEdit) => {
    await setLoading(true);
    if (cmt) {
      if (isEdit && currentCmt) {
        const res = await CommentService.updateComment({
          commentId: currentCmt._id,
          commentContent: cmt,
        });
        res.code === SUCCESS ? setCurrentCmt() : toast.error(res.message);
      } else {
        const res = await CommentService.createNewComment({
          commentContent: cmt,
          postId,
        });

        res.code === CREATED ? setCurrentCmt() : toast.error(res.message);
      }
      await setLoading(false);
      setCmt("");
    }
  };

  const handleDeleteComment = async () => {
    await setLoading(true);
    setIsShowDeleteModal(false);
    if (currentCmt) {
      const res = await CommentService.deleteComment(currentCmt._id);
      if (res.code === SUCCESS) {
        setCmts(cmts.filter((c) => c._id !== res.data.deletedComment._id));
        setCurrentCmt();
        setCmt("");
      } else {
        toast.error(res.message);
      }
    }
    await setLoading(false);
  };

  const handleEditComment = async (comment) => {
    setIsEntering(true);
    setCmt(comment.comment_content);
    setCurrentCmt(comment);
  };

  useEffect(() => {
    const fetchComment = async (postId) => {
      const res = await CommentService.getComments(postId);
      setCmts(res.data?.comments);
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
            : cmts?.length > 0
            ? `Hiển thị ${cmts?.length} bình luận`
            : "Chưa có bình luận"}
        </span>
        <span onClick={() => setIsEntering(!isEntering)}>Bình luận</span>
      </div>
      {isEntering && (
        <div className="flex my-4 items-center space-x-2">
          <input
            onChange={(e) => setCmt(e.target.value)}
            className={`input h-12 input-bordered flex-1 rounded-full ${
              userTheme !== "light" && "bg-gray-700"
            }`}
            placeholder="Nói gì đó về bài viết này"
            value={cmt}
          ></input>
          <button
            disabled={isCommentFetching || cmt === "" ? true : false}
            onClick={() => (currentCmt ? handleComment(true) : handleComment())}
            className={`flex items-center justify-center rounded-full my-btn-gradient`}
          >
            <FontAwesomeIcon className="text-white" icon={Icon.faPaperPlane} />
          </button>
        </div>
      )}
      {isCommentFetching ? (
        <Loading height="200px" />
      ) : (
        <div className="flex flex-col space-y-2">
          {cmts?.length > 0 && (
            <Comment
              comment={cmts[cmts.length - 1]}
              handleEditComment={handleEditComment}
              setIsShowDeleteModal={setIsShowDeleteModal}
              setCurrentCmt={setCurrentCmt}
            />
          )}
          {isShowAllComments &&
            cmts?.length > 0 &&
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
      )}

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
