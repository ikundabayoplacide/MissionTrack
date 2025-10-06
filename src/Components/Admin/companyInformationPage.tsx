// src/pages/CompanyInformationPage.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store";
import { getSingleCompany } from "../../redux/companyRedux/companySlice";
import CompanyHeader from "./CompanyHeader";
import CompanyInformationCard from "./CompanyInformationCard";
import { message, Spin } from "antd";
import { approveOrRejectCompany, blockOrUnblockCompany, clearActionState } from "../../redux/companyRedux/actionSlice";
import { CommentsSection } from "./CommentSection";
import AdminOperations from "./AdminOperations";


const CompanyInformationPage: React.FC = () => {
    const { companyId } = useParams<{ companyId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { singleCompany: company, loading: companyLoading, error: companyError } = useSelector(
        (state: RootState) => state.company
    );
    const { loading: actionLoading, success: actionSuccess, error: actionError } = useSelector(
        (state: RootState) => state.adminAction
    );


    const [showComments, setShowComments] = useState(false);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [comment, setComment] = useState("");
    useEffect(() => {
        if (companyId) {
            dispatch(getSingleCompany(companyId));
        }
    }, [companyId, dispatch]);

    useEffect(() => {
        if (actionSuccess) {
            message.success("Action performed successfully");
            dispatch(getSingleCompany(companyId!));
            setShowComments(false);
            setSelectedAction(null);
            setComment("");
            dispatch(clearActionState());
        }
        if (actionError) {
            message.error(actionError);
        }
    }, [actionSuccess, actionError, dispatch, companyId]);

    const handleActionClick = (action: string) => {
     if (selectedAction === action && showComments) {
            setShowComments(false);
            setSelectedAction(null);
        } else {
            setShowComments(true);
            setSelectedAction(action);
        }
    };

const handleConfirm = () => {
  if (!selectedAction || !companyId) return;

  if (selectedAction === "Approve" || selectedAction === "Reject") {
    const actionType: "approve" | "reject" =
      selectedAction === "Approve" ? "approve" : "reject";

    dispatch(
      approveOrRejectCompany({
        companyId,
        action: actionType,
        comment: comment || undefined,
      })
    );
  } else if (selectedAction === "Block" || selectedAction === "Activate") {
    const actionType: "block" | "active" =
      selectedAction === "Block" ? "block" : "active";

    dispatch(
      blockOrUnblockCompany({
        companyId,
        action: actionType,
        comment: comment || undefined,
      })
    );
  }
};


    if (companyLoading) return <div className="flex justify-center items-center ">
   <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-2 text-gray-500">Loading company info...</p>
          </div>
    </div>;
    if (companyError) return <p className="text-red-500">{companyError}</p>;
    if (!company) return <p>No company found.</p>;


    return (
        <div>
            <CompanyHeader companyName={company.companyName} status={company.status} />
            <CompanyInformationCard company={company} />

            {/* Admin Operations */}
            <AdminOperations onActionClick={handleActionClick} />

            {/* Comments Section */}
            {showComments && (
                <CommentsSection
                    selectedAction={selectedAction!}
                    comment={comment}
                    setComment={setComment}
                    onConfirm={handleConfirm}
                    onCancel={() => {
                        setShowComments(false);
                        setSelectedAction(null);
                        setComment("");
                    }}
                    loading={actionLoading}
                />
            )}
        </div>
    );
};

export default CompanyInformationPage;
