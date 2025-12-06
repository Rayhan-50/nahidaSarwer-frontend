
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Users, Shield, Trash2, ArrowUpDown, ArrowUp, ArrowDown,
  User, Mail, Calendar, MoreVertical, Eye, Edit, Crown, UserCheck
} from "lucide-react";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 10;

  // Fetch users
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ["users", searchQuery, currentPage, sortField, sortOrder, filterRole],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: {
          search: searchQuery,
          page: currentPage,
          limit: usersPerPage,
          sort: sortField,
          order: sortOrder,
          role: filterRole
        },
      });
      return res.data;
    },
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Make Admin?",
      text: `Are you sure you want to make ${user.name} an admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#26B000",
      cancelButtonColor: "#FF4D50",
      confirmButtonText: "Yes, make admin",
      background: "#FEFFF6",
      customClass: {
        title: "text-[#FF4D50] text-xl",
        content: "text-[#6B7280]",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              setSelectedUser(null);
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.name} is now an admin`,
                showConfirmButton: false,
                timer: 1500,
                background: "#FEFFF6",
                customClass: {
                  title: "text-[#26B000] text-xl",
                }
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to make admin",
              text: error.message,
              background: "#FEFFF6",
              customClass: {
                title: "text-[#FF4D50] text-xl",
                content: "text-[#6B7280]",
              }
            });
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4D50",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete",
      background: "#FEFFF6",
      customClass: {
        title: "text-[#FF4D50] text-xl",
        content: "text-[#6B7280]",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              setSelectedUser(null);
              Swal.fire({
                icon: "success",
                title: "User Deleted",
                text: `${user.name} has been deleted successfully.`,
                background: "#FEFFF6",
                customClass: {
                  title: "text-[#26B000] text-xl",
                  content: "text-[#6B7280]",
                }
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to delete",
              text: error.message,
              background: "#FEFFF6",
              customClass: {
                title: "text-[#FF4D50] text-xl",
                content: "text-[#6B7280]",
              }
            });
          });
      }
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const SkeletonRow = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse border border-[#FFA46F]/20">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="w-12 h-12 bg-[#FFA46F]/10 rounded-xl"></div>
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-[#FFA46F]/10 rounded-lg w-1/4"></div>
          <div className="h-4 bg-[#FFA46F]/10 rounded-lg w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-[#FFA46F]/10 rounded-lg w-16"></div>
            <div className="h-6 bg-[#FFA46F]/10 rounded-lg w-20"></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <div className="h-10 bg-[#FFA46F]/10 rounded-xl w-full sm:w-28"></div>
          <div className="h-10 bg-[#FFA46F]/10 rounded-xl w-full sm:w-24"></div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-[#FF4D50]/20">
          <div className="w-16 h-16 bg-[#FF4D50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-[#FF4D50]" />
          </div>
          <p className="text-[#FF4D50] text-lg font-semibold mb-2">Error Loading Users</p>
          <p className="text-[#6B7280]">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-0">
      <div className="w-full">
        {/* Header Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-[#FFA46F]/20 shadow-lg">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FF4D50] to-[#FFA46F] rounded-2xl flex items-center justify-center">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#FF4D50] mb-1 sm:mb-2">Manage Users</h2>
                <p className="text-[#6B7280] text-sm sm:text-base lg:text-lg">Administrate user accounts and permissions</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              <div className="bg-[#26B000]/10 px-3 sm:px-4 py-2 rounded-xl border border-[#26B000]/20">
                <span className="text-[#26B000] font-semibold text-sm sm:text-base lg:text-lg">Total: {users.length}</span>
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-[#FFA46F]/30 text-[#FF4D50] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4D50] focus:border-[#FF4D50] bg-white shadow-sm"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#FFA46F]/20 shadow-sm">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-14 rounded-xl border border-[#FFA46F]/30 text-[#FF4D50] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF4D50] focus:border-[#FF4D50] bg-white shadow-sm"
              />
              <Search className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-[#FFA46F] h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>

        {/* Desktop Table View - FULL WIDTH */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-xl overflow-hidden border border-[#FFA46F]/20 mb-8">
          <table className="w-full text-left table-fixed">
            <thead className="bg-gradient-to-r from-[#FF4D50] to-[#FFA46F] text-white">
              <tr>
                <th className="p-5 text-base font-bold w-20">#</th>
                <th className="p-5 text-base font-bold w-1/4">Name</th>
                <th className="p-5 text-base font-bold w-1/4">Email</th>
                <th className="p-5 text-base font-bold w-32">Role</th>
                <th className="p-5 text-base font-bold w-28">Status</th>
                <th className="p-5 text-base font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FFA46F]/10">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan="6" className="p-4">
                      <SkeletonRow />
                    </td>
                  </tr>
                ))
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-gray-500 text-lg">
                    No users found
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, index) => (
                  <tr key={user._id} className="hover:bg-[#FFA46F]/5 transition-colors">
                    <td className="p-5">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FF4D50] to-[#FFA46F] rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-base">{index + 1 + (currentPage - 1) * usersPerPage}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800 text-base truncate">{user.name}</span>
                        {user.role === 'admin' && <Crown className="h-5 w-5 text-[#FFA46F] flex-shrink-0" />}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-5 w-5 flex-shrink-0" />
                        <span className="text-base truncate">{user.email}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5 whitespace-nowrap ${user.role === 'admin' ? 'bg-gradient-to-r from-[#FF4D50] to-[#FFA46F] text-white' :
                          user.role === 'teacher' ? 'bg-[#26B000] text-white' :
                            'bg-[#FFA46F]/10 text-[#FF4D50] border border-[#FFA46F]/30'
                        }`}>
                        {user.role === 'admin' ? <><Shield className="h-4 w-4" />Admin</> :
                          user.role === 'teacher' ? <><UserCheck className="h-4 w-4" />Teacher</> :
                            <><User className="h-4 w-4" />User</>}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className="px-4 py-2 rounded-lg text-sm font-medium bg-[#26B000]/10 text-[#26B000] border border-[#26B000]/20 inline-block whitespace-nowrap">
                        {user.status || "Active"}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-3">
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="px-4 py-2.5 bg-gradient-to-r from-[#26B000] to-[#1e8c00] text-white rounded-lg hover:from-[#1e8c00] hover:to-[#26B000] transition-colors text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
                          >
                            <Shield className="h-4 w-4" /> Make Admin
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="p-2.5 bg-[#FF4D50]/10 text-[#FF4D50] rounded-lg hover:bg-[#FF4D50]/20 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4 mb-8">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)
          ) : paginatedUsers.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#FFA46F]/20">
              <div className="w-16 h-16 bg-[#FFA46F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#FFA46F]" />
              </div>
              <p className="text-[#FF4D50] text-lg font-semibold mb-2">No users found</p>
              <p className="text-[#6B7280] text-sm">Try adjusting your search criteria</p>
            </div>
          ) : (
            paginatedUsers.map((user, index) => (
              <motion.div
                key={user._id}
                className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-[#FFA46F]/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FF4D50] to-[#FFA46F] rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1 + (currentPage - 1) * usersPerPage}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-[#FF4D50]">{user.name}</h3>
                        {user.role === 'admin' && <Crown className="h-4 w-4 text-[#FFA46F]" />}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${user.role === 'admin' ? 'bg-gradient-to-r from-[#FF4D50] to-[#FFA46F] text-white' :
                      user.role === 'teacher' ? 'bg-[#26B000] text-white' :
                        'bg-[#FFA46F]/10 text-[#FF4D50] border border-[#FFA46F]/30'
                    }`}>
                    {user.role === 'admin' ? <><Shield className="inline h-3 w-3 mr-1" />Admin</> :
                      user.role === 'teacher' ? <><UserCheck className="inline h-3 w-3 mr-1" />Teacher</> :
                        <><User className="inline h-3 w-3 mr-1" />User</>}
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-medium bg-[#26B000]/10 text-[#26B000] border border-[#26B000]/20">
                    {user.status || "Active"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-[#FFA46F]/10">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-[#26B000] to-[#1e8c00] text-white rounded-xl hover:from-[#1e8c00] hover:to-[#26B000] transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <Shield className="h-4 w-4" /> Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="px-4 py-2 bg-[#FF4D50]/10 text-[#FF4D50] rounded-xl hover:bg-[#FF4D50]/20 transition-colors flex items-center gap-2 text-sm font-semibold"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="bg-white rounded-2xl p-4 border border-[#FFA46F]/20 shadow-sm">
              <nav className="inline-flex rounded-xl shadow-sm -space-x-px">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-3 rounded-l-xl border border-[#FFA46F]/30 bg-white text-sm font-semibold text-[#FF4D50] hover:bg-[#FFA46F]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-3 border border-[#FFA46F]/30 text-sm font-semibold transition-colors ${currentPage === page
                        ? "bg-gradient-to-r from-[#FF4D50] to-[#FFA46F] text-white border-[#FF4D50]"
                        : "bg-white text-[#FF4D50] hover:bg-[#FFA46F]/5"
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-4 py-3 rounded-r-xl border border-[#FFA46F]/30 bg-white text-sm font-semibold text-[#FF4D50] hover:bg-[#FFA46F]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;