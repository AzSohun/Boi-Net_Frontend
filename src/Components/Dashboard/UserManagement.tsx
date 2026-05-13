import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Users,
    Search,
    Trash2,
    Shield,
    Mail,
    MoreVertical,
    UserPlus,
    Filter,
    CheckCircle2,
    Lock,
    Unlock
} from 'lucide-react';
import { userService } from '../../Services/userService';
import type { UserDto, RoleValue } from '../../types/auth';
import { Role, checkRole } from '../../types/auth';
import { useFeedback } from '../UI/Feedback';
import { Loader2 } from 'lucide-react';
import { formatImageUrl } from '../../lib/imageUtils';
import { useAllUsers, useAdminManageUser, useDeleteUser } from '../../Hooks/useUsers';

import { useAuth } from '../../Context/AuthContext';

export default function UserManagement() {
    const { user: currentUser } = useAuth();
    const { data: users = [], isLoading: loading } = useAllUsers();
    const adminManageMutation = useAdminManageUser();
    const deleteMutation = useDeleteUser();

    const [searchQuery, setSearchQuery] = useState('');
    const { confirm } = useFeedback();

    const isSuperAdmin = checkRole(currentUser, 'SuperAdmin');
    const isAdmin = checkRole(currentUser, 'Admin');

    const handleAdminAction = async (userId: string, targetRole: RoleValue, isBlocked: boolean) => {
        adminManageMutation.mutate({ userId, role: String(targetRole), isBlocked });
    };

    const canManage = (targetUser: UserDto) => {
        const currentUserId = currentUser?.id ?? (currentUser as any)?.Id;
        const targetUserId = targetUser.id ?? (targetUser as any)?.id; // backend uses lower 'id' in UserDto but pascal 'Id' in profile response

        if (isSuperAdmin) {
            // Superadmin cannot delete themselves, but can manage everyone else
            return targetUserId !== currentUserId;
        }
        if (isAdmin) {
            // Admin can only manage Users or other Admins, but NOT SuperAdmins
            return !checkRole(targetUser, 'SuperAdmin') && targetUserId !== currentUserId;
        }
        return false;
    };

    const handleDelete = async (userId: string) => {
        const isConfirmed = await confirm({
            title: 'Delete User',
            message: 'Are you sure you want to remove this user? They will lose all access immediately.',
            confirmLabel: 'Delete User',
            type: 'danger'
        });

        if (isConfirmed) {
            deleteMutation.mutate(userId);
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleStyle = (role: RoleValue) => {
        const dummyUser = { userRole: role };
        if (checkRole(dummyUser, 'SuperAdmin')) return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-900/50';
        if (checkRole(dummyUser, 'Admin')) return 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50';
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/50';
    };

    const getRoleLabel = (role: RoleValue) => {
        const dummyUser = { userRole: role };
        if (checkRole(dummyUser, 'SuperAdmin')) return 'Super Admin';
        if (checkRole(dummyUser, 'Admin')) return 'Curator';
        return 'Explorer';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">User Directory</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Review activity and manage permissions for all users.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm">
                        <UserPlus size={16} />
                        Invite User
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm text-slate-800 dark:text-slate-200"
                    />
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 px-2 italic">
                    Displaying {filteredUsers.length} of {users.length} users
                </div>
            </div>

            {/* User Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">User</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Access Level</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <AnimatePresence>
                                {filteredUsers.map((user, idx) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
                                                    <img
                                                        src={formatImageUrl(user.profilePhotoUrl) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                                                        alt={user.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-none">{user.name}</p>
                                                    <div className="flex items-center gap-1.5 mt-1 text-slate-400 dark:text-slate-500">
                                                        <Mail size={12} />
                                                        <span className="text-xs">{user.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border transition-all ${getRoleStyle(user.userRole)}`}>
                                                <Shield size={12} strokeWidth={2.5} />
                                                {getRoleLabel(user.userRole)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${user.isBlocked ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                                                {user.isBlocked ? (
                                                    <>
                                                        <Lock size={14} />
                                                        Blocked
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle2 size={14} />
                                                        Active
                                                    </>
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right overflow-visible">
                                            <div className="flex items-center justify-end gap-1">
                                                {canManage(user) ? (
                                                    <>
                                                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mr-2">
                                                            {!checkRole(user, 'User') && (
                                                                <button
                                                                    onClick={() => handleAdminAction(user.id, Role.User, user.isBlocked || false)}
                                                                    disabled={adminManageMutation.isPending && adminManageMutation.variables?.userId === user.id}
                                                                    className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-400 hover:text-blue-600 transition-colors"
                                                                >
                                                                    Set User
                                                                </button>
                                                            )}
                                                            {!checkRole(user, 'Admin') && (
                                                                <button
                                                                    onClick={() => handleAdminAction(user.id, Role.Admin, user.isBlocked || false)}
                                                                    disabled={adminManageMutation.isPending && adminManageMutation.variables?.userId === user.id}
                                                                    className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-400 hover:text-indigo-600 transition-colors"
                                                                >
                                                                    Set Admin
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleAdminAction(user.id, user.userRole, !user.isBlocked)}
                                                                disabled={adminManageMutation.isPending && adminManageMutation.variables?.userId === user.id}
                                                                className={`px-2 py-1 text-[9px] font-black uppercase tracking-wider transition-colors ${user.isBlocked ? 'text-green-600 hover:text-green-700' : 'text-red-600 hover:text-red-700'}`}
                                                            >
                                                                {user.isBlocked ? 'Unblock' : 'Block'}
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDelete(user.id)}
                                                            disabled={deleteMutation.isPending && deleteMutation.variables === user.id}
                                                            className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                                                            title="Delete User"
                                                        >
                                                            {(deleteMutation.isPending && deleteMutation.variables === user.id) ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                                                        <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">Locked</span>
                                                    </div>
                                                )}
                                                <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

