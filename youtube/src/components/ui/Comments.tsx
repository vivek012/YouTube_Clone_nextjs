"use client"
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/lib/AuthContext";
import { axiosInstance } from "@/lib/axiosInstance";

interface CommentType {
  _id?: string;
  videoId: string;
  userId: string;
  commentbody: string;
  userCommented: string;
  createdAt?: string;
}
export default function Comments({ videoId }: { videoId: string }) {

  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editingCommentId, setEditingCommentId] = useState<string | undefined | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useUser();

  useEffect(() => {
    loadComments();
  }, [videoId]);

  const loadComments = async () => {
    // setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/comment/${videoId}`)
      console.log(res.data)
      setComments(res.data.reverse());
    } catch (error) {
      console.error("Failed to load history:", error);

    } finally {
      setLoading(false)
    }

  }

  if (loading) {
    return <div className="">Loading....</div>
  }

  const handledSubmitComment = async () => {
    if (!user || !newComment.trim()) return;
    setIsSubmitting(true);
    try {
      const comment: CommentType = {
        userId: user._id,
        videoId: videoId,
        commentbody: newComment,
        userCommented: user.name,
      }
      setComments((prev) => [comment, ...prev]);
      const res = await axiosInstance.post("/api/comment/postcomment", {
        videoId: videoId,
        userId: user._id,
        commentbody: newComment,
        userCommented: user.name
      })
      loadComments()
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handledEdit = async (comment: CommentType) => {
    setEditingCommentId(comment._id);
    setEditText(comment.commentbody);

  };

  const handleUpdateComment = async (commentId: string | undefined) => {
    if (!editText.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await axiosInstance.put(`/api/comment/editcomment/${commentId}`, { commentbody: editText })
      console.log(res.data)
      if (res.data) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, commentbody: editText } : comment
          )
        );
      }
      setEditingCommentId(null);
      setEditText("");


    } catch (error) {
      console.log("Failed to load history:", error);
    } finally {
      setIsSubmitting(false);

    }

  }



  const handleDeleteComment = async (commentId: string | undefined) => {
    // console.log(commentId);
    if(!commentId) return ;
    
    try {
      const res = await axiosInstance.delete(`/api/comment/deleteComment/${commentId}`)
      console.log(res);
      
      if (res.data.comment) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      }

    } catch (error) {

      console.error("Failed to load history:", error);
    }

  };





  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">{comments.length} Comments</h2>
      {user && (
        <div className=" flex mb-6">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 ml-4 space-y-2">

            <Textarea
              className="min-h-20 resize-none border-0 border-b-2 rounded-none focus:ring-0 focus-visible:ring-0  "
              placeholder="Add a Comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)

              } />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setNewComment("")}
                disabled={!newComment.trim()
                }>Cancel</Button>
              <Button onClick={handledSubmitComment} disabled={!newComment.trim() || isSubmitting}>
                Comment
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, index) => (
            <div className="flex items-start gap-4" key={index}>
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.image || ""} alt={comment.userCommented} />
                <AvatarFallback>{comment.userCommented?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 ">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{comment.userCommented}</span>
                  {/* <span className="text-sm text-gray-600">{formatDistanceToNow(new Date(comment.createdAt))}ago</span> */}
                </div>

                {editingCommentId === comment._id ? (

                  <div className="space-y-2">
                    <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} />

                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleUpdateComment(comment._id)}
                        disabled={!editText.trim() || isSubmitting}>
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditText("")
                        }}>
                        Cancel
                      </Button>
                    </div>

                  </div>

                ) : (<>

                  <p className="text-sm">{comment.commentbody}</p>
                  {user && user._id === comment.userId && (
                    <div className="flex gap-1 mt-2 text-sm text-gray-500">
                      <Button variant="link" onClick={() => handledEdit(comment)}>Edit</Button>
                      <Button variant="link" onClick={() => handleDeleteComment(comment._id)}>Delete</Button>
                    </div>
                  )}

                </>)}
              </div>
            </div>
          ))
        )}
      </div>
    </div >
  )
}

