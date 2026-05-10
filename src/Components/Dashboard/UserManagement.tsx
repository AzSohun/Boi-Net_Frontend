import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Users,
    Search,
    Trash2,
    Shield,
    Lock,
    Unlock,
    MoreHorizontal,
    Mail,
    Calendar,
    UserCheck,
    UserX,
    ChevronDown
} from 'lucide-react';
import { userService } from '../../Services/userService';
import type { UserDto, RoleValue } from '../../types/auth';
import { Role } from '../../types/auth';

export default function UserManagement() {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
            // Fallback with mock data for demo since API might not exist yet
            setUsers([
                { id: '1', name: 'Admin Zero', email: 'admin@boinet.com', userRole: Role.SuperAdmin, profilePhotoUrl: '', wishlist: [] },
                { id: '2', name: 'Alice Explorer', email: 'alice@test.com', userRole: Role.User, profilePhotoUrl: '', wishlist: [] },
                { id: '3', name: 'Bob Curator', email: 'bob@test.com', userRole: Role.Admin, profilePhotoUrl: '', wishlist: [] },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRole = async (userId: string, newRole: RoleValue) => {
        try {
            await userService.updateUserRole(userId, newRole);
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, userRole: newRole } : u));
        } catch (error) {
            console.error("Role update failed", error);
        }
    };

    const handleDelete = async (userId: string) => {
        if (window.confirm("Terminate this explorer node? This action is irreversible.")) {
            try {
                await userService.deleteUser(userId);
                setUsers(prev => prev.filter(u => u.id !== userId));
            } catch (error) {
                console.error("Deletion failed", error);
            }
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleLabel = (role: RoleValue) => {
        if (role === Role.SuperAdmin) return { label: 'Super Admin', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' };
        if (role === Role.Admin) return { label: 'Curator', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' };
        return { label: 'Explorer', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' };
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase font-serif italic underline decoration-indigo-500 decoration-2 underline-offset-8">User Control Core</h2>
                    <p className="text-slate-400 text-sm font-medium mt-3">Monitor and manage access levels for all narrative explorers.</p>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl">
                    <Users size={18} className="text-indigo-500" />
                    <span className="font-black text-sm">{users.length} Active Nodes</span>
                </div>
            </div>

            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                    type="text"
                    placeholder="Search by name or email alias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 transition-all font-medium text-sm"
                />
            </div>

            <div className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-[3rem] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-white/5">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Explorer Identity</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Access Tier</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Registry Date</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Overrides</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {filteredUsers.map((user) => {
                                    const roleData = getRoleLabel(user.userRole);
                                    return (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 overflow-hidden p-0.5 group-hover:scale-110 transition-transform">
                                                        <img
                                                            src={user.profilePhotoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                                                            alt=""
                                                            className="w-full h-full object-cover rounded-[14px]"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-sm tracking-tight">{user.name}</p>
                                                        <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5 mt-0.5">
                                                            <Mail size={10} />
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${roleData.color}`}>
                                                    <Shield size={10} />
                                                    {roleData.label}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Calendar size={14} />
                                                    <span className="text-xs font-bold font-mono">2024.05.10</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-indigo-500 transition-all">
                                                        <Lock size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-red-500 transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <div className="relative inline-block text-left">
                                                        <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
                                                            <MoreHorizontal size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
